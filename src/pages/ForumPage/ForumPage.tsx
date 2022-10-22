import axios from 'axios'
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { PostItem } from '../../components/items/PostItem/PostItem'
import { setIsLoading, useStore } from '../../context'
import { Post } from '../../types'
import { postSortingKeys, sortingModes } from '../../utils/constants'

const getPosts = async () => {
  const res = await axios.get('/forum')
  return res.data
}

export const ForumPage: FunctionComponent = () => {
  const { state, dispatch } = useStore()
  const [posts, setPosts] = useState<Post[]>([])
  const [sortingKey, setSortingKey] = useState<string>(postSortingKeys[0])
  const [sortingMode, setSortingMode] = useState<string>(sortingModes[0])
  const navigate = useNavigate()

  const handleAddingPost = () => {
    if (state.auth.currentUser === null) {
      navigate('/login')
    } else {
      navigate('/new-post')
    }
  }

  const handleDeletePost = (post: Post) => {
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id))
  }

  const handleChangeOfSortingKey = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortingKey(e.target.value)
  }

  const handleChangeOfSortingMode = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortingMode(e.target.value)
  }

  const handleEditPost = (post: Post) => {
    setPosts((prevPosts) => {
      const foundPostIndex = prevPosts.findIndex((p) => p.id === post.id)
      const newPosts = [...prevPosts]
      newPosts[foundPostIndex] = post
      return newPosts
    })
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
        <Row className="my-2">
          <Col sm={2}>
            <Form.Label>Sort by</Form.Label>
            <Form.Select
              size="sm"
              onChange={handleChangeOfSortingKey}
              value={sortingKey}
            >
              {postSortingKeys.sort().map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Form.Select>
          </Col>
          <Col sm={2}>
            <Form.Label>Sorting mode</Form.Label>
            <Form.Select
              size="sm"
              onChange={handleChangeOfSortingMode}
              value={sortingMode}
            >
              {sortingModes.sort().map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Form.Select>
          </Col>
          <Col sm={{ span: 2, offset: 6 }}>
            <div className="float-end">
              <Button variant="outline-primary" onClick={handleAddingPost}>
                New post
              </Button>
            </div>
          </Col>
        </Row>
      )}
      {posts.length === 0 && <h5 className="text-center">No post found</h5>}
      {posts &&
        posts.map((post: Post) => (
          <PostItem
            key={post.id}
            post={post}
            handleDeletePost={handleDeletePost}
            handleEditPost={handleEditPost}
            isEditingEnable={false}
          />
        ))}
    </Container>
  )
}
