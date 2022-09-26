export enum PostType {
  DISCUSSION = 'discussion',
  QUESTION = 'question',
  LISTING = 'listing',
}

export interface Post {
  id: number
  title: string
  description: string
  uid: string
  votes: number
  type: PostType.DISCUSSION | PostType.QUESTION | PostType.LISTING
  images: string[]
  comments?: Comment[]
}

export interface Comment {
  id: number
  votes: number
  comment?: string
}
