import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from "firebase/database";
import config from "../config.json";

const app = initializeApp(config.fbConfig);
const dbRef = ref(getDatabase(app));

export async function getGenres() {
  var genres = [];
  await get(child(dbRef, "genres"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        genres = [...snapshot.val()];
      } else {
        toast.warn("No data available");
      }
    })
    .catch((error) => {
      toast.error(error);
    });
  return genres;
}
