import React, { FC } from 'react';
import { Space } from 'antd';
import styles from './infoShow.less';

const InfoShow: FC<API.StuInfo> = (props) => {
  return (
    <>
      <div className={styles.scoped}>
        <div className={styles.headBox}>个人信息</div>
        <div className={styles.contentBox}>
          <div>
            <Space>用户名:{props.username}</Space>
          </div>
          <div>
            <Space>姓名:{props.username}</Space>
          </div>
          <div>
            <Space>学校:{'某某大学'}</Space>
          </div>
          <div>
            <Space>学院: {'计算机学院'}</Space>
          </div>
          <div>
            <Space>学号/教工号:{localStorage.getItem('userid')}</Space>
          </div>
        </div>
      </div>
    </>
  );
};
export default InfoShow;
