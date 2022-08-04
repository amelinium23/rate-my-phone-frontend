import { FunctionComponent } from 'react'
import { Spinner } from 'react-bootstrap'

import '../css/Loader.css'

interface LoaderProps {
  isLoading: boolean
  loadingText?: string
}

export const Loader: FunctionComponent<LoaderProps> = ({
  isLoading,
  loadingText,
}) => {
  const loaderStyle = {
    display: isLoading ? 'flex' : 'none',
  }

  return (
    <div style={loaderStyle} className="loadingWrapper">
      <Spinner animation="grow" variant="secondary">
        <span>{loadingText}</span>
      </Spinner>
    </div>
  )
}
