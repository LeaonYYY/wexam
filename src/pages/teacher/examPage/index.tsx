import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

import {
  addExamPaper,
  deleteExamPaper,
  getExamPaerDetail,
  getPaperList,
} from '@/services/teacher';
import { pageInfo } from '@/types';

interface dataType {
  id: number;
  name: string;
  major: string;
}

const ExamPaper = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [pageInfo, setPageInfo] = useState<pageInfo>({ current: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [isPaperModalVisible, setIsPaperModalVisible] = useState(false);
  useEffect(() => {
    fetchData(1);
  }, []);
  const fetchData = async (page: number | undefined) => {
    setLoading(true);
    const res = await getPaperList(page);
    console.log(res);

    setData(res.records);
    setPageInfo({
      current: res.current,
      total: res.total,
    });
    setLoading(false);
  };
  const fetchPaperDetail = async (id: number) => {
    const res = await getExamPaerDetail(id);
    console.log(res);
  };
  const handleAddPaper = async (values: API.ExamPaperProps) => {
    const res = await addExamPaper(values);
    if (res.code === 0) {
      message.success('添加成功');
      fetchData(1);
    }
    return true;
  };
  const handleDeletePaper = async (id: number) => {
    const res = await deleteExamPaper(id);
    if (res.code === 0) {
      message.success('删除成功');
      fetchData(pageInfo.current);
    }
  };
  const handleAddExam = async (values: number) => {};
  const handlePageChange = (page: number | undefined) => {
    setPageInfo({ current: page });
    fetchData(page);
  };
  const showPaperModal = (id: number) => {
    setIsPaperModalVisible(true);
    fetchPaperDetail(id);
  };
  const showTotal = (total: number) => {
    return `一共有${total}张试卷`;
  };
  const columns = [
    {
      title: '试卷编号',
      dataIndex: 'id',
    },
    {
      title: '试卷名称',
      dataIndex: 'name',
    },
    {
      title: '课程名称',
      dataIndex: 'major',
    },
    {
      title: '操作',
      key: 'options',
      render: (text: any) => {
        return (
          <div>
            <Button onClick={() => showPaperModal(text.id)}>修改</Button>
            <Popconfirm
              title="确认删除试卷吗？"
              onCancel={() => {
                message.info('取消删除');
              }}
              onConfirm={() => {
                handleDeletePaper(text.id);
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
      <div>
        <ModalForm
          modalProps={{
            destroyOnClose: true,
          }}
          title="添加试卷"
          trigger={<Button>添加试卷</Button>}
          onFinish={handleAddPaper}
        >
          <ProFormText
            name={'name'}
            placeholder={'请输入试卷名'}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormText>
          <ProFormText
            name={'major'}
            placeholder={'请输入试卷课程'}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormText>
        </ModalForm>
        <ModalForm
          trigger={<Button>发布考试</Button>}
          title="发布考试"
          modalProps={{
            destroyOnClose: true,
          }}
          onFinish={handleAddExam}
        ></ModalForm>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          defaultPageSize: 7,
          total: pageInfo.total,
          current: pageInfo.current,
          onChange: handlePageChange,
          showTotal: showTotal,
        }}
      />
      <Modal
        visible={isPaperModalVisible}
        title={'试卷修改'}
        onCancel={() => {
          setIsPaperModalVisible(false);
        }}
        destroyOnClose
        footer={[]}
      ></Modal>
    </div>
  );
};
export default ExamPaper;
