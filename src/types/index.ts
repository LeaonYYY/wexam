export const LoginMessage = {
  student: '请输入用户名或学号',
  teacher: '请输入用户名或教职工号',
  admin: '请输入管理员账号',
};
export interface pageInfo {
  current?: number;
  total?: number;
}
export interface SelectQuestion {
  id: number;
  question: string;
  answera: string;
  answerb: string;
  answerc: string;
  answerd: string;
  rightanswer: string;
  score: number;
}
export interface ElseQuestion {
  id: number;
  question: string;
  answer: string;
  score: number;
}
export interface PaperDetail {
  fillQuestions: ElseQuestion[];
  judgeQuestions: ElseQuestion[];
  multiQuestions: SelectQuestion[];
  subjectiveQuestions: ElseQuestion[];
}
