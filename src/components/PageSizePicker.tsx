import { ChangeEvent, FunctionComponent } from 'react'
import { Form } from 'react-bootstrap'
import { setPageSize } from '../contexts/Actions'
import { useStore } from '../contexts/Store'
import { pageSizes } from '../utils/constants'

export const PageSizePicker: FunctionComponent = () => {
  const { state, dispatch } = useStore()

  const onPageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = parseInt(e.target.value, 10)
    setPageSize(dispatch, pageSize)
  }

  return (
    <Form.Select
      size="sm"
      value={state.brandsPageNumber}
      onChange={onPageSizeChange}
    >
      {pageSizes.map((pageSize: number) => (
        <option key={pageSize}>{pageSize}</option>
      ))}
    </Form.Select>
  )
}
