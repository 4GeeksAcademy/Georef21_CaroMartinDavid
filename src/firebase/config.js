
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyCJAYTEkMeAjCwO-EPR2byuW2esaC04zwM",
  authDomain: "georef21-3d9d2.firebaseapp.com",
  projectId: "georef21-3d9d2",
  storageBucket: "georef21-3d9d2.appspot.com",
  messagingSenderId: "1012492123700",
  appId: "1:1012492123700:web:003b0080746f9445b45461"
};


const app = initializeApp(firebaseConfig);
export const storage =getStorage(app)

export async function uploadFile(file){
    const storageRef = ref(storage,'imgvisitas/'+ v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}