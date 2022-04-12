import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';

import styles from './index.less';
import Sider from '@/pages/examPage/components/Sider';
import Content from '@/pages/examPage/components/Content';
import {} from '@/services/student';

const ExamPage: React.FC = () => {
  const { getData, data, siderData } = useModel('examPage');
  useEffect(() => {
    const { query } = history.location;
    //@ts-ignore
    fetchData(query.id);
  }, []);
  const fetchData = async (id: number) => {
    await getData(id);
  };
  return (
    <div className={styles.scoped}>
      <div className={styles.siderBox}>
        <Sider data={siderData} />
      </div>
      <div className={styles.contentBox}>
        <Content />
      </div>
    </div>
  );
};

export default ExamPage;
