import axios from 'axios';
import { User, UserFormValues } from '../types';

import { apiV1BaseUrl } from '../constants';

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

export default {
  get, create
};
