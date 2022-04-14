import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import { nanoid } from 'nanoid';
import styles from './index.less';
import { ProForm, ProFormSelect } from '@ant-design/pro-form';
import { ElseQuestion, PaperDetail, SelectQuestion } from '@/types';
import { submitQuestionAnswer } from '@/services/student';
import { Select as Slecter, Input, Button } from 'antd';
import Select from '@/components/Select';
import Fill from '@/components/Fill';
import { getExamPaerDetail } from '@/services/teacher';
const { TextArea } = Input;
const ExamPage: React.FC = () => {
  const { getData, data, siderData } = useModel('examPage');
  const [paperid, setPaperid] = useState('');
  const [paperDetailData, setPaperDetailData] = useState<PaperDetail>({
    fillQuestions: [],
    judgeQuestions: [],
    multiQuestions: [],
    subjectiveQuestions: [],
  });
  useEffect(() => {
    const { query } = history.location;
    //@ts-ignore
    fetchPaperDetail(query.id);
    //@ts-ignore
    setPaperid(query.id);
  }, []);
  const fetchPaperDetail = async (id: number) => {
    const res = await getExamPaerDetail(id);
    setPaperDetailData({
      fillQuestions: res?.paper?.fillQuestions?.[0] || [],
      judgeQuestions: res?.paper?.judgeQuestions?.[0] || [],
      multiQuestions: res?.paper?.multiQuestions?.[0] || [],
      subjectiveQuestions: res?.paper?.subjectiveQuestions?.[0] || [],
    });
  };
  const handleSubmit = async (
    value: string,
    questionid: number,
    questiontype: number,
  ) => {
    const res = await submitQuestionAnswer(
      paperid,
      questiontype,
      questionid,
      value,
    );
  };
  return (
    <div className={styles.scoped}>
      <div>
        <h1>一.选择题</h1>
        <div>
          {paperDetailData.multiQuestions.length > 0
            ? paperDetailData.multiQuestions.map(
                (item: SelectQuestion, index: number) => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                      }}
                      key={nanoid()}
                    >
                      <Select
                        index={index + 1}
                        question={item.question}
                        answera={item.answera}
                        answerb={item.answerb}
                        answerc={item.answerc}
                        answerd={item.answerd}
                        score={item.score}
                      ></Select>
                      <div>
                        <Slecter
                          placeholder="请选择答案"
                          onChange={(value: string) => {
                            handleSubmit(value, item.id, 3);
                          }}
                        >
                          <Slecter.Option value="A">A</Slecter.Option>
                          <Slecter.Option value="B">B</Slecter.Option>
                          <Slecter.Option value="C">C</Slecter.Option>
                          <Slecter.Option value="D">D</Slecter.Option>
                        </Slecter>
                      </div>
                    </div>
                  );
                },
              )
            : '无此类题目'}
        </div>
        <h1>二.判断题</h1>
        <div>
          {paperDetailData.judgeQuestions.length > 0
            ? paperDetailData.judgeQuestions.map(
                (item: ElseQuestion, index: number) => {
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
                        index={index + 1}
                      ></Fill>
                      <div>
                        <Slecter
                          placeholder="请选择答案"
                          onChange={(value: string) => {
                            handleSubmit(value, item.id, 2);
                          }}
                        >
                          <Slecter.Option value="T">正确</Slecter.Option>
                          <Slecter.Option value="F">错误</Slecter.Option>
                        </Slecter>
                      </div>
                    </div>
                  );
                },
              )
            : '无此类题目'}
        </div>
        <h1>三.填空题</h1>
        <div>
          {paperDetailData.fillQuestions.length > 0
            ? paperDetailData.fillQuestions.map(
                (item: ElseQuestion, index: number) => {
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
                        index={index + 1}
                      ></Fill>
                      <div>
                        <TextArea
                          rows={3}
                          placeholder={'请输入答案'}
                          onBlur={(e: any) => {
                            handleSubmit(e.target.value, item.id, 1);
                          }}
                        ></TextArea>
                      </div>
                    </div>
                  );
                },
              )
            : '无此类题目'}
        </div>
        <h1>四.主观题</h1>
        <div>
          {paperDetailData.subjectiveQuestions.length > 0
            ? paperDetailData.subjectiveQuestions.map(
                (item: ElseQuestion, index: number) => {
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
                        index={index + 1}
                      ></Fill>
                      <div>
                        <TextArea
                          rows={3}
                          placeholder={'请输入答案'}
                          onBlur={(e: any) => {
                            handleSubmit(e.target.value, item.id, 4);
                          }}
                        ></TextArea>
                      </div>
                    </div>
                  );
                },
              )
            : '无此类题目'}
        </div>
        <Button>结束考试</Button>
      </div>
    </div>
  );
};

export default ExamPage;
