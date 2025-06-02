import React from "react";
import { Icon } from "@iconify/react";
import { Switch, Tooltip } from "@heroui/react";

export const ThemeSwitcher: React.FC = () => {
  // Implementar nuestra propia lógica de tema
  const [isDark, setIsDark] = React.useState<boolean>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  React.useEffect(() => {
    // Aplicar clase dark al documento cuando cambia el estado
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  
  const handleToggle = () => {
    setIsDark(!isDark);
  };
  
  return (
    <Tooltip 
      content={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
      placement="bottom"
    >
      <div className="flex items-center gap-2">
        <Icon icon="lucide:sun" className={`text-default-500 ${!isDark && "text-primary-500"}`} />
        <Switch 
          isSelected={isDark}
          onValueChange={handleToggle}
          size="sm"
          color="primary"
          className="mx-1"
        />
        <Icon icon="lucide:moon" className={`text-default-500 ${isDark && "text-primary-500"}`} />
      </div>
    </Tooltip>
  );
};