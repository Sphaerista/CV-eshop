import styles from "./CancelOrder.module.css";
import Modal from "./../Modal/Modal";
import useHttp from "./../../hooks/use-http";
import { cancelOrder } from "../../lib/api";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../hooks/auth-context";

const CancelOrder = (props) => {
  const authCtx = useContext(AuthContext);
  const emailPath = authCtx.email.split("@").join("").split(".").join("");
  const [modalSize, setModalSize] = useState(true);
  const [isError, setIsError] = useState(false);
  const { sendRequest } = useHttp(cancelOrder);
  const orderId = props.orderId;

  const HandleCloseModal = () => {
    props.onCloseModal();
  };

  const cancelOrderHandler = () => {
    sendRequest({ orderId: orderId, emailPath: emailPath });
    props.onRefreshOrders();
  };

  useEffect(() => {
    sendRequest();
    return () => sendRequest();
  }, [sendRequest]);

  return (
    <Modal onModalSize={modalSize} onClose={props.onCloseModal}>
      <h4>Sure to cancel {orderId} order?</h4>
      <div className={styles.divided}>
        <div className={styles.cancelbutton}>
          <button onClick={cancelOrderHandler}>Yes</button>
        </div>
        <div className={styles.revertbutton}>
          <button onClick={HandleCloseModal}>No</button>
        </div>
      </div>
      {isError && (
        <div className="centered focused">Error occured. Try later</div>
      )}
    </Modal>
  );
};

export default CancelOrder;
