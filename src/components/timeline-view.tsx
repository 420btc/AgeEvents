import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { EventCard } from "./event-card";
import { UserData, HistoricalEvent } from "../types/types";
import { AIService } from "../services/ai-service";

interface TimelineViewProps {
  userData: UserData;
  events: HistoricalEvent[];
  aiService?: AIService;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ userData, events, aiService }) => {
  const [expandedEvent, setExpandedEvent] = React.useState<string | null>(null);
  
  const handleToggleExpand = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardBody className="p-8 text-center">
          <Icon icon="lucide:calendar-search" className="mx-auto text-4xl text-foreground-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No hay eventos disponibles</h3>
          <p className="text-foreground-500">No se encontraron eventos históricos para mostrar.</p>
        </CardBody>
      </Card>
    );
  }

  const calculateAge = (eventDate: Date) => {
    const birthYear = userData.birthDate.getFullYear();
    const eventYear = eventDate.getFullYear();
    const birthMonth = userData.birthDate.getMonth();
    const eventMonth = eventDate.getMonth();
    const birthDay = userData.birthDate.getDate();
    const eventDay = eventDate.getDate();
    
    let age = eventYear - birthYear;
    
    // Calculate months difference
    let monthsDiff = eventMonth - birthMonth;
    
    // Adjust if the day hasn't occurred yet in the current month
    if (eventDay < birthDay) {
      monthsDiff--;
    }
    
    // Adjust age if birthday hasn't occurred this year
    if (monthsDiff < 0) {
      age--;
      monthsDiff += 12;
    }
    
    return { years: age, months: monthsDiff };
  };



  const calculateAgeInDays = (eventDate: Date) => {
    const timeDiff = eventDate.getTime() - userData.birthDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  };

  // Group events by decade
  const eventsByDecade: Record<string, HistoricalEvent[]> = {};
  events.forEach(event => {
    const decade = Math.floor(event.date.getFullYear() / 10) * 10;
    const decadeKey = `${decade}s`;
    
    if (!eventsByDecade[decadeKey]) {
      eventsByDecade[decadeKey] = [];
    }
    
    eventsByDecade[decadeKey].push(event);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardBody className="p-6">
          <div className="space-y-8">
            {Object.entries(eventsByDecade).map(([decade, decadeEvents], decadeIndex) => (
              <motion.div 
                key={decade}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: decadeIndex * 0.1 }}
              >
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Icon icon="lucide:calendar" className="mr-2 text-primary" />
                  {decade}
                </h3>
                <div className="space-y-4 pl-6 border-l-2 border-primary-100">
                  {decadeEvents.map((event, index) => {
                    const ageData = calculateAge(event.date);
                    const isExpanded = expandedEvent === event.id;
                    
                    return (
                      <motion.div 
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (decadeIndex * 0.1) + (index * 0.05) }}
                        className="relative"
                      >
                        <div className={`absolute -left-[29px] w-4 h-4 rounded-full border-4 border-background ${
                          event.isAIGenerated 
                            ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                            : 'bg-primary'
                        }`}></div>
                        <EventCard 
                          event={event} 
                          ageData={ageData}
                          ageInDays={calculateAgeInDays(event.date)}
                          isExpanded={isExpanded}
                          onToggleExpand={() => handleToggleExpand(event.id)}
                          aiService={aiService}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};