import { FunctionComponent } from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router'

import { PostForm } from '../../components/forms'
import { Post } from '../../types'

export const EditPostPage: FunctionComponent = () => {
  const { state } = useLocation()
  const post = state as Post

  return (
    <Container className="mt-2">
      <h5 className="text-center">Edit post with title {post?.title}</h5>
      <PostForm post={post} isEditingEnable={true} />
    </Container>
  )
}
