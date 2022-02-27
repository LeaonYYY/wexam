import { Button } from 'antd';

export const columns = [
  {
    title: '试卷编号',
    dataIndex: 'key',
  },
  {
    title: '课程名称',
    dataIndex: 'course',
  },
  {
    title: '考试日期',
    dataIndex: 'date',
  },
  {
    title: '考试时间',
    dataIndex: 'time',
  },
  {
    title: '操作',
    key: 'options',
    render: (text: any) => {
      return (
        <div>
          <Button>修改</Button>
          <Button>删除</Button>
          <Button>查看</Button>
        </div>
      );
    },
  },
];
