import React, { FC } from 'react';

import styles from './index.less';
interface Props {
  index?: number;
  question: string;
  answera: string;
  answerb: string;
  answerc: string;
  answerd: string;
  score: number;
}
const Select: FC<Props> = ({
  index,
  question,
  answera,
  answerb,
  answerc,
  answerd,
  score,
}) => {
  return (
    <div className={styles.scoped}>
      <div>
        <p>
          {index ? `${index}.` : ''}
          {question}({score}分)
        </p>
      </div>
      <div>
        <div>A:{answera}</div>
        <div>B:{answerb}</div>
        <div>C:{answerc}</div>
        <div>D:{answerd}</div>
      </div>
    </div>
  );
};

export default Select;
