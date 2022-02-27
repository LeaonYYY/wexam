import { Button } from 'antd';

export const columns = [
  {
    title: '学号',
    dataIndex: 'key',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '班级',
    dataIndex: 'class',
  },
  {
    title: '操作',
    key: 'options',
    render: (text: any) => {
      return (
        <div>
          <Button>修改</Button>
          <Button>删除</Button>
          <Button>重置密码</Button>
        </div>
      );
    },
  },
];
