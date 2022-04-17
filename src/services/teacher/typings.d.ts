// @ts-ignore
/* eslint-disable */
declare namespace API {
  type tableInfo = {
    pageSize: number;
    pageNo: number;
    recent: number;
  };
  type watchInfo = {
    key: string;
    course: string;
    date: string;
    time: string;
    status: number;
  };
  type PageInfo = {
    total?: number;
    pageSize?: number;
    current?: number;
  };
  type QuestionData_Select = {
    question: string;
    answera: string;
    answerb: string;
    answerc: string;
    answerd: string;
    score: string;
    rightanswer: string;
  };
  type QuestionData_Fill = {
    question: string;
    answer: string;
    score: string;
    level: number;
    subject: string;
  };
  type ExamPaperProps = {
    name: string;
    major: string;
    totalTime: string;
  };
  type StuAnswer = {
    questionName: string;
    questionType: number;
    questionScore: number;
    rightAnswer: string;
    source: string;
    studentAnswer: string;
    studentAnswerId: number;
    studentScore?: number;
  };
}
