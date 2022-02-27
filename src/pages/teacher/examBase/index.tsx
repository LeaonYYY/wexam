import { useEffect, useState } from 'react';
import { Table } from 'antd';

import { columns } from './constant';
import { getExamBase } from '@/services/teacher';

interface dataType {
  key: string;
  type: string;
  course: string;
  num: string;
}

const Notice = () => {
  const [data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getExamBase();
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
