import { Button } from 'antd';

export const columns = [
  {
    title: '题库编号',
    dataIndex: 'key',
  },
  {
    title: '题目类型',
    dataIndex: 'type',
  },
  {
    title: '课程',
    dataIndex: 'course',
  },
  {
    title: '题目数量',
    dataIndex: 'num',
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
