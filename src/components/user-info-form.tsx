import React from "react";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";

interface UserInfoFormProps {
  onSubmit: (name: string, email: string) => void;
  onBack: () => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, onBack }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState({ name: "", email: "" });

  const validateForm = () => {
    const newErrors = { name: "", email: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Le nom est requis";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(name, email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-6">Vos informations</h2>
      
      <div className="space-y-4 mb-6">
        <Input
          label="Nom complet"
          placeholder="Entrez votre nom complet"
          value={name}
          onValueChange={setName}
          isRequired
          errorMessage={errors.name}
          isInvalid={!!errors.name}
          startContent={
            <Icon icon="lucide:user" className="text-default-400 text-sm" />
          }
        />
        
        <Input
          label="Adresse email"
          placeholder="Entrez votre adresse email"
          value={email}
          onValueChange={setEmail}
          type="email"
          isRequired
          errorMessage={errors.email}
          isInvalid={!!errors.email}
          startContent={
            <Icon icon="lucide:mail" className="text-default-400 text-sm" />
          }
        />
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          variant="flat"
          onPress={onBack}
          startContent={<Icon icon="lucide:arrow-left" />}
        >
          Retour
        </Button>
        <Button 
          color="primary" 
          type="submit"
          endContent={<Icon icon="lucide:arrow-right" />}
        >
          Continuer au paiement
        </Button>
      </div>
    </form>
  );
};