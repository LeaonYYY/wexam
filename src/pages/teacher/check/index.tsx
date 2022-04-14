import React, { useEffect, useState } from 'react';
import styles from './index.less';

import Header from './components/Header';
import Content from './components/Content';

const Score = () => {
  const [exams, setExams] = useState<API.watchInfo[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {};
  return (
    <div className={styles.scoped}>
      <div className={styles.box}>
        <Header />
        <Content examData={exams} />
      </div>
    </div>
  );
};
export default Score;
