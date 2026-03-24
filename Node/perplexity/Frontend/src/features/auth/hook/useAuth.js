import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";
//  HOOK LAYER

export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister({email, username, password}){
        try{
            dispatch(setLoading(true));
            const data = await register({email,username,password})
            return data;
        }catch(error){
            dispatch(setError(error.response?.data?.message || "Registration Failed"))
            throw error;
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email, password}){
        try{
            dispatch(setLoading(true))
            const data = await login({email, password})
            dispatch(setUser(data.user))
            return data;
        }catch(error){
            dispatch(setError(error.response?.data?.message || "Login Failed"))
            throw error;
        }finally{
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }catch(error){
            // Silence 401 errors for session check as they are normal for visitors
            console.log("No active session found (normal for visitors)");
        }finally{
            dispatch(setLoading(false));
        }
    }

    async function handleLogout() {
        try {
            await logout();
            dispatch(setUser(null));
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return {
        handleGetMe,
        handleLogin,
        handleRegister,
        handleLogout
    }
    
}