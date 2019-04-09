import React, { useEffect, useContext } from 'react';
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

const Repositories = ({
    match: { params: { id } },
  }) => {
  const { state: { data, loading, loadingUpdateUser }, dispatch } = useContext(UserContext);

  const updateUser = async ({ fields, id }) => {
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
    updateUser({ fields, id });
  }

  useEffect(() => {
    fetchData();
    return resetUser;
  }, []);
  
  return (
    <div>
      {loading && <Loading />}
      {data && <Form {...data} loading={loadingUpdateUser} onSubmit={handleSubmit} />}
    </div>
  )
}

export default Repositories;