import { FunctionComponent, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { setPageNumber } from '../contexts/Actions'
import { useStore } from '../contexts/Store'

interface PaginationComponentProps {
  currentPage: number
  totalPages: number
}

export const PaginationComponent: FunctionComponent<
  PaginationComponentProps
> = ({ currentPage, totalPages }) => {
  const { dispatch } = useStore()
  const [pageNumbers] = useState(
    Array.from({ length: totalPages }, (_, k) => k + 1)
  )
  console.log(pageNumbers)

  const onPrevPage = () => {
    setPageNumber(dispatch, currentPage - 1)
  }

  const onNextPage = () => {
    setPageNumber(dispatch, currentPage + 1)
  }

  const onPageClick = (pageNumber: number) => {
    setPageNumber(dispatch, pageNumber)
  }

  return (
    <Pagination size="sm">
      <Pagination.Prev disabled={currentPage === 1} onClick={onPrevPage} />
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
        disabled={currentPage === totalPages}
        onClick={onNextPage}
      />
    </Pagination>
  )
}
