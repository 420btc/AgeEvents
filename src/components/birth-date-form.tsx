import React from "react";
import { 
  Input, 
  DatePicker, 
  Button, 
  Spinner,
  Checkbox,
  CheckboxGroup 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { DateValue, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { UserData } from "../types/types";

interface BirthDateFormProps {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

const CATEGORIES = [
  { value: "Tecnología", label: "Tecnología", icon: "lucide:cpu" },
  { value: "Política", label: "Política", icon: "lucide:landmark" },
  { value: "Ciencia", label: "Ciencia", icon: "lucide:flask-conical" },
  { value: "Cultura", label: "Cultura", icon: "lucide:music" },
  { value: "Salud", label: "Salud", icon: "lucide:heart-pulse" },
  { value: "Conflictos", label: "Conflictos", icon: "lucide:sword" },
  { value: "Economía", label: "Economía", icon: "lucide:trending-up" },
  { value: "Deportes", label: "Deportes", icon: "lucide:trophy" },
  { value: "Sociedad", label: "Sociedad", icon: "lucide:users" },
  { value: "Desastres Naturales", label: "Desastres Naturales", icon: "lucide:cloud-lightning" },
  { value: "Ingeniería", label: "Ingeniería", icon: "lucide:wrench" }
];

export const BirthDateForm: React.FC<BirthDateFormProps> = ({ onSubmit, isLoading }) => {
  const [birthDate, setBirthDate] = React.useState<DateValue | null>(null);
  const [birthLocation, setBirthLocation] = React.useState<string>("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDate) {
      setError("Por favor, selecciona tu fecha de nacimiento");
      return;
    }

    // Validate that the date is not in the future
    const today = new Date();
    const selectedDate = birthDate.toDate(getLocalTimeZone());
    
    if (selectedDate > today) {
      setError("La fecha de nacimiento no puede ser en el futuro");
      return;
    }

    // Calculate if the person is at least 1 year old
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    if (selectedDate > oneYearAgo) {
      setError("Debes tener al menos 1 año de edad para usar esta aplicación");
      return;
    }

    onSubmit({
      birthDate: selectedDate,
      birthLocation: birthLocation.trim() || null,
      selectedCategories: selectedCategories
    });
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="space-y-4">
        <I18nProvider locale="es-ES">
          <DatePicker
            label="Fecha de nacimiento"
            value={birthDate}
            onChange={setBirthDate}
            isRequired
            isDisabled={isLoading}
            classNames={{
              base: "max-w-full",
            }}
            granularity="day"
            showMonthAndYearPickers
          />
        </I18nProvider>

        <Input
          label="Lugar de nacimiento (opcional)"
          placeholder="Ciudad, País"
          value={birthLocation}
          onValueChange={setBirthLocation}
          isDisabled={isLoading}
          startContent={
            <Icon icon="lucide:map-pin" className="text-foreground-400" />
          }
        />

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Categorías de eventos (opcional)
          </label>
          <p className="text-xs text-foreground-500">
            Selecciona las categorías que más te interesen. Si no seleccionas ninguna, se mostrarán todos los eventos.
          </p>
          <CheckboxGroup
            value={selectedCategories}
            onValueChange={setSelectedCategories}
            isDisabled={isLoading}
            classNames={{
              wrapper: "grid grid-cols-2 gap-2"
            }}
          >
            {CATEGORIES.map((category) => (
              <Checkbox
                key={category.value}
                value={category.value}
                classNames={{
                  base: "inline-flex max-w-full w-full bg-content1 m-0 hover:bg-content2 items-center justify-start cursor-pointer rounded-lg gap-2 p-3 border-2 border-transparent data-[selected=true]:border-primary",
                  label: "w-full"
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon icon={category.icon} className="text-foreground-500" />
                  <span className="text-sm">{category.label}</span>
                </div>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>
      </div>

      {error && (
        <motion.p 
          className="text-danger text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}

      <Button 
        type="submit" 
        color="primary" 
        fullWidth
        isLoading={isLoading}
        isDisabled={isLoading || !birthDate}
      >
        {isLoading ? (
          <>
            <Spinner size="sm" color="white" />
            <span className="ml-2">Generando cronología...</span>
          </>
        ) : (
          <>
            Generar mi cronología
            <Icon icon="lucide:arrow-right" className="ml-2" />
          </>
        )}
      </Button>
    </motion.form>
  );
};