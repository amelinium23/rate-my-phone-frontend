import { Container } from 'react-bootstrap'

import { Opinion } from '../../types/Opinion'
import OpinionItem from '../items/OpinionItem'

interface OpinionContainerProps {
  opinions: Opinion[]
}

export default function OpinionContainer({ opinions }: OpinionContainerProps) {
  return (
    <Container>
      {opinions.length > 0 ? (
        opinions.map((opinion) => (
          <OpinionItem key={opinion.id} opinion={opinion} />
        ))
      ) : (
        <div>No opinions yet</div>
      )}
    </Container>
  )
}
