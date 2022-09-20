import { FunctionComponent } from 'react'
import { Card, Container, Image } from 'react-bootstrap'
import { Phone } from '../../types/Device'
import { Link } from 'react-router-dom'

interface PhoneItemProps {
  phone: Phone
}

export const PhoneItem: FunctionComponent<PhoneItemProps> = ({ phone }) => {
  return (
    <Card className="d-flex container justify-content-center my-2 text-center p-1">
      <p className="pt-3">{phone.device_name}</p>
      <Container className="p-0">
        <Link to={`/details/k/${phone.key}/d/${phone.device_name}`}>
          <Image src={phone.device_image} width={100} />
        </Link>
      </Container>
    </Card>
  )
}
