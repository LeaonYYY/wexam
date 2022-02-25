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
            <Space>姓名:{props.name}</Space>
          </div>
          <div>
            <Space>学校:{props.school}</Space>
          </div>
          <div>
            <Space>学院:{props.college}</Space>
          </div>
          <div>
            <Space>班级:{props.class}</Space>
          </div>
          <div>
            <Space>学号/教工号:{props.stuNo}</Space>
          </div>
        </div>
      </div>
    </>
  );
};
export default InfoShow;
