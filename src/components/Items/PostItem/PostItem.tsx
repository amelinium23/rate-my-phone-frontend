import './index.css'

import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ArrowBigDown, ArrowBigTop } from 'tabler-icons-react'

import { useStore } from '../../../context'
import { Post, User } from '../../../types'
import { COLORS } from '../../../utils/constants'

interface PostItemProps {
  post: Post
  isEditingEnable: boolean
}

const getUser = async (uid: string) => {
  const res = await axios.get(`/user`, { params: { uid: uid } })
  return res.data
}

const deletePost = async (postId: string, token: string) => {
  const res = await axios.delete(`/forum/post`, {
    data: { post_id: postId },
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

const upVotePost = async (post: Post, token: string) => {
  const res = await axios.put(
    '/forum/post',
    {
      post_id: post.id,
      ...post,
      votes: post.votes + 1,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

const downVotePost = async (post: Post, token: string) => {
  const res = await axios.put(
    '/forum/post',
    {
      post_id: post.id,
      ...post,
      votes: post.votes - 1,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

export const PostItem: FunctionComponent<PostItemProps> = ({
  post,
  isEditingEnable = false,
}) => {
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
    console.log(`haha`)
  }

  const handleDelete = async () => {
    try {
      const res = await deletePost(
        post.id,
        (await state.auth.currentUser?.getIdToken()) ?? ''
      )
      console.log(res)
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
        <p>{post.description.slice(0, 99)}</p>
        <p>Posted by {user?.display_name || 'stranger'}</p>
      </Card.Body>
      <Card.Footer className="post-footer p-1">
        {firebaseUser && (
          <>
            <span className="mx-1">Votes {post.votes}</span>
            <Button
              className="p-0"
              variant="outline-light"
              onClick={async () =>
                upVotePost(
                  post,
                  (await state.auth.currentUser?.getIdToken()) ?? ''
                )
              }
            >
              <ArrowBigTop size={20} strokeWidth={0.6} color={'black'} />
            </Button>
            <Button
              className="mx-1 p-0"
              variant="outline-light"
              onClick={async () =>
                downVotePost(
                  post,
                  (await state.auth.currentUser?.getIdToken()) ?? ''
                )
              }
            >
              <ArrowBigDown size={20} strokeWidth={0.6} color={'black'} />
            </Button>
          </>
        )}
        {isEditingEnable && (
          <>
            <Button className="float-end" onClick={handleEdit}>
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
