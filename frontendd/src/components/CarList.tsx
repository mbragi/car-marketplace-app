import React from "react";
import CarCard, {Car} from "./CarCard";

interface CarListProps {
  cars: Car[];
  onBuy: (id: number, price: string) => void;
  isLoading?: boolean;
}

const CarList: React.FC<CarListProps> = ({ cars, onBuy, isLoading }) => {
  if (isLoading) return <p>Processing transaction...</p>;
  if (!cars || cars.length === 0) return <p>No cars listed yet.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} onBuy={onBuy} />
      ))}
    </div>
  );
};

export default CarList;
