import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

export const NavItem = ({ icon, label, active, to, badgeCount }) => {
    return (
        <Link to={to} className="nav-link-wrapper">
            <motion.div
                className={`nav-item ${active ? 'active' : ''}`}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
            >
                {active && (
                    <motion.div
                        layoutId="nav-pill"
                        className="active-pill"
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                        }}
                    />
                )}
                <span className="icon-container">
                    {icon}
                    <AnimatePresence>
                        {badgeCount > 0 && (
                            <motion.span
                                initial={{ scale: 0, y: 10 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0, y: 10 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="notification-badge"
                            >
                                {badgeCount > 99 ? '99+' : badgeCount}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </span>
                <span className="label">{label}</span>
            </motion.div>
        </Link>
    );
};
