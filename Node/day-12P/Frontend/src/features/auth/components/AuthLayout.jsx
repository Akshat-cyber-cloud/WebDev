import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router'
import '../style/form.scss'

const AuthLayout = ({ children, title, subtitle }) => {
    const location = useLocation();

    return (
        <main className="auth-layout-container">
            <div className="auth-split">
                {/* Left Side - Visual Presentation */}
                <div className="auth-visual">
                    <div className="visual-content">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="brand-title"
                        >
                            Connect.
                            <br />
                            Share.
                            <br />
                            Engage.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="brand-subtitle"
                        >
                            Join the community of millions sharing their stories everyday.
                        </motion.p>

                        <div className="decorative-elements">
                            <motion.div
                                className="circle circle-1"
                                animate={{
                                    y: [0, -20, 0],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                className="circle circle-2"
                                animate={{
                                    y: [0, 30, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Container */}
                <div className="auth-form-side">
                    <div className="form-wrapper">
                        <div className="form-header">
                            <h2>{title}</h2>
                            {subtitle && <p>{subtitle}</p>}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="form-content-anim"
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AuthLayout;
