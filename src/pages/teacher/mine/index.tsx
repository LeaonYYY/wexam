import React, { useEffect, useState } from 'react';

import InfoShow from '@/components/InfoShow';
import styles from './index.less';
import { getInfo } from '@/services/teacher';

const Mine = () => {
  const [info, setInfo] = useState<API.StuInfo>();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getInfo();
    if (res.status === 200) {
      setInfo(res.data);
    }
  };
  return (
    <div className={styles.scoped}>
      <InfoShow {...info} />
    </div>
  );
};
export default Mine;
