import styles from "./HeaderCart.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import CartContext from "./../../lib/cart-context";

const HeaderCart = () => {
  const ctx = useContext(CartContext);
  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <NavLink to="/cart" activeClassName={styles.active}>
      <div className={styles.div}>
        <span>Cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
      </div>
    </NavLink>
  );
};

export default HeaderCart;
