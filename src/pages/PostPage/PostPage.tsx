import './index.css'

import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

import { setIsLoading, useStore } from '../../context'
import { Comment, Post } from '../../types'

const getPost = async (postId: string) => {
  const res = await axios.get('/forum/find', { params: { id: postId } })
  return res.data
}

export const PostPage: FunctionComponent = () => {
  const { dispatch } = useStore()
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(dispatch, true)
        const post = await getPost(id || '')
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
        <Button variant="primary">Add comment</Button>
      </section>
    </Container>
  )
}
