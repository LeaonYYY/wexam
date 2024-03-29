import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  message,
  Input,
  Popconfirm,
  Select,
  Popover,
} from 'antd';
import styles from './index.less';
import {
  getNotice,
  addNotice,
  deleteNotice,
  getAllClassList,
} from '@/services/teacher';

const { TextArea } = Input;
interface dataType {
  id: string;
  title: string;
  content: string;
  author: string;
  updateTime: string;
}
interface ClassList {
  id: number;
  clazz: string;
}
const Notice = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [isModelShow, setIsModelShow] = useState(false);
  const [pageInfo, setPageInfo] = useState<API.PageInfo>({
    current: 1,
    pageSize: 7,
    total: 0,
  });
  const [infoTitle, setInfoTitle] = useState('');
  const [infoContent, setInfoContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [classList, setClassList] = useState<ClassList[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  useEffect(() => {
    fetchData(1, pageInfo.pageSize);
    fetchClassList();
  }, []);
  const fetchClassList = async () => {
    const res = await getAllClassList();
    setClassList(res.records);
  };
  const fetchData = async (
    page: number | undefined,
    limit: number | undefined,
  ) => {
    const res = await getNotice(page, limit);
    if (res.code === 0) {
      setData(res.announcement.records);
      setPageInfo({
        current: res.announcement.current,
        total: res.announcement.total,
      });
    }
  };
  const handleNoticeAdd = async () => {
    setLoading(true);
    const res = await addNotice(
      infoTitle.replace(' ', ''),
      infoContent.trim(),
      selectedClasses,
    );
    fetchData(1, pageInfo.pageSize);
    message.success('发送成功');
    setIsModelShow(false);
    setInfoTitle('');
    setInfoContent('');
    setSelectedClasses([]);
    setLoading(false);
  };
  const handleNoticeAddCancel = () => {
    setIsModelShow(false);
    setInfoTitle('');
    setInfoContent('');
    message.info('取消发布');
  };
  const handleTitleChange = (e: any) => {
    setInfoTitle(e.target.value);
  };
  const handleContentChange = (e: any) => {
    setInfoContent(e.target.value);
  };
  const handlePageChange = async (page: number, pageSize: number) => {
    try {
      setPageInfo({ current: page, pageSize: 7 });
      setLoading(true);
      await fetchData(page, pageSize);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (record: any) => {
    setLoading(true);
    const res = await deleteNotice(record.id);
    if (res.code === 0) {
      fetchData(pageInfo.current, pageInfo.pageSize);
      setLoading(false);
      message.success('删除成功');
    }
  };
  const handleDeleteCancel = () => {
    message.info('取消删除');
  };
  const showTotal = (total: number) => {
    return `Total: ${total} items`;
  };
  const handleClassSelectChange = (values: string[]) => {
    setSelectedClasses(values);
  };
  const columns = [
    {
      title: '通知编号',
      dataIndex: 'id',
      width: '10%',
      align: 'center',
    },
    {
      title: '通知标题',
      dataIndex: 'title',
      width: '30%',
      align: 'center',
    },
    {
      title: '消息内容',
      align: 'center',
      render: (record: dataType) => {
        return (
          <Popover
            title="问题"
            content={
              <div>
                <p>{record.content}</p>
              </div>
            }
          >
            <a>查看</a>
          </Popover>
        );
      },
    },
    {
      title: '发布时间',
      width: '20%',
      align: 'center',
      render: (text: dataType) => {
        const date = new Date(8 * 60 * 60 * 1000 + text.updateTime);
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
      title: '操作',
      key: 'options',
      width: '20%',
      align: 'center',
      render: (record: any) => {
        return (
          <div>
            <Button disabled>修改</Button>
            <Popconfirm
              onConfirm={() => {
                handleDelete(record);
              }}
              onCancel={handleDeleteCancel}
              title="确定删除此信息吗"
              okText="确认"
              cancelText="取消"
            >
              <Button>删除</Button>
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
              setIsModelShow(true);
            }}
          >
            新增通知
          </Button>
        </div>
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            defaultPageSize: 7,
            current: pageInfo.current,
            total: pageInfo.total,
            onChange: handlePageChange,
            showTotal: showTotal,
          }}
        />
        <Modal
          title={'发布通知'}
          onOk={handleNoticeAdd}
          onCancel={handleNoticeAddCancel}
          visible={isModelShow}
          okText={'发布'}
          cancelText={'取消'}
        >
          <Input
            placeholder="标题"
            value={infoTitle}
            onChange={handleTitleChange}
          />
          <TextArea
            rows={4}
            placeholder={'请输入通知内容'}
            value={infoContent}
            onChange={handleContentChange}
          />
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择发送的班级，置空则为广播"
            onChange={handleClassSelectChange}
          >
            {classList.map((value: ClassList) => {
              //@ts-ignore
              return <Option key={value.id}>{value.clazz}</Option>;
            })}
          </Select>
        </Modal>
      </div>
    </div>
  );
};
export default Notice;
