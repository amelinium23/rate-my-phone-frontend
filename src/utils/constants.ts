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

export const phonesPageSizes = [10, 20, 50]

export const brandsPageSizes = [20, 40, 100]

export const PHOTO_URL =
  'https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'

export const COLORS = {
  [PostType.QUESTION]: { background: '#f8f9fa', color: 'black' },
  [PostType.DISCUSSION]: { background: '#8d6a9f', color: 'white' },
  [PostType.LISTING]: { background: '#0aa18f', color: 'white' },
}
