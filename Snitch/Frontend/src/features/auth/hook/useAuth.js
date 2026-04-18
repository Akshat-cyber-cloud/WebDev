import { setError, setLoading, setUser } from "../state/auth.slice";
import { register as registerApi } from "../services/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister({email, contact, password, fullname, isSeller}) {
        dispatch(setLoading(true));
        try {
            const response = await registerApi({email, contact, password, fullname});
            dispatch(setUser(response.user));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }
    return { handleRegister };
};