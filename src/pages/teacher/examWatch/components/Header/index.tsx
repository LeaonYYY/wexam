import React from 'react';

import styles from './index.less';
const Header = () => {
  return (
    <div className={styles.header}>
      <div>课程名称</div>
      <div>考试日期</div>
      <div>考试时间</div>
      <div>当前状态</div>
      <div>操作</div>
    </div>
  );
};
export default Header;
