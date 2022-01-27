import { NavLink } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import styles from "./StoreItem.module.css";
import StoreItemForm from "./StoreItemForm";
import CartContext from "./../../lib/cart-context";
import AuthContext from "../../hooks/auth-context";

const StoreItem = (props) => {
  const ctx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const addToCartHandler = (amount) => {
    ctx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <div className={styles.divided}>
      <div className={styles.item}>
        <h3>{props.name}</h3>
        <div>{props.description}</div>
        <div>$ {props.price}</div>
        <div className={styles.goto}>
          <NavLink to={`/items/${props.id}`}>Full description</NavLink>
        </div>
      </div>
      <div className={styles.addbutton}>
        {isLoggedIn && (
          <StoreItemForm id={props.id} onAddToCart={addToCartHandler} />
        )}
        {!isLoggedIn && <p>Login to add item to cart</p>}
      </div>
    </div>
  );
};

export default StoreItem;
