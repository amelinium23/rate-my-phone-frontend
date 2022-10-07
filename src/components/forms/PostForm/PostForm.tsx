import { ChangeEvent, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { useStore } from '../../../context'
import { Post, PostType } from '../../../types'
import { createNewPost, updatePost } from './service'

interface PostFormProps {
  post?: Post
  isEditingEnable?: boolean
}

export const PostForm = ({
  post = {} as Post,
  isEditingEnable = false,
}: PostFormProps) => {
  const { state } = useStore()
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>(post?.title || '')
  const [description, setDescription] = useState<string>(
    post?.description || ''
  )
  const [postType, setPostType] = useState<PostType>(
    (post?.type as PostType) || PostType.QUESTION
  )
  const [images, setImages] = useState<FileList | null>(null)
  const firebaseUser = state.auth.currentUser

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const processedImages = Array.from(images ?? [])
    const token = (await firebaseUser?.getIdToken()) || ''
    if (isEditingEnable && firebaseUser) {
      try {
        const updatedPost = {
          ...post,
          title,
          description,
          type: postType,
        } as Post
        await updatePost(updatedPost, token, images ? processedImages : [])
        navigate('/my-posts')
        toast.success('Post updated successfully')
      } catch (e) {
        toast.error((e as Error).message)
      }
    } else if (firebaseUser) {
      try {
        const newPost = {
          title,
          description,
          type: postType,
          uid: firebaseUser.uid,
        } as Post
        await createNewPost(newPost, token, images ? processedImages : null)
        navigate('/my-posts')
        toast.success(`Post created successfully!`)
      } catch (error) {
        toast.error((error as Error).message)
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
            {isEditingEnable ? 'Update post' : 'Create new post'}
          </Button>
        </div>
      </Form>
    </Container>
  )
}
