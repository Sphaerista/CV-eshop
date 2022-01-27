import styles from "./StoreList.module.css";
import StoreItem from "./StoreItem";
const StoreList = (props) => {
  const items = props.items;
  return (
    <>
      <ul className={styles.list}>
        {items.map((item) => {
          return (
            <StoreItem
              key={item.id}
              id={item.id}
              name={item.name}
              origin={item.origin}
              description={item.description}
              price={item.price}
            />
          );
        })}
      </ul>
    </>
  );
};

export default StoreList;
