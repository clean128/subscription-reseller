import React from "react";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";

interface UserInfoFormProps {
  onSubmit: (name: string, email: string) => void;
  onBack: () => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-6">Vos informations</h2>

        <div className="space-y-4 flex flex-col gap-1 mb-6">
          <Input
            label="Nom complet"
            labelPlacement="outside"
            placeholder="Entrez votre nom complet"
            value={name}
            onValueChange={setName}
            isRequired
            validate={(value) => {
              if (!value.trim()) {
                return "Le nom est requis";
              }
              return null;
            }}
            startContent={
              <div className="flex items-center h-full pointer-events-none">
                <Icon icon="lucide:user" className="text-default-400 text-sm" />
              </div>
            }
            classNames={{
              label: "pl-2",
            }}
          />

          <div className="space-y-1.5">
            <Input
              label="Adresse email"
              labelPlacement="outside"
              placeholder="Entrez votre adresse email"
              value={email}
              onValueChange={setEmail}
              type="email"
              isRequired
              validate={(value) => {
                if (!value.trim()) {
                  return "Le nom est requis";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return "Veuillez entrer une adresse email valide";
                }
                return null;
              }}
              startContent={
                <div className="flex items-center h-full pointer-events-none">
                  <Icon
                    icon="lucide:mail"
                    className="text-default-400 text-sm"
                  />
                </div>
              }
              classNames={{
                label: "pl-2",
              }}
            />
            <p className="text-xs text-default-500 ml-2">
              L'invitation à votre abonnement sera envoyée à cette adresse email
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
          <Button
            variant="flat"
            onPress={onBack}
            startContent={<Icon icon="lucide:arrow-left" />}
            className="order-2 sm:order-1"
          >
            Retour
          </Button>
          <Button
            color="primary"
            type="submit"
            endContent={<Icon icon="lucide:arrow-right" />}
            className="order-1 sm:order-2"
          >
            Continuer au paiement
          </Button>
        </div>
      </div>
    </form>
  );
};
