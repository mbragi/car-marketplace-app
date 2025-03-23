import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 shadow py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-3xl font-extrabold text-gray-800">
              Habibi Motors
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link
                to="/marketplace"
                className="text-lg text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Inventory
              </Link>
              <Link
                to="/marketplace?view=list"
                className="text-lg text-gray-700 hover:text-yellow-600 transition-colors"
              >
                List Your Car
              </Link>
            </div>
          </div>
          {/* Desktop Connect Button */}
          <div className="hidden md:block">
            <ConnectButton />
          </div>
          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link
                to="/marketplace"
                className="text-lg text-gray-700 hover:text-yellow-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Inventory
              </Link>
              <Link
                to="/marketplace?view=list"
                className="text-lg text-gray-700 hover:text-yellow-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                List Your Car
              </Link>
              <ConnectButton
                showBalance={false}
                accountStatus="avatar"
                chainStatus="full"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
