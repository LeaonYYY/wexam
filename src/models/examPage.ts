import { getExamData } from '@/services/student';
import { useCallback, useEffect, useState } from 'react';

export default () => {
  const [data, setData] = useState<API.ExamPaper[]>([]);
  const [siderData, setSiderData] = useState<API.ExamSiderItem[]>([]); //旁栏
  useEffect(() => {
    let sum = 0;
    let temp: API.ExamSiderItem[] = [];
    data.forEach((item) => {
      sum = 0;
      item.data.forEach((item) => {
        sum += parseInt(item.score);
      });
      temp.push({
        id: item.id.toString(),
        name: item.name,
        score: sum.toString(),
        data: item.data.map((item) => {
          return {
            id: item.id,
            text: item.id,
            status: false,
          };
        }),
      });
    });
    setSiderData(temp);
  }, [data]);
  const getData = async () => {
    const res = await getExamData();
    console.log(res);
    if (res.status === 200) {
      setData(res.data);
    }
  };
  return {
    data,
    siderData,
    getData,
  };
};
