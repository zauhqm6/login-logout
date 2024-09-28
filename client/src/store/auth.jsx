import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const authToken = `Bearer ${token}`;

    const storeTokenInLs = (servertoken) => {
        setToken(servertoken);
        localStorage.setItem('token', servertoken);
    };

    const isLoggedIn = !!token;

    const API = "https://login-logout-dyl6.vercel.app/"

    const logout = () => {
        setToken("");
        localStorage.removeItem('token');
        setUser(null); // Clear user data on logout
        toast.success("Logged Out Successfully")
    };

    const userAuthentication = async () => {
        if (!token) return;

        try {
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data.userData);
                setUser(data.userData);
                setLoading(false)
            } else {
                // Handle non-200 responses
                setUser(null);
                setLoading(false)
            }

        } catch (error) {
            console.error(error);
            setUser(null); // Clear user data on error
        }
    };

    // Get Servics
    const getServices = async () => {

        try {
            const response = await fetch(`${API}/api/data/service`, {
                method: "GET",

            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data.msg);
                setServices(data.msg)

            } else {
                // Handle non-200 responses
                setUser(null);
            }

        } catch (error) {
            console.error(error);
            setUser(null); // Clear user data on error
        }
    };


    useEffect(() => {
        getServices()
        userAuthentication();
    }, [token]); // Dependency array includes `token`

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLs, logout, user, services, authToken, isLoading, API }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
