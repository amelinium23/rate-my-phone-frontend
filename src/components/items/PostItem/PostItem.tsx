import './postItemStyle.css'

import { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ArrowBigDown, ArrowBigTop } from 'tabler-icons-react'

import { useStore } from '../../../context'
import { Post, User } from '../../../types'
import { COLORS } from '../../../utils/constants'
import { deletePost, downVotePost, getUser, upVotePost } from './postService'

interface PostItemProps {
  post: Post
  isEditingEnable?: boolean
}

export const PostItem = ({ post, isEditingEnable = false }: PostItemProps) => {
  const navigate = useNavigate()
  const { state } = useStore()
  const [user, setUser] = useState<User | null>(null)
  const firebaseUser = state.auth.currentUser

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(post.uid)
        setUser(user)
      } catch (e) {
        toast.error((e as Error).message)
      }
    }
    fetchUser()
  }, [])

  const handleNavigate = () => {
    navigate(`/post/p/${post.id}`)
  }

  const handleEdit = () => {
    navigate(`/edit-post/p/${post.id}`, { state: post })
  }

  const handleDelete = async () => {
    try {
      const res = await deletePost(
        post.id,
        (await firebaseUser?.getIdToken()) ?? ''
      )
      toast.success(res)
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  return (
    <Card className="my-1 post-item">
      <Card.Header className="post-header">
        <h5>{post.title} </h5>
        <span style={COLORS[post.type]} className="post-type">
          {post.type}
        </span>
      </Card.Header>
      <Card.Body onClick={handleNavigate}>
        <p>{post.description}</p>
        <p>Posted by {user?.display_name || 'stranger'}</p>
      </Card.Body>
      <Card.Footer className="post-footer">
        {firebaseUser && (
          <>
            <span className="mx-1">Votes {post.votes}</span>
            <Button
              className="p-0"
              variant="outline-light"
              onClick={async () =>
                upVotePost(post, (await firebaseUser?.getIdToken()) ?? '')
              }
            >
              <ArrowBigTop size={20} strokeWidth={0.6} color={'black'} />
            </Button>
            <Button
              className="mx-1 p-0"
              variant="outline-light"
              onClick={async () =>
                downVotePost(post, (await firebaseUser?.getIdToken()) ?? '')
              }
            >
              <ArrowBigDown size={20} strokeWidth={0.6} color={'black'} />
            </Button>
          </>
        )}
        {isEditingEnable && (
          <>
            <Button
              variant="outline-primary"
              className="float-end"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              className="mx-1 float-end"
              variant="outline-danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}
      </Card.Footer>
    </Card>
  )
}
