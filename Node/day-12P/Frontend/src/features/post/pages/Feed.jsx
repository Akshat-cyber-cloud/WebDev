import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from "../components/Post"
import { usePost } from '../hook/usePost'
import Nav from '../shared/components/Nav'
import { useNavigate } from 'react-router'

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLike, handleUnlike } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetFeed()
  }, []);

  if (loading) {
    return (<main><h1>Feed is Loading</h1></main>)
  }

  // If loading is finished and feed is completely empty (likely 401 Unauthorized), 
  // redirect them to the login page so they can authenticate.
  if (!feed || feed.length === 0) {
    navigate('/login')
    return null;
  }

  return (
    <main className='feed-page'>
      <Nav />
      <div className="feed">
        <div className="posts">
          {feed.map(post => {
            return <Post user={post.user} post={post} loading={loading} handleLike={handleLike} handleUnlike={handleUnlike} />
          })}
        </div>
      </div>
    </main>
  )
}

export default Feed;