import axios from 'axios';
import { Model, ModelFormValues } from '../types';

import { apiV1BaseUrl } from '../constants';

import { getToken } from './token';

const getAll = async (user: string, design:string) => {
  const { data } = await axios.get<Model[]>(
    `${apiV1BaseUrl}/models/`,
    { params: {user, design}}
  );

  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<Model>(
    `${apiV1BaseUrl}/models/${id}`
  );

  return data;
};

const create = async (object: ModelFormValues) => {
  const { data } = await axios.post<Model>(
    `${apiV1BaseUrl}/models`,
    object,
    { headers: { Authorization: getToken() } }
  );
  return data;
};

const remove = async (id: string) => {
  const { data } = await axios.delete<Model>(
    `${apiV1BaseUrl}/models/${id}`,
    { headers: { Authorization: getToken() } }
  );
  return data;
};

export default {
  get, create, getAll, remove
};
