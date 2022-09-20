import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import config from "../config.json";

const app = initializeApp(config.fbConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const organizeError = (error) => error.split("/")[1].split("-").join(" ");

export async function register(user) {
  let result = false;
  await createUserWithEmailAndPassword(auth, user.username, user.password)
    .then(async (cred) => {
      await set(ref(db, "users/" + cred.user.uid), {
        username: user.username,
        name: user.name,
      });
      toast.success("User Added");
      login({ username: user.username, password: user.password });
      result = true;
    })
    .catch((err) => {
      toast.error(`Error: ${organizeError(err.code)}`);
      result = false;
    });
  return result;
}

export async function login(user) {
  let result = false;
  await signInWithEmailAndPassword(auth, user.username, user.password)
    .then((cred) => {
      toast.success("Logged in as " + cred.user.email);
      result = true;
    })
    .catch((err) => {
      toast.error(`Error: ${organizeError(err.code)}`);
      result = false;
    });
  return result;
}

export async function logout() {
  await signOut(auth).then((cred) => {
    toast.success("Logged out successfully");
  });
}
