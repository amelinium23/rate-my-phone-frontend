import { Button, Card } from 'react-bootstrap'
import { ArrowBigDown, ArrowBigTop } from 'tabler-icons-react'

import { useStore } from '../../context'
import { Comment } from '../../types'

interface CommentItemProps {
  comment: Comment
  postAuthorId: string
  postId: string
}

export default function CommentItem({
  comment,
  postAuthorId,
  postId,
}: CommentItemProps) {
  const { state } = useStore()

  console.log(postAuthorId, postId)

  return (
    <Card>
      <Card.Body>{comment.comment}</Card.Body>
      {state.auth.currentUser && (
        <Card.Footer>
          <span className="mx-1">Votes {comment.votes}</span>
          <Button className="p-0" variant="outline-light">
            <ArrowBigTop size={20} strokeWidth={0.6} color={'black'} />
          </Button>
          <Button className="mx-1 p-0" variant="outline-light">
            <ArrowBigDown size={20} strokeWidth={0.6} color={'black'} />
          </Button>
        </Card.Footer>
      )}
    </Card>
  )
}
