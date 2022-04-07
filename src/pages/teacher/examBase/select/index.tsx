import {
  addSelectQuestion,
  deleteSelectQuestion,
  getSelecList,
} from '@/services/teacher';
import React, { useEffect, useState } from 'react';
import { Table, Popover, Button, message, Popconfirm } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { pageInfo } from '@/types';
import { history } from 'umi';
interface SelectData {
  id: number;
  subject: string;
  question: string;
  answera: string;
  answerb: string;
  answerc: string;
  answerd: string;
  score: number;
  rightanswer: string;
  level: number;
}
const levelMap: Record<number, string> = {
  1: '简单',
  2: '一般',
  3: '困难',
};
const Select = () => {
  const [data, setData] = useState<SelectData[]>([]);
  const [pageInfo, setPageInfo] = useState<pageInfo>({ current: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const fetchData = async (page: number | undefined) => {
    setLoading(true);
    const res = await getSelecList(page);
    console.log(res);
    setData(res.records);
    setPageInfo({
      total: res.total,
      current: res.current,
    });

    setLoading(false);
  };
  useEffect(() => {
    fetchData(1);
  }, []);
  const handlePageChange = async (page: number | undefined) => {
    setPageInfo({ current: page });
    await fetchData(page);
  };
  const handleAddQuestion = async (values: API.QuestionData_Select) => {
    let temp = JSON.parse(JSON.stringify(values));
    temp.rightanswer = temp.rightanswer.join('');

    const res = await addSelectQuestion(temp);
    if (res.code === 0) {
      message.success('添加成功');
      fetchData(1);
      return true;
    }
  };
  const handleDelete = async (id: number) => {
    const res = await deleteSelectQuestion(id);
    if (res.code === 0) {
      message.success('删除成功');
    }
    fetchData(pageInfo.current);
  };
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '学科',
      dataIndex: 'subject',
    },
    {
      title: '题目',
      render: (record: SelectData) => {
        return (
          <Popover
            title="问题"
            content={
              <div>
                <p>{record.question}</p>
              </div>
            }
          >
            <a>查看</a>
          </Popover>
        );
      },
    },
    {
      title: '选项',
      render: (record: any) => {
        return (
          <Popover
            title={'选项'}
            content={
              <div>
                <div>A: {record.answera}</div>
                <div>B: {record.answerb}</div>
                <div>C: {record.answerc}</div>
                <div>D: {record.answerd}</div>
              </div>
            }
          >
            <a>查看</a>
          </Popover>
        );
      },
    },
    {
      title: '答案',
      dataIndex: 'rightanswer',
    },
    {
      title: '分值',
      dataIndex: 'score',
    },
    {
      title: '难度',
      render: (record: SelectData) => {
        return (
          <div>
            {record.level > 0 && record.level <= 3
              ? levelMap[record.level]
              : '未知'}
          </div>
        );
      },
    },
    {
      title: '操作',
      render: (record: SelectData) => {
        return (
          <Popconfirm
            title="确定删除吗"
            onCancel={() => {
              message.info('取消删除');
            }}
            onConfirm={() => {
              handleDelete(record.id);
            }}
            cancelText="取消"
            okText="确定"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        );
      },
    },
  ];
  const show = (total: number) => {
    return `总共有：${total} 题`;
  };
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            history.goBack();
          }}
        >
          返回
        </Button>
        <ModalForm
          trigger={<Button>添加</Button>}
          title={'新增题目'}
          onFinish={handleAddQuestion}
        >
          <ProFormText
            name={'question'}
            placeholder={'请输入题目'}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormText>
          <ProFormText
            name={'answera'}
            placeholder={'请输入A选项'}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormText>
          <ProFormText
            name={'answerb'}
            placeholder={'请输入B选项'}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormText>
          <ProFormText
            name={'answerc'}
            placeholder={'请输入C选项'}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormText>
          <ProFormText
            name={'answerd'}
            placeholder={'请输入D选项'}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormText>
          <ProFormCheckbox.Group
            label={'正确答案'}
            name={'rightanswer'}
            options={['A', 'B', 'C', 'D']}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormCheckbox.Group>
          <ProFormText
            name={'score'}
            placeholder={'请输入分值'}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormText>
          <ProFormText
            name={'subject'}
            placeholder={'请输入所属学科'}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormText>
          <ProFormSelect
            placeholder={'请选择题目难度'}
            name={'level'}
            valueEnum={{
              1: '简单',
              2: '一般',
              3: '困难',
            }}
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          ></ProFormSelect>
        </ModalForm>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 7,
          current: pageInfo.current,
          total: pageInfo.total,
          showTotal: show,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default Select;
