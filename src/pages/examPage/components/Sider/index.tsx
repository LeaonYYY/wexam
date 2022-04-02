import { FC, useEffect } from 'react';
import styles from './index.less';
import { nanoid } from 'nanoid';
import SiderItem from '@/pages/examPage/components/SiderItem';

interface SiderProps {
  data: API.ExamSiderItem[];
}
const Sider: FC<SiderProps> = ({ data }) => {
  return (
    <div className={styles.scoped}>
      {data.map((item) => {
        return <SiderItem title={item.name} data={item.data} key={nanoid()} />;
      })}
    </div>
  );
};

export default Sider;
