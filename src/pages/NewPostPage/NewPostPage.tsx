import { Container } from 'react-bootstrap'

import { PostForm } from '../../components/forms/PostForm'

export const NewPostPage = () => {
  return (
    <Container className="my-2">
      <h5 className="text-center">New post</h5>
      <PostForm />
    </Container>
  )
}
