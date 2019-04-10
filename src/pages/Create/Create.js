import React, { useContext } from 'react';
import { 
  UserContext,
  START_CREATE_USER,
  SUCCESS_CREATE_USER,
  ERROR_CREATE_USER,
} from '../../store/modules';
import services from '../../store/services';
import Form from '../../components/Form/Form';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';

const Create = ({
    history,
  }) => {
  const { state: { loadingCreateUser }, dispatch } = useContext(UserContext);

  const createUser = async fields => {
    try {
      dispatch({ type: START_CREATE_USER });
      const { data } = await services.createUser(fields);
      dispatch({ type: SUCCESS_CREATE_USER, data });
      return { data };
    } catch {
      dispatch({ type: ERROR_CREATE_USER });
      return { data: null, error: true }
    }
  }
  
  const handleSubmit = async fields => {
    const { data } = await createUser(fields);
    if (data) {
      history.push(`/user/${data.id}`);
    }
  }

  return (
    <Container>
      <Header title="Criar novo usuário" />
      <Form loading={loadingCreateUser} onSubmit={handleSubmit} />
    </Container>
  )
}

export default Create;