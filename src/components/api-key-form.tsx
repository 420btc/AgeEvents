import React from "react";
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AIProvider } from "../services/ai-service";

interface ApiKeyFormProps {
  apiKey: string;
  provider: AIProvider;
  onApiKeyChange: (apiKey: string) => void;
  onProviderChange: (provider: AIProvider) => void;
  onSave: () => void;
}

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ apiKey, provider, onApiKeyChange, onProviderChange, onSave }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [key, setKey] = React.useState(apiKey);
  const [selectedProvider, setSelectedProvider] = React.useState<AIProvider>(provider);
  const [showKey, setShowKey] = React.useState(false);

  const providers = [
    { key: 'openai', label: 'OpenAI', description: 'GPT-4o y otros modelos de OpenAI' },
    { key: 'anthropic', label: 'Anthropic', description: 'Claude 3.5 Sonnet y otros modelos de Anthropic' }
  ];

  const handleSave = () => {
    onApiKeyChange(key);
    onProviderChange(selectedProvider);
    onSave();
  };

  const getApiKeyUrl = (provider: AIProvider) => {
    switch (provider) {
      case 'openai':
        return 'https://platform.openai.com/api-keys';
      case 'anthropic':
        return 'https://console.anthropic.com/account/keys';
      default:
        return '#';
    }
  };

  const getApiKeyPlaceholder = (provider: AIProvider) => {
    switch (provider) {
      case 'openai':
        return 'sk-...';
      case 'anthropic':
        return 'sk-ant-...';
      default:
        return 'Ingresa tu API key';
    }
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
                Configuración de IA
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-foreground-500 mb-4">
                  Selecciona tu proveedor de IA preferido e ingresa tu API key para habilitar la generación de eventos históricos adicionales y análisis detallados.
                </p>
                
                <Select
                  label="Proveedor de IA"
                  placeholder="Selecciona un proveedor"
                  selectedKeys={[selectedProvider]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as AIProvider;
                    setSelectedProvider(selected);
                  }}
                  className="mb-4"
                >
                  {providers.map((provider) => (
                    <SelectItem key={provider.key}>
                      <div className="flex flex-col">
                        <span className="font-medium">{provider.label}</span>
                        <span className="text-xs text-foreground-500">{provider.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  label="API Key"
                  placeholder={getApiKeyPlaceholder(selectedProvider)}
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
                      href={getApiKeyUrl(selectedProvider)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {selectedProvider === 'openai' ? 'OpenAI Platform' : 'Anthropic Console'}
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
