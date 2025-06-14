import React from "react";
import { Icon } from "@iconify/react";

export const Header: React.FC = () => {
  return (
    <header className="bg-content1 border-b border-default-200">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center">
          <img alt="logo" src="/favicon.png" className="size-10 mr-3" />
          <span className="font-semibold text-lg">Subscription Reseller</span>
        </div>
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <div className="flex items-center text-sm">
            <Icon
              icon="lucide:shield-check"
              className="text-success text-xl mr-1"
            />
            <span>Paiement sécurisé</span>
          </div>
          <div className="flex items-center text-sm">
            <Icon
              icon="lucide:headphones"
              className="text-primary text-xl mr-1"
            />
            <span>Support 24/7</span>
          </div>
        </div>
      </div>
    </header>
  );
};
