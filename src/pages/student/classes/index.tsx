import { getClassList, joinClass, studentQuitClass } from '@/services/student';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, message, Table, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';

interface DataType {
  clazz: string;
  id: number;
  studentNum: number;
  teacherid: string;
}
const classes = () => {
  const [data, setData] = useState<DataType[]>([]);
  const fetchData = async (page: number | undefined) => {
    const res = await getClassList(page);
    setData(res);
  };
  useEffect(() => {
    fetchData(1);
  }, []);
  const handleQuitClass = async (id: number) => {
    const res = await studentQuitClass(id);
    message.success('退出成功');
    fetchData(1);
  };
  const handleJoinClass = async (values: { classid: string }) => {
    const res = await joinClass(parseInt(values.classid));
    console.log(res);
    if (res.code === 0) {
      message.success('加入成功');
      fetchData(1);
    } else {
      message.error('加入失败');
    }
    return true;
  };
  const columns = [
    {
      title: '班级id',
      dataIndex: 'id',
    },
    {
      title: '班级名称',
      dataIndex: 'clazz',
    },
    {
      title: '教师ID',
      dataIndex: 'teacherid',
    },
    {
      title: '班级人数',
      dataIndex: 'studentNum',
    },
    {
      title: '操作',
      key: 'options',
      render: (record: DataType) => {
        return (
          <div>
            <Popconfirm
              title="确认退出班级吗？"
              okText="确认"
              cancelText="取消"
              onCancel={() => {
                message.info('取消退出');
              }}
              onConfirm={() => {
                handleQuitClass(record.id);
              }}
            >
              <Button danger>退出班级</Button>
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
          title="加入班级"
          modalProps={{
            destroyOnClose: true,
          }}
          trigger={<Button>加入班级</Button>}
          onFinish={handleJoinClass}
        >
          <ProFormText
            name={'classid'}
            placeholder="请输入班级ID"
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormText>
        </ModalForm>
      </div>
      <Table columns={columns} dataSource={data}></Table>
    </div>
  );
};

export default classes;
