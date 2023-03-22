import axios from 'axios';
import { Model, ModelFormValues } from '../types';

import { apiV1BaseUrl } from '../constants';

import { getToken } from './token';

const get = async (id: string) => {
  const { data } = await axios.get<Model>(
    `${apiV1BaseUrl}/model/${id}`
  );

  return data;
};

const create = async (object: ModelFormValues) => {
  const { data } = await axios.post<Model>(
    `${apiV1BaseUrl}/model`,
    object,
    { headers: { Authorization: getToken() } }
  );
  return data;
};

export default {
  get, create
};
