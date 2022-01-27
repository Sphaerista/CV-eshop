import styles from "./SelectedItem.module.css";
import { useParams, Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getSingleItem } from "../../lib/api";
import { useEffect, useContext } from "react";
import LoadingSpinner from "./../../UI/LoadingSpinner";
import StoreItemForm from "./StoreItemForm";
import CartContext from "./../../lib/cart-context";
import AuthContext from "../../hooks/auth-context";

const SelectedItem = () => {
  const ctx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const params = useParams();
  const { idItem } = params;
  const {
    sendRequest,
    status,
    error,
    data: loadedItem,
  } = useHttp(getSingleItem, true);

  useEffect(() => {
    sendRequest(idItem);
  }, [sendRequest, idItem]);

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

  if (!loadedItem.name) {
    return <div className="centered focused">No item found!</div>;
  }

  const addToCartHandler = (amount) => {
    ctx.addItem({
      id: loadedItem.id,
      name: loadedItem.name,
      amount: amount,
      price: loadedItem.price,
    });
  };
  return (
    <div className={styles.overall}>
      <div className={styles.selectedItemDiv}>
        <h1>Selected item ID: '{loadedItem.id}'</h1>
        <div className={styles.onePiece}>Item: {loadedItem.name}</div>
        <div className={styles.onePiece}>Produced in: {loadedItem.origin}</div>
        <div className={styles.onePiece}>
          Description: {loadedItem.description}
        </div>
        <div className={styles.onePiece}>Price in USD: ${loadedItem.price}</div>
        <div className={styles.onePiece}>
          Price in Euros: {loadedItem.price * 0.89} EUR
        </div>
        <div className={styles.linkPiece}>
          <Link to="/store">Back to store</Link>
        </div>
      </div>
      <div className={styles["for-button"]}>
        {isLoggedIn && (
          <StoreItemForm id={loadedItem.id} onAddToCart={addToCartHandler} />
        )}
        {!isLoggedIn && <p>Login to add item to cart</p>}
      </div>
    </div>
  );
};

export default SelectedItem;
