import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Table, Button, Popconfirm, message } from 'antd';
import { getExamInfo, getExamPaerDetail, getExams } from '@/services/teacher';
import { pageInfo } from '@/types';
import { current } from '@reduxjs/toolkit';

interface DataType {
  id: number;
  source: string;
  examdate: string;
  type: string;
  paperid: number;
}

const Exams = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [pageInfo, setPageInfo] = useState<pageInfo>({ current: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData(1);
  }, []);
  const fetchData = async (page: number | undefined) => {
    setLoading(true);
    const res = await getExams(page);
    if (res.code === 0) {
      setData(res.examManage.records);
      setPageInfo({
        current: res.examManage.current,
        total: res.examManage.total,
      });
    }
    setLoading(false);
  };
  const handleCheckExamPaper = async (id: number) => {
    const res = await getExamPaerDetail(id);
    console.log(res);
  };
  const handleDeleteExam = async (id: number) => {};
  const handlePageChange = async (page: number | undefined) => {
    setPageInfo({ current: page });
    await fetchData(page);
  };
  const showTotal = (total: number) => {
    return `一共有${total}场考试`;
  };
  const columns = [
    {
      title: '考试编号',
      dataIndex: 'id',
    },
    {
      title: '课程名称',
      dataIndex: 'source',
    },
    {
      title: '考试类型',
      dataIndex: 'type',
    },
    {
      title: '考试日期',
      dataIndex: 'examdate',
    },
    {
      title: '操作',
      key: 'options',
      render: (record: DataType) => {
        return (
          <div>
            <Button
              onClick={() => {
                handleCheckExamPaper(record.paperid);
              }}
            >
              查看考卷
            </Button>
            <Popconfirm
              title={'确认删除考试'}
              okText="确认"
              cancelText="取消"
              onCancel={() => {
                message.info('取消删除');
              }}
              onConfirm={() => {
                handleDeleteExam(record.id);
              }}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          defaultPageSize: 7,
          current: pageInfo.current,
          total: pageInfo.total,
          showTotal: showTotal,
          onChange: handlePageChange,
        }}
      ></Table>
    </div>
  );
};
export default Exams;
