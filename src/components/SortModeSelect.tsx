import { ChangeEvent, FunctionComponent, useState } from 'react'
import { Form } from 'react-bootstrap'

interface SortModeSelectProps {
  sortModes: string[]
}

export const SortModeSelect: FunctionComponent<SortModeSelectProps> = ({
  sortModes,
}) => {
  const [sortingMode, setSortingMode] = useState(sortModes[0])

  const onSortModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortingMode(e.target.value)
  }

  return (
    <Form.Select size="sm" value={sortingMode} onChange={onSortModeChange}>
      {sortModes.map((sortMode: string) => (
        <option key={sortMode}>
          {sortMode.charAt(0).toLocaleUpperCase() + sortMode.slice(1)}
        </option>
      ))}
    </Form.Select>
  )
}
