import React, { useEffect, useState } from 'react';
import InfoShow from '@/components/InfoShow';
import { getInfo } from '@/services/student';
import styles from './index.less';

const Info = () => {
  const [userInfos, setUserInfos] = useState<API.StuInfo>();
  useEffect(() => {
    handleGetInfo();
  }, []);
  const editUsername = (val: string) => {};
  const handleGetInfo = async () => {
    const res = await getInfo();
    setUserInfos(res.info);
  };

  return (
    <div className={styles.scoped}>
      <InfoShow {...userInfos} />
    </div>
  );
};
export default Info;
