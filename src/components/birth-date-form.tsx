import React from "react";
import { 
  Input, 
  DatePicker, 
  Button, 
  Spinner 
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";
import { UserData } from "../types/types";

interface BirthDateFormProps {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

export const BirthDateForm: React.FC<BirthDateFormProps> = ({ onSubmit, isLoading }) => {
  const [birthDate, setBirthDate] = React.useState<DateValue | null>(null);
  const [birthLocation, setBirthLocation] = React.useState<string>("");
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
      birthLocation: birthLocation.trim() || null
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
        <DatePicker
          label="Fecha de nacimiento"
          placeholder="Selecciona tu fecha de nacimiento"
          value={birthDate}
          onChange={setBirthDate}
          isRequired
          isDisabled={isLoading}
          classNames={{
            base: "max-w-full",
          }}
        />

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