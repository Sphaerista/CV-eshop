import OrderItem from "./OrderItem";
import styles from "./OrderList.module.css";

const OrderList = (props) => {
  const orders = props.orders;

  return (
    <div>
      <ul className={styles.list}>
        {orders.map((order) => {
          return (
            <>
              <OrderItem
                key={order.id}
                id={order.id}
                orderedItems={order.orderedItems}
                totalAmount={order.totalAmount}
                user={order.user}
                onViewOrder={props.onViewOrder}
                onCancelOrder={props.onCancelOrder}
              />
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderList;
