import './commentItem.css'

import { ChangeEvent, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { ArrowBigDown, ArrowBigTop } from 'tabler-icons-react'

import { useStore } from '../../../context'
import {
  deleteComment,
  downVoteComment,
  editComment,
  upVoteComment,
} from '../../../services/CommentItemService'
import { Comment } from '../../../types'

interface CommentItemProps {
  comment: Comment
  postAuthorId: string
  postId: string
}

export default function CommentItem({
  comment,
  postAuthorId,
  postId,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [commentBody, setCommentBody] = useState<string>(comment.comment || '')
  const { state } = useStore()
  const currentUser = state.auth.currentUser

  const handleUpVote = async () => {
    try {
      const token = await currentUser?.getIdToken()
      const res = await upVoteComment(
        comment,
        postId,
        postAuthorId,
        token || ''
      )
      toast.success(res)
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  const handleEdit = async () => {
    setIsEditing(!isEditing)
  }

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentBody(e.target.value)
  }

  const handleDelete = async () => {
    try {
      const token = await currentUser?.getIdToken()
      const res = await deleteComment(
        comment,
        postId,
        postAuthorId,
        token || ''
      )
      toast.success(res)
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  const handleDownVote = async () => {
    try {
      const token = await currentUser?.getIdToken()
      const res = await downVoteComment(
        comment,
        postId,
        postAuthorId,
        token || ''
      )
      toast.success(res)
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = await currentUser?.getIdToken()
      const res = await editComment(
        { ...comment, comment: commentBody },
        postId,
        postAuthorId,
        token || ''
      )
      toast.success(res)
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  return (
    <Card className="my-2">
      <Card.Body>{comment.comment}</Card.Body>
      {currentUser && (
        <Card.Footer className="comment-footer">
          <span className="mx-1">Votes {comment.votes}</span>
          <Button
            onClick={handleUpVote}
            className="p-0"
            variant="outline-light"
          >
            <ArrowBigTop size={20} strokeWidth={0.6} color={'black'} />
          </Button>
          <Button
            onClick={handleDownVote}
            className="mx-1 p-0"
            variant="outline-light"
          >
            <ArrowBigDown size={20} strokeWidth={0.6} color={'black'} />
          </Button>
          {currentUser.uid === comment.uid && (
            <div className="float-end">
              <Button
                onClick={handleEdit}
                className="mx-1"
                variant="outline-primary"
              >
                Edit
              </Button>
              <Button onClick={handleDelete} variant="outline-danger">
                Delete
              </Button>
            </div>
          )}
          {isEditing && (
            <>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="text"
                    value={commentBody}
                    as="textarea"
                    onChange={handleCommentChange}
                    rows={3}
                  />
                  <Button
                    className="my-2"
                    variant="outline-primary"
                    type="submit"
                  >
                    Edit comment
                  </Button>
                </Form.Group>
              </Form>
            </>
          )}
        </Card.Footer>
      )}
    </Card>
  )
}
