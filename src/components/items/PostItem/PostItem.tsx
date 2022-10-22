import './postItemStyle.css'

import { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ArrowBigDown, ArrowBigTop } from 'tabler-icons-react'

import { useStore } from '../../../context'
import { Post, User } from '../../../types'
import { COLORS } from '../../../utils/constants'
import {
  deletePost,
  downVotePost,
  getUser,
  upVotePost,
} from './PostItemService'

interface PostItemProps {
  post: Post
  handleEditPost: (post: Post) => void
  handleDeletePost: (post: Post) => void
  isEditingEnable?: boolean
}

export const PostItem = ({
  post,
  handleDeletePost,
  handleEditPost,
  isEditingEnable = false,
}: PostItemProps) => {
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

  const handleUpVote = async () => {
    upVotePost(post, (await firebaseUser?.getIdToken()) ?? '')
    handleEditPost({ ...post, votes: post.votes + 1 } as Post)
  }

  const handleDownVote = async () => {
    downVotePost(post, (await firebaseUser?.getIdToken()) ?? '')
    if (post.votes > 0) {
      handleEditPost({ ...post, votes: post.votes - 1 } as Post)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deletePost(
        post.id,
        (await firebaseUser?.getIdToken()) ?? ''
      )
      handleDeletePost(post)
      toast.success(res)
    } catch (e) {
      toast.error((e as Error).message)
    }
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
        {user && <p>Posted by {user?.display_name || 'stranger'}</p>}
      </Card.Body>
      <Card.Footer className="post-footer">
        {firebaseUser && (
          <>
            <span className="mx-1">Votes {post.votes}</span>
            <Button
              className="p-0"
              variant="outline-light"
              onClick={handleUpVote}
            >
              <ArrowBigTop size={20} strokeWidth={0.6} color={'black'} />
            </Button>
            <Button
              className="mx-1 p-0"
              variant="outline-light"
              onClick={handleDownVote}
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
