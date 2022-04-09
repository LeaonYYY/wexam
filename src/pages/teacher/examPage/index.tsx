import { useEffect, useState } from 'react';
import { Table } from 'antd';

import { columns } from './constants';
import { getPaperList } from '@/services/teacher';

interface dataType {
  key: string;
  course: string;
  date: string;
  time: string;
}

const ExamPaper = () => {
  const [data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    fetchData(1);
  }, []);
  const fetchData = async (page: number | undefined) => {
    const res = await getPaperList(page);
    console.log(res);
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default ExamPaper;
