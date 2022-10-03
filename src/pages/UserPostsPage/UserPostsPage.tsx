import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { setIsLoading, useStore } from '../../context'
import { Post } from '../../types/Post'

const getUserPosts = async (uid: string) => {
  const res = await axios.get('/forum/post', { params: { uid } })
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
        const posts = await getUserPosts(firebaseUser?.uid ?? '')
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

  console.log(posts)

  return <Container>UserPostsPage</Container>
}
