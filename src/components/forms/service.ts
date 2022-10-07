import axios from 'axios'

import { Post } from '../../types'

const createNewPost = async (
  post: Post,
  token: string,
  images: File[] | null = []
) => {
  const res = await axios.post(
    '/forum/post',
    { ...post },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  if (images) {
    const formData = new FormData()
    images.forEach((image) => formData.append(image.name, image))
    formData.append('id', res.data.post.id)
    await axios.post(`/forum/post/upload`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
  return res.data
}

const updatePost = async (
  post: Post,
  token: string,
  images: File[] | null = []
) => {
  const res = await axios.put(
    '/forum/post',
    { ...post },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  if (images) {
    const formData = new FormData()
    images.forEach((image) => formData.append(image.name, image))
    formData.append('id', post.id)
    await axios.post(`/forum/post/upload`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
  return res.data
}

export { createNewPost, updatePost }
