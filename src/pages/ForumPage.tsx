import axios from 'axios'
import autoAnimate from '@formkit/auto-animate'
import { FunctionComponent, useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { PostItem } from '../components/Items/PostItem'
import { Post } from '../types/Post'
import { setIsLoading } from '../contexts/Actions'
import { toast } from 'react-toastify'
import { useStore } from '../contexts/Store'
import { useNavigate } from 'react-router'

const getPosts = async () => {
  const res = await axios.get('/forum')
  return res.data
}

export const ForumPage: FunctionComponent = () => {
  const { state, dispatch } = useStore()
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()
  const parent = useRef(null)

  const handleAddingPost = () => {
    if (state.auth.currentUser === null) {
      navigate('/login')
    } else {
      navigate('/new-post')
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(dispatch, true)
        const posts: Post[] = await getPosts()
        setPosts(posts)
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <Container ref={parent} className="my-2">
      <h5 className="text-center">Latest posts</h5>
      <Row className="my-1">
        <Col md={{ span: 2, offset: 10 }}>
          <div className="float-end">
            <Button onClick={handleAddingPost}>New post</Button>
          </div>
        </Col>
      </Row>
      {posts.length === 0 && <h5 className="text-center">No post found</h5>}
      {posts &&
        posts.map((post: Post) => <PostItem key={post.id} post={post} />)}
    </Container>
  )
}
