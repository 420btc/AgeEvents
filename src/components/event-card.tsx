import React from "react";
import { Card, CardBody, Button, Divider, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { HistoricalEvent } from "../types/types";
import { AIService } from "../services/ai-service";
import { MapboxMap } from "./mapbox-map";

interface EventCardProps {
  event: HistoricalEvent;
  ageData?: { years: number, months: number };
  age?: number;
  ageInDays?: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  aiService?: AIService;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  ageData,
  age, 
  ageInDays,
  isExpanded, 
  onToggleExpand,
  aiService
}) => {
  const [isAiLoading, setIsAiLoading] = React.useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = React.useState<string | null>(null);

  const handleRequestAiAnalysis = async () => {
    setIsAiLoading(true);
    
    try {
      if (aiService) {
        // Use AI SDK for analysis
        const analysis = await aiService.generateEventAnalysis(event);
        setAiAnalysis(analysis);
      } else {
        // Fallback to mock analysis if no AI service is available
        setTimeout(() => {
          setAiAnalysis(
            `Este evento histórico tuvo un impacto significativo en ${event.category === 'Tecnología' ? 'el desarrollo tecnológico' : 'la sociedad'} de la época. ${event.impact || 'Su influencia se extendió por décadas y continúa siendo relevante en la actualidad.'} Las consecuencias directas incluyeron cambios en ${event.category === 'Política' ? 'las políticas gubernamentales' : event.category === 'Ciencia' ? 'el entendimiento científico' : 'la cultura popular'}.`
          );
          setIsAiLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error al generar análisis:", error);
      setAiAnalysis("No se pudo generar el análisis. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <Card className={`mb-4 overflow-hidden ${event.isAIGenerated ? 'ring-2 ring-blue-400 ring-opacity-60' : ''}`}>
      <CardBody className="p-4">
        <div className="flex justify-between items-start overflow-hidden">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="min-w-[90px] max-w-[90px] h-[70px] flex flex-col items-center justify-center bg-primary-100 rounded-md p-1 flex-shrink-0">
              {ageData ? (
                ageData.years === 0 && ageInDays !== undefined ? (
                  <>
                    <span className="text-lg font-bold text-primary-600">{ageInDays}</span>
                    <span className="text-xs text-primary-600 -mt-1">días</span>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <span className="text-lg font-bold text-primary-600">{ageData.years}</span>
                      <span className="text-xs text-primary-600 ml-1">años</span>
                    </div>
                    {ageData.months > 0 && (
                      <div className="text-center -mt-1">
                        <span className="text-sm font-semibold text-primary-500">{ageData.months}</span>
                        <span className="text-xs text-primary-500 ml-1">meses</span>
                      </div>
                    )}
                  </>
                )
              ) : (
                // Fallback para compatibilidad con age
                (age !== undefined && age < 1 && ageInDays !== undefined) ? (
                  <>
                    <span className="text-lg font-bold text-primary-600">{ageInDays}</span>
                    <span className="text-xs text-primary-600 -mt-1">días</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg font-bold text-primary-600">
                      {age !== undefined ? (Number.isInteger(age) ? age : age.toFixed(1)) : 0}
                    </span>
                    <span className="text-xs text-primary-600 -mt-1">años</span>
                  </>
                )
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-medium flex-1 min-w-0">{event.title}</h4>
                {event.isAIGenerated && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full flex-shrink-0">
                    IA
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 items-center text-sm text-foreground-500 mt-1">
                <span className="whitespace-nowrap">{event.date.toLocaleDateString()}</span>
                <span className="w-1 h-1 rounded-full bg-foreground-400 flex-shrink-0"></span>
                <span className="flex items-center whitespace-nowrap">
                  <Icon 
                    icon={
                      event.category === 'Tecnología' ? 'lucide:cpu' : 
                      event.category === 'Política' ? 'lucide:landmark' : 
                      event.category === 'Ciencia' ? 'lucide:flask-conical' : 
                      event.category === 'Cultura' ? 'lucide:music' : 
                      'lucide:globe'
                    } 
                    className="mr-1 text-sm flex-shrink-0" 
                  />
                  {event.category}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1 flex-shrink-0">
            {event.location && (
              <Tooltip content={`Ubicación: ${event.location}`}>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  aria-label="Ver ubicación"
                  className="flex-shrink-0"
                >
                  <Icon icon="lucide:map-pin" className="text-foreground-500" />
                </Button>
              </Tooltip>
            )}
            
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={onToggleExpand}
              aria-label={isExpanded ? "Colapsar" : "Expandir"}
              className="flex-shrink-0"
            >
              <Icon 
                icon={isExpanded ? "lucide:chevron-up" : "lucide:chevron-down"} 
                className="text-foreground-500"
              />
            </Button>
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Divider className="my-3" />
              
              <p className="text-sm">{event.description}</p>
              
              {event.impact && (
                <div className="mt-3">
                  <h5 className="text-sm font-medium">Impacto:</h5>
                  <p className="text-sm text-foreground-500">{event.impact}</p>
                </div>
              )}
              
              {event.location && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Ubicación: {event.location}</h5>
                  <MapboxMap location={event.location} className="border border-divider" />
                </div>
              )}
              
              {!aiAnalysis && (
                <div className="mt-4">
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    onPress={handleRequestAiAnalysis}
                    isLoading={isAiLoading}
                    startContent={!isAiLoading && <Icon icon="lucide:sparkles" />}
                  >
                    {isAiLoading ? "Analizando..." : "Análisis IA"}
                  </Button>
                </div>
              )}
              
              {aiAnalysis && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-primary-50 rounded-md border border-primary-100"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="lucide:sparkles" className="text-primary" />
                    <h5 className="text-sm font-medium">Análisis de IA</h5>
                  </div>
                  <p className="text-sm">{aiAnalysis}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardBody>
    </Card>
  );
};