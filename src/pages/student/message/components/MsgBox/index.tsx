import React, { FC } from 'react';
import { NotificationTwoTone, CloseCircleFilled } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
import styles from './index.less';
interface Props {
  index: number;
  title: string;
  content: string;
  author: string;
  date: string;
}
const MsgBox: FC<Props> = ({ title, content, author, date, index }) => {
  const handleDel = () => {
    message.success('删除成功');
  };
  const handleCancel = () => {
    message.warn('取消删除');
  };
  return (
    <div className={[styles.scoped, styles[`type${index % 5}`]].join(' ')}>
      <div className={styles.title}>
        <span>
          <NotificationTwoTone />
          {title}
        </span>
        <Popconfirm
          onConfirm={handleDel}
          onCancel={handleCancel}
          title="确定删除此信息吗"
          okText="确认"
          cancelText="取消"
        >
          <span>
            <CloseCircleFilled />
          </span>
        </Popconfirm>
      </div>
      <p className={styles.content}>{content}</p>
      <div className={styles.author}>
        {author || ''}
        {date || ''}
      </div>
    </div>
  );
};
export default MsgBox;
