import styles from "./StoreItemForm.module.css";
const StoreItemForm = (props) => {
  const HandlerSubmitItem = (e) => {
    e.preventDefault();
    props.onAddToCart(1);
  };
  return (
    <form className={styles.form} onSubmit={HandlerSubmitItem}>
      <button type="submit">Add to Cart</button>
    </form>
  );
};

export default StoreItemForm;
