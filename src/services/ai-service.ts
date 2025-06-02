import { HistoricalEvent } from "../types/types";

export type AIProvider = 'openai' | 'anthropic';

interface AIConfig {
  provider: AIProvider;
  apiKey: string;
}

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}



export class AIService {
  private provider: AIProvider;
  private apiKey: string;
  private openaiEndpoint = 'https://api.openai.com/v1/chat/completions';
  private anthropicEndpoint = 'https://api.anthropic.com/v1/messages';

  constructor(config: AIConfig) {
    this.provider = config.provider;
    this.apiKey = config.apiKey;
  }

  private async callOpenAI(messages: OpenAIMessage[], useJsonMode = false): Promise<string> {
    const requestBody: any = {
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 9000,
      temperature: 0.7
    };

    if (useJsonMode) {
      requestBody.response_format = { type: 'json_object' };
    }

    const response = await fetch(this.openaiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async callAnthropic(systemPrompt: string, userMessage: string): Promise<string> {
    const response = await fetch(this.anthropicEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Anthropic API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  private async makeAIRequest(systemPrompt: string, userPrompt: string, useJsonMode = false): Promise<string> {
    try {
      if (this.provider === 'openai') {
        const messages: OpenAIMessage[] = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ];
        return await this.callOpenAI(messages, useJsonMode);
      } else {
        return await this.callAnthropic(systemPrompt, userPrompt);
      }
    } catch (error) {
      console.error(`Error calling ${this.provider} API:`, error);
      throw error;
    }
  }

  async generateHistoricalEvents(
    birthDate: Date,
    birthLocation: string | null,
    count: number = 10,
    existingEventTitles: string[] = [],
    selectedCategories?: string[]
  ): Promise<HistoricalEvent[]> {
    try {
      const birthYear = birthDate.getFullYear();
      const currentYear = new Date().getFullYear();
      
      const systemPrompt = "Eres un historiador experto que genera eventos históricos precisos en formato JSON. Responde ÚNICAMENTE con un objeto JSON válido que contenga un array 'events'.";
      
      const existingEventsText = existingEventTitles.length > 0 
        ? `\n\nEVENTOS EXISTENTES A EVITAR (no generes eventos similares o duplicados):\n${existingEventTitles.map(title => `- ${title}`).join('\n')}`
        : '';

      const categoriesText = selectedCategories && selectedCategories.length > 0
        ? `\n\nRESTRICCIÓN IMPORTANTE: Genera ÚNICAMENTE eventos de estas categorías específicas: ${selectedCategories.join(', ')}. NO generes eventos de otras categorías.`
        : '';

      const userPrompt = `
Genera ${count} eventos históricos importantes ocurridos entre ${birthYear} y ${currentYear}.
${birthLocation ? `Incluye algunos eventos relevantes para ${birthLocation}.` : ''}${existingEventsText}${categoriesText}

Cada evento debe incluir:
- Un ID único y descriptivo (usa un formato como "evento-año-descripcion-corta" o similar)
- Un título descriptivo
- Una fecha exacta (día, mes, año)
- Una descripción detallada (2-3 oraciones)
- Una categoría${selectedCategories && selectedCategories.length > 0 ? ` (DEBE ser una de: ${selectedCategories.join(', ')})` : ' (Tecnología, Política, Ciencia, Cultura, Deportes, Salud, Economía, Conflictos, Sociedad, Desastres Naturales, Ingeniería)'}
- Ubicación donde ocurrió
- Impacto histórico (1-2 oraciones)

IMPORTANTE: Cada evento DEBE tener un ID único y descriptivo. NO uses IDs genéricos como "event-id-1", "event-id-2", etc. 
Ejemplos de IDs apropiados: "caida-muro-berlin-1989", "lanzamiento-internet-1991", "atentados-11s-2001"

Formato JSON requerido:
{
  "events": [
    {
      "id": "id-unico-descriptivo",
      "title": "Título del evento",
      "date": "YYYY-MM-DD",
      "description": "Descripción detallada",
      "category": "Categoría",
      "location": "Ciudad, País",
      "impact": "Descripción del impacto"
    }
  ]
}`;

      const response = await this.makeAIRequest(systemPrompt, userPrompt, this.provider === 'openai');
      
      let events;
      try {
        const parsedResponse = JSON.parse(response);
        events = parsedResponse.events || parsedResponse;
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        console.log('Raw response:', response);
        return [];
      }

      // Convertir el formato de fecha de string a Date
      return events.map((event: any, index: number) => {
        // Usar el ID proporcionado por la IA, o generar uno como fallback
        const eventId = event.id && event.id !== 'event-id-1' && event.id !== 'id-unico-descriptivo' 
          ? event.id 
          : `ai-event-${Date.now()}-${index + 1}`;
        
        return {
          id: eventId,
          title: event.title,
          date: new Date(event.date),
          description: event.description,
          category: event.category,
          location: event.location,
          impact: event.impact,
          isAIGenerated: true
        };
      });
    } catch (error) {
      console.error("Error al generar eventos históricos:", error);
      return [];
    }
  }

  async generateEventAnalysis(event: HistoricalEvent): Promise<string> {
    try {
      const systemPrompt = "Eres un historiador experto que proporciona análisis concisos pero profundos de eventos históricos.";
      
      const userPrompt = `
Analiza el siguiente evento histórico:

Título: ${event.title}
Fecha: ${event.date.toLocaleDateString()}
Categoría: ${event.category}
Descripción: ${event.description}
${event.impact ? `Impacto conocido: ${event.impact}` : ''}
${event.location ? `Ubicación: ${event.location}` : ''}

Proporciona un análisis detallado del evento que incluya:
1. Contexto histórico
2. Causas principales
3. Consecuencias a corto y largo plazo
4. Relevancia en la actualidad

Limita tu respuesta a un párrafo conciso pero informativo.`;

      return await this.makeAIRequest(systemPrompt, userPrompt);
    } catch (error) {
      console.error("Error al generar análisis del evento:", error);
      return "No se pudo generar el análisis. Por favor, inténtalo de nuevo más tarde.";
    }
  }

  // Método para cambiar el proveedor de IA
  switchProvider(provider: AIProvider, apiKey: string): void {
    this.provider = provider;
    this.apiKey = apiKey;
  }

  // Método para obtener el proveedor actual
  getCurrentProvider(): AIProvider {
    return this.provider;
  }
}
