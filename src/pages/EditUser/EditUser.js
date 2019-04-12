import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from '../../components/Container/Container';
import LoadingContainer from '../../components/Loading/LoadingContainer';
import { 
  EditUserContext,
  START_UPDATE_USER,
  SUCCESS_UPDATE_USER,
  ERROR_UPDATE_USER,
  START_RESULT_USER,
  SUCCESS_RESULT_USER,
  ERROR_RESULT_USER,
  DISMISS_ERROR_UPDATE_USER,
  DISMISS_SUCCESS_UPDATE_USER,
  RESET_USERS,
} from '../../providers/EditUserProvider';
import UserForm from '../../components/UserForm/UserForm';
import services from '../../services/user';
import Header from '../../components/Header/Header';
import ErrorMessage from '../../components/Message/ErrorMessage';
import SuccessMessage from '../../components/Message/SuccessMessage';


const ResultContainer = styled.div`
  > .Loading {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
`
const EditUser = ({
    match: { params: { id } },
    history,
  }) => {
  const { 
    state: { 
      data, 
      loadingGetUser, 
      loadingUpdateUser,
      successUpdateUser,
      errorUpdateUser,
    }, 
    dispatch
  } = useContext(EditUserContext);

  const updateUser = async ({ fields }) => {
    try {
      dispatch({ type: START_UPDATE_USER });
      const { data } = await services.updateUser({ fields, id });
      dispatch({ type: SUCCESS_UPDATE_USER, data });
      return { data };
    } catch (error) {
      dispatch({ type: ERROR_UPDATE_USER, error });
      return { data: null, error: true }
    }
  }
  
  const getUser = async id => {
    try {
      dispatch({ type: START_RESULT_USER });
      const { data } = await services.getUser(id);
      dispatch({ type: SUCCESS_RESULT_USER, data });
      return { data };
    } catch (error) {
      dispatch({ type: ERROR_RESULT_USER, error });
      return { data: null, error: true }
    }
  }

  const resetUser = () => {
    dispatch({ type: RESET_USERS });
  }

  const dismissError = () => {
    dispatch({ type: DISMISS_ERROR_UPDATE_USER });
  }

  const dismissSuccess = () => {
    dispatch({ type: DISMISS_SUCCESS_UPDATE_USER });
  }
  
  const fetchData = () => {
    getUser(id);
  }

  const handleSubmit = fields => {
    updateUser({ fields });
  }

  useEffect(() => {
    fetchData();
    return resetUser;
  }, []);
  return (
    <Container>
      <Header title="Editar usuário" />
      <ResultContainer data-testid="resultContainer">
        {loadingGetUser && <LoadingContainer />}
        {data && 
          <UserForm
            loading={loadingUpdateUser}
            onSubmit={handleSubmit}
            onCancel={() => history.push('/')}
            {...data}
          />
        }
      </ResultContainer>
      <ErrorMessage open={errorUpdateUser} onClose={dismissError} />
      <SuccessMessage
        open={successUpdateUser}
        onClose={dismissSuccess} 
        message="Usuário editado com sucesso"
      />
    </Container>
  )
}

EditUser.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
}

export default EditUser;