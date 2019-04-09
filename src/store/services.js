import { apiUrl } from '../config';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const getResults = async () => {
  const response = await fetch(`${apiUrl}/users`);

  if (!response.ok) {
    return new Error();
  }

  const { users: data } = await response.json();
  return { data };
}

const createUser = async fields => {
  const response = await fetch(`${apiUrl}/users`, {
    method: 'post',
    headers,
    body: JSON.stringify({
      user: {
        ...fields
      }
    }),
  });

  if (!response.ok) {
    return new Error();
  }

  const { user: data } = await response.json();
  return { data };
}

const updateUser = async ({ id, fields }) => {
  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: 'put',
    headers,
    body: JSON.stringify({
      user: {
        ...fields
      }
    }),
  });

  if (!response.ok) {
    return new Error();
  }

  const { user: data } = await response.json();
  return { data };
}

const getUser = async id => {
  const response = await fetch(`${apiUrl}/users/${id}`);
  if (!response.ok) {
    return new Error();
  }

  const { user: data } = await response.json();
  return { data };
}

export default { getResults, getUser, updateUser, createUser }