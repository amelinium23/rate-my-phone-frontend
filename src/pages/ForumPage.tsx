import axios from 'axios'
import { FunctionComponent, useState, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { PostItem } from '../components/Items/PostItem'
import { Post } from '../types/Post'
import autoAnimate from '@formkit/auto-animate'

const getPosts = async () => {
  const res = await axios.get('/forum')
  return res.data
}

export const ForumPage: FunctionComponent = () => {
  const [posts, setPosts] = useState<any[]>([])
  const parent = useRef(null)

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error)
  }, [])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <Container ref={parent} className="my-2">
      <h5 className="text-center">Latest posts</h5>
      {posts &&
        posts.map((post: Post) => <PostItem key={post.id} post={post} />)}
    </Container>
  )
}
