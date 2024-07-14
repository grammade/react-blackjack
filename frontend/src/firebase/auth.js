import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addUser } from "../services/UsersAPI";

const signInGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, provider)
        .catch((e) => { console.log(e) })
    const user = await addUser( //add user if not exists
        res.user.uid,
        res.user.displayName)
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