import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export const register = async ({email, contact, password, fullname}) => {
    const response = await authApiInstance.post("/register", {
        email,
        contact,
        password,
        fullname,
    });
    return response.data;
};