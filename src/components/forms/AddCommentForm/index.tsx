import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { useStore } from '../../../context'
import { createNewComment } from '../../../services/CommentService'
import { Comment } from '../../../types'

interface AddCommentFormProps {
  postId: string
  postAuthorId: string
  setPost: (comment: Comment) => void
}

export const AddCommentForm = ({
  postId,
  postAuthorId,
  setPost,
}: AddCommentFormProps) => {
  const { state } = useStore()
  const [commentBody, setCommentBody] = useState('')
  const currentUser = state.auth.currentUser

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const token = await currentUser?.getIdToken()
      const res = await createNewComment(
        { comment: commentBody, votes: 0, id: '' } as Comment,
        postId,
        postAuthorId,
        token || ''
      )
      setPost(res)
      toast.success(`Successfully created comment ${res.id}`)
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  const handleCommentBodyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentBody(e.target.value)
  }

  return (
    <Container className="p-0 mt-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            value={commentBody}
            onChange={handleCommentBodyChange}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button className="mt-2" type="submit" onClick={handleSubmit}>
          Add Comment
        </Button>
      </Form>
    </Container>
  )
}
