import { useEffect, useState } from 'react';
import { Table } from 'antd';

import { columns } from './constant';
import { getClass } from '@/services/teacher';

interface dataType {
  key: string;
  name: string;
  idOfTeacher: string;
  headmaster: string;
  num: string;
}

const Notice = () => {
  const [data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getClass();
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
