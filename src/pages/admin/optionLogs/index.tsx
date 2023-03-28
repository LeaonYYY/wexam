import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Table, Popconfirm, message, Button } from 'antd';
import { deleteLog, getLogs } from '@/services/teacher';
import { pageInfo } from '@/types';

interface DataType {
  id: number;
  method: string;
  operation: string;
  operationTime: number;
  userLevel: number;
  userid: number;
  username: string;
}
const OptionLogs = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [pageInfo, setPageInfo] = useState<pageInfo>({ current: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '接口',
      dataIndex: 'method',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
    {
      title: '操作时间',
      render: (item: DataType) => {
        const date = new Date(8 * 60 * 60 * 1000 + item.operationTime);
        return (
          <div>
            {`${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
          </div>
        );
      },
    },
    {
      title: '用户等级',
      dataIndex: 'userLevel',
    },
    {
      title: '用户ID',
      dataIndex: 'userid',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '操作',
      key: 'options',
      render: (item: DataType) => {
        return (
          <div>
            <Popconfirm
              title="确认删除此条记录？"
              onCancel={() => {
                message.info('取消删除');
              }}
              onConfirm={() => {
                handleDelete(item.id);
              }}
              okText="确认"
              cancelText="取消"
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    fetchData(1);
  }, []);
  const fetchData = async (page: number | undefined) => {
    setLoading(true);
    const res = await getLogs(page);
    setData(res.records || []);
    setPageInfo({
      current: res.current,
      total: res.total,
    });
    setLoading(false);
  };
  const handleDelete = async (id: number) => {
    const res = await deleteLog(id);
    if (res.code === 0) {
      message.success('删除成功');
      fetchData(pageInfo.current);
    }
  };
  const handleChange = (page: number | undefined) => {
    setPageInfo({ current: page });
    fetchData(page);
  };
  const showtotal = (total: number) => {
    return `一共有${total}条记录`;
  };
  return (
    <div className={styles.scoped}>
      <div className={styles.showBox}>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            current: pageInfo.current,
            total: pageInfo.total,
            showTotal: showtotal,
            onChange: handleChange,
            defaultPageSize: 7,
          }}
        ></Table>
      </div>
    </div>
  );
};
export default OptionLogs;
