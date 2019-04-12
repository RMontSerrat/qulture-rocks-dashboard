import React from 'react';
import PropTypes from 'prop-types';
import MessageContainer from './Message';

const SuccessMessage = ({ message = "Realizado com sucesso", ...rest }) => 
  <MessageContainer variant="success" message={message} {...rest} />

  SuccessMessage.propTypes = {
  message: PropTypes.string,
}
  
export default SuccessMessage;
