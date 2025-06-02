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
      // Get existing event titles to avoid duplicates
      // If categories are selected, only consider events from those categories
      const relevantEvents = userData.selectedCategories.length > 0 
        ? events.filter(event => userData.selectedCategories.includes(event.category))
        : events;
      
      const existingTitles = relevantEvents.map(event => event.title);
      
      const newEvents = await aiService.generateHistoricalEvents(
        userData.birthDate,
        userData.birthLocation,
        15, // Generate 15 more events
        existingTitles, // Pass existing titles to avoid duplicates
        userData.selectedCategories.length > 0 ? userData.selectedCategories : undefined // Pass selected categories
      );
      
      if (newEvents.length > 0) {
        const allEvents = [...events, ...newEvents];
        // Sort events by date
        allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
        setEvents(allEvents);
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
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-medium">Tu Cronología Personal</h2>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Locales: {filteredEvents.filter(event => !event.isAIGenerated).length}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          IA: {filteredEvents.filter(event => event.isAIGenerated).length}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          Total: {filteredEvents.length}
                        </span>
                      </div>
                    </div>
                    <p className="text-foreground-500 text-sm">
                      Fecha de nacimiento: {userData.birthDate.toLocaleDateString()}
                      {userData.birthLocation && ` • ${userData.birthLocation}`}
                      {userData.selectedCategories.length > 0 && (
                        <span className="block mt-1">
                          Categorías: {userData.selectedCategories.join(", ")}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {aiService && (
                      <Button
                        color="primary"
                        variant="flat"
                        size="sm"
                        startContent={<Icon icon="lucide:plus" />}
                        isLoading={isGeneratingMoreEvents}
                        onPress={handleGenerateMoreEvents}
                      >
                        {isGeneratingMoreEvents ? "Generando con IA..." : "Generar más eventos con IA"}
                      </Button>
                    )}
                    <Button 
                      variant="light"
                      size="sm"
                      onPress={() => setUserData(null)}
                    >
                      Cambiar datos
                    </Button>
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