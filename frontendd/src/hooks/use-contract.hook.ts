import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import CarMarketplaceABI from "../abi/CarMarketplace.json" assert { type: "json" };
import toast from "react-hot-toast";

const contractAddress =
  import.meta.env.VITE_CONTRACT_ADDRESS ||
  "0x5E714eDdF7BEf198771bDb82B5aBeEF3c280De4d";

export function useCarMarketplaceData() {
  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: CarMarketplaceABI.abi,
    functionName: "getAllCars",
  });
  console.log("useCarMarketplaceData fetched:", data);
  return { cars: data, refetch };
}

export function useListCar(
  name: string,
  model: string,
  price: string,
  image: string
) {
  const { isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const { refetch } = useCarMarketplaceData();
  const listCar = () => {
    if (!isConnected) {
      console.error("Wallet not connected");
      toast.error("Please connect your wallet first.");
      return;
    }
    console.log("Listing car with parameters:", { name, model, price, image });
    writeContract(
      {
        address: contractAddress,
        abi: CarMarketplaceABI.abi,
        functionName: "listCar",
        args: [name, model, parseEther(price), image],
      },
      {
        onSuccess: () => {
          console.log("Car listed successfully");
          toast.success("Car listed successfully!");
          refetch();
        },
        onError: (error) => {
          console.error("Error listing car:", error);
          toast.error("Transaction failed. Please try again.");
        },
      }
    );
  };

  return {
    listCar,
    isListing: isPending,
  };
}

export function useBuyCar(carId: number, price: string) {
  const { isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  const buyCar = () => {
    if (!isConnected) {
      console.error("Wallet not connected");
      toast.error("Please connect your wallet first.");
      return;
    }
    console.log("Buying car with parameters:", { carId, price });
    writeContract(
      {
        address: contractAddress,
        abi: CarMarketplaceABI.abi,
        functionName: "buyCar",
        args: [carId],
        value: parseEther(price),
      },
      {
        onSuccess: () => {
          console.log("Car purchased successfully");
          toast.success("Car purchased successfully!");
        },
        onError: (error) => {
          console.error("Error purchasing car:", error);
          toast.error("Transaction failed. Please try again.");
        },
      }
    );
  };

  return {
    buyCar,
    isBuying: isPending,
  };
}
