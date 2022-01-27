import styles from "./ViewOrder.module.css";
import Modal from "./../Modal/Modal";

const ViewOrder = (props) => {
  const orderData = props.orderData;
  const HandleCloseModal = () => {
    props.onCloseModal();
  };
  return (
    <Modal onClose={HandleCloseModal}>
      <div className={styles.divided}>
        <h4>Order ID: {orderData.id}</h4>
        <div className={styles["user-info"]}>
          <div>Personal Info</div>
          <div>First Name: {orderData.user.Forename}</div>
          <div>Last Name: {orderData.user.Surename}</div>
          <div>City: {orderData.user.City}</div>
          <div>Postal: {orderData.user.Postal}</div>
          <div>Street: {orderData.user.Street}</div>
        </div>
        <div className={styles["orders-info"]}>
          <div>Order Info</div>
          <div className={styles["order-info"]}>
            {orderData.orderedItems.map((item) => {
              return (
                <div className={styles["one-order-info"]}>
                  <div>ID: {item.id}</div>
                  <div>Name: {item.name}</div>
                  <div>Amount: {item.amount}</div>
                  <div>Price: {item.price}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles["amount-info"]}>
          Total Amount of order: $ {orderData.totalAmount}
        </div>
        <div className={styles.viewbutton}>
          <button onClick={HandleCloseModal}>Back</button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewOrder;
