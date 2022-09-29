import axios from 'axios'
import { ChangeEvent, FunctionComponent, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { useStore } from '../../../context/Store'

const createNewPost = async (
  title: string,
  description: string,
  uid: string,
  images: File[] | null
) => {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('description', description)
  formData.append('uid', uid)
  if (images) {
    images.forEach((image) => formData.append('images', image))
  }
  const res = await axios.post('/forum/post', formData)
  return res.data
}

export const NewPostForm: FunctionComponent = () => {
  const { state } = useStore()
  const navigate = useNavigate()
  const [images, setImages] = useState<FileList | null>(null)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const user = state.auth.currentUser

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user) {
      const processedImages = Array.from(images ?? [])
      try {
        await createNewPost(
          title,
          description,
          user.uid,
          images ? processedImages : null
        )
        navigate('/forum')
        toast.success(`Post created successfully!`)
      } catch (error) {
        const err = error as Error
        toast.error(err.message)
      }
    }
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
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
          <Col md={6}>
            <Form.Group>
              <Form.Label>Images</Form.Label>
              <Form.Control
                multiple
                name="images"
                onChange={handleImageChange}
                type="file"
                accept="image/*"
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="mt-2 d-flex justify-content-center">
          <Button type="submit" variant="primary">
            Create new post
          </Button>
        </div>
      </Form>
    </Container>
  )
}
