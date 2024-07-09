import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signInGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, provider)
        .catch((e) => {console.log(e)})
    localStorage.setItem("user", JSON.stringify(res));
    return res
}

const signOut = async () => {
    return auth.signOut
}

export {signInGoogle, signOut}