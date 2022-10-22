import { PostType } from '../types/Post'

export const notUsedKeysDetailsPage = [
  'pictures',
  'more_specification',
  'key',
  'prices',
  'more_information',
  'device_image',
]
export const sortingModes = ['ascending', 'descending']
export const postSortingKeys = ['Votes', 'Title', 'Description']
export const phonesPageSizes = [10, 20, 50]
export const brandsPageSizes = [20, 40, 100]
export const COLORS = {
  [PostType.QUESTION]: { background: '#f8f9fa', color: 'black' },
  [PostType.DISCUSSION]: { background: '#8d6a9f', color: 'white' },
  [PostType.LISTING]: { background: '#0aa18f', color: 'white' },
  '': { background: '#ffffff', color: 'white' },
}
export const PHOTO_URL =
  'https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'
export const backgroundImageUrl =
  'https://images.unsplash.com/photo-1523371683773-affcb4a2e39e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
