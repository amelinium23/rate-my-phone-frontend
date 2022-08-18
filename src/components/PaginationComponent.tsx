import { FunctionComponent } from 'react'
import { Pagination } from 'react-bootstrap'

interface PaginationComponentProps {
  totalPages: number
}

export const PaginationComponent: FunctionComponent<
  PaginationComponentProps
> = ({ totalPages }) => {
  console.log(totalPages)

  return (
    <Pagination>
      <Pagination.Prev />

      <Pagination.Next />
    </Pagination>
  )
}
