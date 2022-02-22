import store from '@/models';
import { Provider } from 'react-redux';
import React, { FC } from 'react';

const Entry: FC<any> = ({ children }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>{children}</Provider>
    </React.StrictMode>
  );
};
export default Entry;
