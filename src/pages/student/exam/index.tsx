import React, { useEffect, useState } from 'react';

import { getExam } from '@/services/student';
import styles from './index.less';
import Header from '@/pages/student/exam/components/Header';
import Content from '@/pages/student/exam/components/Content';

const Exam = () => {
  const [examData, setExamData] = useState<API.ExamItem[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getExam();
    if (res.status === 200) {
      setExamData(res.data);
    }
  };
  return (
    <div className={styles.scoped}>
      <div className={styles.box}>
        <Header />
        <Content examData={examData} />
      </div>
    </div>
  );
};
export default Exam;
