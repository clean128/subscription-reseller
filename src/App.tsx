import React from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import { SubscriptionSelector } from "./components/subscription-selector";
import { UserInfoForm } from "./components/user-info-form";
import { PaymentSection } from "./components/payment-section";
import { SubscriptionFeatures } from "./components/subscription-features";
import { Header } from "./components/header";
import { motion, AnimatePresence } from "framer-motion";

export type Subscription = {
  id: string;
  name: string;
  logo: string;
  description: string;
  features: string[];
  durations: {
    id: string;
    name: string;
    price: number;
    regularPrice?: number;
  }[];
};

const App: React.FC = () => {
  const [step, setStep] = React.useState<number>(1);
  const [selectedSubscription, setSelectedSubscription] =
    React.useState<Subscription | null>(null);
  const [selectedDuration, setSelectedDuration] = React.useState<string | null>(
    null
  );
  const [userInfo, setUserInfo] = React.useState({ name: "", email: "" });

  const handleSubscriptionSelect = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    if (subscription.durations.length === 1) {
      setSelectedDuration(subscription.durations[0].id);
    }
  };

  const handleDurationSelect = (durationId: string) => {
    setSelectedDuration(durationId);
  };

  const handleUserInfoSubmit = (name: string, email: string) => {
    setUserInfo({ name, email });
    setStep(3);
  };

  const handleContinueToPayment = () => {
    if (selectedSubscription && selectedDuration) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const selectedDurationDetails = React.useMemo(() => {
    if (!selectedSubscription || !selectedDuration) return null;
    return selectedSubscription.durations.find(
      (d) => d.id === selectedDuration
    );
  }, [selectedSubscription, selectedDuration]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-3xl mx-auto">
          <Card className="border border-default-200 mb-6">
            <CardBody className="p-4 sm:p-6">
              {/* Step indicator */}
              <div className="flex justify-between mb-8 overflow-x-auto pb-2 sm:pb-0">
                <div className="flex items-center whitespace-nowrap">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === 1
                        ? "bg-primary text-white"
                        : "bg-primary-100 text-primary-600"
                    }`}
                  >
                    1
                  </div>
                  <span className="ml-2 text-xs sm:text-sm font-medium">
                    Choisir l'abonnement
                  </span>
                </div>
                <div className="flex-grow mx-2 sm:mx-4 flex items-center">
                  <div className="h-0.5 w-full bg-default-200"></div>
                </div>
                <div className="flex items-center whitespace-nowrap">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === 2
                        ? "bg-primary text-white"
                        : "bg-primary-100 text-primary-600"
                    }`}
                  >
                    2
                  </div>
                  <span className="ml-2 text-xs sm:text-sm font-medium">
                    Vos informations
                  </span>
                </div>
                <div className="flex-grow mx-2 sm:mx-4 flex items-center">
                  <div className="h-0.5 w-full bg-default-200"></div>
                </div>
                <div className="flex items-center whitespace-nowrap">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === 3
                        ? "bg-primary text-white"
                        : "bg-primary-100 text-primary-600"
                    }`}
                  >
                    3
                  </div>
                  <span className="ml-2 text-xs sm:text-sm font-medium">
                    Paiement
                  </span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <SubscriptionSelector
                      onSubscriptionSelect={handleSubscriptionSelect}
                      onDurationSelect={handleDurationSelect}
                      selectedSubscription={selectedSubscription}
                      selectedDuration={selectedDuration}
                      onContinue={handleContinueToPayment}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <UserInfoForm
                      onSubmit={handleUserInfoSubmit}
                      onBack={handleBack}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <PaymentSection
                      subscription={selectedSubscription!}
                      durationDetails={selectedDurationDetails!}
                      userInfo={userInfo}
                      onBack={handleBack}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardBody>
          </Card>

          {/* Move subscription features outside the card and only show when a subscription is selected */}
          {step === 1 && selectedSubscription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <SubscriptionFeatures subscription={selectedSubscription} />
            </motion.div>
          )}
        </div>
      </main>

      <footer className="py-6 bg-content1 border-t border-default-200">
        <div className="container mx-auto px-4 text-center text-sm text-default-500">
          <p>© 2025 Subscription Reseller. Tous droits réservés.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="#" className="hover:text-primary">
              Conditions d'utilisation
            </a>
            <a href="#" className="hover:text-primary">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-primary">
              Contactez-nous
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
