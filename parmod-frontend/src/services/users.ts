import axios from 'axios';
import { User, UserFormValues, UserEditFormValues } from '../types';

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

export default {
  get, create, update
};
