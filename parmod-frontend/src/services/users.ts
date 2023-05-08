import axios from 'axios';
import { User, UserRole, UserFormValues, UserEditFormValues } from '../types';

import { apiV1BaseUrl } from '../constants';

import { getToken } from './token';

const get = async (id: string) => {
  const { data } = await axios.get<User>(
    `${apiV1BaseUrl}/users/${id}`
  );

  return data;
};

const create = async (object: UserFormValues) => {
  const { data } = await axios.post<User>(
    `${apiV1BaseUrl}/users/register`,
    object
  );
  return data;
};

const update = async (id: string, object: UserEditFormValues) => {
  const { data } = await axios.put<User>(
    `${apiV1BaseUrl}/users/${id}`,
    object,
    { headers: { Authorization: getToken() } }
  );
  return data;
};

const remove = async (id: string) => {
  const { data } = await axios.delete<User>(
    `${apiV1BaseUrl}/users/${id}`,
    { headers: { Authorization: getToken() } }
  );
  return data;
};

const follow = async (id: string) => {
  const { data } = await axios.post<User>(
    `${apiV1BaseUrl}/users/${id}/follow`,
    {},
    { headers: { Authorization: getToken() } }
  );
  return data;
};

const unfollow = async (id: string) => {
  const { data } = await axios.post<User>(
    `${apiV1BaseUrl}/users/${id}/unfollow`,
    {},
    { headers: { Authorization: getToken() } }
  );
  return data;
};

const setRole = async (id: string, newRole: UserRole) => {
  const { data } = await axios.post<User>(
    `${apiV1BaseUrl}/users/${id}/setrole`,
    { newRole},
    { headers: { Authorization: getToken() } }
  );
  return data;
};

export default {
  get, create, update, follow, unfollow, remove, setRole
};
