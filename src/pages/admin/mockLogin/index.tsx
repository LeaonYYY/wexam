import React from 'react';

import { Button, Image } from 'antd';
import styles from './index.less';
import { history } from 'umi';

const MockLogin = () => {
  const handleMockStu = () => {
    history.push('/student');
  };
  const handleMockTea = () => {
    history.push('/teacher');
  };
  return (
    <div className={styles.scoped}>
      <div className={styles.showBox}>
        <div style={{ height: '100%' }}>
          <div className={styles.stu}></div>
          <Button onClick={handleMockStu}>学生端登陆</Button>
        </div>
        <div style={{ height: '100%' }}>
          <div className={styles.teacher}></div>
          <Button onClick={handleMockTea}>教师端登陆</Button>
        </div>
      </div>
    </div>
  );
};
export default MockLogin;
