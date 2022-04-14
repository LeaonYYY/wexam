import { useEffect, useState } from 'react';
import { Table } from 'antd';

import { columns } from './constant';
import {} from '@/services/teacher';

interface dataType {
  key: string;
  name: string;
  gender: string;
  class: string;
}

const Notice = () => {
  const [data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {};
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default Notice;
