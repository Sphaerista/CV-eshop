import styles from "./OrderItem.module.css";

const OrderItem = (props) => {
  const takeOrderDataForModalHandler = () => {
    const orderedData = props;
    props.onViewOrder(orderedData);
  };
  const canelOrderHandler = () => {
    const orderedId = props.id;
    props.onCancelOrder(orderedId);
  };
  return (
    <div className={styles.divided}>
      <div className={styles.item}>
        <h4>Order ID: {props.id}</h4>
        <div>Name: {props.user.Forename}</div>
        <div>Total Amount: $ {props.totalAmount}</div>
      </div>
      <div className={styles.viewbutton}>
        <button onClick={takeOrderDataForModalHandler}>View</button>
      </div>
      <div className={styles.cancelbutton}>
        <button onClick={canelOrderHandler}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderItem;
