import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import "../../chat/styles/home.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const { handleLogin } = useAuth();

    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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
            navigate("/dashboard");
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
    };

    if (!loading && user) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-body selection:bg-[#ff5722]/30 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Neural Visualization */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full neural-glow"></div>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #FF5722 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-md glass-panel rounded-3xl shadow-2xl overflow-hidden border-[#5B4039]/20 group/card">
                <div className="noise-texture absolute inset-0 rounded-3xl"></div>
                
                {/* Close Button */}
                <button 
                    onClick={() => navigate("/")}
                    className="absolute top-6 right-6 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#131313]/20 border border-[#5B4039]/20 text-[#e5e2e1]/40 hover:text-[#ffb5a0] hover:bg-[#131313]/50 transition-all duration-300"
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>

                <div className="p-10 relative">
                    <div className="mb-8 ">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#131313]/50 rounded-full mb-4 border border-[#5B4039]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#ffb5a0]">Secure Access</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 font-headline">Welcome</h1>
                        <p className="text-[#e5e2e1]/50 font-light">Access your kinetic AI workspace</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#ffb5a0]/80">Email Address</label>
                            <div className="group relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#ffb5a0]/40 text-lg">mail</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@ember.ai"
                                    className="w-full bg-[#0e0e0e]/50 border border-[#5b4039]/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-[#e5e2e1]/20
                                    outline-none focus:ring-1 focus:ring-[#ffb5a0]/40 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#ffb5a0]/80">Password</label>
                            <div className="group relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#ffb5a0]/40 text-lg">lock</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0e0e0e]/50 border border-[#5b4039]/20 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder:text-[#e5e2e1]/20
                                    outline-none focus:ring-1 focus:ring-[#ffb5a0]/40 transition-all duration-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((p) => !p)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ff6a00]/40 hover:text-[#ffb5a0] transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">{showPassword ? "visibility_off" : "visibility"}</span>
                                </button>
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-tighter animate-in fade-in slide-in-from-top-2 duration-300 flex items-center gap-2 ${message.includes("✓")
                                ? "bg-[#ff5722]/10 text-[#ffb5a0] border border-[#ff5722]/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                }`}>
                                <span className="material-symbols-outlined text-sm">{message.includes("✓") ? "check_circle" : "error"}</span>
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full ember-gradient text-[#3b0900] font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(255,87,34,0.2)] hover:shadow-[0_0_30px_rgba(255,87,34,0.4)] transition-all duration-300 active:scale-[0.98]"
                        >
                            Sign In to Ember
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[#e5e2e1]/40 text-xs uppercase tracking-widest">
                            No account?{" "}
                            <span
                                onClick={() => navigate("/register")}
                                className="text-[#ffb5a0] hover:text-[#ff5722] cursor-pointer font-bold transition-colors"
                            >
                                Get Started
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
