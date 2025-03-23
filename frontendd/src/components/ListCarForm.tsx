import React, { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-hot-toast";

interface ListCarFormProps {
  onListCar: (
    name: string,
    model: string,
    price: string,
    imageUrl: string
  ) => void;
  isLoading?: boolean;
}

const ListCarForm: React.FC<ListCarFormProps> = ({ onListCar, isLoading }) => {
  const { isConnected } = useAccount();
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure wallet is connected before proceeding
    if (!isConnected) {
      toast.error("Please connect your wallet before listing a car.");
      return;
    }

    if (!imageUrl) {
      toast.error("Please enter an image URL.");
      return;
    }

    onListCar(name, model, price, imageUrl);
    setName("");
    setModel("");
    setPrice("");
    setImageUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 min-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Sell Your Car
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="carName"
            className="block text-gray-700 font-medium mb-1"
          >
            Car Name
          </label>
          <input
            id="carName"
            type="text"
            placeholder="Enter car name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="model"
            className="block text-gray-700 font-medium mb-1"
          >
            Model
          </label>
          <input
            id="model"
            type="text"
            placeholder="Enter car model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-1"
          >
            Price in ETH
          </label>
          <input
            id="price"
            type="number"
            placeholder="Enter price in ETH"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 font-medium mb-1"
          >
            Image URL
          </label>
          <input
            id="imageUrl"
            type="url"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        {isLoading ? "Listing..." : "List Car"}
      </button>
    </form>
  );
};

export default ListCarForm;
