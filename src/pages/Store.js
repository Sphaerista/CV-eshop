import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getAllItems } from "../lib/api";
import StoreList from "./../components/StoreSection/StoreList";
import LoadingSpinner from "./../UI/LoadingSpinner";

const Store = () => {
  const {
    sendRequest,
    status,
    data: loadedItems,
    error,
  } = useHttp(getAllItems, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <div className="centered focused">{error}</div>;
  }
  if ((status === "completed" && !loadedItems) || loadedItems.length === 0) {
    return <div className="centered focused">No items found!</div>;
  }

  return <StoreList items={loadedItems} />;
};

export default Store;
