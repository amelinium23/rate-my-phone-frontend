import axios from 'axios'

import { Post } from '../../../types'

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
  const res = await axios.put(
    '/forum/post',
    { ...post, votes: post.votes + 1 },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return res.data
}

const downVotePost = async (post: Post, token: string) => {
  const res = await axios.put(
    '/forum/post',
    { ...post, votes: post.votes - 1 },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return res.data
}

export { deletePost, downVotePost, getUser, upVotePost }
