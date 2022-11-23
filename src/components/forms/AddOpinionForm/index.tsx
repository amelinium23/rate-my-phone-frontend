import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { useStore } from '../../../context'
import { addOpinion } from '../../../services/OpinionService'
import { Opinion } from '../../../types'

interface AddOpinionFormProps {
  deviceKey: string
  setIsAddingEnable: (isAddingOpinion: boolean) => void
}

export const AddOpinionForm = ({
  deviceKey,
  setIsAddingEnable,
}: AddOpinionFormProps) => {
  const { state } = useStore()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const firebaseUser = state.auth.currentUser

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const newOpinion = {
        title,
        description,
        deviceKey,
        uid: firebaseUser?.uid,
      } as Opinion
      const token = (await firebaseUser?.getIdToken()) ?? ''
      const res: Opinion = await addOpinion(newOpinion, token)
      setIsAddingEnable(false)
      toast.success(`Added opinion with title ${res.title}!`)
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mt-1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          isInvalid={title.length === 0}
          isValid={title.length > 0}
          type="text"
          placeholder="Superb!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          isInvalid={description.length === 0}
          isValid={description.length > 0}
          as="textarea"
          type="text"
          placeholder="I've been using this device for a while and I'm very satisfied with it!"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button
        disabled={title.length === 0 || description.length === 0}
        className="mt-1"
        type="submit"
        variant="light"
      >
        Add opinion
      </Button>
    </Form>
  )
}
