import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { PostItem } from '../../components/items/PostItem'
import { setIsLoading, useStore } from '../../context'
import { Post } from '../../types'

const getUserPosts = async (token: string) => {
  const res = await axios.get('/forum/post', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const UserPostsPage: FunctionComponent = () => {
  const { state, dispatch } = useStore()
  const [posts, setPosts] = useState<Post[]>([])
  const firebaseUser = state.auth.currentUser

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setIsLoading(dispatch, true)
        const posts = await getUserPosts(
          (await firebaseUser?.getIdToken()) ?? ''
        )
        setPosts(posts)
      } catch (e) {
        const er = e as Error
        toast.error(er.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchUserPosts()
  }, [])

  const handleDeletePost = (post: Post) => {
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id))
  }

  const handleEditPost = (post: Post) => {
    setPosts((prevPosts) => {
      const foundPostIndex = prevPosts.findIndex((p) => p.id === post.id)
      const newPosts = [...prevPosts]
      newPosts[foundPostIndex] = post
      return newPosts
    })
  }

  return (
    <Container className="mt-2">
      <h5 className="text-center">
        {firebaseUser?.displayName || 'Your'} posts
      </h5>
      {posts.length === 0 && (
        <p className="text-center">You did not create any posts yet.</p>
      )}
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          handleDeletePost={handleDeletePost}
          handleEditPost={handleEditPost}
          isEditingEnable={true}
        />
      ))}
    </Container>
  )
}
