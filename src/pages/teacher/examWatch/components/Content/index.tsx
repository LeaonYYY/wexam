import React, { FC } from 'react';
import { nanoid } from 'nanoid';
import { Button } from 'antd';

import styles from './index.less';

interface Props {
  examData: API.watchInfo[];
}

const Content: FC<Props> = ({ examData }) => {
  return (
    <div
      style={{
        height: '85%',
      }}
    >
      {examData.map((val) => {
        switch (val.status) {
          case -1:
            return (
              <div
                key={nanoid()}
                className={styles.content}
                style={{
                  backgroundColor: '#9be4d8',
                }}
              >
                <div>{val.course}</div>
                <div>{val.date}</div>
                <div>{val.time}</div>
                <div>已结束</div>
                <div>
                  <Button disabled type={'text'}>
                    开始监考
                  </Button>
                </div>
              </div>
            );
          case 0:
            return (
              <div
                key={nanoid()}
                className={styles.content}
                style={{
                  backgroundColor: '#d2d8e8',
                }}
              >
                <div>{val.course}</div>
                <div>{val.date}</div>
                <div>{val.time}</div>
                <div>未开始</div>
                <div>
                  <Button disabled type={'text'}>
                    开始监考
                  </Button>
                </div>
              </div>
            );
          case 1:
            return (
              <div
                key={nanoid()}
                className={styles.content}
                style={{
                  backgroundColor: 'red',
                }}
              >
                <div>{val.course}</div>
                <div>{val.date}</div>
                <div>{val.time}</div>
                <div>正在进行</div>
                <div>
                  <Button className={styles._button} type={'text'}>
                    开始监考
                  </Button>
                </div>
              </div>
            );
        }
      })}
    </div>
  );
};
export default Content;
