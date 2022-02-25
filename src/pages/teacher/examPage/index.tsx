import { useEffect, useState } from 'react';
import { Table } from 'antd';

import { columns } from './constant';
import { getExamPage } from '@/services/teacher';

interface dataType {
  key: string;
  course: string;
  date: string;
  time: string;
}

const Notice = () => {
  const [data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getExamPage();
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
