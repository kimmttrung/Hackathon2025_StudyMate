import { createContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        fullname: "",
        username: "",
        phone: "",
        gender: "",
        nationality: "",
        avatar: "",
        date_of_birth: "",
        address_province: "",
        address_district: "",
    }
});

export const AuthWrapper = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            email: "",
            username: "",
            fullname: "",
            phone: "",
            gender: "",
            nationality: "",
            avatar: "",
            date_of_birth: "",
            address_province: "",
            address_district: "",
        }
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};