import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

export async function getData() {
    const docRef = doc(db, "users", auth.currentUser.uid);
    return await getDoc(docRef);
}

export async function getfName() {
    return (await getData()).data().fName
}