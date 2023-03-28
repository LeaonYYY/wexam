import store from '@/models';
import { Provider } from 'react-redux';
import React, { FC, useEffect } from 'react';
import { refreshToken } from '@/services/login';
const Entry: FC<any> = ({ children }) => {
  useEffect(() => {
    handleTokenFresh();
  }, []);
  const handleTokenFresh = async () => {
    const res = await refreshToken();
    const token = res['new Token: '];
    localStorage.setItem('token', token);
  };
  return (
    <React.StrictMode>
      <Provider store={store}>{children}</Provider>
    </React.StrictMode>
  );
};
export default Entry;
