import axios from 'axios'
import { ChangeEvent, FunctionComponent, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { useStore } from '../../../context'
import { PostType } from '../../../types'

const createNewPost = async (
  title: string,
  description: string,
  uid: string,
  type: PostType,
  token: string,
  images: File[] | null = []
) => {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('description', description)
  formData.append('uid', uid)
  formData.append('type', type)
  if (images) {
    images.forEach((image) => formData.append('images', image))
  }
  const res = await axios.post('/forum/post', formData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const PostForm: FunctionComponent = () => {
  const { state } = useStore()
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [postType, setPostType] = useState<PostType>(PostType.QUESTION)
  const [images, setImages] = useState<FileList | null>(null)

  const user = state.auth.currentUser

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user) {
      const processedImages = Array.from(images ?? [])
      try {
        const token = await user.getIdToken()
        await createNewPost(
          title,
          description,
          user.uid,
          postType,
          token,
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

  const handlePostTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as PostType
    setPostType(value)
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
              <Form.Label>Post type</Form.Label>
              <Form.Select
                required
                onChange={handlePostTypeChange}
                value={postType}
              >
                {Object.values(PostType).map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>
            {postType === PostType.LISTING && (
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
            )}
          </Col>
        </Row>
        <div className="mt-3 d-flex justify-content-center">
          <Button type="submit" variant="primary">
            Create new post
          </Button>
        </div>
      </Form>
    </Container>
  )
}
