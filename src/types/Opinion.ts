import { FirebaseUser } from '.'

export type Opinion = {
  uid: string
  id: string
  deviceKey: string
  title: string
  description: string
  user: FirebaseUser
}
