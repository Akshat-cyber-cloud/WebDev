import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeartBurst = ({ x, y }) => {
    return (
        <motion.div
            style={{
                position: 'fixed',
                left: x,
                top: y,
                marginLeft: '-40px', // Center the 80px heart
                marginTop: '-40px',
                pointerEvents: 'none',
                zIndex: 50,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.2, 1], opacity: [1, 1, 0] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="#ed4956"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(237, 73, 86, 0.4))' }}
            >
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z" />
            </svg>
        </motion.div>
    );
};

const PostImage = ({ src, alt, isLiked, onLike }) => {
    const [hearts, setHearts] = useState([]);

    const handleDoubleTap = (e) => {
        e.preventDefault();
        const { clientX: x, clientY: y } = e;

        // Add a new heart to the burst array
        const newHeart = { id: Date.now(), x, y };
        setHearts((prev) => [...prev, newHeart]);

        // Cleanup the heart after animation finishes
        setTimeout(() => {
            setHearts((prev) => prev.filter(h => h.id !== newHeart.id));
        }, 1000);

        // Trigger the actual like action if not already liked
        if (!isLiked) {
            onLike();
        }
    };

    return (
        <div
            className="post-image-wrapper"
            onDoubleClick={handleDoubleTap}
            style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden', borderRadius: '4px' }}
        >
            <img src={src} alt={alt} />

            {/* Render all active heart bursts */}
            <AnimatePresence>
                {hearts.map((heart) => (
                    <HeartBurst key={heart.id} x={heart.x} y={heart.y} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default PostImage;
