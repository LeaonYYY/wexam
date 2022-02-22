import React, { FC } from 'react';

import styles from './box.less';

interface Props {
  scoreData: API.ScoreItem[];
}

const Content: FC<Props> = ({ scoreData }) => {
  return (
    <div
      style={{
        height: '85%',
      }}
    >
      {scoreData.map((val) => {
        if (val.score === -1) {
          return (
            <div
              className={styles.content}
              style={{
                backgroundColor: '#d2d8e8',
              }}
            >
              <div>{val.name}</div>
              <div>{val.time}</div>
              <div>未录入</div>
            </div>
          );
        } else {
          return (
            <div
              className={styles.content}
              style={{
                backgroundColor: '#9be4d8',
              }}
            >
              <div>{val.name}</div>
              <div>{val.time}</div>
              <div>{val.score}</div>
            </div>
          );
        }
      })}
    </div>
  );
};
export default Content;
