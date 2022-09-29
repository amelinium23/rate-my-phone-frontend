import './index.css'

import { FunctionComponent } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import { Post } from '../../../types/Post'

interface PostItemProps {
  post: Post
}

export const PostItem: FunctionComponent<PostItemProps> = ({ post }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/post/p/${post.id}`)
  }

  return (
    <Card className="my-1 p-2 post-item" onClick={handleNavigate}>
      <h5>{post.title}</h5>
      <p>{post.description}</p>
      <Container className="p-0 mb-0">
        <p>Votes {post.votes}</p>
      </Container>
    </Card>
  )
}
