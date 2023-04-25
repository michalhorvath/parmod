import axios from 'axios';
import { Feed } from '../types';

import { apiV1BaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Feed[]>(
    `${apiV1BaseUrl}/feed`
  );

  return data;
};

const getUser = async (user: string, type: string) => {
  const { data } = await axios.get<Feed[]>(
    `${apiV1BaseUrl}/feed`,
    { params: {user, type}}
  );

  return data;
};

export default {
  getAll, getUser
};
