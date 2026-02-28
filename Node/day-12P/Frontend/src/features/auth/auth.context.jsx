//3. State Layer - User Data (Loading, User Info, etc.)
import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.api"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Initial load, check if already logged in via cookie
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();
                if (data && data.user) {
                    setUser(data.user);
                }
            } catch (err) {
                console.log("Not logged in");
            }
        };
        fetchUser();
    }, []);

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await login(username, password);
            if (response && response.user) {
                setUser(response.user);
                return { success: true };
            }
            return { success: false, error: response?.message || "Login failed" };
        } catch (err) {
            console.log(err)
            return { success: false, error: err.response?.data?.message || "An error occurred" };
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await register(username, email, password);
            if (response && response.user) {
                setUser(response.user);
                return { success: true };
            }
            return { success: false, error: response?.message || "Registration failed" };
        } catch (err) {
            console.log(err)
            return { success: false, error: err.response?.data?.message || "An error occurred" };
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }}>
            {children}
        </AuthContext.Provider>
    )
}