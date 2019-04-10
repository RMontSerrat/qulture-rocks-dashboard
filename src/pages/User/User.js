import React, { useEffect, useContext } from 'react';
import Container from '../../components/Container/Container';
import Loading from '../../components/Loading/Loading';
import { 
  UserContext,
  START_UPDATE_USER,
  SUCCESS_UPDATE_USER,
  ERROR_UPDATE_USER,
  START_RESULT_USER,
  SUCCESS_RESULT_USER,
  ERROR_RESULT_USER,
  RESET_USERS,
} from '../../store/modules';
import Form from '../../components/Form/Form';
import services from '../../store/services';
import Header from '../../components/Header/Header';

const Repositories = ({
    match: { params: { id } },
  }) => {
  const { state: { data, loading, loadingUpdateUser }, dispatch } = useContext(UserContext);

  const updateUser = async ({ fields }) => {
    try {
      dispatch({ type: START_UPDATE_USER });
      const { data } = await services.updateUser({ fields, id });
      dispatch({ type: SUCCESS_UPDATE_USER, data });
      return { data };
    } catch {
      dispatch({ type: ERROR_UPDATE_USER });
      return { data: null, error: true }
    }
  }
  
  const getUser = async id => {
    try {
      dispatch({ type: START_RESULT_USER });
      const { data } = await services.getUser(id);
      dispatch({ type: SUCCESS_RESULT_USER, data });
      return { data };
    } catch {
      dispatch({ type: ERROR_RESULT_USER });
      return { data: null, error: true }
    }
  }

  const resetUser = () => {
    dispatch({ type: RESET_USERS });
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
      {loading && <Loading />}
      {data && <Form {...data} loading={loadingUpdateUser} onSubmit={handleSubmit} />}
    </Container>
  )
}

export default Repositories;