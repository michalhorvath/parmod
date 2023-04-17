import axios from 'axios';
import { Image } from '../types';
import FormData from 'form-data';

import { apiV1BaseUrl } from '../constants';
import { getToken } from './token';

//const get = async (id: string) => {
//  const { data } = await axios.get<User>(
//    `${apiV1BaseUrl}/images/${id}`
//  );
//
//  return data;
//};

const upload = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const {data} = await axios.post<Image>(
    `${apiV1BaseUrl}/images/upload`,
    formData,
    { headers: { 
      Authorization: getToken(),
      'Content-Type': 'multipart/form-data'
    } }
  );
  return data;
};

export default {
  upload
};
