import React from 'react';
import { useEffect, useState } from 'react';
import MsgBox from './components/MsgBox';
import { getMsg } from '@/services/student';
import { Empty } from 'antd';
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
      setData(res?.acc?.records || []);
    }
  };
  return (
    <div className={styles.scoped}>
      {data.length > 0 ? (
        data.map((value: API.MsgItem, index: number) => (
          <MsgBox {...value} key={value.id} index={index}></MsgBox>
        ))
      ) : (
        <Empty description={'暂无通知消息'} />
      )}
    </div>
  );
};
export default Message;
