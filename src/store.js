import React, { useReducer, createContext } from 'react';

export const START_RESULTUSERS = 'startResultUsers';
export const SUCCESS_RESULTUSERS = 'successResultUsers';
export const ERROR_RESULTUSERS = 'errorResultUsers';
export const START_RESULT_REPOSITORIES = 'startResultRepositories';
export const SUCCESS_RESULT_REPOSITORIES = 'successResultRepositories';
export const ERROR_RESULT_REPOSITORIES = 'errorResultRepositories';
export const RESET_USERS = 'resetUsers';

const transformDate = date => new Date(Date.parse(`${date}T00:00:00-03:00`)).toLocaleDateString();

const initialState = {
  data: null,
  loading: false,
  error: false,
  currentUser: null,
}

const userInitialState = {
  data: null,
  loading: false,
  error: false,
}

export const StoreContext = createContext(initialState);
export const UserContext = createContext(userInitialState);

const reducer = (state, action) => {
  switch (action.type) {
    case START_RESULTUSERS:
      return {
        ...state,
        loading: true,
        currentSearch: action.query,
      };
    case SUCCESS_RESULTUSERS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ERROR_RESULTUSERS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      throw new Error();
  }
}

const userReducer = (state, action) => {
  switch (action.type) {
    case START_RESULT_REPOSITORIES:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_RESULT_REPOSITORIES:
      return {
        ...state,
        loading: false,
        data: {
          ...action.data,
          jobTitle: action.data.job_title,
          admissionDate: transformDate(action.data.admission_date),
          image: action.data.photo_url,
        },
      };
    case ERROR_RESULT_REPOSITORIES:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case RESET_USERS:
      return {
        loading: false,
        error: false,
        data: null,
      };
    default:
      throw new Error();
  }
}

export const StoreContainer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export const UserContainer = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}