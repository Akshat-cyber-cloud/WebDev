import React, { useState, useRef } from 'react';
import '../style/CreatePost.scss';
import { usePost } from '../hook/usePost';
import { useNavigate } from 'react-router';
import { ImagePlus, X, UploadCloud } from 'lucide-react';

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const postImageInputFieldRef = useRef(null);

    const navigate = useNavigate();
    const { loading, handleCreatePost } = usePost();

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setupImagePreview(file);
        }
    };

    const setupImagePreview = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            // Assign the dropped file to the hidden input so the submit handler can find it
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            postImageInputFieldRef.current.files = dataTransfer.files;

            setupImagePreview(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        postImageInputFieldRef.current.value = "";
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const file = postImageInputFieldRef.current.files[0];
        if (!file) {
            alert("Please select an image first!");
            return;
        }

        await handleCreatePost(file, caption);
        navigate("/");
    }

    if (loading) {
        return (
            <main className="create-post-page loading-state">
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Creating your post...</p>
                </div>
            </main>
        );
    }

    return (
        <main className='create-post-page'>
            <div className="create-post-card">
                <div className="card-header">
                    <h2>Create New Post</h2>
                    <button type="button" className="close-btn" onClick={() => navigate("/")}>
                        <X size={24} color="#262626" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="post-form">

                    {/* Image Upload / Preview Zone */}
                    <div
                        className={`image-upload-zone ${isDragging ? 'dragging' : ''} ${imagePreview ? 'has-image' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => !imagePreview && postImageInputFieldRef.current.click()}
                    >
                        {imagePreview ? (
                            <div className="preview-container">
                                <img src={imagePreview} alt="Preview" className="image-preview" />
                                <button type="button" className="remove-image-btn" onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}>
                                    <X size={16} color="#ffffff" />
                                </button>
                            </div>
                        ) : (
                            <div className="empty-state">
                                <ImagePlus size={48} color={isDragging ? "#d62976" : "#a8a8a8"} className="icon" />
                                <h3>{isDragging ? "Drop image here" : "Select or Drop an Image"}</h3>
                                <p>Supports JPG, PNG, WEBP</p>
                                <button type="button" className="browse-btn">Browse Files</button>
                            </div>
                        )}
                        <input
                            ref={postImageInputFieldRef}
                            hidden
                            type="file"
                            accept="image/*"
                            name='post-Image'
                            id='post-Image'
                            onChange={handleImageSelect}
                        />
                    </div>

                    {/* Caption Input */}
                    <div className="caption-section">
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            name='caption'
                            id='caption'
                            placeholder='Write a caption for your post...'
                            rows="4"
                            className="caption-textarea"
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="form-footer">
                        <button type="button" className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
                        <button type="submit" className='submit-post-btn' disabled={!imagePreview}>
                            Share Post
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
};

export default CreatePost;