import { Button } from 'antd';

export const columns = [
  {
    title: '成绩编号',
    dataIndex: 'key',
  },
  {
    title: '课程',
    dataIndex: 'course',
  },
  {
    title: '学号',
    dataIndex: 'idOfStudent',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '成绩',
    dataIndex: 'grade',
  },
  {
    title: '操作',
    key: 'options',
    render: (text: any) => {
      return (
        <div>
          <Button>修改</Button>
          <Button>删除</Button>
        </div>
      );
    },
  },
];
