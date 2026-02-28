import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from "../components/Post"
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import StoriesBar from '../components/StoriesBar'

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLike, handleUnlike } = usePost();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetFeed()
  }, []);

  useEffect(() => {
    // If loading is finished and there's no user, redirect to login
    if (!loading && !user) {
      navigate('/login')
    }
  }, [loading, user, navigate])

  if (loading) {
    return (<div className="feed-loading"><h1>Feed is Loading</h1></div>)
  }

  return (
    <div className='feed-page-content'>
      <StoriesBar />
      <div className="feed-posts-container">
        {feed && feed.map(post => {
          return <Post key={post.id || post._id} user={post.user} post={post} loading={loading} handleLike={handleLike} handleUnlike={handleUnlike} />
        })}
      </div>
    </div>
  )
}

export default Feed;