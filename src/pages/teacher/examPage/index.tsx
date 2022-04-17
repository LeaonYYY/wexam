import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { nanoid } from 'nanoid';
import {
  addExam,
  addExamPaper,
  addQuetionForPaper,
  deleteExamPaper,
  deleteQuestionFromPaper,
  getAllClassList,
  getAllFill,
  getAllJudge,
  getAllMulti,
  getAllPaper,
  getAllSelect,
  getExamPaerDetail,
  getPaperList,
} from '@/services/teacher';
import { ElseQuestion, pageInfo, PaperDetail, SelectQuestion } from '@/types';
import Select from '@/components/Select';
import Fill from '@/components/Fill';
import styles from './index.less';

interface dataType {
  id: number;
  name: string;
  major: string;
}
interface QuestionData {
  id: number;
  subject: string;
}
const ExamPaper = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [pageInfo, setPageInfo] = useState<pageInfo>({ current: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [isPaperModalVisible, setIsPaperModalVisible] = useState(false);
  const [selectedPaperid, setSelectedPaperid] = useState(0);
  const [paperDetailData, setPaperDetailData] = useState<PaperDetail>({
    fillQuestions: [],
    judgeQuestions: [],
    multiQuestions: [],
    subjectiveQuestions: [],
  });
  useEffect(() => {
    fetchData(1);
  }, []);
  useEffect(() => {
    console.log(paperDetailData);
  }, [paperDetailData]);
  const fetchData = async (page: number | undefined) => {
    setLoading(true);
    const res = await getPaperList(page);
    setData(res.records);
    setPageInfo({
      current: res.current,
      total: res.total,
    });
    setLoading(false);
  };
  const fetchPaperDetail = async (id: number) => {
    const res = await getExamPaerDetail(id);
    setPaperDetailData({
      fillQuestions: res?.paper?.fillQuestions?.[0] || [],
      judgeQuestions: res?.paper?.judgeQuestions?.[0] || [],
      multiQuestions: res?.paper?.multiQuestions?.[0] || [],
      subjectiveQuestions: res?.paper?.subjectiveQuestions?.[0] || [],
    });
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
  const handleAddExam = async (values: any) => {
    const res = await addExam(values);
    if (res.code === 0) {
      message.success('成功添加考试');
    } else {
      message.error(res.msg);
    }
    return true;
  };
  const handlePageChange = (page: number | undefined) => {
    setPageInfo({ current: page });
    fetchData(page);
  };
  const handleAddQuestion = async (values: any) => {
    const res = await addQuetionForPaper(
      [
        ...(values.select || []),
        ...(values.fill || []),
        ...(values.judge || []),
        ...(values.multi || []),
      ].map((item: any) => {
        return {
          paperid: selectedPaperid,
          questionid: item.value,
          questiontype: item.type,
        };
      }),
    );
    if (res.code === 0) {
      message.success('添加成功');
    }
    fetchPaperDetail(selectedPaperid);
    return true;
  };
  const showPaperModal = (id: number) => {
    setSelectedPaperid(id);
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
    <div className={styles.scoped}>
      <div className={styles.showBox}>
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
            <ProFormText
              name={'totalTime'}
              placeholder={'试卷限定完成时长（分钟）'}
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
          >
            <ProFormText
              name={'source'}
              placeholder={'课程名称'}
              rules={[
                {
                  required: true,
                  message: '不能为空',
                },
              ]}
            ></ProFormText>

            <ProFormText
              name={'examdate'}
              placeholder={'考试日期 格式如:2022-1-1'}
              rules={[
                {
                  required: true,
                  message: '不能为空',
                },
              ]}
            ></ProFormText>

            <ProFormSelect
              name={'paperid'}
              label="选择考卷"
              request={async () => {
                const res = await getAllPaper();
                return res.records.map((item: dataType) => {
                  return {
                    label: item.name + `(试卷课程：${item.major})`,
                    value: item.id,
                  };
                });
              }}
              rules={[
                {
                  required: true,
                  message: '不能为空',
                },
              ]}
            ></ProFormSelect>
            <ProFormSelect
              name={'ids'}
              label="选择班级"
              request={async () => {
                const res = await getAllClassList();
                return res.records.map((item: any) => {
                  return {
                    label: item.clazz,
                    value: item.id,
                  };
                });
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
          style={{
            height: '70%',
          }}
          width={'50%'}
          visible={isPaperModalVisible}
          title={'试卷修改'}
          onCancel={() => {
            setIsPaperModalVisible(false);
          }}
          destroyOnClose
          footer={[]}
        >
          <div>
            <ModalForm
              trigger={<Button>添加试题</Button>}
              title="添加试题"
              onFinish={handleAddQuestion}
              modalProps={{
                destroyOnClose: true,
              }}
            >
              <ProFormSelect.SearchSelect
                name="select"
                placeholder={'添加选择题'}
                debounceTime={300}
                request={async () => {
                  const res = await getAllSelect();
                  return res.records.map((item: QuestionData) => {
                    return {
                      label: `${item.id}:${item.subject}`,
                      value: item.id,
                      type: 3,
                    };
                  });
                }}
              ></ProFormSelect.SearchSelect>
              <ProFormSelect.SearchSelect
                name="fill"
                placeholder={'添加填空题'}
                debounceTime={300}
                request={async () => {
                  const res = await getAllFill();
                  return res.records.map((item: QuestionData) => {
                    return {
                      label: `${item.id}:${item.subject}`,
                      value: item.id,
                      type: 1,
                    };
                  });
                }}
              ></ProFormSelect.SearchSelect>
              <ProFormSelect.SearchSelect
                name="judge"
                placeholder={'添加判断题'}
                debounceTime={300}
                request={async () => {
                  const res = await getAllJudge();
                  return res.records.map((item: QuestionData) => {
                    return {
                      label: `${item.id}:${item.subject}`,
                      value: item.id,
                      type: 2,
                    };
                  });
                }}
              ></ProFormSelect.SearchSelect>
              <ProFormSelect.SearchSelect
                name="multi"
                placeholder={'添加主观题'}
                debounceTime={300}
                request={async () => {
                  const res = await getAllMulti();
                  return res.records.map((item: QuestionData) => {
                    return {
                      label: `${item.id}:${item.subject}`,
                      value: item.id,
                      type: 4,
                    };
                  });
                }}
              ></ProFormSelect.SearchSelect>
            </ModalForm>
          </div>
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
                          <Popconfirm
                            title="确定删除此题吗"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={async () => {
                              const res = await deleteQuestionFromPaper(
                                selectedPaperid,
                                item.id,
                                3,
                              );
                              if (res.code === 0) {
                                message.success('删除成功');
                              }
                              fetchPaperDetail(selectedPaperid);
                              return true;
                            }}
                          >
                            <Button danger>删除</Button>
                          </Popconfirm>
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
                          <Popconfirm
                            title="确定删除此题吗"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={async () => {
                              const res = await deleteQuestionFromPaper(
                                selectedPaperid,
                                item.id,
                                2,
                              );
                              if (res.code === 0) {
                                message.success('删除成功');
                              }
                              fetchPaperDetail(selectedPaperid);
                              return true;
                            }}
                          >
                            <Button danger>删除</Button>
                          </Popconfirm>
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
                          <Popconfirm
                            title="确定删除此题吗"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={async () => {
                              const res = await deleteQuestionFromPaper(
                                selectedPaperid,
                                item.id,
                                1,
                              );
                              if (res.code === 0) {
                                message.success('删除成功');
                              }
                              fetchPaperDetail(selectedPaperid);
                              return true;
                            }}
                          >
                            <Button danger>删除</Button>
                          </Popconfirm>
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
                            <Popconfirm
                              title="确定删除此题吗"
                              okText="确定"
                              cancelText="取消"
                              onConfirm={async () => {
                                const res = await deleteQuestionFromPaper(
                                  selectedPaperid,
                                  item.id,
                                  4,
                                );
                                if (res.code === 0) {
                                  message.success('删除成功');
                                }
                                fetchPaperDetail(selectedPaperid);
                                return true;
                              }}
                            >
                              <Button danger>删除</Button>
                            </Popconfirm>
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
export default ExamPaper;
