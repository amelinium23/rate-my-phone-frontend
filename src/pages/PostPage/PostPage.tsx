import './index.css'

import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

import { setIsLoading, useStore } from '../../context'
import { Comment, Post } from '../../types/Post'

// const upVotePost = async (post: Post) => {
//   const res = await axios.put('/forum/post', {
//     post_id: post.id,
//     ...post,
//     votes: post.votes + 1,
//   })
//   return res.data
// }

// const downVotePost = async (post: Post) => {
//   const res = await axios.put('/forum/post', {
//     ...post,
//     post_id: post.id,
//     votes: post.votes - 1,
//   })
//   return res.data
// }

const getPost = async (postId: number) => {
  const res = await axios.get('/forum/find', { params: { id: postId } })
  return res.data
}

export const PostPage: FunctionComponent = () => {
  const { dispatch } = useStore()
  const { id } = useParams()
  const postId = parseInt(id ?? '') || 0
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(dispatch, true)
        const post = await getPost(postId)
        setPost(post)
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchPost()
  }, [])

  return (
    <Container className="mt-2">
      <h5>{post?.title}</h5>
      <section className="description-section">
        <p>{post?.description}</p>
      </section>
      <section>
        <h5>Comments</h5>
        {post?.comments && (
          <>
            {post.comments.map((comment: Comment) => (
              <>{JSON.stringify(comment)}</>
            ))}
          </>
        )}
      </section>
    </Container>
  )
}
