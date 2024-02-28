import firestore from "@/firebase";

const firestoreAutoId = () => {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

async function checkExistingId(collection, id) {
  const res = await firestore.collection(collection).doc(id).get();
  return !res.data();
}

async function getDataById(collection, id) {
  try {
    const res = await firestore.collection(collection).doc(id).get();
    return res.data();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getAllCollectionArray(collection) {
  const res = await firestore.collection(collection).get();
  let data;
  if (res) {
    data = res.docs.map((item) => {
      return item.data();
    });
  }
  return data;
}

async function writeData(collection, data) {
  const id = firestoreAutoId();
  const isIdAvailable = await checkExistingId(collection, id);
  if (isIdAvailable) {
    const dataWithID = { ...data, id };
    try {
      await firestore.collection(collection).doc(id).set(dataWithID);
    } catch (err) {
      return { error: err };
    }
  } else {
    writeData(collection, data);
  }
}

async function editData(collection, data, id) {
  const dataWithID = { ...data, id };
  try {
    const docRef = await firestore.collection(collection).doc(id);
    if (docRef) {
      await docRef.update(dataWithID);
    }
  } catch (err) {
    return { error: err };
  }
}

const fetchUserWithPhoneNumber = async (phoneNumber) => {
  try {
    const querySnapshot = await firestore
      .collection("Users")
      .where("contacts", "array-contains", {
        phoneNumber: phoneNumber,
      })
      .get();
    const userData = querySnapshot.docs[0].data();
    if (userData.name) {
      return userData.name;
    } else {
      return null; // Returning the array of books
    }
  } catch (err) {
    return null; // Handling errors
  }
};

const fetchMeasurementsWithPhoneNumber = async (phoneNumber) => {
  try {
    const querySnapshot = await firestore
      .collection("Measurements")
      .where("phoneNumber", "==", phoneNumber)
      .get();
    const booksArray = []; // Initialize an empty array to store books
    querySnapshot.forEach((doc) => {
      const bookData = doc.data();
      booksArray.push(bookData); // Push each book data to the array
    });

    return booksArray[0]; // Returning the array of books
  } catch (err) {
    console.error("Error:", err); // Handling errors
  }
};

const fetchUserObjectWithPhoneNumber = async (phoneNumber) => {
  try {
    const querySnapshot = await firestore
      .collection("Users")
      .where("contacts", "array-contains", {
        phoneNumber: phoneNumber,
      })
      .get();
    const booksArray = []; // Initialize an empty array to store books
    querySnapshot.forEach((doc) => {
      const bookData = doc.data();
      booksArray.push(bookData); // Push each book data to the array
    });

    return booksArray[0]; // Returning the array of books
  } catch (err) {
    console.error("Error:", err); // Handling errors
  }
};

function IncrementGroupId(input) {
  // Extract the numeric part using regular expression
  const match = input.match(/(\D*)(\d+)/);
  if (!match) return input; // If no numeric part found, return input as is

  const prefix = match[1]; // Get the non-numeric prefix
  let number = parseInt(match[2]); // Get the numeric part and parse it as integer
  number++; // Increment the number

  // Concatenate the prefix and the incremented number
  return prefix + number;
}

function IncrementOrderId(input) {
  // Extract the last numeric part using regular expression
  const match = input.match(/(\D*)(\d+)$/);
  if (!match) return input; // If no numeric part found, return input as is

  const prefix = match[1]; // Get the non-numeric prefix
  let number = parseInt(match[2]); // Get the numeric part and parse it as integer
  number++; // Increment the number

  // Concatenate the prefix and the incremented number
  return prefix + number;
}

async function addNewOrder(collection, data) {
  console.log({ data });
  const id = data.id;
  try {
    await firestore.collection(collection).doc(id).set(data);
  } catch (err) {
    return { error: err };
  }
}

async function addNewOrderArray(array) {
  try {
    const promises = [];
    array.forEach((arr) => {
      console.log({ arr });
      promises.push(addNewOrder("Orders", arr));
    });
    console.log({ promises });
    const res = Promise.all(promises);
    return res;
  } catch (err) {
    return err;
  }
}

async function addOrdersInUser() {}

async function placeOrder(ordersArray, user, shopName, orderGroupId) {
  try {
    await addNewOrderArray(ordersArray);

    const groupIdRef = await firestore.collection("OrderCounts").doc(shopName);
    if (groupIdRef) {
      await groupIdRef.update({ currentOrder: orderGroupId });
    }
    const userDocRef = await firestore.collection("Users").doc(user.id);
    if (userDocRef) {
      await userDocRef.update({ orders: user.orders });
    }
  } catch (err) {
    return { error: err };
  }
}

export {
  editData,
  writeData,
  getDataById,
  getAllCollectionArray,
  fetchUserWithPhoneNumber,
  fetchMeasurementsWithPhoneNumber,
  fetchUserObjectWithPhoneNumber,
  IncrementGroupId,
  IncrementOrderId,
  placeOrder,
};
