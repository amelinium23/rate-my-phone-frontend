import axios from 'axios'

import { Post } from '../../types'

const getUser = async (uid: string) => {
  const res = await axios.get(`/user`, { params: { uid: uid } })
  return res.data
}

const deletePost = async (postId: string, token: string) => {
  const res = await axios.delete(`/forum/post`, {
    data: { post_id: postId },
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

const upVotePost = async (post: Post, token: string) => {
  const formData = new FormData()
  formData.append('title', post.title)
  formData.append('description', post.description)
  formData.append('uid', post.uid)
  formData.append('type', post.type)
  formData.append('post_id', post.id)
  formData.append('votes', (post.votes + 1).toString())
  const res = await axios.put('/forum/post', formData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

const downVotePost = async (post: Post, token: string) => {
  const formData = new FormData()
  formData.append('title', post.title)
  formData.append('description', post.description)
  formData.append('uid', post.uid)
  formData.append('type', post.type)
  formData.append('post_id', post.id)
  formData.append('votes', (post.votes - 1).toString())
  const res = await axios.put('/forum/post', formData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export { deletePost, downVotePost, getUser, upVotePost }
