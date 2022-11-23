import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import { setIsLoading, useStore } from '../../../context'
import { getDevices } from '../../../services'
import { createNewPost, updatePost } from '../../../services/PostFormService'
import {
  ApiPhoneResponse,
  Device,
  PhoneResponse,
  Post,
  PostType,
} from '../../../types'
import PostPricesContainer from '../../containers/PostPricesContainer'

interface PostFormProps {
  post?: Post
  isEditingEnable?: boolean
}

export const PostForm = ({
  post = {} as Post,
  isEditingEnable = false,
}: PostFormProps) => {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>(post?.title || '')
  const [description, setDescription] = useState<string>(
    post?.description || ''
  )
  const [postType, setPostType] = useState<PostType>(
    (post?.type as PostType) || PostType.QUESTION
  )
  const [images, setImages] = useState<FileList | null>(null)
  const [deviceKey, setDeviceKey] = useState<string>(post?.device_key || '')
  const [devices, setDevices] = useState<ApiPhoneResponse | null>(null)
  const [deviceName, setDeviceName] = useState<string>('')
  const firebaseUser = state.auth.currentUser

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(dispatch, true)
        const res: ApiPhoneResponse = await getDevices()
        setDevices(res)
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchDevices()
  }, [])

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
          device_key: deviceKey,
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
          device_key: deviceKey,
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
    if (value === PostType.QUESTION || value === PostType.DISCUSSION) {
      setDeviceKey('')
      setDeviceName('')
    }
    if (value === PostType.LISTING) {
      const device =
        devices?.data
          .map((response) => response.device_list)
          .flat()
          .find((device) => device.key === deviceKey) ||
        devices?.data[0].device_list[0] ||
        ({} as Device)
      setDeviceKey(device.key)
      setDeviceName(device.device_name || '')
    }
    setPostType(value)
  }

  const handleDeviceKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const deviceName = e.target.value
    const selectedDevice =
      devices &&
      devices?.data
        .map((response) => response.device_list)
        .flat()
        .find((device) => device.device_name === deviceName)
    setDeviceName(e.target.value)
    setDeviceKey(selectedDevice?.key || '')
  }

  return (
    <Container className="p-0">
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                value={title}
                isInvalid={title.length === 0}
                isValid={title.length > 0}
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
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
          <Col md={6}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                type="text"
                value={description}
                isInvalid={description.length === 0}
                isValid={description.length > 0}
                onChange={handleDescriptionChange}
              />
            </Form.Group>
            {postType === PostType.LISTING && (
              <Form.Group className="mt-2">
                <Form.Label>Device you want sell</Form.Label>
                <Form.Select
                  required
                  value={deviceName}
                  onChange={handleDeviceKeyChange}
                >
                  {devices?.data.map(
                    (item: PhoneResponse) =>
                      item.brand_name !== '' &&
                      item.device_list.length > 0 && (
                        <optgroup key={item.brand_id} label={item.brand_name}>
                          {item.device_list.map((device: Device) => (
                            <option key={device.device_id}>
                              {device.device_name}
                            </option>
                          ))}
                        </optgroup>
                      )
                  )}
                </Form.Select>
                {deviceKey && <PostPricesContainer deviceKey={deviceKey} />}
              </Form.Group>
            )}
          </Col>
        </Row>
        <div className="mt-2 d-flex justify-content-center">
          <Button
            disabled={title.length === 0 || description.length === 0}
            type="submit"
            variant="primary"
          >
            {isEditingEnable ? 'Update post' : 'Create new post'}
          </Button>
        </div>
      </Form>
    </Container>
  )
}
