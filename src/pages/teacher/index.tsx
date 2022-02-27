import React, { useEffect } from 'react';
import { useHistory } from 'umi';
const Index = () => {
  const history = useHistory();
  useEffect(() => {
    history.push('/teacher/notice');
  }, []);
  return <></>;
};
export default Index;
