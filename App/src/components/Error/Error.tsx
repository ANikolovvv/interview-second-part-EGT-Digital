import React from 'react';
import { Alert } from 'antd';

type ErrorProps = {
  message: string;
 
};

const Errors: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Alert
      message={message}
      type="error"
      showIcon
    />
  );
};

export default Errors;