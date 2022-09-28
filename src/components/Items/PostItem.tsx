import axios from 'axios'
import { FunctionComponent } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { Post } from '../../types/Post'
import { ArrowBigDown, ArrowBigTop } from 'tabler-icons-react'
import { useStore } from '../../contexts/Store'

interface PostItemProps {
  post: Post
}

const upVotePost = async (post: Post) => {
  const res = await axios.put('/forum/post', {
    post_id: post.id,
    ...post,
    votes: post.votes + 1,
  })
  return res.data
}

const downVotePost = async (post: Post) => {
  const res = await axios.put('/forum/post', {
    ...post,
    post_id: post.id,
    votes: post.votes - 1,
  })
  return res.data
}

export const PostItem: FunctionComponent<PostItemProps> = ({ post }) => {
  const { state } = useStore()

  return (
    <Card className="my-1 p-2">
      <h5>{post.title}</h5>
      <p>{post.description}</p>
      <Container className="p-0 mb-0">
        <p>Votes {post.votes}</p>
        {state.auth.currentUser && (
          <>
            <Button
              style={{ marginRight: '5px' }}
              onClick={() => upVotePost(post)}
              size="sm"
              variant="outline-light"
            >
              <ArrowBigTop size={15} stroke="black" />
            </Button>
            <Button
              onClick={() => downVotePost(post)}
              size="sm"
              variant="outline-light"
            >
              <ArrowBigDown size={15} stroke="black" />
            </Button>
          </>
        )}
      </Container>
    </Card>
  )
}
