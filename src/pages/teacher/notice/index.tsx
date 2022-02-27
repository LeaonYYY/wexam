import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import { columns } from './constant';
import { getNotice } from '@/services/teacher';

interface dataType {
  id: string;
  title: string;
  author: string;
  subTime: string;
  key: string;
}

const Notice = () => {
  const [data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getNotice();
    if (res.status === 200) {
      setData(res.data);
    }
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default Notice;
