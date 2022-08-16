import { FunctionComponent } from 'react'
import { Spinner } from 'react-bootstrap'

import '../css/Loader.css'

interface LoaderProps {
  isLoading: boolean
}

export const Loader: FunctionComponent<LoaderProps> = ({ isLoading }) => {
  const loaderStyle = {
    display: isLoading ? 'flex' : 'none',
  }

  return (
    <div style={loaderStyle} className="loadingWrapper">
      <Spinner animation="grow" variant="secondary" />
    </div>
  )
}
