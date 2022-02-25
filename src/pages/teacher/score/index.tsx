import { useEffect, useState } from 'react';
import { Table } from 'antd';

import { columns } from './constant';
import { getScore } from '@/services/teacher';

interface dataType {
  key: string;
  course: string;
  idOfStudent: string;
  name: string;
  grade: string;
}

const Notice = () => {
  const [data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getScore();
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
