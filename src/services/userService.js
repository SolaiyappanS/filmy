import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import config from "../config.json";

const app = initializeApp(config.fbConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const organizeError = (error) => error.split("/")[1].split("-").join(" ");

export async function register(user) {
  let result = false;
  if (user.password !== user.confirmPassword)
    toast.error("Passwords do not match");
  else
    await createUserWithEmailAndPassword(auth, user.username, user.password)
      .then(async (cred) => {
        await set(ref(db, "users/" + cred.user.uid), {
          admin: user.username.endsWith("@admin.example.com"),
          username: user.username,
          name: user.name,
        });
        toast.success("Account created");
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
  await signOut(auth);
}

export async function saveUser(name, uid) {
  var result = false;
  await set(ref(db, "users/" + uid + "/name"), name)
    .then(() => {
      result = true;
    })
    .catch((err) => {
      toast.error(`Error: ${organizeError(err.code)}`);
      result = false;
    });
  return result;
}

export function getUid() {
  var uid = "";
  if (auth.currentUser && auth.currentUser.uid) {
    uid = auth.currentUser.uid;
  }
  return uid;
}

export async function getUser() {
  const uid = getUid();
  var user = {};
  await get(ref(db, "users/" + uid)).then((snap) => {
    user = snap.val();
  });
  return user;
}
