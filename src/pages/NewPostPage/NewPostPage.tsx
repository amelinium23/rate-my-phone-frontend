import { FunctionComponent } from 'react'
import { Container } from 'react-bootstrap'

import { NewPostForm } from '../../components/forms'

export const NewPostPage: FunctionComponent = () => {
  return (
    <Container className="my-2">
      <h5 className="text-center">New post</h5>
      <NewPostForm />
    </Container>
  )
}
