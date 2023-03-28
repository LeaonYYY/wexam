import React, { FC } from 'react';
import styles from './index.less';
interface Props {
  question: string;
  score: number;
  index?: number;
}

const Fill: FC<Props> = ({ question, score, index }) => {
  return (
    <div className={styles.scoped}>
      <div>
        <p>
          {index ? `${index}.` : ''}
          {question}({score}分)
        </p>
      </div>
    </div>
  );
};

export default Fill;
