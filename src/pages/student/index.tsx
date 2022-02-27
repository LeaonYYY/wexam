import React, { useEffect } from 'react';
import { useHistory } from 'umi';
const Index = () => {
  const history = useHistory();
  useEffect(() => {
    history.push('/student/message');
  }, []);
  return <></>;
};
export default Index;
