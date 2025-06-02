import React from "react";
import { Card, CardBody, Tabs, Tab, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { BirthDateForm } from "./components/birth-date-form";
import { TimelineView } from "./components/timeline-view";
import { DiagramView } from "./components/diagram-view";
import { SimpleView } from "./components/simple-view";
import { ThemeSwitcher } from "./components/theme-switcher";
import { ApiKeyForm } from "./components/api-key-form";
import { UserData, HistoricalEvent } from "./types/types";
import { generateMockEvents } from "./data/mock-events";
import { AIService, AIProvider } from "./services/ai-service";

const App: React.FC = () => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [events, setEvents] = React.useState<HistoricalEvent[]>([]);
  const [selectedView, setSelectedView] = React.useState<string>("timeline");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [apiKey, setApiKey] = React.useState<string>("");
  const [aiProvider, setAiProvider] = React.useState<AIProvider>("openai");
  const [aiService, setAiService] = React.useState<AIService | null>(null);
  const [isGeneratingMoreEvents, setIsGeneratingMoreEvents] = React.useState<boolean>(false);

  // Initialize AI service when API key or provider changes
  React.useEffect(() => {
    if (apiKey && aiProvider) {
      const service = new AIService({ provider: aiProvider, apiKey });
      setAiService(service);
      
      // Save API key and provider to localStorage
      localStorage.setItem("ai_api_key", apiKey);
      localStorage.setItem("ai_provider", aiProvider);
    }
  }, [apiKey, aiProvider]);

  // Load API key and provider from localStorage on mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem("ai_api_key");
    const savedProvider = localStorage.getItem("ai_provider") as AIProvider;
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    if (savedProvider && (savedProvider === 'openai' || savedProvider === 'anthropic')) {
      setAiProvider(savedProvider);
    }
  }, []);

  const handleUserDataSubmit = async (data: UserData) => {
    setIsLoading(true);
    
    try {
      // Generate only initial mock events (local events)
      const mockEvents = generateMockEvents(data.birthDate);
      
      // Sort events by date
      mockEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
      
      setEvents(mockEvents);
      setUserData(data);
    } catch (error) {
      console.error("Error al generar la cronología:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter events based on selected categories
  const filteredEvents = React.useMemo(() => {
    if (!userData || userData.selectedCategories.length === 0) {
      return events;
    }
    return events.filter(event => userData.selectedCategories.includes(event.category));
  }, [events, userData]);

  const handleGenerateMoreEvents = async () => {
    if (!userData || !aiService) return;
    
    setIsGeneratingMoreEvents(true);
    
    try {
      // Get ALL existing event titles to avoid duplicates, not just from selected categories
      const existingTitles = events.map(event => event.title);
      
      console.log('Eventos existentes antes de generar:', events.length);
      console.log('Títulos existentes:', existingTitles);
      
      const newEvents = await aiService.generateHistoricalEvents(
        userData.birthDate,
        userData.birthLocation,
        15, // Generate 15 more events
        existingTitles, // Pass ALL existing titles to avoid duplicates
        userData.selectedCategories.length > 0 ? userData.selectedCategories : undefined // Pass selected categories
      );
      
      console.log('Nuevos eventos generados:', newEvents.length);
      console.log('Nuevos eventos:', newEvents.map(e => e.title));
      
      if (newEvents.length > 0) {
        // Filter out any events that might still be duplicates based on title similarity
        const filteredNewEvents = newEvents.filter(newEvent => 
          !events.some(existingEvent => 
            existingEvent.title.toLowerCase().trim() === newEvent.title.toLowerCase().trim()
          )
        );
        
        console.log('Eventos filtrados (sin duplicados):', filteredNewEvents.length);
        
        if (filteredNewEvents.length > 0) {
          const allEvents = [...events, ...filteredNewEvents];
          // Sort events by date
          allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
          console.log('Total de eventos después de agregar:', allEvents.length);
          setEvents(allEvents);
        } else {
          console.log('No se agregaron eventos nuevos (todos eran duplicados)');
        }
      } else {
        console.log('No se generaron eventos nuevos');
      }
    } catch (error) {
      console.error("Error al generar más eventos:", error);
    } finally {
      setIsGeneratingMoreEvents(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          Age Events AI
        </h1>
        <div className="flex items-center gap-2">
          <ApiKeyForm 
            apiKey={apiKey}
            provider={aiProvider}
            onApiKeyChange={setApiKey}
            onProviderChange={setAiProvider}
            onSave={() => {}}
          />
          <ThemeSwitcher />
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {!userData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <Card>
              <CardBody className="p-6">
                <h2 className="text-xl font-medium mb-4">Comenzar</h2>
                <BirthDateForm onSubmit={handleUserDataSubmit} isLoading={isLoading} />
              </CardBody>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-6">
              <CardBody className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <img src="/src/images/globale.png" alt="Globale" className="h-20 w-auto" />
                      </div>
                      <div className="flex flex-wrap gap-2 min-w-0">
                        <span className="px-4 py-1.5 text-sm font-bold bg-green-600 text-white rounded-full shadow-md border border-green-700 whitespace-nowrap">
                          📍 Locales: {filteredEvents.filter(event => !event.isAIGenerated).length}
                        </span>
                        <span className="px-4 py-1.5 text-sm font-bold bg-blue-600 text-white rounded-full shadow-md border border-blue-700 whitespace-nowrap">
                          🤖 IA: {filteredEvents.filter(event => event.isAIGenerated).length}
                        </span>
                        <span className="px-4 py-1.5 text-sm font-bold bg-purple-600 text-white rounded-full shadow-md border border-purple-700 whitespace-nowrap">
                          📊 Total: {filteredEvents.length}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-foreground-600 text-base font-medium">
                        📅 Fecha de nacimiento: {userData.birthDate.toLocaleDateString()}
                        {userData.birthLocation && ` • 📍 ${userData.birthLocation}`}
                      </p>
                      {userData.selectedCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-foreground-600 text-sm font-medium">Categorías:</span>
                          {userData.selectedCategories.map((category) => {
                            const getCategoryStyle = (cat: string) => {
                              const styles: Record<string, { icon: string; bg: string; text: string; border: string }> = {
                                'Tecnología': { icon: 'lucide:cpu', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
                                'Política': { icon: 'lucide:landmark', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
                                'Ciencia': { icon: 'lucide:flask-conical', bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
                                'Cultura': { icon: 'lucide:music', bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
                                'Salud': { icon: 'lucide:heart-pulse', bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-300' },
                                'Conflictos': { icon: 'lucide:sword', bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
                                'Economía': { icon: 'lucide:trending-up', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
                                'Deportes': { icon: 'lucide:trophy', bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
                                'Sociedad': { icon: 'lucide:users', bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
                                'Desastres Naturales': { icon: 'lucide:cloud-lightning', bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
                                'Ingeniería': { icon: 'lucide:wrench', bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-300' }
                              };
                              return styles[cat] || { icon: 'lucide:tag', bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' };
                            };
                            const style = getCategoryStyle(category);
                            return (
                              <span key={category} className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${style.bg} ${style.text} ${style.border}`}>
                                <Icon icon={style.icon} className="w-3 h-3" />
                                {category}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {aiService && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Button
                          color="primary"
                          variant="solid"
                          size="lg"
                          startContent={<Icon icon="lucide:sparkles" className="text-lg" />}
                          isLoading={isGeneratingMoreEvents}
                          onPress={handleGenerateMoreEvents}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-blue-500/25 font-semibold px-6 py-3 text-white border-0"
                          style={{
                            boxShadow: isGeneratingMoreEvents 
                              ? '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)' 
                              : '0 4px 15px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          {isGeneratingMoreEvents ? (
                            <span className="flex items-center gap-2">
                              <Icon icon="lucide:loader-2" className="animate-spin" />
                              Generando con IA...
                            </span>
                          ) : (
                            "✨ Generar más eventos con IA"
                          )}
                        </Button>
                      </motion.div>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        variant="solid"
                        size="lg"
                        startContent={<Icon icon="lucide:settings" className="text-lg" />}
                        onPress={() => setUserData(null)}
                        className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-gray-500/25 font-semibold px-6 py-3 text-white border-0"
                      >
                        🔄 Cambiar datos
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Tabs 
              aria-label="Opciones de visualización" 
              selectedKey={selectedView} 
              onSelectionChange={setSelectedView as any}
              className="mb-6"
            >
              <Tab key="timeline" title="Esquema">
                <TimelineView userData={userData} events={filteredEvents} aiService={aiService || undefined} />
              </Tab>
              <Tab key="diagram" title="Diagrama">
                <DiagramView userData={userData} events={filteredEvents} aiService={aiService || undefined} />
              </Tab>
              <Tab key="simple" title="Simple">
                <SimpleView userData={userData} events={filteredEvents} />
              </Tab>
            </Tabs>
          </motion.div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto mt-12 py-4 border-t border-divider text-center text-foreground-500 text-sm">
        © {new Date().getFullYear()} Age Events AI • Todos los derechos reservados
      </footer>
    </div>
  );
};

export default App;