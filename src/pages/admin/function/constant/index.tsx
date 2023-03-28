export const columns = [
  {
    title: '模块编号',
    dataIndex: 'key',
  },
  {
    title: '模块分属',
    dataIndex: 'type',
  },
  {
    title: '模块名称',
    dataIndex: 'title',
  },
  {
    title: '当前状态',
    dataIndex: 'status',
    render: (status: boolean) => (
      <div>{status ? <div>Running</div> : <div>Stopping</div>}</div>
    ),
  },
  {
    title: '操作',
    render: () => (
      <div>
        <button>启用</button>
        <button>禁用</button>
      </div>
    ),
  },
];
