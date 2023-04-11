import axios from 'axios';
import { Design, DesignPreview, DesignFormValues, CommentFormValues,
  Comment, Like } from '../types';

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

const addComment = async (designId: string, comment: CommentFormValues) => {
  const { data } = await axios.post<Comment>(
    `${apiV1BaseUrl}/designs/${designId}/comments`,
    comment,
    { headers: { Authorization: getToken() } }
  );
  return data;
};

const removeComment = async (designId: string, commentId: string) => {
  const { data } = await axios.delete<Comment>(
    `${apiV1BaseUrl}/designs/${designId}/comments/${commentId}`,
    { headers: { Authorization: getToken() } }
  );
  return data;
};

const addLike = async (id: string) => {
  const { data } = await axios.post<Like>(
    `${apiV1BaseUrl}/designs/${id}/likes`,
    {},
    { headers: { Authorization: getToken() } }
  );
  return data;
};

const removeLike = async (designId: string, likeId: string) => {
  const { data } = await axios.delete<Like>(
    `${apiV1BaseUrl}/designs/${designId}/likes/${likeId}`,
    { headers: { Authorization: getToken() } }
  );
  return data;
};

export default {
  get, create, getAll, addComment, removeComment, addLike, removeLike
};
