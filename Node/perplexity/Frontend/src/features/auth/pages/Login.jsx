import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Login = () => {

    const navigate = useNavigate();
    // Form state (two-way binding)
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const {handleLogin} = useAuth();

    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    // Generic change handler — syncs input → state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setMessage("Please fill in all fields.");
            return;
        }
        
        try {
            await handleLogin({ email: formData.email, password: formData.password });
            setMessage(`Welcome back! ✓`);
            setFormData({ email: "", password: "" });
            navigate("/");
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
    };

    if(!loading && user){
        return <Navigate to="/" replace />
    }

    return (
        <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">

                {/* Title */}
                <h1 className="text-2xl font-bold text-sky-700 mb-1">Sign In</h1>
                <p className="text-sm text-slate-400 mb-6">Welcome back! Please login.</p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email — value + onChange = two-way binding */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}       // React → input
                            onChange={handleChange}      // input → React
                            placeholder="you@example.com"
                            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm
                outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                        />
                    </div>

                    {/* Password — with show/hide toggle */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}    // React → input
                                onChange={handleChange}      // input → React
                                placeholder="••••••••"
                                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm
                  outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                            />
                            {/* Toggle button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition"
                            >
                                {showPassword ? (
                                    // Eye-off
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-7a9.77 9.77 0 012.168-3.585M6.343 6.343A9.956 9.956 0 0112 5c5.523 0 10 4.477 10 7a9.957 9.957 0 01-1.343 2.657M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
                                    </svg>
                                ) : (
                                    // Eye
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Feedback message */}
                    {message && (
                        <p className={`text-sm text-center py-1.5 rounded-lg ${message.includes("✓")
                                ? "bg-sky-50 text-sky-600"
                                : "bg-red-50 text-red-500"
                            }`}>
                            {message}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold
              py-2.5 rounded-lg text-sm transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-xs text-slate-400 mt-5">
                    No account?{" "}
                    <span onClick={() => navigate("/register")} className="text-sky-500 hover:underline cursor-pointer font-medium">Sign up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;