import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import config from "../config.json";

const app = initializeApp(config.fbConfig);
const db = getDatabase(app);

var obj = {};

onValue(ref(db), (res) => {
  obj.name = res.val().name;
});

export { obj };
