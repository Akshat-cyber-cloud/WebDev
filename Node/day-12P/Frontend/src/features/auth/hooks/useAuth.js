// 2. Hooks Layer - Custom Hook to Access Auth Context
// 1. UI Layer Communicates with the Hooks Layer not with State or API

import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}