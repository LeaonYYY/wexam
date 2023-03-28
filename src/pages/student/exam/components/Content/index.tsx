import React, { FC } from 'react';
import { nanoid } from 'nanoid';
import { Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import { history } from 'umi';
import { startExam } from '@/services/student';

const { confirm } = Modal;

interface Props {
  examData: API.ExamItem[];
}

const Content: FC<Props> = ({ examData }) => {
  const handleExamStart = (paperid: any, examid: any) => {
    confirm({
      title: '确认开始考试?',
      icon: <ExclamationCircleOutlined />,
      content: '只有一次考试机会',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await startExam(
          examid,
          localStorage.getItem('userid') || '',
        );
        if (res.code === 0) {
          history.push({
            pathname: '/examPage',
            query: {
              paperid: paperid,
              examid: examid,
            },
          });
        } else {
          message.error(res.msg);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <div
      style={{
        height: '85%',
      }}
    >
      {examData.map((val) => {
        return (
          <div
            key={nanoid()}
            className={[styles.content, styles.bg - 1].join(' ')}
            // className={[styles.content, styles[`bg${val.state}`]].join(' ')}
          >
            <div>{val.source}</div>
            <div>{val.examdate}</div>
            <div>{val.className || ' '}</div>
            {/* {val.state === -1 ? (
              <div>已结束</div>
            ) : val.state === 0 ? (
              <div>未开始</div>
            ) : (
              <div>正在进行</div>
            )} */}
            <div>
              <Button
                // disabled={val.state === 1 ? false : true}
                type="text"
                onClick={() => {
                  handleExamStart(val.paperid, val.id);
                }}
              >
                开始考试
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Content;
