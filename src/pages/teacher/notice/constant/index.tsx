import { Button } from 'antd';

export const columns = [
  {
    title: '通知编号',
    dataIndex: 'id',
  },
  {
    title: '通知标题',
    dataIndex: 'title',
  },
  {
    title: '发布者',
    dataIndex: 'author',
  },
  {
    title: '发布时间',
    dataIndex: 'subTime',
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
