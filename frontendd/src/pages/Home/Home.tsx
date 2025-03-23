import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useCarMarketplaceData,
  useListCar,
  useBuyCar,
} from "../../hooks/use-contract.hook";
import CarList from "../../components/CarList";
import ListCarForm from "../../components/ListCarForm";

interface ListParams {
  name: string;
  model: string;
  price: string;
  image: string;
}

interface BuyParams {
  id: number;
  price: string;
}

const Home: React.FC = () => {
  const { cars, refetch } = useCarMarketplaceData();
  const [carList, setCarList] = useState<any[]>([]);
  const [listParams, setListParams] = useState<ListParams | null>(null);
  const [buyParams, setBuyParams] = useState<BuyParams | null>(null);
  const [searchParams] = useSearchParams();
  const activeView = searchParams.get("view") || "marketplace";

  useEffect(() => {
    if (cars) {
      setCarList(cars);
    }
  }, [cars]);

  const { listCar, isListing } = useListCar(
    listParams ? listParams.name : "",
    listParams ? listParams.model : "",
    listParams ? listParams.price : "0",
    listParams ? listParams.image : ""
  );

  const { buyCar, isBuying } = useBuyCar(
    buyParams ? buyParams.id : 0,
    buyParams ? buyParams.price : "0"
  );

  // Trigger listing
  useEffect(() => {
    if (listParams) {
      listCar();
      refetch();
      setListParams(null);
    }
  }, [listParams, listCar, refetch]);

  // Trigger buying
  useEffect(() => {
    if (buyParams) {
      buyCar();
      refetch();
      setBuyParams(null);
    }
  }, [buyParams, buyCar, refetch]);

  const handleListCar = (name: string, model: string, price: string, image: string) => {
    setListParams({ name, model, price, image });
  };

  const handleBuyCar = (id: number, price: string) => {
    setBuyParams({ id, price });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeView === "list" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Sell Your Car</h2>
            <ListCarForm onListCar={handleListCar} isLoading={isListing} />
          </div>
        )}

        {activeView === "marketplace" && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Available Cars</h2>
            <CarList cars={carList} onBuy={handleBuyCar} isLoading={isBuying} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;