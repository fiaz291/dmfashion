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

export {
  editData,
  writeData,
  getDataById,
  getAllCollectionArray,
  fetchUserWithPhoneNumber,
  fetchMeasurementsWithPhoneNumber,
};
