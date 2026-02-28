import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import FloatingInput, { fieldVariant } from '../components/FloatingInput';

const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})

    const { handleLogin, loading } = useAuth()
    const navigate = useNavigate()

    function validateForm() {
        const newErrors = {};
        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const result = await handleLogin(username, password)
        if (result && result.success) {
            navigate("/")
        } else {
            setErrors({ ...errors, form: result?.error || "Login failed" });
        }
    }

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Please enter your details to sign in."
        >
            <motion.form
                variants={formVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
                className="auth-form"
            >
                <FloatingInput
                    label="Username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        if (errors.username) setErrors({ ...errors, username: null });
                    }}
                    error={errors.username}
                />

                <FloatingInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: null });
                    }}
                    error={errors.password}
                />

                <motion.div variants={fieldVariant} className="form-actions">
                    <button
                        className='button primary-button animated-button'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </motion.div>
            </motion.form>

            <motion.p
                variants={fieldVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                className="auth-switch"
            >
                Don't have an account? <Link className='toggleAuthForm' to="/register">Create one</Link>
            </motion.p>
        </AuthLayout>
    )
}

export default Login