import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
export default CartContext;

// const DUMMY_STORE = [
//   {
//     id: "m1",
//     name: "Potato",
//     origin: "Poland",
//     description: "This potato blah blah blah",
//     price: 5,
//   },
//   {
//     id: "m2",
//     name: "Chicken",
//     origin: "Netherlands",
//     description: "Chicken like kho-kho-kho",
//     price: 10,
//   },
//   {
//     id: "m3",
//     name: "Chocolate",
//     origin: "Belgium",
//     description: "Do not think about diabetes. This is just an illusion.",
//     price: 15,
//   },
//   {
//     id: "m4",
//     name: "Wheel",
//     origin: "Belarus",
//     description: "Rubbery, black and enormous...",
//     price: 45,
//   },
// ];

//   const selectOrder = async () => {
//     try {
//       const response = await fetch(
//         `https://portfolio-1-e0333-default-rtdb.firebaseio.com/orders/${orderId}.json`,
//         {
//           method: "DELETE",
//           body: JSON.stringify(),
//           headers: {
//             "Content-type": "application/json",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("sth wrong");
//       }
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

/* {editHandler && (
        <UpdateInfoForm
          onUpdatedInputHandler={updatedInputHandler}
          setEditHandler={setEditHandler}
        />
      )} */
