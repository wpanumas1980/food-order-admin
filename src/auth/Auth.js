import React, { useEffect, useState } from "react";
import { auth } from '../config/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectFood, setSelectFood] = useState('');

    const role = currentUser ? "USER" : "GUEST";

    useEffect(() => {
        auth
            .onAuthStateChanged((user) => {
                setCurrentUser(user);
                setLoading(false);
            });
    }, []);

    // console.log(currentUser);
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                }}
            >
                <h1>Loading ...</h1>
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                selectFood,
                setSelectFood,
                role
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};