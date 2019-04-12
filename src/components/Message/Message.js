import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const variantColor = {
  success: green[600],
  error: red[600],
}

const Message = styled.span`
  display: flex;
  align-items: center;
`

const StyledSnackbarContent = styled(SnackbarContent)`
  &.SnackbarContent {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    background: ${props => variantColor[props.variant]}
  }
`

const MessageContent = ({ className, message, onClose, variant, ...rest }) => {
  const Icon = variantIcon[variant];
  const StyledIcon = styled(Icon)`
    font-size: 20px;
    opacity: 0.9;
    margin-right: 5px;
  `
  return (
    <StyledSnackbarContent
      className="SnackbarContent"
      variant={variant}
      aria-describedby="client-snackbar"
      message={
        <Message id="client-snackbar">
          <StyledIcon />
          {message}
        </Message>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...rest}
    />
  );
}

MessageContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'error']).isRequired,
};

const MessageContainer = ({ open, ...rest }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
    >
      <MessageContent {...rest} />
    </Snackbar>
  );
}

MessageContainer.propTypes = {
  open: PropTypes.bool,
};

export default MessageContainer;
