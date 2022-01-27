import { getAllOrders } from "../lib/api";
import useHttp from "./../hooks/use-http";
import LoadingSpinner from "./../UI/LoadingSpinner";
import { useContext, useEffect, useState } from "react";
import OrderList from "./../components/OrdersSection/OrderList";
import ViewOrder from "./../components/OrdersSection/ViewOrder";
import CancelOrder from "./../components/OrdersSection/CancelOrder";
import AuthContext from "../hooks/auth-context";

const MyOrders = () => {
  const authCtx = useContext(AuthContext);
  const emailPath = authCtx.email.split("@").join("").split(".").join("");
  const [showOrderInfo, setShowOrderInfo] = useState(false);
  const [orderedDataToModal, setOrderedDataToModal] = useState([]);
  const [showCancelOrder, setShowCancelOrder] = useState(false);
  const [orderedDataId, setOrderedDataId] = useState([]);
  const [refreshOrderList, setRefreshOrderList] = useState(false);
  const viewOrderHandler = (data) => {
    setOrderedDataToModal(data);
    setShowOrderInfo(true);
  };
  const closeOrderHandler = () => {
    setShowOrderInfo(false);
    setShowCancelOrder(false);
  };

  const cancelOrderHandler = (data) => {
    setOrderedDataId(data);
    setShowCancelOrder(true);
    setRefreshOrderList(false);
  };

  const refreshOrderHandler = () => {
    setShowCancelOrder(false);
    setRefreshOrderList(true);
  };
  const {
    sendRequest,
    status,
    data: loadedOrders,
    error,
  } = useHttp(getAllOrders, true);

  useEffect(() => {
    sendRequest(emailPath);
    if (refreshOrderList) {
      sendRequest(emailPath);
    }
    return () => sendRequest();
  }, [sendRequest, refreshOrderList]);

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

  if ((status === "completed" && !loadedOrders) || loadedOrders.length === 0) {
    return <div className="centered focused">No orders found!</div>;
  }

  const canShowModal = showOrderInfo && orderedDataToModal.id;
  const canCancelOrder = showCancelOrder && orderedDataId.length > 0;

  return (
    <>
      <OrderList
        orders={loadedOrders}
        onViewOrder={viewOrderHandler}
        onCancelOrder={cancelOrderHandler}
      />
      {canShowModal && (
        <ViewOrder
          orderData={orderedDataToModal}
          onCloseModal={closeOrderHandler}
        />
      )}
      {canCancelOrder && (
        <CancelOrder
          orderId={orderedDataId}
          onCloseModal={closeOrderHandler}
          onRefreshOrders={refreshOrderHandler}
        />
      )}
    </>
  );
};

export default MyOrders;
