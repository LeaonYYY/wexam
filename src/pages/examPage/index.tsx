import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import { nanoid } from 'nanoid';
import styles from './index.less';
import { ProForm, ProFormSelect } from '@ant-design/pro-form';
import { ElseQuestion, PaperDetail, SelectQuestion } from '@/types';
import { stopExam, submitQuestionAnswer } from '@/services/student';
import { Select as Slecter, Input, Button, Popconfirm, message } from 'antd';
import Select from '@/components/Select';
import Fill from '@/components/Fill';
import { getExamPaerDetail } from '@/services/teacher';

interface StuAnswer {
  examid: number;
  questionType: number; //1填空 2 判断 3选择 4主观
  questionid: number;
  userAnswer: string;
}
const { TextArea } = Input;
const ExamPage: React.FC = () => {
  const { getData, data, siderData } = useModel('examPage');
  const [examid, setExamid] = useState('');
  const [paperDetailData, setPaperDetailData] = useState<PaperDetail>({
    fillQuestions: [],
    judgeQuestions: [],
    multiQuestions: [],
    subjectiveQuestions: [],
  });
  // const [stuAnswer,setStuAnswer] = useState<StuAnswer[]>([]);
  let stuAnswer: StuAnswer[] = [];
  useEffect(() => {
    const { query } = history.location;
    //@ts-ignore
    fetchPaperDetail(query.paperid);
    //@ts-ignore
    setExamid(query.examid);
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
  const handleChangeAnswer = (
    value: string,
    questionid: number,
    questiontype: number,
  ) => {
    let flag = -1;
    stuAnswer.forEach((item: StuAnswer, index: number) => {
      if (
        item.questionType === questiontype &&
        item.questionid === questionid
      ) {
        flag = index;
      }
    });
    if (flag != -1) {
      stuAnswer.splice(flag, 1);
    }
    stuAnswer = [
      ...stuAnswer,
      {
        examid: parseInt(examid),
        questionType: questiontype,
        questionid: questionid,
        userAnswer: value,
      },
    ];
  };
  const handleSubmitAnswer = async () => {
    const res1 = await submitQuestionAnswer(stuAnswer);
    const res2 = await stopExam(
      parseInt(examid),
      localStorage.getItem('userid') || '',
    );
    if (res1.code === 0 && res2.code === 0) {
      message.success('提交成功');
      history.push('/student/exam');
    } else {
      message.error('出现错误');
    }
  };
  return (
    <div className={styles.scoped}>
      <div className={styles.paper}>
        <h1>一.选择题</h1>
        <div>
          {paperDetailData.multiQuestions.length > 0
            ? paperDetailData.multiQuestions.map(
                (item: SelectQuestion, index: number) => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
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
                            handleChangeAnswer(value, item.id, 3);
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
                        justifyContent: 'space-between',
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
                            handleChangeAnswer(value, item.id, 2);
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
                        justifyContent: 'space-between',
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
                            handleChangeAnswer(e.target.value, item.id, 1);
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
                        justifyContent: 'space-between',
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
                            handleChangeAnswer(e.target.value, item.id, 4);
                          }}
                        ></TextArea>
                      </div>
                    </div>
                  );
                },
              )
            : '无此类题目'}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Popconfirm
            title="提交后不能再次修改，您确定提交试卷吗"
            okText="确认"
            cancelText="取消"
            onConfirm={handleSubmitAnswer}
          >
            <Button>提交试卷</Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
