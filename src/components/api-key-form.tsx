import React from "react";
import { Input, Button, Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface ApiKeyFormProps {
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
  onSave: () => void;
}

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ apiKey, onApiKeyChange, onSave }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [key, setKey] = React.useState(apiKey);
  const [showKey, setShowKey] = React.useState(false);

  const handleSave = () => {
    onApiKeyChange(key);
    onSave();
  };

  return (
    <>
      <Button 
        variant="flat" 
        color="primary" 
        size="sm"
        startContent={<Icon icon="lucide:key" />}
        onPress={onOpen}
      >
        Configurar API Key
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Configuración de AI SDK
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-foreground-500 mb-4">
                  Ingresa tu API key de AI SDK para habilitar la generación de eventos históricos adicionales y análisis detallados.
                </p>
                <Input
                  label="API Key"
                  placeholder="Ingresa tu API key"
                  value={key}
                  onValueChange={setKey}
                  type={showKey ? "text" : "password"}
                  endContent={
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={() => setShowKey(!showKey)}
                    >
                      <Icon icon={showKey ? "lucide:eye-off" : "lucide:eye"} />
                    </Button>
                  }
                />
                <div className="mt-4">
                  <p className="text-xs text-foreground-500">
                    <Icon icon="lucide:info" className="inline mr-1" />
                    Puedes obtener tu API key en{" "}
                    <a 
                      href="https://ai-sdk.dev" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      ai-sdk.dev
                    </a>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => {
                    handleSave();
                    onClose();
                  }}
                  isDisabled={!key}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
