import { Dispatch, FunctionComponent } from 'react'
import { Pagination } from 'react-bootstrap'

import { useStore } from '../../context/Store'
import { Action } from '../../context/types/StoreTypes'

interface PaginationComponentProps {
  currentPage: number
  dataLength: number
  pageSize: number
  onPageChange: (dispatch: Dispatch<Action>, pageNumber: number) => void
}

export const PaginationComponent: FunctionComponent<
  PaginationComponentProps
> = ({ currentPage, dataLength, pageSize, onPageChange }) => {
  const { dispatch } = useStore()
  const pageNumbers = Array.from(
    { length: dataLength / pageSize },
    (_, k) => k + 1
  )

  const onPrevPage = () => {
    onPageChange(dispatch, currentPage - 1)
  }

  const onNextPage = () => {
    onPageChange(dispatch, currentPage + 1)
  }

  const onPageClick = (pageNumber: number) => {
    onPageChange(dispatch, pageNumber)
  }

  return (
    <Pagination size="sm">
      <Pagination.Prev
        disabled={currentPage === pageNumbers[0]}
        onClick={onPrevPage}
      />
      {pageNumbers.map((pageNumber) => (
        <Pagination.Item
          onClick={() => onPageClick(pageNumber)}
          active={currentPage === pageNumber}
          key={pageNumber}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
        onClick={onNextPage}
      />
    </Pagination>
  )
}
