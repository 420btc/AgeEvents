import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip
} from "recharts";
import { EventCard } from "./event-card";
import { UserData, HistoricalEvent } from "../types/types";
import { AIService } from "../services/ai-service";

interface DiagramViewProps {
  userData: UserData;
  events: HistoricalEvent[];
  aiService?: AIService;
}

export const DiagramView: React.FC<DiagramViewProps> = ({ userData, events, aiService }) => {
  const [selectedEvent, setSelectedEvent] = React.useState<HistoricalEvent | null>(null);
  const [expandedEvent, setExpandedEvent] = React.useState<string | null>(null);
  
  const handleToggleExpand = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardBody className="p-8 text-center">
          <Icon icon="lucide:bar-chart-2" className="mx-auto text-4xl text-foreground-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No hay eventos disponibles</h3>
          <p className="text-foreground-500">No se encontraron eventos históricos para mostrar.</p>
        </CardBody>
      </Card>
    );
  }

  const calculateAge = (eventDate: Date): { years: number, months: number } => {
    const birth = userData.birthDate;
    
    let years = eventDate.getFullYear() - birth.getFullYear();
    let months = eventDate.getMonth() - birth.getMonth();
    
    if (eventDate.getDate() < birth.getDate()) {
      months--;
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return { years: Math.max(0, years), months: Math.max(0, months) };
  };

  const calculateAgeInDays = (eventDate: Date) => {
    const timeDiff = eventDate.getTime() - userData.birthDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  };

  // Prepare data for the chart
  const chartData = events.map(event => {
    const ageData = calculateAge(event.date);
    const ageInYears = ageData.years + (ageData.months / 12);
    return {
      year: event.date.getFullYear(),
      age: parseFloat(ageInYears.toFixed(2)),
      ageData,
      event,
      isAIGenerated: event.isAIGenerated || false
    };
  });

  // Custom dot component for AI-generated events
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isAI = payload.isAIGenerated;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="hsl(var(--heroui-background))"
        stroke={isAI ? "#3b82f6" : "hsl(var(--heroui-primary-500))"}
        strokeWidth={isAI ? 3 : 2}
        style={{
          filter: isAI ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))' : 'none'
        }}
      />
    );
  };

  // Custom active dot for hover state
  const CustomActiveDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isAI = payload.isAIGenerated;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill={isAI ? "#3b82f6" : "hsl(var(--heroui-primary-500))"}
        stroke="hsl(var(--heroui-background))"
        strokeWidth={2}
        style={{
          filter: isAI ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.7))' : 'none'
        }}
      />
    );
  };

  // Sort events by date
  chartData.sort((a, b) => a.year - b.year);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const formatAge = (ageData: { years: number, months: number }) => {
        if (ageData.years === 0) {
          return `${calculateAgeInDays(data.event.date)} días`;
        }
        if (ageData.months === 0) {
          return `${ageData.years} año${ageData.years !== 1 ? 's' : ''}`;
        }
        return `${ageData.years} año${ageData.years !== 1 ? 's' : ''} y ${ageData.months} mes${ageData.months !== 1 ? 'es' : ''}`;
      };
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{data.event.title}</p>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-sm">
            Edad: {formatAge(data.ageData)}
          </p>
          {data.event.description && (
            <p className="text-sm text-gray-500 mt-1">{data.event.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardBody className="p-2 md:p-6">
          <h3 className="text-lg font-medium mb-4">Diagrama Cronológico</h3>
          <div className="h-[500px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
                onClick={(data) => {
                  if (data && data.activePayload && data.activePayload.length) {
                    setSelectedEvent(data.activePayload[0].payload.event);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--heroui-divider))" />
                <XAxis 
                  dataKey="year" 
                  // Eliminar el uso de label prop que usa defaultProps internamente
                  // label={{ value: 'Año', position: 'insideBottom', offset: -10 }}
                  stroke="hsl(var(--heroui-foreground-500))"
                  // Agregar texto directamente
                  axisLine={{ strokeWidth: 1 }}
                  tickLine={{ strokeWidth: 1 }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  // Eliminar el uso de label prop que usa defaultProps internamente
                  // label={{ value: 'Edad', angle: -90, position: 'insideLeft' }}
                  stroke="hsl(var(--heroui-foreground-500))"
                  axisLine={{ strokeWidth: 1 }}
                  tickLine={{ strokeWidth: 1 }}
                  tick={{ fontSize: 12 }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="age"
                  stroke="hsl(var(--heroui-primary-500))"
                  strokeWidth={2}
                  dot={<CustomDot />}
                  activeDot={<CustomActiveDot />}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-foreground-500">Año</div>
            <div className="text-sm text-foreground-500 -rotate-90 transform origin-center md:rotate-0">Edad</div>
          </div>
          <p className="text-center text-foreground-500 text-sm mt-2">
            Haz clic en cualquier punto para ver detalles del evento
          </p>
        </CardBody>
      </Card>

      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <EventCard 
            event={selectedEvent} 
            ageData={calculateAge(selectedEvent.date)}
            ageInDays={calculateAgeInDays(selectedEvent.date)}
            isExpanded={expandedEvent === selectedEvent.id}
            onToggleExpand={() => handleToggleExpand(selectedEvent.id)}
            aiService={aiService}
          />
        </motion.div>
      )}
    </motion.div>
  );
};