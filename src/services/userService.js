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
  await createUserWithEmailAndPassword(auth, user.username, user.password)
    .then(async (cred) => {
      await set(ref(db, "users/" + cred.user.uid), {
        admin: user.username.endsWith("@admin.example.com"),
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
  await signOut(auth).then(() => {
    toast.success("Logged out successfully");
  });
}

export async function getUser(uid) {
  var user = {};
  await get(ref(db, "users/" + uid)).then((res) => {
    user = res.val();
  });
  return user;
}

export async function saveUser(name, uid) {
  await set(ref(db, "users/" + uid + "/name"), name)
    .then(() =>
      toast.success(
        'Profile name changed to "' +
          name +
          '" successfully. Refresh the page to see the changes.'
      )
    )
    .catch((err) => {
      toast.error(`Error: ${organizeError(err.code)}`);
    });
  return name + uid;
}
