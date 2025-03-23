import React from "react";
import { useAccount } from "wagmi";
import { formatEther } from "viem";

export interface Car {
  id: number;
  name: string;
  model: string;
  image: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Normalize addresses for comparison (case-insensitive).
  const isOwner =
    isConnected && address?.toLowerCase() === car.owner.toLowerCase();

  // Determine the correct status UI based on ownership & listing.
  const renderCarStatus = () => {
    if (!car.isListed) {
      return <p className="mt-2 text-red-600 font-semibold">Sold</p>;
    }
    if (isOwner) {
      return (
        <span className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          You Own This Car
        </span>
      );
    }
    return (
      <button
        onClick={() => onBuy(car.id, car.price.toString())}
        className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Buy
      </button>
    );
  };

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
      {renderCarStatus()}
    </div>
  );
};

export default CarCard;
