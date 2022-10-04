import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { PostItem } from '../../components/items'
import { setIsLoading, useStore } from '../../context'
import { Post } from '../../types/Post'

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

  return (
    <Container className="mt-2">
      <h5 className="text-center">
        {firebaseUser?.displayName || 'Your'} posts
      </h5>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} isEditingEnable={true} />
      ))}
    </Container>
  )
}
