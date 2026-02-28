import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../style/stories.scss';

const STORY_DURATION = 5000; // 5 seconds per story

const StoryViewer = ({ isOpen, story, onClose, onNext, onPrev }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isOpen) {
            setProgress(0);
            return;
        }

        setProgress(0); // Reset progress on new story Load

        const increment = 100 / (STORY_DURATION / 50); // Calculate step for 50ms intervals

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    onNext(); // Auto-advance to next story when done
                    return 100;
                }
                return prev + increment;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [isOpen, story, onNext]);

    // Handle drag/swipe down to close
    const handleDragEnd = (e, info) => {
        if (info.offset.y > 100) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && story && (
                <motion.div
                    className="story-viewer-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="story-viewer-container"
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        onDragEnd={handleDragEnd}
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Progress Bar Header */}
                        <header className="story-header">
                            <div className="progress-bars">
                                <div className="progress-bar-container">
                                    <motion.div
                                        className="progress-fill"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="story-user-info">
                                <img src={story.user.profilePic} alt={story.user.username} className="story-avatar-small" />
                                <span className="story-username-display">{story.user.username}</span>
                                <span className="story-time">2h</span>
                                {/* Static time for mockup */}
                            </div>

                            <button className="close-btn" onClick={onClose}>
                                <X size={24} color="white" />
                            </button>
                        </header>

                        {/* Story Content Area */}
                        <div className="story-image-container">
                            <img src={story.image} alt="Story" className="story-image" />

                            {/* Tap Navigation Zones */}
                            <div className="tap-zone tap-left" onClick={onPrev} />
                            <div className="tap-zone tap-right" onClick={() => {
                                setProgress(100); // Instantly finish this progress
                                onNext();         // Then go to next
                            }} />

                            {/* Arrow hints for desktop */}
                            <div className="nav-arrows">
                                <button className="arrow-btn left" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
                                    <ChevronLeft size={32} color="white" />
                                </button>
                                <button className="arrow-btn right" onClick={(e) => { e.stopPropagation(); onNext(); }}>
                                    <ChevronRight size={32} color="white" />
                                </button>
                            </div>
                        </div>

                        {/* Footer (Reply box) */}
                        <footer className="story-footer">
                            <input type="text" placeholder={`Reply to ${story.user.username}...`} className="reply-input" />
                        </footer>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StoryViewer;
