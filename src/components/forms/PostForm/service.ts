import axios from 'axios'

import { Post } from '../../../types'

const createNewPost = async (
  post: Post,
  token: string,
  images: File[] | null = []
) => {
  const formData = new FormData()
  Object.entries(post).forEach(([key, value]) => formData.append(key, value))
  if (images) {
    images.forEach((image) => formData.append('images', image))
  }
  const res = await axios.post('/forum/post', formData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

const updatePost = async (
  post: Post,
  token: string,
  images: File[] | null = []
) => {
  const formData = new FormData()
  Object.entries(post).forEach(([key, value]) => formData.append(key, value))
  if (images) {
    images.forEach((image) => formData.append('images', image))
  }
  const res = await axios.put('/forum/post', formData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export { createNewPost, updatePost }
