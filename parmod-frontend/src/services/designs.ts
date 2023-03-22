import axios from 'axios';
import { Design, DesignPreview, DesignFormValues } from '../types';

import { apiV1BaseUrl } from '../constants';

import { getToken } from './token';

const getAll = async () => {
  const { data } = await axios.get<DesignPreview[]>(
    `${apiV1BaseUrl}/designs`
  );

  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<Design>(
    `${apiV1BaseUrl}/designs/${id}`
  );

  return data;
};

const create = async (object: DesignFormValues) => {
  const { data } = await axios.post<Design>(
    `${apiV1BaseUrl}/designs`,
    object,
    { headers: { Authorization: getToken() } }
  );
  return data;
};

export default {
  get, create, getAll
};
