import { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Input, Popconfirm } from 'antd';

import { addClass, deleteClass, getClass } from '@/services/teacher';
import { pageInfo } from '@/types';
import styles from './index.less';
const { TextArea } = Input;
interface dataType {
  id: number;
  clazz: string;
  studentNum: number;
}

const Notice = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [className, setClassName] = useState('');
  const [isModalShow, setIsModalShow] = useState(false);
  const [pageInfo, setPageInfo] = useState<pageInfo>({ total: 0, current: 1 });
  useEffect(() => {
    fetchData(1);
  }, []);
  const fetchData = async (page: number | undefined) => {
    const res = await getClass(page);
    setData(res.records);
    setPageInfo({
      total: res.total,
      current: res.current,
    });
  };
  const handleClassAdd = async () => {
    const res = await addClass(className);
    if (res.code === 0) {
      message.success('创建成功');
      setIsModalShow(false);
      setClassName('');
      await fetchData(1);
    }
  };
  const handleClassNameChange = (e: any) => {
    setClassName(e.target.value);
  };
  const showTotal = (total: number) => {
    return `一共有${total}个班级`;
  };
  const handlePageChange = async (page: number | undefined) => {
    setPageInfo({
      current: page,
    });
    await fetchData(page);
  };
  const handleDeleteClass = async (id: number) => {
    const res = await deleteClass(id);
    if (res.code === 0) {
      message.success('删除成功');
    }
    await fetchData(pageInfo.current);
  };
  const columns = [
    {
      title: '班级编号',
      dataIndex: 'id',
    },
    {
      title: '班级名称',
      dataIndex: 'clazz',
    },
    {
      title: '班级人数',
      dataIndex: 'studentNum',
    },
    {
      title: '操作',
      key: 'options',
      render: (text: dataType) => {
        return (
          <div>
            <Popconfirm
              title={'确认删除吗'}
              onCancel={() => {
                message.info('取消删除');
              }}
              onConfirm={() => {
                handleDeleteClass(text.id);
              }}
              okText={'确认'}
              cancelText={'取消'}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className={styles.scoped}>
      <div className={styles.showBox}>
        <div>
          <Button
            onClick={() => {
              setIsModalShow(true);
            }}
          >
            添加班级
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: pageInfo.current,
            total: pageInfo.total,
            showTotal: showTotal,
            onChange: handlePageChange,
          }}
        />
        <Modal
          title={'创建班级'}
          onOk={handleClassAdd}
          onCancel={() => {
            message.info('取消创建');
            setIsModalShow(false);
          }}
          okText={'创建'}
          cancelText={'取消'}
          visible={isModalShow}
        >
          <Input
            placeholder="请输入班级名称"
            value={className}
            onChange={handleClassNameChange}
          />
        </Modal>
      </div>
    </div>
  );
};
export default Notice;
