import axios from 'axios'

import { Comment } from '../../../types'

const createNewComment = async (
  comment: Comment,
  postId: string,
  authorId: string,
  token: string
) => {
  const res = await axios.post(
    `/forum/comment/add`,
    { comment: comment.comment, id: postId, authorId: authorId },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

export { createNewComment }
