import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "../src/features/post/pages/Feed"
import CreatePost from "./features/post/pages/CreatePost";
import AppShell from "./features/core/components/AppShell";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Routes with AppShell navigation */}
                <Route element={<AppShell />}>
                    <Route path="/" element={<Feed />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    {/* Add other core routes here later (search, reels, profile) */}
                </Route>

                {/* Auth routes without navigation */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes