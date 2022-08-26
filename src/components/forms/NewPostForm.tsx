import { ChangeEvent, FunctionComponent, useState } from 'react'
import { Col, Container, Form } from 'react-bootstrap'

export const NewPostForm: FunctionComponent = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  return (
    <Container>
      <Form>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              value={title}
              isValid={title.length > 0}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              type="text"
              value={description}
              isValid={description.length > 0}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Col>
      </Form>
    </Container>
  )
}
