import styles from "./CartSection.module.css";
const CartSection = (props) => {
  const summ = +props.price * +props.amount;
  const cartItems = (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>${props.price}</span>
          <span className={styles.amount}> x {props.amount} =</span>
          <span className={styles.summ}> ${summ}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
  return <>{cartItems}</>;
};

export default CartSection;
