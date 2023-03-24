import axios from 'axios';

import { LoggedUser, Error } from '../types';
import { setToken, resetToken } from './token';
import { apiV1BaseUrl } from '../constants';

type LoginRet = { token: string, user: LoggedUser } | Error;

const login = async (username: string, password: string): Promise<LoggedUser> => {
  const response = await axios.post<LoginRet>(
    `${apiV1BaseUrl}/login`, 
    { username, password }
  );
  if (!response.data || 'error' in response.data) {
    resetToken();
    return null;
  }
  setToken(response.data.token);
  window.localStorage.setItem('tokenParmod', JSON.stringify(response.data.token));
  window.localStorage.setItem('loggedUserParmod', JSON.stringify(response.data.user));
  return response.data.user;
};

export default {
  login
};
