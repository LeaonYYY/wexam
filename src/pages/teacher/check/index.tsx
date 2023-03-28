import {
  autoCheck,
  getUnCheckPaper,
  saveScore,
  submitCheck,
} from '@/services/teacher';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import styles from './index.less';

type Paper = Record<number, API.StuAnswer[]>;
const Score = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [answers, setAnswers] = useState<API.StuAnswer[]>([]);
  const [isModalVisivle, setIsModalVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [autoScore, setAutoScore] = useState(0);
  const [answerIds, setAnswerIds] = useState<{ id: number; score: number }[]>(
    [],
  );

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await getUnCheckPaper();
    //@ts-ignore
    setPapers(res.paper);
  };
  const handleCheck = async (key: number, data: API.StuAnswer[]) => {
    const res = await autoCheck(key, data);
    setAutoScore(res.score.score);

    setAnswers(data);
    setIsModalVisible(true);
    setKey(key);
  };
  const handleChange = (id: number, score: string) => {
    let flag = -1;
    answerIds.forEach((item: { id: number; score: number }, index: number) => {
      if (item.id === id) {
        flag = index;
      }
    });
    let flag2 = 0;
    let temp: API.StuAnswer[] = answers;
    temp.forEach((item: API.StuAnswer, index: number) => {
      if (item.studentAnswerId === id) {
        flag2 = index;
      }
    });
    temp[flag2].studentScore = parseInt(score);
    setAnswers(temp);
    if (flag != -1) {
      answerIds.splice(flag, 1);
    }
    setAnswerIds([
      ...answerIds,
      {
        id: id,
        score: parseInt(score) || 0,
      },
    ]);
  };
  const handleSubmit = async () => {
    const res = await submitCheck(answers, autoScore);
    const examid = key % 99999;
    const userid = (key - examid) / 99999;
    const res2 = await saveScore(userid, examid, res.score.score);
    if (res2.code === 0) {
      message.success('批改成功');
      setIsModalVisible(false);
      await fetchData();
    } else {
      message.error(res.msg);
    }
  };
  return (
    <div className={styles.scoped}>
      <div className={styles.showBox}>
        <div className={styles.centerBox}>
          {papers.map((item: Paper, index: number) => {
            const key: any[] = Object.keys(item);
            return (
              <div>
                {key.map((key) => {
                  {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          margin: '10% 0',
                          backgroundColor: '#f0f0f0',
                          alignItems: 'center',
                        }}
                      >
                        <div>考试编号: {key % 99999}</div>
                        <div>学生id: {(key - (key % 99999)) / 99999}</div>
                        <Button
                          onClick={() => {
                            handleCheck(key, item[key]);
                          }}
                        >
                          批改
                        </Button>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        title={'试卷批改'}
        style={{
          height: '60%',
          width: '60%',
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={[]}
        visible={isModalVisivle}
        destroyOnClose
      >
        <div>
          {answers.map((item: API.StuAnswer) => {
            return item.questionType !== 2 && item.questionType !== 3 ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 10%',
                  marginBottom: '10%',
                }}
              >
                <div>
                  <div>
                    <p> 题目：{item.questionName}</p>
                  </div>
                  <div>题目分值：{item.questionScore}</div>
                  <div>正确答案：{item.rightAnswer}</div>
                  <div>学生答案：{item.studentAnswer}</div>
                </div>
                <div>
                  <Input
                    placeholder="请打分"
                    onBlur={(e) =>
                      handleChange(item.studentAnswerId, e.target.value)
                    }
                  />
                </div>
              </div>
            ) : (
              ''
            );
          })}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button onClick={handleSubmit}>确定</Button>
        </div>
      </Modal>
    </div>
  );
};
export default Score;
