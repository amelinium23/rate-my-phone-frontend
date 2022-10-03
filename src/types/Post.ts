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
}

export interface Comment {
  id: string
  votes: number
  comment?: string
}
