import React, { useEffect, useState } from 'react';
import styles from './index.less';

import { getScores } from '@/services/student';
import Header from '@/pages/student/score/components/Header';
import Content from '@/pages/student/score/components/Content';

const Score = () => {
  const [scores, setScores] = useState<API.ScoreItem[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getScores();
    setScores(res.page);
  };
  return (
    <div className={styles.scoped}>
      <div className={styles.box}>
        <Header />
        <Content scoreData={scores} />
      </div>
    </div>
  );
};
export default Score;
