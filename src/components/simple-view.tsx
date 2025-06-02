import React from "react";
import { Card, CardBody, Divider, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { UserData, HistoricalEvent } from "../types/types";

interface SimpleViewProps {
  userData: UserData;
  events: HistoricalEvent[];
}

export const SimpleView: React.FC<SimpleViewProps> = ({ userData, events }) => {
  const [expandedEvent, setExpandedEvent] = React.useState<string | null>(null);
  
  if (events.length === 0) {
    return (
      <Card>
        <CardBody className="p-8 text-center">
          <Icon icon="lucide:list" className="mx-auto text-4xl text-foreground-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No hay eventos disponibles</h3>
          <p className="text-foreground-500">No se encontraron eventos históricos para mostrar.</p>
        </CardBody>
      </Card>
    );
  }

  const calculateAge = (eventDate: Date) => {
    const birthYear = userData.birthDate.getFullYear();
    const eventYear = eventDate.getFullYear();
    
    let age = eventYear - birthYear;
    
    // Check if birthday has occurred this year
    const birthMonth = userData.birthDate.getMonth();
    const eventMonth = eventDate.getMonth();
    const birthDay = userData.birthDate.getDate();
    const eventDay = eventDate.getDate();
    
    if (eventMonth < birthMonth || (eventMonth === birthMonth && eventDay < birthDay)) {
      age--;
    }
    
    return age;
  };

  const calculateAgeInDays = (eventDate: Date) => {
    const timeDiff = eventDate.getTime() - userData.birthDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  };

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardBody className="p-6">
          <h3 className="text-lg font-medium mb-4">Vista Simplificada</h3>
          <div className="space-y-4">
            {sortedEvents.map((event, index) => {
              const age = calculateAge(event.date);
              const ageInDays = calculateAgeInDays(event.date);
              const isExpanded = expandedEvent === event.id;
              
              return (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start gap-4 p-4 rounded-md bg-content2 hover:bg-content3 transition-colors">
                    <div className="min-w-[60px] text-center">
                      {age === 0 ? (
                        <>
                          <span className="text-lg font-semibold text-primary">{ageInDays}</span>
                          <p className="text-xs text-foreground-500">días</p>
                        </>
                      ) : (
                        <>
                          <span className="text-lg font-semibold text-primary">{age}</span>
                          <p className="text-xs text-foreground-500">años</p>
                        </>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-foreground-500">
                            {event.date.toLocaleDateString()} • {event.category}
                          </p>
                        </div>
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          onPress={() => setExpandedEvent(isExpanded ? null : event.id)}
                          aria-label={isExpanded ? "Colapsar" : "Expandir"}
                        >
                          <Icon 
                            icon={isExpanded ? "lucide:chevron-up" : "lucide:chevron-down"} 
                            className="text-foreground-500"
                          />
                        </Button>
                      </div>
                      
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3"
                        >
                          <Divider className="my-2" />
                          <p className="text-sm">{event.description}</p>
                          
                          {event.impact && (
                            <div className="mt-3">
                              <h5 className="text-sm font-medium">Impacto:</h5>
                              <p className="text-sm text-foreground-500">{event.impact}</p>
                            </div>
                          )}
                          
                          {event.location && (
                            <div className="mt-2 flex items-center text-sm text-foreground-500">
                              <Icon icon="lucide:map-pin" className="mr-1 text-sm" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};