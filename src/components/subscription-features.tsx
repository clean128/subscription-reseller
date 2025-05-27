import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Subscription } from "../App";

interface SubscriptionFeaturesProps {
  subscription: Subscription;
}

export const SubscriptionFeatures: React.FC<SubscriptionFeaturesProps> = ({ subscription }) => {
  return (
    <Card className="border border-default-200">
      <CardHeader className="flex gap-3">
        <div className="h-8 w-8">
          <Icon icon={subscription.logo} className="h-8 w-8" />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium">{subscription.name}</p>
          <p className="text-small text-default-500">{subscription.description}</p>
        </div>
      </CardHeader>
      <CardBody>
        <h3 className="font-medium mb-3">Fonctionnalités incluses:</h3>
        <ul className="space-y-2">
          {subscription.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Icon icon="lucide:check" className="text-success mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 p-4 bg-primary-50 rounded-medium border border-primary-100">
          <div className="flex items-center">
            <Icon icon="lucide:info" className="text-primary mr-2" />
            <h4 className="font-medium text-primary">Pourquoi nous choisir?</h4>
          </div>
          <p className="mt-2 text-sm">
            En tant que revendeur officiel, nous proposons les mêmes abonnements à des prix avantageux. 
            Vous bénéficiez des mêmes fonctionnalités et du même support qu'en achetant directement auprès de l'éditeur.
          </p>
        </div>
      </CardBody>
    </Card>
  );
};