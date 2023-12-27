import React from 'react';
import { Alert, Container } from 'react-bootstrap';

const Message = ({
  variant = 'info',
  children,
}: {
  variant: string;
  children: React.ReactNode;
}) => {
  return (
    <Container fluid>
      <Alert variant={variant} className='t'>
        {children}
      </Alert>
    </Container>
  );
};

export default Message;
