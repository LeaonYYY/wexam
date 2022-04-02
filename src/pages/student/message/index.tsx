import React from 'react';
import { useEffect, useState } from 'react';
import MsgBox from './components/MsgBox';
import { getMsg } from '@/services/student';
import { nanoid } from 'nanoid';
import styles from './index.less';
const Message = () => {
  const [data, setData] = useState<API.MsgItem[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getMsg();
    if (res.code === 0) {
      setData(res.announcement.records);
    }
  };
  return (
    <div className={styles.scoped}>
      {data.map((value: API.MsgItem, index: number) => (
        <MsgBox {...value} key={value.id} index={index}></MsgBox>
      ))}
    </div>
  );
};
export default Message;
