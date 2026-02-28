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

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})

    const { handleRegister, loading } = useAuth()
    const navigate = useNavigate();

    function validateForm() {
        const newErrors = {};
        if (!username) newErrors.username = "Username is required";
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email address is invalid";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const result = await handleRegister(username, email, password);
        if (result && result.success) {
            navigate('/')
        } else {
            setErrors({ ...errors, form: result?.error || "Registration failed" });
        }
    }

    return (
        <AuthLayout
            title="Create an Account"
            subtitle="Join us and start sharing today."
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
                    label="Email Address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: null });
                    }}
                    error={errors.email}
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
                        {loading ? 'Creating...' : 'Register'}
                    </button>
                </motion.div>
            </motion.form>

            <motion.p
                variants={fieldVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
                className="auth-switch"
            >
                Already have an account? <Link className='toggleAuthForm' to="/login">Sign in</Link>
            </motion.p>
        </AuthLayout>
    )
}

export default Register