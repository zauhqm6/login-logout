import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Logout = () => {
    const { logout } = useAuth();

    useEffect(() => {
        try {
            logout(); 
        } catch (error) {
            console.error("Logout error:", error);
        }
    }, [logout]);

    return <Navigate to={"/login"} />;
};

export default Logout;
