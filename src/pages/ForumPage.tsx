import axios from 'axios'
import { FunctionComponent, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { PostItem } from '../components/PostItem'
import { Post } from '../types/Post'

const getPosts = async () => {
  const res = await axios.get('/forum')
  return res.data
}

export const ForumPage: FunctionComponent = () => {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error)
  }, [])

  return (
    <Container className="mt-2">
      <h5 className="text-center">Latest posts</h5>
      {posts &&
        posts.map((post: Post) => <PostItem key={post.id} post={post} />)}
    </Container>
  )
}
