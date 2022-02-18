import React, { useEffect } from 'react';
import { useHistory } from 'umi';
const Index = () => {
  const history = useHistory();
  useEffect(() => {
    history.push('/admin/mockLogin');
  }, []);
  return <></>;
};
export default Index;
