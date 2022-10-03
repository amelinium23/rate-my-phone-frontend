import './index.css'

import { FunctionComponent } from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import { Post, PostType } from '../../../types/Post'

interface PostItemProps {
  post: Post
}

const COLORS = {
  [PostType.QUESTION]: { background: '#f8f9fa', color: 'black' },
  [PostType.DISCUSSION]: { background: '#8d6a9f', color: 'white' },
  [PostType.LISTING]: { background: '#0aa18f', color: 'white' },
}

export const PostItem: FunctionComponent<PostItemProps> = ({ post }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/post/p/${post.id}`)
  }

  return (
    <Card className="my-1 post-item">
      <Card.Header className="post-header">
        <h5>
          {post.title}{' '}
          <span style={COLORS[post.type]} className="post-type">
            {post.type}
          </span>
        </h5>
      </Card.Header>
      <Card.Body onClick={handleNavigate}>
        <p>{post.description}</p>
        <p>Votes {post.votes}</p>
      </Card.Body>
    </Card>
  )
}
