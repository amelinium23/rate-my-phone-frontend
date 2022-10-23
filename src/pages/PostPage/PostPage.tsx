import './index.css'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Share } from 'tabler-icons-react'

import { PhotosContainer } from '../../components/containers/PhotosContainer'
import { AddCommentForm } from '../../components/forms/AddCommentForm'
import CommentItem from '../../components/items/CommentItem/CommentItem'
import { setIsLoading, useStore } from '../../context'
import { Comment, Post } from '../../types'
import { COLORS } from '../../utils/constants'
import { upperFirstLetter } from '../../utils/helperFunctions'

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

  const handleAddCommentToPost = (comment: Comment) => {
    setPost(
      (prevPost) =>
        prevPost && {
          ...prevPost,
          comments: [...(prevPost?.comments || []), comment],
        }
    )
  }

  const handleEditCommentToPost = (comment: Comment) => {
    const comments = post?.comments?.filter(
      (postComment) => comment?.id !== postComment?.id
    )
    setPost({ ...post, comments: [...(comments ?? []), comment] } as Post)
  }

  const handleDeleteCommentToPost = (comment: Comment) => {
    setPost(
      (prevState) =>
        prevState && {
          ...prevState,
          comments: [
            ...(prevState?.comments?.filter(
              (postComment) => postComment?.id !== comment.id
            ) || []),
          ],
        }
    )
  }

  const handleCopyingLink = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL)
    toast.success('URL copied to clipboard!')
  }

  return (
    <Container className="my-2">
      <Row>
        <Col sm={8}>
          <h5>
            {post?.title}{' '}
            <span style={COLORS[post?.type || '']} className="post-type">
              {upperFirstLetter((post?.type as string) || '')}
            </span>
          </h5>
        </Col>
        <Col sm={4}>
          <div className="float-end">
            <Button onClick={handleCopyingLink} variant="light">
              <Share size={20} /> Share this post
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <section className="description-section">
            <p>{post?.description}</p>
          </section>
        </Col>
        {post?.images && post?.images?.length > 0 && (
          <Col sm={4} className="d-flex justify-content-end">
            <PhotosContainer pictures={post?.images ?? []} />
          </Col>
        )}
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
                  handleEditComment={handleEditCommentToPost}
                  handleDeleteComment={handleDeleteCommentToPost}
                />
              ))}
            </>
          )}
          {isAddingEnable && (
            <AddCommentForm
              postId={post?.id ?? ''}
              postAuthorId={post?.uid ?? ''}
              setIsAddingEnable={setIsAddingEnable}
              setPost={handleAddCommentToPost}
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
