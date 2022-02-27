import React, { useEffect, useState } from 'react';
import styles from './index.less';

import { getScore } from '@/services/student';
import Header from '@/pages/student/score/components/Header';
import Content from '@/pages/student/score/components/Content';

const Score = () => {
  const [scores, setScores] = useState<API.ScoreItem[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getScore();
    if (res.status === 200) {
      setScores(res.data);
    }
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
