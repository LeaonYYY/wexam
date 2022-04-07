import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { history } from 'umi';

import { DATA_SOURCE } from './constant';
const Notice = () => {
  const handleRedirect = (key: string) => {
    let url = '';
    switch (key) {
      case '1':
        url = '/teacher/examBase/select';
        break;
      case '2':
        url = '/teacher/examBase/fill';
        break;
      case '3':
        url = '/teacher/examBase/judge';
        break;
      case '4':
        url = '/teacher/examBase/multi';
        break;
      default:
        break;
    }
    history.push(url);
  };
  const columns = [
    {
      title: '题库编号',
      dataIndex: 'key',
    },
    {
      title: '题目类型',
      dataIndex: 'type',
    },
    {
      title: '操作',
      key: 'options',

      render: (record: any) => {
        return (
          <div>
            <Button
              onClick={() => {
                handleRedirect(record.key);
              }}
            >
              修改
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={DATA_SOURCE} />
    </div>
  );
};
export default Notice;
