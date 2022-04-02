import React from 'react';

import styles from './index.less';

const Content = () => {
  return (
    <div className={styles.scoped}>
      <div className={styles.contentBox}>
        <div>exp</div>
        <div>choose</div>
        <div>commit</div>
      </div>
    </div>
  );
};
export default Content;
