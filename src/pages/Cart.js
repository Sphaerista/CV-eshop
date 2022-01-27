import { useContext } from "react/cjs/react.development";
import CartSection from "./../components/CartSection/CartSection";
import CartContext from "./../lib/cart-context";
import styles from "./Cart.module.css";
import FormOrder from "./../components/CartSection/FormOrder";
import { useEffect, useState } from "react";
import useHttp from "./../hooks/use-http";
import { makeOrder } from "../lib/api";
import LoadingSpinner from "./../UI/LoadingSpinner";
import { useHistory } from "react-router-dom";
import AuthContext from "../hooks/auth-context";

const Cart = () => {
  const [isError, setIsError] = useState(false);
  const { sendRequest, status, error } = useHttp(makeOrder);
  const history = useHistory();
  const [orderedConfirmed, setOrderedConfirmed] = useState(false);
  const [orderMade, setOrderMade] = useState(false);
  const ctx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const emailPath = authCtx.email.split("@").join("").split(".").join("");
  const isLoggedIn = authCtx.isLoggedIn;
  useEffect(() => {
    if (error) {
      return setIsError(true);
    }
    if (status === "completed") {
      setOrderedConfirmed(false);
      setOrderMade(true);
      ctx.clearCart();
    }
  }, [status, history, ctx, error]);

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const HandleConfirmOrder = () => {
    setOrderedConfirmed(true);
  };
  const HandleBackToOrder = () => {
    setOrderedConfirmed(false);
  };

  const handleMakeOrder = (userData) => {
    const orderData = {
      user: userData,
      orderedItems: ctx.items,
      totalAmount: ctx.totalAmount,
    };
    sendRequest({ orderData: orderData, emailPath: emailPath });
  };
  const HandleOk = () => {
    history.replace("/home");
  };

  return (
    <div className={(styles.overall, "outside")}>
      {!orderedConfirmed && (
        <ul className={styles["cart-items"]}>
          {ctx.items.map((item) => (
            <CartSection
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onAdd={cartItemAddHandler.bind(null, item)}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
          ))}
        </ul>
      )}
      <div>
        {orderMade && (
          <>
            <p className={styles["empty-cart"]}>Order made!</p>
            <div className={styles["div-ok-button"]}>
              <button className={styles["confirm-button"]} onClick={HandleOk}>
                OK
              </button>
            </div>
          </>
        )}
        {ctx.items.length === 0 ? (
          <span className={styles["empty-cart"]}>Your Cart is empty.</span>
        ) : (
          <>
            {!orderedConfirmed && (
              <>
                <span className={styles.total}>
                  Total price: ${ctx.totalAmount}
                </span>
                <div className={styles["div-confirm-button"]}>
                  {isLoggedIn && (
                    <button
                      className={styles["confirm-button"]}
                      onClick={HandleConfirmOrder}
                    >
                      Confirm order
                    </button>
                  )}
                  {!isLoggedIn && <p>Login to confirm order</p>}
                </div>
              </>
            )}
            {status === "pending" && (
              <div className={styles["empty-cart"]}>
                <LoadingSpinner />
              </div>
            )}
            {isError && (
              <div className="centered focused">Error occured. Try later</div>
            )}
            {orderedConfirmed && (
              <>
                <FormOrder
                  onBackToOrder={HandleBackToOrder}
                  onDataOrder={handleMakeOrder}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
