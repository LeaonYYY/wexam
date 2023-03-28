// @ts-ignore
/* eslint-disable */

declare namespace API {
  type StuInfo = {
    username?: string;
    name?: string;
    school?: string;
    college?: string;
    class?: string;
    stuNo?: string;
  };
  type ScoreItem = {
    examid: number;
    score: number;
  };
  type ExamItem = {
    id: number;
    className: string;
    source: string;
    examdate: string;
    status: string;
    paperid: number;
  };
  type MsgItem = {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
  };
  type SiderItem = {
    id: string;
    text: string;
    status: boolean;
  };
  //选择题
  type selectItem = {
    id: string;
    type?: string;
    score: string;
    question: string;
    option: string[];
    answer: string;
  };
  //填空题
  type blankItem = {
    id: string;
    type?: string;
    score: string;
    question: string;
    asnwer: string;
  };
  //简答题
  type essayItem = {
    id: string;
    type?: string;
    score: string;
    question: string;
    answer: string;
  };
  type ExamPaper = {
    id: number;
    name: string;
    type: number;
    data: {
      id: string;
      question: string;
      score: string;
      type?: string;
      option?: string[];
      answer: string;
    }[];
  };
  type SiderBoxItem = {
    id: string;
    text: string;
    status: boolean;
  };
  //考试页面左侧栏的item
  type ExamSiderItem = {
    id: string;
    name: string;
    score: string;
    data: SiderItem[];
  };
}
