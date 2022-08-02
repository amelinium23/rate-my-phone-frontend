import { FunctionComponent } from 'react'
import { Card } from 'react-bootstrap'
import { Post } from '../types/Post'

interface IProps {
  post: Post
}

export const PostItem: FunctionComponent<IProps> = ({ post }) => {
  return (
    <Card className="m-1 p-3">
      <h5>{post.title}</h5>
      <p>{post.description}</p>
    </Card>
  )
}
