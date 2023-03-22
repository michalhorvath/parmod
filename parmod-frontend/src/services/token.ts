let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

export const resetToken = () => {
  token = null;
};

export const getToken = () => {
  return token;
};

