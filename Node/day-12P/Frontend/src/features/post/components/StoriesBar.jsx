import React, { useRef, useState } from 'react';
import StoryRing from './StoryRing';
import StoryViewer from './StoryViewer';
import { useAuth } from '../../auth/hooks/useAuth';
import '../style/stories.scss';

// Mock data for stories using real realistic avatars
const INITIAL_STORIES = [
    { id: 1, user: { username: 'alex_z', profileImg: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' }, seen: false, image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800' },
    { id: 2, user: { username: 'marina_w', profileImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }, seen: false, image: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?w=800' },
    { id: 3, user: { username: 'john_doe', profileImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }, seen: false, image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800' },
    { id: 4, user: { username: 'sarah_p', profileImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' }, seen: true, image: 'https://images.unsplash.com/photo-1444464666168-49b626f8a1e1?w=800' },
    { id: 5, user: { username: 'vicky_r', profileImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }, seen: true, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800' },
];

const StoriesBar = () => {
    const { user: currentUser } = useAuth();
    const scrollRef = useRef(null);
    const [stories, setStories] = useState(INITIAL_STORIES);
    const [activeStoryIndex, setActiveStoryIndex] = useState(null);

    // Mouse drag to scroll logic (optional, but good for desktop)
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleStoryClick = (index) => {
        // Mark as seen immediately (optimistic UI)
        const updatedStories = [...stories];
        updatedStories[index].seen = true;
        setStories(updatedStories);
        setActiveStoryIndex(index);
    };

    const closeViewer = () => {
        setActiveStoryIndex(null);
    };

    const handleNextStory = () => {
        if (activeStoryIndex < stories.length - 1) {
            handleStoryClick(activeStoryIndex + 1);
        } else {
            closeViewer();
        }
    };

    const handlePrevStory = () => {
        if (activeStoryIndex > 0) {
            handleStoryClick(activeStoryIndex - 1);
        }
    };

    return (
        <section className="stories-section">
            <div
                className="stories-scroll-container"
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {/* Current User's "Add Story" Ring */}
                <div className="story-item">
                    <StoryRing
                        user={{ ...currentUser, username: 'Your Story' }}
                        seen={true} // Grey border to signify adding
                        onClick={() => alert("Add story functionality placeholder")}
                    />
                    {/* A little plus icon overlay on the avatar could go here, implemented via CSS pseudo element */}
                </div>

                {/* Other User Stories */}
                {stories.map((story, index) => (
                    <div className="story-item" key={story.id}>
                        <StoryRing
                            user={story.user}
                            seen={story.seen}
                            onClick={() => handleStoryClick(index)}
                        />
                    </div>
                ))}
            </div>

            {/* Fullscreen Story Viewer Modal */}
            <StoryViewer
                isOpen={activeStoryIndex !== null}
                story={activeStoryIndex !== null ? stories[activeStoryIndex] : null}
                onClose={closeViewer}
                onNext={handleNextStory}
                onPrev={handlePrevStory}
            />
        </section>
    );
};

export default StoriesBar;
