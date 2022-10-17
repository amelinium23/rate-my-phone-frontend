import axios from 'axios'

import { Comment } from '../types'

const editComment = async (
  editedComment: Comment,
  postId: string,
  authorId: string,
  token: string
) => {
  const res = await axios.put(
    `/forum/comment/edit`,
    {
      ...editedComment,
      postId: postId,
      authorId: authorId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

const upVoteComment = async (
  editedComment: Comment,
  postId: string,
  authorId: string,
  token: string
) => {
  const res = await axios.put(
    `/forum/comment/edit`,
    {
      ...editedComment,
      votes: editedComment.votes + 1,
      postId: postId,
      authorId: authorId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

const downVoteComment = async (
  editedComment: Comment,
  postId: string,
  authorId: string,
  token: string
) => {
  const res = await axios.put(
    `/forum/comment/edit`,
    {
      ...editedComment,
      votes: editedComment.votes - 1,
      postId: postId,
      authorId: authorId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

const deleteComment = async (
  comment: Comment,
  postId: string,
  authorId: string,
  token: string
) => {
  const res = await axios.delete(`/forum/comment/delete`, {
    data: {
      ...comment,
      postId,
      authorId: authorId,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export { deleteComment, downVoteComment, editComment, upVoteComment }
