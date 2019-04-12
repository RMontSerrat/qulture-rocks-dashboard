import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const START_CREATE_USER = 'startCreateUser';
export const SUCCESS_CREATE_USER = 'successCreateUser';
export const ERROR_CREATE_USER = 'errorCreateUser';
export const DISMISS_ERROR_CREATE_USER = 'dismissErrorCreateUser';
export const RESET_CREATE_USER = 'resetCreateUser';

const createUserInitialState = {
  userId: null,
  loading: false,
  error: false,
  success: false,
}

export const CreateUserContext = createContext(createUserInitialState);

export const createUserReducer = (state, action) => {
  switch (action.type) {
    case START_CREATE_USER:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_CREATE_USER:
      return {
        ...state,
        loading: false,
        userId: action.data.id,
        success: true,
      };
    case ERROR_CREATE_USER:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DISMISS_ERROR_CREATE_USER:
      return {
        ...state,
        error: false,
      };
    case RESET_CREATE_USER:
      return createUserInitialState;
    default:
      throw new Error();
  }
}

const CreateUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(createUserReducer, createUserInitialState);
  return (
    <CreateUserContext.Provider value={{state, dispatch}}>
      {children}
    </CreateUserContext.Provider>
  )
}

CreateUserProvider.propTypes = {
  children: PropTypes.node,
}

export default CreateUserProvider;