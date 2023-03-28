import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import { columns } from './constant';
import { getFuntion } from '@/services/admin';

const Function = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getFuntion();
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
export default Function;
