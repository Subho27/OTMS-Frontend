import React from 'react'
import './FormContainer.css'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container className="form-page">
      <Row className='justify-content-md-center' >
        <Col xs={12}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer