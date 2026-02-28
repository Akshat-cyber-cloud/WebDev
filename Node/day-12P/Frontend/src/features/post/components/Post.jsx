import React, { useState } from 'react';
import { usePost } from '../hook/usePost';
import PostImage from './PostImage';
import { MoreHorizontal, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const Post = ({ user, post, loading, handleLike, handleUnlike }) => {
    // Generate a pseudo-random location and like count for the mockup feel if undefined
    const location = post.location || 'Paris, France';
    const commentsCount = post.comments?.length || 42;
    const [commentText, setCommentText] = useState("");

    const handleActionLike = () => {
        post.isLiked ? handleUnlike(post._id || post.id) : handleLike(post._id || post.id);
    };

    return (
        <div className="post">
            {/* 1. Header Area */}
            <div className="post-header">
                <div className="user-info">
                    <img
                        src={user?.profileImg}
                        alt={user?.username}
                        className="avatar"
                    />
                    <div className="details">
                        <div className="username-row">
                            <h3>{user?.username}</h3>
                            <span className="dot">•</span>
                            <span className="time">12h</span>
                        </div>
                        <span className="location">{location}</span>
                    </div>
                </div>
                <button className="menu-btn"><MoreHorizontal size={20} color="#262626" /></button>
            </div>

            {/* 2. Image Area (with double-tap logic) */}
            <PostImage
                src={post.imgUrl || post.image}
                alt="Post content"
                isLiked={post.isLiked}
                onLike={() => handleLike(post._id || post.id)}
            />

            {/* 3. Bottom Bar: Actions & Details */}
            <div className="bottom-bar">
                <div className="actions">
                    <div className="left-actions">
                        <button onClick={handleActionLike} className={`action-btn ${post.isLiked ? 'liked' : ''}`}>
                            <Heart size={24} fill={post.isLiked ? "#ed4956" : "none"} color={post.isLiked ? "#ed4956" : "#262626"} />
                        </button>
                        <button className="action-btn">
                            <MessageCircle size={24} color="#262626" />
                        </button>
                        <button className="action-btn">
                            <Send size={24} color="#262626" />
                        </button>
                    </div>
                    <div className="right-actions">
                        <button className="action-btn">
                            <Bookmark size={24} color="#262626" />
                        </button>
                    </div>
                </div>

                <div className="details-section">
                    {/* Animated Like Count */}
                    <div className="likes-count">
                        <motion.span
                            key={post.likesCount || 0}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            style={{ display: 'inline-block', fontWeight: 600 }}
                        >
                            {(post.likesCount || 0).toLocaleString()}
                        </motion.span>
                        <span style={{ fontWeight: 600, marginLeft: '4px' }}>likes</span>
                    </div>

                    {/* Caption */}
                    <div className="caption-container">
                        <span className="username-bold">{user?.username}</span>
                        <span className="caption-text"> {post.caption}</span>
                    </div>

                    {/* Comments Preview */}
                    <button className="view-comments">
                        View all {commentsCount} comments
                    </button>

                    {/* Add Comment Input */}
                    <div className="add-comment-wrapper">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="comment-input"
                        />
                        {commentText.length > 0 && <button className="post-comment-btn">Post</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;