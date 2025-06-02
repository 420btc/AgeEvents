import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend
} from "recharts";
import { UserData, HistoricalEvent } from "../types/types";

interface SimpleViewProps {
  userData: UserData;
  events: HistoricalEvent[];
}

export const SimpleView: React.FC<SimpleViewProps> = ({ userData, events }) => {
  if (events.length === 0) {
    return (
      <Card>
        <CardBody className="p-8 text-center">
          <Icon icon="lucide:pie-chart" className="mx-auto text-4xl text-foreground-400 mb-4" />
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

  // Prepare data for category distribution (Pie Chart)
  const categoryData = React.useMemo(() => {
    const categoryCount: { [key: string]: number } = {};
    events.forEach(event => {
      categoryCount[event.category] = (categoryCount[event.category] || 0) + 1;
    });
    
    return Object.entries(categoryCount).map(([category, count]) => ({
      name: category,
      value: count,
      percentage: ((count / events.length) * 100).toFixed(1)
    }));
  }, [events]);

  // Prepare data for age distribution (Bar Chart)
  const ageData = React.useMemo(() => {
    const ageGroups: { [key: string]: number } = {
      '0-5 años': 0,
      '6-12 años': 0,
      '13-18 años': 0,
      '19-25 años': 0,
      '26-35 años': 0,
      '36-50 años': 0,
      '51+ años': 0
    };
    
    events.forEach(event => {
      const age = calculateAge(event.date);
      if (age <= 5) ageGroups['0-5 años']++;
      else if (age <= 12) ageGroups['6-12 años']++;
      else if (age <= 18) ageGroups['13-18 años']++;
      else if (age <= 25) ageGroups['19-25 años']++;
      else if (age <= 35) ageGroups['26-35 años']++;
      else if (age <= 50) ageGroups['36-50 años']++;
      else ageGroups['51+ años']++;
    });
    
    return Object.entries(ageGroups)
      .filter(([_, count]) => count > 0)
      .map(([ageGroup, count]) => ({
        ageGroup,
        eventos: count,
        porcentaje: ((count / events.length) * 100).toFixed(1)
      }));
  }, [events, userData.birthDate]);

  // Colors for the pie chart
  const COLORS = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // yellow
    '#8b5cf6', // purple
    '#06b6d4', // cyan
    '#f97316', // orange
    '#84cc16', // lime
    '#ec4899', // pink
    '#6b7280'  // gray
  ];

  // Custom tooltip for pie chart
  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-content1 p-3 rounded-lg shadow-lg border border-divider">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-foreground-500">
            {data.value} eventos ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for bar chart
   const BarTooltip = ({ active, payload, label }: any) => {
     if (active && payload && payload.length) {
       const data = payload[0].payload;
       return (
         <div className="bg-content1 p-3 rounded-lg shadow-lg border border-divider">
           <p className="font-medium">{label}</p>
           <p className="text-sm text-foreground-500">
             {data.eventos} eventos ({data.porcentaje}%)
           </p>
         </div>
       );
     }
     return null;
   };

   // Custom label for pie chart - no labels for clean look
   const renderCustomLabel = () => {
     return null;
   };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card>
        <CardBody className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Icon icon="lucide:pie-chart" className="text-2xl text-primary" />
            <h3 className="text-xl font-semibold">Análisis de Eventos</h3>
          </div>
          <p className="text-foreground-500">
            Visualización estadística de {events.length} eventos históricos
          </p>
        </CardBody>
      </Card>

      {/* Charts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Events by Category */}
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="lucide:pie-chart" className="text-lg text-primary" />
              <h4 className="text-lg font-medium">Distribución por Categoría</h4>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                     data={categoryData}
                     cx="50%"
                     cy="50%"
                     labelLine={false}
                     label={renderCustomLabel}
                     outerRadius={80}
                     fill="#8884d8"
                     dataKey="value"
                   >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<PieTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-foreground-600">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Bar Chart - Events by Age Groups */}
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="lucide:bar-chart-3" className="text-lg text-primary" />
              <h4 className="text-lg font-medium">Eventos por Etapa de Vida</h4>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="ageGroup" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <RechartsTooltip content={<BarTooltip />} />
                  <Bar 
                    dataKey="eventos" 
                    fill="hsl(var(--heroui-primary-500))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="text-sm text-foreground-500 mb-2">
                Resumen por etapas:
              </div>
              <div className="grid grid-cols-1 gap-1 text-sm">
                {ageData.map((item) => (
                  <div key={item.ageGroup} className="flex justify-between">
                    <span className="text-foreground-600">{item.ageGroup}:</span>
                    <span className="font-medium">
                      {item.eventos} eventos ({item.porcentaje}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardBody className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon icon="lucide:trending-up" className="text-lg text-primary" />
            <h4 className="text-lg font-medium">Estadísticas Generales</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-content2 rounded-lg">
              <div className="text-2xl font-bold text-primary">{events.length}</div>
              <div className="text-sm text-foreground-500">Total Eventos</div>
            </div>
            <div className="text-center p-4 bg-content2 rounded-lg">
              <div className="text-2xl font-bold text-success">{categoryData.length}</div>
              <div className="text-sm text-foreground-500">Categorías</div>
            </div>
            <div className="text-center p-4 bg-content2 rounded-lg">
              <div className="text-2xl font-bold text-warning">
                {events.filter(e => e.isAIGenerated).length}
              </div>
              <div className="text-sm text-foreground-500">Generados por IA</div>
            </div>
            <div className="text-center p-4 bg-content2 rounded-lg">
              <div className="text-2xl font-bold text-secondary">
                {Math.round((new Date().getTime() - userData.birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365))}
              </div>
              <div className="text-sm text-foreground-500">Años de Vida</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};