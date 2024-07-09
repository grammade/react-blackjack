import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signInGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, provider).catch((e) => {console.log(e)})
    
    return res
}

export const signOut = async () => {
    return auth.signOut
}