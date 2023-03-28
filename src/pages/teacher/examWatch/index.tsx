import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import {
  deleteExam,
  getExamPaerDetail,
  getExams,
  getUnCheckPaper,
} from '@/services/teacher';
import { pageInfo, PaperDetail } from '@/types';
import { current } from '@reduxjs/toolkit';
import { SelectQuestion, ElseQuestion } from '@/types';
import { nanoid } from 'nanoid';
import Select from '@/components/Select';
import Fill from '@/components/Fill';

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
  const [isModalShow, setIsModalShow] = useState(false);
  const [isCheckModalShow, setIsCheckModalShow] = useState(false);
  const [paperDetailData, setPaperDetailData] = useState<PaperDetail>({
    fillQuestions: [],
    judgeQuestions: [],
    multiQuestions: [],
    subjectiveQuestions: [],
  });

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

  const handleDeleteExam = async (id: number) => {
    //@ts-ignore
    if (pageInfo.current > 1 && data.length === 1) {
      //@ts-ignore
      const temp = pageInfo?.current - 1;
      setPageInfo({
        current: temp,
      });
    }
    const res = await deleteExam(id);
    if (res.code === 0) {
      message.success('删除成功');
      fetchData(pageInfo.current);
    } else {
      message.error('删除失败');
    }
  };
  const handlePageChange = async (page: number | undefined) => {
    setPageInfo({ current: page });
    await fetchData(page);
  };
  const fetchDetailData = async (id: number) => {
    const res = await getExamPaerDetail(id);
    setPaperDetailData({
      fillQuestions: res?.paper?.fillQuestions?.[0] || [],
      judgeQuestions: res?.paper?.judgeQuestions?.[0] || [],
      multiQuestions: res?.paper?.multiQuestions?.[0] || [],
      subjectiveQuestions: res?.paper?.subjectiveQuestions?.[0] || [],
    });
  };
  const handleModalShow = (id: number) => {
    setIsModalShow(true);
    fetchDetailData(id);
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
                handleModalShow(record.paperid);
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
    <div className={styles.scoped}>
      <div className={styles.showBox}>
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
        <Modal
          style={{
            height: '70%',
          }}
          width={'50%'}
          visible={isModalShow}
          title={'查看试卷'}
          onCancel={() => {
            setIsModalShow(false);
          }}
          destroyOnClose
          footer={[]}
        >
          <div
            style={{
              height: '300px',
              overflow: 'auto',
            }}
          >
            选择题：
            <div>
              {paperDetailData.multiQuestions.length > 0
                ? paperDetailData.multiQuestions.map((item: SelectQuestion) => {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                        }}
                        key={nanoid()}
                      >
                        <Select
                          question={item.question}
                          answera={item.answera}
                          answerb={item.answerb}
                          answerc={item.answerc}
                          answerd={item.answerd}
                          score={item.score}
                        ></Select>
                        <div
                          style={{
                            width: '100px',
                          }}
                        >
                          <div>答案：{item.rightanswer}</div>
                        </div>
                      </div>
                    );
                  })
                : '无此类题目'}
            </div>
            判断题：
            <div>
              {paperDetailData.judgeQuestions.length > 0
                ? paperDetailData.judgeQuestions.map((item: ElseQuestion) => {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                        }}
                        key={nanoid()}
                      >
                        <Fill
                          question={item.question}
                          score={item.score}
                        ></Fill>
                        <div
                          style={{
                            width: '100px',
                          }}
                        >
                          <div
                            style={{
                              overflow: 'auto',
                            }}
                          >
                            答案：{item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : '无此类题目'}
            </div>
            填空题：
            <div>
              {paperDetailData.fillQuestions.length > 0
                ? paperDetailData.fillQuestions.map((item: ElseQuestion) => {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                        }}
                        key={nanoid()}
                      >
                        <Fill
                          question={item.question}
                          score={item.score}
                        ></Fill>
                        <div
                          style={{
                            width: '100px',
                          }}
                        >
                          <div
                            style={{
                              overflow: 'auto',
                            }}
                          >
                            答案：{item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : '无此类题目'}
            </div>
            主观题：
            <div>
              {paperDetailData.subjectiveQuestions.length > 0
                ? paperDetailData.subjectiveQuestions.map(
                    (item: ElseQuestion) => {
                      return (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                          }}
                          key={nanoid()}
                        >
                          <Fill
                            question={item.question}
                            score={item.score}
                          ></Fill>
                          <div
                            style={{
                              width: '100px',
                            }}
                          >
                            <div
                              style={{
                                overflow: 'auto',
                              }}
                            >
                              答案：{item.answer}
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )
                : '无此类题目'}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default Exams;
