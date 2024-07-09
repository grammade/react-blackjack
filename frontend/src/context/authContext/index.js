import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import React, { useContext, useEffect, useState } from "react";
import { signInGoogle, signOut } from "../../firebase/auth";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    
    useEffect(() =>{
        const storedUser = localStorage.getItem("user")
        if(storedUser){
            console.log("USER IN LOCAL STORAGE")
            setCurrentUser(JSON.parse(storedUser))
            setUserLoggedIn(true)
            setLoading(false)
        } else{
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if(user){
                    console.log("USER LOGGING IN")
                    localStorage.setItem("user", JSON.stringify(user))
                    setUserLoggedIn(true)
                    setCurrentUser(user)
                }else{
                    console.warn("USER LOGGING OUT")
                    localStorage.removeItem("user")
                    setUserLoggedIn(false)
                    setCurrentUser(null)
                }
                setLoading(false)
            })
            return () => unsubscribe();
        }
    }, [])
    
    const value = {
        currentUser,
        userLoggedIn,
        loading,
        signInGoogle,
        signOut
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading &&children}
        </AuthContext.Provider>
    )
}

