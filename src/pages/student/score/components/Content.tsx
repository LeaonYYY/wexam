import React, { FC } from 'react';
import { nanoid } from 'nanoid';

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
        return (
          <div key={nanoid()} className={styles.content}>
            <div>{val.examid}</div>
            <div>{}</div>
            <div>{val.score}</div>
          </div>
        );
      })}
    </div>
  );
};
export default Content;
