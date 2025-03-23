import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6">
        Welcome to Habibi Motors
      </h1>
      <p className="text-2xl md:text-3xl text-gray-300 mb-10">
        Experience premium car listings on the blockchain.
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <ConnectButton
          showBalance={false}
          accountStatus="avatar"
          chainStatus="full"
        />
        <Link
          to="/marketplace?view=marketplace"
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-8 rounded-full font-semibold transition-colors shadow-lg"
        >
          Explore Inventory
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
