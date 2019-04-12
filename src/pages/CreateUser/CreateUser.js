import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  CreateUserContext,
  START_CREATE_USER,
  SUCCESS_CREATE_USER,
  ERROR_CREATE_USER,
  DISMISS_ERROR_CREATE_USER,
  RESET_CREATE_USER,
} from '../../providers/CreateUserProvider';
import services from '../../services/user';
import UserForm from '../../components/UserForm/UserForm';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import ErrorMessage from '../../components/Message/ErrorMessage';
import SuccessMessage from '../../components/Message/SuccessMessage';

const Create = ({
    history,
  }) => {
  const { state: { loading, error, success, userId }, dispatch } = useContext(CreateUserContext);
  const createUser = async fields => {
    try {
      dispatch({ type: START_CREATE_USER });
      const { data } = await services.createUser(fields);
      dispatch({ type: SUCCESS_CREATE_USER, data });
      setTimeout(() => redirectToUser(data.id), 3000);
      return { data };
    } catch (error) {
      dispatch({ type: ERROR_CREATE_USER });
      return { data: null, error }
    }
  }

  useEffect(() => {
    return () => reset();
  }, [])

  const handleSubmit = fields => {
    createUser(fields);
  }

  const redirectToUser = id => {
    if (id) {
      history.push(`/user/${id}`);
    }
  }

  const reset = () => {
    dispatch({ type: RESET_CREATE_USER });
  }

  const dismissError = () => {
    dispatch({ type: DISMISS_ERROR_CREATE_USER });
  }

  return (
    <Container>
      <Header title="Criar novo usuário" />
      <UserForm
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={() => history.push('/')} 
      />
      <ErrorMessage open={error} onClose={dismissError} />
      <SuccessMessage
        open={success}
        onClose={() => history.push(`/user/${userId}`)} 
        message="Usuário cadastrado com sucesso" 
      />
    </Container>
  )
}

Create.propTypes = {
  history: PropTypes.object,
}

export default Create;