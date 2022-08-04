export interface Post {
  id: number
  title: string
  description: string
  uid: string
  votes: number
  images: string[]
  comments?: Comment[]
}

export interface Comment {
  id: number
  votes: number
  comment?: string
}
