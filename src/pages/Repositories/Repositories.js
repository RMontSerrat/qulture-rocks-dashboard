import React, { useEffect, useContext, useState } from 'react';
import { UserContainer } from '../../store';
import { apiUrl } from '../../config';
import Loading from '../../components/Loading/Loading';
import { 
  UserContext,
  START_RESULT_REPOSITORIES, 
  SUCCESS_RESULT_REPOSITORIES,
  ERROR_RESULT_REPOSITORIES,
  RESET_USERS,
} from '../../store';
import Form from '../../components/Form/Form';

const Repositories = ({
    match: { params: { id } },
  }) => {
  const { state: { data, loading }, dispatch } = useContext(UserContext);

  const fetchData = async () => {
    dispatch({ type: START_RESULT_REPOSITORIES });
    const response = await fetch(`${apiUrl}/users/${id}`);
    if (response) {
      const { user: data } = await response.json();
      dispatch({ type: SUCCESS_RESULT_REPOSITORIES, data });
    } else {
      dispatch({ type: ERROR_RESULT_REPOSITORIES, error: 'Erro de servidor' });
    }
  }

  useEffect(() => {
    fetchData();
    return resetUser;
  }, []);
  
  const handleSubmit = fields => {
    console.log('fields', fields);
  }

  const resetUser = () => {
    dispatch({ type: RESET_USERS });
  }

  return (
    <div>
      {loading && <Loading />}
      {data && <Form {...data} onSubmit={handleSubmit} />}
    </div>
  )
}

export default Repositories;