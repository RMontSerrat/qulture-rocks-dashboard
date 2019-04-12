import React from 'react';
import PropTypes from 'prop-types';
import MessageContainer from './Message';

const ErrorMessage = ({ message = "Ocorreu um erro de servidor.", ...rest }) => 
  <MessageContainer variant="error" message={message} {...rest} />

ErrorMessage.propTypes = {
  message: PropTypes.string,
}

export default ErrorMessage;
