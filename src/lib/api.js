const FIREBASE_DOMAIN = "https://cv-e-shop-default-rtdb.firebaseio.com";

export async function getAllItems() {
  const response = await fetch(`${FIREBASE_DOMAIN}/items.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch items.");
  }

  const fetchedItems = [];
  for (const key in data) {
    const itemObj = {
      id: key,
      ...data[key],
    };
    fetchedItems.push(itemObj);
  }
  return fetchedItems;
}

export async function getSingleItem(idItem) {
  const response = await fetch(`${FIREBASE_DOMAIN}/items/${idItem}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch items.");
  }
  const loadedItem = {
    id: idItem,
    ...data,
  };
  return loadedItem;
}

export async function getAllOrders(user) {
  const response = await fetch(`${FIREBASE_DOMAIN}/orders/${user}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch orders.");
  }

  const fetchedOrders = [];
  for (const key in data) {
    const itemObj = {
      id: key,
      ...data[key],
    };
    fetchedOrders.push(itemObj);
  }
  return fetchedOrders;
}

export async function makeOrder(orderedData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/orders/${orderedData.emailPath}/.json`,
    {
      method: "POST",
      body: JSON.stringify(orderedData.orderData),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not process order.");
  }
  return null;
}

export async function cancelOrder(canceledData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/orders/${canceledData.emailPath}/${canceledData.orderId}.json`,
    {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not cancel order.");
  }
  return null;
}

export async function getPersonalInfo(userEmail) {
  const response = await fetch(`${FIREBASE_DOMAIN}/users/${userEmail}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not find any info.");
  }

  const fetchedInfo = [];
  for (const key in data) {
    const infoObj = {
      id: key,
      value: data[key],
    };
    fetchedInfo.push(infoObj);
  }
  return fetchedInfo;
}
