import { auth, db } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

let firstName = null;

export async function getData() {
  const docRef = doc(db, "users", auth.currentUser.uid);
  return await getDoc(docRef);
}

export async function getfName() {
  if (firstName == null) {
    const packet = await getData();
    const data = packet.data().fName;
    firstName = data;
    return firstName;
  } else {
    return firstName;
  }
}

export async function checkUsernameExists(username) {
  const docRef = doc(db, "usernames", username);
  const data = await getDoc(docRef);
  if (data.data() == undefined) {
    return false;
  } else {
    return true;
  }
}

export async function addUsername(username) {
  await setDoc(doc(db, "usernames", username), {
    uid: auth.currentUser.uid,
  });
}

export async function createUser(firstName, lastName, username) {
  await setDoc(doc(db, "users", auth.currentUser.uid), {
    fName: firstName,
    lName: lastName,
    uid: auth.currentUser.uid,
    username: username,
  });
}
