import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
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
      } catch (err) {
        const er = err as Error
        toast.error(er.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <Container className="my-2">
      <h5 className="text-center">Latest posts</h5>
      {state.auth.currentUser && (
        <Row className="my-1">
          <Col md={{ span: 2, offset: 10 }}>
            <div className="float-end">
              <Button onClick={handleAddingPost}>New post</Button>
            </div>
          </Col>
        </Row>
      )}
      {posts.length === 0 && <h5 className="text-center">No post found</h5>}
      {posts &&
        posts.map((post: Post) => <PostItem key={post.id} post={post} />)}
    </Container>
  )
}
