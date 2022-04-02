import React, { FC } from 'react';

import { CheckOutlined } from '@ant-design/icons';
import styles from './index.less';
import { nanoid } from 'nanoid';
interface props {
  data: API.SiderItem[];
  title: string;
}

const SiderItem: FC<props> = ({ data, title }) => {
  return (
    <div className={styles.scoped}>
      <div>{title}</div>
      <div>
        {data.map((val: API.SiderItem) => {
          return <ShowBox text={val.text} status={val.status} key={nanoid()} />;
        })}
      </div>
    </div>
  );
};

interface boxProps {
  text: string;
  status: boolean;
}

const ShowBox: FC<boxProps> = ({ text, status }) => {
  return <div>{status ? <CheckOutlined /> : <div>{text}</div>}</div>;
};

export default SiderItem;
