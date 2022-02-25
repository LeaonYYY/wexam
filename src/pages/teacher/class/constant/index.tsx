import { Button } from 'antd';

export const columns = [
  {
    title: '班级编号',
    dataIndex: 'key',
  },
  {
    title: '班级名称',
    dataIndex: 'name',
  },
  {
    title: '班主任教工号',
    dataIndex: 'idOfTeacher',
  },
  {
    title: '班主任',
    dataIndex: 'headmaster',
  },
  {
    title: '班级人数',
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
          <Button>重置密码</Button>
        </div>
      );
    },
  },
];
