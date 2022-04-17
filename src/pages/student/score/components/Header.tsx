import React from 'react';

import styles from './box.less';
const Header = () => {
  return (
    <div className={styles.header}>
      <div>考试编号</div>
      <div>考试时间</div>
      <div>考试成绩</div>
    </div>
  );
};
export default Header;
