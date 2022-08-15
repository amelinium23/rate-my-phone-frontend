import { FunctionComponent } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import { Post } from '../../types/Post'
import { ArrowBigTop, ArrowBigDown } from 'tabler-icons-react'

interface PostItemProps {
  post: Post
}

export const PostItem: FunctionComponent<PostItemProps> = ({ post }) => {
  return (
    <Card className="my-1 p-3">
      <h5>{post.title}</h5>
      <p>{post.description}</p>
      <Container className="p-0">
        <p>Votes</p>
        <Button className="me-1" variant="outline-light">
          <ArrowBigTop size={15} stroke="black" />
        </Button>
        <Button variant="outline-light">
          <ArrowBigDown size={15} stroke="black" />
        </Button>
      </Container>
    </Card>
  )
}
