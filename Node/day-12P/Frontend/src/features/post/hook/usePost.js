import { getFeed, createPost, likePost, unlikePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
export const usePost = () => {
    const context = useContext(PostContext);

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handleGetFeed = async () => {
        setLoading(true);
        try {
            const data = await getFeed();
            setFeed(data.posts || [])
        } catch (error) {
            console.error("Failed to get feed:", error);
            // On 401 (unauthorized) or any failure, default to an empty feed.
            setFeed([])
        } finally {
            setLoading(false)
        }
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true);
        try {
            const data = await createPost(imageFile, caption)
            setFeed([data.post, ...feed])
        } catch (error) {
            console.error("Failed to create post:", error);
        } finally {
            setLoading(false)
        }
    }

    const handleLike = async (post) => {
        try {
            await likePost(post);
            await handleGetFeed();
        } catch (error) {
            console.error("Failed to like post:", error);
        }
    }

    const handleUnlike = async (post) => {
        try {
            await unlikePost(post);
            await handleGetFeed();
        } catch (error) {
            console.error("Failed to unlike post:", error);
        }
    }

    useEffect(() => {
        handleGetFeed();
    }, [])

    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnlike }
}