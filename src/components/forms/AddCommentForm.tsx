import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

interface AddCommentFormProps {
  postId: string
  postAuthorId: string
  setIsAddingEnable: (isAddingEnable: boolean) => void
}

export const AddCommentForm = ({
  postId,
  postAuthorId,
  setIsAddingEnable,
}: AddCommentFormProps) => {
  console.log(postId, postAuthorId)
  const [commentBody, setCommentBody] = useState('')

  const handleSubmit = () => {
    setIsAddingEnable(false)
  }

  const handleCommentBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentBody(e.target.value)
  }

  return (
    <Container className="p-0 mt-2">
      <Form>
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
