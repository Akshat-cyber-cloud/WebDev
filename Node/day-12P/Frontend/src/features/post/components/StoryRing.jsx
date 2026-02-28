import React from 'react';
import { motion } from 'framer-motion';
import '../style/stories.scss';

const StoryRing = ({ user, seen, onClick }) => {
    // The SVG circle properties
    const size = 68;
    const strokeWidth = 2.5;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    return (
        <motion.div
            className="story-ring-wrapper"
            onClick={() => onClick(user)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className={`ring-container ${seen ? 'seen' : 'unseen'}`}>
                {/* SVG for the gradient ring animation */}
                {!seen && (
                    <svg className="animated-ring" width={size} height={size}>
                        <defs>
                            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#feda75" />
                                <stop offset="25%" stopColor="#fa7e1e" />
                                <stop offset="50%" stopColor="#d62976" />
                                <stop offset="75%" stopColor="#962fbf" />
                                <stop offset="100%" stopColor="#4f5bd5" />
                            </linearGradient>
                        </defs>
                        <motion.circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="url(#instagram-gradient)"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                        />
                    </svg>
                )}

                {/* SVG for the grey seen ring */}
                {seen && (
                    <svg className="static-ring" width={size} height={size}>
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="#e0e0e0"
                            strokeWidth={strokeWidth}
                        />
                    </svg>
                )}

                <div className="avatar-wrapper">
                    {/* Use a placeholder image if user has no profilePic, or their actual picture */}
                    <img
                        src={user?.profileImg}
                        alt={`${user?.username}'s story`}
                        className="story-avatar"
                    />
                </div>
            </div>
            <span className="story-username">{user?.username || 'User'}</span>
        </motion.div>
    );
};

export default StoryRing;
