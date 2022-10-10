import './index.css'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

import { AddCommentForm } from '../../components/forms/AddCommentForm'
import CommentItem from '../../components/items/CommentItem'
import { setIsLoading, useStore } from '../../context'
import { Comment, Post } from '../../types'

const getPost = async (postId: string) => {
  const res = await axios.get('/forum/find', { params: { id: postId } })
  return res.data
}

export const PostPage = () => {
  const { dispatch } = useStore()
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [isAddingEnable, setIsAddingEnable] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(dispatch, true)
        const post = await getPost(id || '')
        setPost(post)
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchPost()
  }, [])

  const handleAddComment = () => {
    setIsAddingEnable(!isAddingEnable)
  }

  return (
    <Container className="mt-2">
      <Row>
        <h5>{post?.title}</h5>
      </Row>
      <Row>
        <Col sm={6}>
          <section className="description-section">
            <p>{post?.description}</p>
          </section>
        </Col>
      </Row>
      <Row>
        <section>
          <h5>Comments</h5>
          {post?.comments?.length === 0 && <p>No comments</p>}
          {post?.comments && (
            <>
              {post.comments.map((comment: Comment) => (
                <CommentItem
                  postId={post?.id}
                  postAuthorId={post?.uid}
                  comment={comment}
                  key={comment.id}
                />
              ))}
            </>
          )}
          {isAddingEnable && (
            <AddCommentForm
              postId={post?.id ?? ''}
              postAuthorId={post?.uid ?? ''}
              setIsAddingEnable={setIsAddingEnable}
            />
          )}
          {!isAddingEnable && (
            <Button onClick={handleAddComment} variant="primary">
              Add comment
            </Button>
          )}
        </section>
      </Row>
    </Container>
  )
}
