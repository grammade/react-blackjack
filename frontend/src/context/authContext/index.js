import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import React, { useContext, useEffect, useState } from "react";
import { signInGoogle, signOut } from "../../firebase/auth";
import { getSession } from "../../services/UsersAPI";
import { v6 as uuidv6 } from "uuid"

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [guestUid, setGuestUid] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("USER LOGGING IN")
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.removeItem("session")
                setUserLoggedIn(true)
                setGuestUid(null)
                setCurrentUser(user)
            } else {
                console.warn("USER LOGGING OUT")
                localStorage.removeItem("user")
                localStorage.removeItem("session")
                setUserLoggedIn(false)
                const guid = uuidv6()
                console.log(`generating new guest uid guest-${guid}`)
                setGuestUid(`guest-${guid}`)
                setCurrentUser(null)
            }
            setLoading(false)
        })
        return () => unsubscribe();
    }, [])

    const manageSession = async (uid) => {
        let localSess = localStorage.getItem("session")
        console.log(`local session for uid ${uid} : ${localSess}`)
        if (localSess === null) {
            console.log(`creating new session`)
            localSess = (await getSession(uid)).session
            localStorage.setItem("session", localSess)
            console.log(`new session: ${localSess}`)
        }
        return localSess
    }
    
    const getUid = () => {
        return userLoggedIn ? currentUser.uid : guestUid
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        guestUid,
        signInGoogle,
        signOut,
        manageSession,
        getUid
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

