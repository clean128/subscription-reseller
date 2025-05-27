import React from "react";
import { Button, Radio, RadioGroup, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Subscription } from "../App";
import { motion, AnimatePresence } from "framer-motion";

// Sample subscription data
const subscriptions: Subscription[] = [
  {
    id: "adobe",
    name: "Adobe Creative Cloud",
    logo: "logos:adobe", // Changed from logos:adobe-creative-cloud
    description:
      "Accédez à plus de 20 applications créatives Adobe, dont Photoshop, Illustrator et InDesign.",
    features: [
      "Accès à toutes les applications Adobe Creative Cloud",
      "100 Go de stockage cloud",
      "Milliers de polices Adobe",
      "Mises à jour régulières des fonctionnalités",
      "Utilisation sur ordinateur et appareils mobiles",
    ],
    durations: [
      { id: "adobe-monthly", name: "Mensuel", price: 49.99 },
      {
        id: "adobe-annual",
        name: "Annuel",
        price: 479.88,
        regularPrice: 599.88,
      },
    ],
  },
  {
    id: "canva",
    name: "Canva Pro",
    logo: "logos:canva", // Changed from logos:canva-icon
    description: "Créez facilement des designs professionnels avec Canva Pro.",
    features: [
      "Plus de 100 millions d'éléments premium",
      "Plus de 610 000 modèles premium",
      "Outil de redimensionnement magique",
      "Suppression d'arrière-plan en un clic",
      "Planification de contenu sur les réseaux sociaux",
    ],
    durations: [
      { id: "canva-monthly", name: "Mensuel", price: 11.99 },
      {
        id: "canva-annual",
        name: "Annuel",
        price: 109.99,
        regularPrice: 143.88,
      },
    ],
  },
  {
    id: "figma",
    name: "Figma Professional",
    logo: "logos:figma", // Changed from logos:figma-icon
    description: "Concevez, prototypez et collaborez avec Figma Professional.",
    features: [
      "Nombre illimité de fichiers et projets",
      "Historique de version illimité",
      "Collaboration en temps réel",
      "Contrôles d'accès avancés",
      "Bibliothèques de composants partagées",
    ],
    durations: [
      { id: "figma-monthly", name: "Mensuel", price: 15 },
      { id: "figma-annual", name: "Annuel", price: 144, regularPrice: 180 },
    ],
  },
];

interface SubscriptionSelectorProps {
  onSubscriptionSelect: (subscription: Subscription) => void;
  onDurationSelect: (durationId: string) => void;
  selectedSubscription: Subscription | null;
  selectedDuration: string | null;
  onContinue: () => void;
}

export const SubscriptionSelector: React.FC<SubscriptionSelectorProps> = ({
  onSubscriptionSelect,
  onDurationSelect,
  selectedSubscription,
  selectedDuration,
  onContinue,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Choisissez votre abonnement
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {subscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className={`border rounded-medium p-4 cursor-pointer transition-all ${
              selectedSubscription?.id === subscription.id
                ? "border-primary bg-primary-50"
                : "border-default-200 hover:border-primary-200"
            }`}
            onClick={() => onSubscriptionSelect(subscription)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-8 w-8 flex items-center justify-center">
                <Icon icon={subscription.logo} className="h-8 w-8" />
              </div>
              {selectedSubscription?.id === subscription.id && (
                <Icon icon="lucide:check-circle" className="text-primary" />
              )}
            </div>
            <h3 className="font-medium text-foreground">{subscription.name}</h3>
            <p className="text-sm text-default-500 mt-1 line-clamp-2">
              {subscription.description}
            </p>
          </div>
        ))}
      </div>

      {/* Improved animation with height transition */}
      <AnimatePresence>
        {selectedSubscription && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Divider className="my-6" />

            <h3 className="text-lg font-medium mb-4">Choisissez la durée</h3>

            <RadioGroup
              value={selectedDuration || ""}
              onValueChange={onDurationSelect}
              orientation="horizontal"
              className="gap-4 flex flex-col sm:flex-row"
            >
              {selectedSubscription.durations.map((duration) => (
                <Radio key={duration.id} value={duration.id} className="w-full">
                  <div className="flex flex-col">
                    <span className="font-medium">{duration.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">
                        {duration.price.toFixed(2)} €
                      </span>
                      {duration.regularPrice && (
                        <span className="text-default-400 text-sm line-through">
                          {duration.regularPrice.toFixed(2)} €
                        </span>
                      )}
                      {duration.regularPrice && (
                        <span className="text-xs bg-success-100 text-success-600 px-1.5 py-0.5 rounded">
                          -
                          {Math.round(
                            (1 - duration.price / duration.regularPrice) * 100
                          )}
                          %
                        </span>
                      )}
                    </div>
                  </div>
                </Radio>
              ))}
            </RadioGroup>

            <div className="mt-8 flex justify-end">
              <Button
                color="primary"
                onPress={onContinue}
                isDisabled={!selectedDuration}
              >
                Continuer
                <Icon icon="lucide:arrow-right" className="ml-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
