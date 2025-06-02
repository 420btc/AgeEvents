import { HistoricalEvent } from "../types/types";

interface AIConfig {
  apiKey: string;
  endpoint?: string;
}

export class AIService {
  private apiKey: string;
  private endpoint: string;

  constructor(config: AIConfig) {
    this.apiKey = config.apiKey;
    this.endpoint = config.endpoint || "https://api.ai-sdk.dev/v1";
  }

  async generateHistoricalEvents(
    birthDate: Date,
    birthLocation: string | null,
    count: number = 10
  ): Promise<HistoricalEvent[]> {
    try {
      const birthYear = birthDate.getFullYear();
      const currentYear = new Date().getFullYear();
      
      const prompt = `
        Genera ${count} eventos históricos importantes ocurridos entre ${birthYear} y ${currentYear}.
        ${birthLocation ? `Incluye algunos eventos relevantes para ${birthLocation}.` : ''}
        
        Cada evento debe incluir:
        - Un título descriptivo
        - Una fecha exacta (día, mes, año)
        - Una descripción detallada (2-3 oraciones)
        - Una categoría (Tecnología, Política, Ciencia, Cultura, Deportes, Salud, Economía)
        - Ubicación donde ocurrió
        - Impacto histórico (1-2 oraciones)
        
        Formato JSON:
        [
          {
            "id": "event-id-1",
            "title": "Título del evento",
            "date": "YYYY-MM-DD",
            "description": "Descripción detallada",
            "category": "Categoría",
            "location": "Ciudad, País",
            "impact": "Descripción del impacto"
          }
        ]
      `;

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Eres un historiador experto que genera eventos históricos precisos en formato JSON."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const data = await response.json();
      const events = JSON.parse(data.choices[0].message.content).events;

      // Convertir el formato de fecha de string a Date
      return events.map((event: any, index: number) => ({
        id: `ai-event-${index + 1}`,
        title: event.title,
        date: new Date(event.date),
        description: event.description,
        category: event.category,
        location: event.location,
        impact: event.impact
      }));
    } catch (error) {
      console.error("Error al generar eventos históricos:", error);
      return [];
    }
  }

  async generateEventAnalysis(event: HistoricalEvent): Promise<string> {
    try {
      const prompt = `
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
        
        Limita tu respuesta a un párrafo conciso pero informativo.
      `;

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Eres un historiador experto que proporciona análisis concisos pero profundos de eventos históricos."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error al generar análisis del evento:", error);
      return "No se pudo generar el análisis. Por favor, inténtalo de nuevo más tarde.";
    }
  }
}
