import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signInGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, provider)
        .catch((e) => { console.log(e) })
    return res
}

const signOut = async () => {
    console.log("logging out in auth")
    return await auth.signOut()
        .then(() => {
            console.log("logged out in auth")
            localStorage.removeItem("user")
        })
}

export { signInGoogle, signOut }