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
import { AIService } from "./services/ai-service";

const App: React.FC = () => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [events, setEvents] = React.useState<HistoricalEvent[]>([]);
  const [selectedView, setSelectedView] = React.useState<string>("timeline");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [apiKey, setApiKey] = React.useState<string>("");
  const [aiService, setAiService] = React.useState<AIService | null>(null);
  const [isGeneratingMoreEvents, setIsGeneratingMoreEvents] = React.useState<boolean>(false);

  // Initialize AI service when API key changes
  React.useEffect(() => {
    if (apiKey) {
      const service = new AIService({ apiKey });
      setAiService(service);
      
      // Save API key to localStorage
      localStorage.setItem("ai_api_key", apiKey);
    }
  }, [apiKey]);

  // Load API key from localStorage on mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem("ai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleUserDataSubmit = async (data: UserData) => {
    setIsLoading(true);
    
    try {
      // Generate initial mock events
      const mockEvents = generateMockEvents(data.birthDate);
      
      // If AI service is available, try to generate additional events
      let allEvents = [...mockEvents];
      
      if (aiService) {
        try {
          const aiEvents = await aiService.generateHistoricalEvents(
            data.birthDate,
            data.birthLocation,
            10 // Generate 10 additional events
          );
          
          if (aiEvents.length > 0) {
            allEvents = [...mockEvents, ...aiEvents];
          }
        } catch (error) {
          console.error("Error al generar eventos con IA:", error);
        }
      }
      
      // Sort events by date
      allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
      
      setEvents(allEvents);
      setUserData(data);
    } catch (error) {
      console.error("Error al generar la cronología:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMoreEvents = async () => {
    if (!userData || !aiService) return;
    
    setIsGeneratingMoreEvents(true);
    
    try {
      const newEvents = await aiService.generateHistoricalEvents(
        userData.birthDate,
        userData.birthLocation,
        5 // Generate 5 more events
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
          Escáner Cronológico Personal
        </h1>
        <div className="flex items-center gap-2">
          <ApiKeyForm 
            apiKey={apiKey} 
            onApiKeyChange={setApiKey}
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
                    <h2 className="text-xl font-medium">Tu Cronología Personal</h2>
                    <p className="text-foreground-500 text-sm">
                      Fecha de nacimiento: {userData.birthDate.toLocaleDateString()}
                      {userData.birthLocation && ` • ${userData.birthLocation}`}
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
                        {isGeneratingMoreEvents ? "Generando..." : "Generar más eventos"}
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
                <TimelineView userData={userData} events={events} aiService={aiService || undefined} />
              </Tab>
              <Tab key="diagram" title="Diagrama">
                <DiagramView userData={userData} events={events} aiService={aiService || undefined} />
              </Tab>
              <Tab key="simple" title="Simple">
                <SimpleView userData={userData} events={events} aiService={aiService || undefined} />
              </Tab>
            </Tabs>
          </motion.div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto mt-12 py-4 border-t border-divider text-center text-foreground-500 text-sm">
        © {new Date().getFullYear()} Escáner Cronológico Personal • Todos los derechos reservados
      </footer>
    </div>
  );
};

export default App;