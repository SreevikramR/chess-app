import { auth, db } from "../firebase";
import { getDoc, doc, setDoc, collection, getDocs } from "firebase/firestore";

let firstName = null;
let openingData = [];
let openingLines;

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

export async function readOpening(openingName){
  openingData = []
  //console.log(openingData)

  const docRef = doc(db, "openings", openingName);
  const packet = await getDoc(docRef);
  openingData = packet.data()

  openingLines = Object.keys(openingData)
}

export async function getLines(){
  const lines = openingLines
  console.log(lines)
  return lines;
}

export async function setFirstLine(){
  return openingLines[0]
}

export function getMoveSequence(openingLine){
  const line = openingData[openingLine]
  return line
}

export async function getAlternateLine(currentLine) {
  if(openingData == undefined){
    await readOpening("Ruy Lopez")
  }
  let foundLine = false;
    while (foundLine === false) {
      //console.log("finding")
      let index = Math.round(randomNumber(openingLines.length - 1));
      if (openingLines[index] != currentLine) {
        return openingLines[index];
      }
    }
}

function randomNumber(max) {
  return Math.random() * max;
}