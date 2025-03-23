import React from "react";
import { useAccount } from "wagmi";
import { formatEther } from "viem";

export interface Car {
  id: number;
  name: string;
  model: string;
  image: string;
  price: any; // BigNumber
  owner: string;
  isListed: boolean;
}

interface CarCardProps {
  car: Car;
  onBuy: (id: number, price: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onBuy }) => {
  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image";
  const { address, isConnected } = useAccount();

  // Normalize addresses for comparison (in case of differing case)
  const isOwner =
    isConnected && address?.toLowerCase() === car.owner.toLowerCase();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <img
        src={car.image || fallbackImage}
        alt={car.name}
        className="w-full h-48 object-cover rounded"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImage;
        }}
      />
      <h3 className="mt-4 text-xl font-bold">
        {car.name} - {car.model}
      </h3>
      <p className="text-gray-600">Price: {formatEther(car.price)} ETH</p>
      <p className="text-gray-500 text-sm">Owner: {car.owner}</p>

      {/* Show different UI depending on ownership and listing status */}
      {car.isListed ? (
        isOwner ? (
          <span className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            You Own This Car
          </span>
        ) : (
          <button
            onClick={() => onBuy(car.id, car.price.toString())}
            className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Buy
          </button>
        )
      ) : (
        <p className="mt-2 text-red-600 font-semibold">Sold</p>
      )}
    </div>
  );
};

export default CarCard;
