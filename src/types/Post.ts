import { User } from './User'

export enum PostType {
  DISCUSSION = 'discussion',
  QUESTION = 'question',
  LISTING = 'listing',
}

export interface Post {
  id: string
  title: string
  description: string
  uid: string
  votes: number
  type: PostType.DISCUSSION | PostType.QUESTION | PostType.LISTING
  device_key: string
  images: string[]
  comments?: Comment[]
  user: User
}

export interface Comment {
  id: string
  uid: string
  votes: number
  comment: string
}
