import React from "react";
import { Button, Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Subscription } from "../App";

interface PaymentSectionProps {
  subscription: Subscription;
  durationDetails: {
    id: string;
    name: string;
    price: number;
    regularPrice?: number;
  };
  userInfo: {
    name: string;
    email: string;
  };
  onBack: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  subscription,
  durationDetails,
  userInfo,
  onBack
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  
  // This would be replaced with actual Stripe integration
  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Show success message or redirect
      alert("Paiement réussi! Vous recevrez un email avec les détails de votre abonnement.");
    }, 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Finaliser votre commande</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Détails de paiement</h3>
            
            {/* Stripe Payment Form Placeholder */}
            <div className="border border-default-200 rounded-medium p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Carte de crédit</h4>
                <div className="flex gap-2">
                  <Icon icon="logos:visa" className="h-6" />
                  <Icon icon="logos:mastercard" className="h-6" />
                  <Icon icon="logos:amex" className="h-6" />
                </div>
              </div>
              
              {/* This would be replaced with the actual Stripe Elements */}
              <div className="space-y-4">
                <div className="border border-default-300 rounded p-3 bg-default-50">
                  <label className="text-xs text-default-500 block mb-1">Numéro de carte</label>
                  <div className="flex items-center">
                    <span className="text-default-400">•••• •••• •••• ••••</span>
                    <Icon icon="lucide:credit-card" className="ml-auto text-default-400" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-default-300 rounded p-3 bg-default-50">
                    <label className="text-xs text-default-500 block mb-1">Date d'expiration</label>
                    <span className="text-default-400">MM / AA</span>
                  </div>
                  <div className="border border-default-300 rounded p-3 bg-default-50">
                    <label className="text-xs text-default-500 block mb-1">CVC</label>
                    <span className="text-default-400">•••</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-default-500 flex items-center">
                <Icon icon="lucide:lock" className="mr-1" />
                <span>Vos informations de paiement sont sécurisées et chiffrées</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <h3 className="font-medium mb-3">Récapitulatif de commande</h3>
              
              <div className="flex items-center mb-4">
                <Icon icon={subscription.logo} className="h-6 w-6 mr-2" />
                <div>
                  <p className="font-medium">{subscription.name}</p>
                  <p className="text-sm text-default-500">{durationDetails.name}</p>
                </div>
              </div>
              
              <Divider className="my-3" />
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span>{durationDetails.price.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>TVA (20%)</span>
                  <span>{(durationDetails.price * 0.2).toFixed(2)} €</span>
                </div>
              </div>
              
              <Divider className="my-3" />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{(durationDetails.price * 1.2).toFixed(2)} €</span>
              </div>
              
              <div className="mt-4 text-xs text-default-500">
                <p>Informations client:</p>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </CardBody>
          </Card>
        </div>
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
          onPress={handlePayment}
          isLoading={isProcessing}
        >
          {isProcessing ? "Traitement en cours..." : "Payer maintenant"}
          {!isProcessing && <Icon icon="lucide:lock" className="ml-1" />}
        </Button>
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-default-500">
        <div className="flex items-center">
          <Icon icon="lucide:shield-check" className="mr-1 text-success" />
          <span>Paiement sécurisé</span>
        </div>
        <div className="flex items-center">
          <Icon icon="lucide:refresh-cw" className="mr-1" />
          <span>Garantie satisfait ou remboursé 30 jours</span>
        </div>
        <div className="flex items-center">
          <Icon icon="lucide:headphones" className="mr-1" />
          <span>Support client 24/7</span>
        </div>
      </div>
    </div>
  );
};