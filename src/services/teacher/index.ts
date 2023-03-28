import request from '../';

export async function getInfo() {
  return request('/exam/user/getinfobytoken', {
    method: 'GET',
  });
}
export async function getNotice(
  page: number | undefined,
  limit: number | undefined,
) {
  return request('/exam/announcement/info', {
    method: 'POST',
    data: {
      page,
      limit: 7,
    },
  });
}
export async function addNotice(title: string, content: string, ids: string[]) {
  return request('/exam/announcement/save', {
    method: 'POST',
    data: {
      title,
      content,
      ids: ids.map((item: string) => {
        return parseInt(item);
      }),
    },
  });
}
export async function deleteNotice(id: number) {
  return request('/exam/announcement/delete', {
    method: 'POST',
    data: [id],
  });
}
export async function addClass(clazz: string) {
  return request('/exam/class/save', {
    method: 'POST',
    data: {
      clazz,
      teacherid: localStorage.getItem('userid'),
    },
  });
}
export async function getSelecList(page: number | undefined) {
  return request('/exam/multiquestion/list', {
    method: 'POST',
    data: {
      page,
      limit: 7,
    },
  });
}
export async function getClass(page: number | undefined) {
  return request('/exam/class/info', {
    method: 'POST',
    data: {
      page,
      limit: 7,
      teacherid: localStorage.getItem('userid'),
    },
  });
}
export async function addSelectQuestion(body: API.QuestionData_Select) {
  return request('/exam/multiquestion/save', {
    method: 'POST',
    data: {
      ...body,
    },
  });
}
export async function deleteSelectQuestion(id: number) {
  return request('/exam/multiquestion/delete', {
    method: 'POST',
    data: [id],
  });
}
export async function deleteClass(id: number) {
  return request('/exam/class/delete', {
    method: 'POST',
    data: [id],
  });
}
export async function getFillList(page: number | undefined) {
  return request('/exam/fillquestion/list', {
    method: 'POST',
    data: {
      page,
      limit: 7,
    },
  });
}
export async function deleteFillQuestion(id: number) {
  return request('/exam/fillquestion/delete', {
    method: 'POST',
    data: [id],
  });
}
export async function addFillQuestion(body: API.QuestionData_Fill) {
  return request('/exam/fillquestion/save', {
    method: 'POST',
    data: {
      ...body,
    },
  });
}
export async function getJudgeList(page: number | undefined) {
  return request('/exam/judgequestion/list', {
    method: 'POST',
    data: {
      page,
      limit: 7,
    },
  });
}
export async function deleteJudgeQuestion(id: number) {
  return request('/exam/judgequestion/delete', {
    method: 'POST',
    data: [id],
  });
}
export async function addJudgeQuestion(body: API.QuestionData_Fill) {
  return request('/exam/judgequestion/save', {
    method: 'POST',
    data: {
      ...body,
    },
  });
}
export async function getMultiList(page: number | undefined) {
  return request('/exam/subjectivequestion/list', {
    method: 'POST',
    data: {
      page,
      limit: 7,
    },
  });
}
export async function deleteMultiQuestion(id: number) {
  return request('/exam/subjectivequestion/delete', {
    method: 'POST',
    data: [id],
  });
}
export async function addMultiQuestion(body: API.QuestionData_Fill) {
  return request('/exam/subjectivequestion/save', {
    method: 'POST',
    data: {
      ...body,
    },
  });
}
export async function getPaperList(page: number | undefined) {
  return request('/exam/paper/list', {
    method: 'POST',
    data: {
      page,
      limit: 7,
    },
  });
}
export async function getExams(page: number | undefined) {
  return request('/exam/exammanage/info', {
    method: 'POST',
    data: {
      page,
      limit: 7,
    },
  });
}
export async function getExamPaerDetail(id: number) {
  return request('/exam/paper/paperselect', {
    method: 'POST',
    data: {
      paperid: id,
    },
  });
}
export async function addExamPaper(body: API.ExamPaperProps) {
  return request('/exam/paper/save', {
    method: 'POST',
    data: {
      ...body,
      totalTime: parseInt(body.totalTime),
    },
  });
}
export async function getAllClassList() {
  return request('/exam/class/info', {
    method: 'POSt',
    data: {
      page: 1,
      limit: 99,
      teacherid: localStorage.getItem('userid'),
    },
  });
}
export async function deleteExamPaper(id: number) {
  return request('/exam/paper/delete', {
    method: 'POST',
    data: [id],
  });
}
export async function getAllSelect() {
  return request('/exam/multiquestion/list', {
    method: 'POST',
    data: {
      page: 1,
      limit: 99,
    },
  });
}
export async function getAllFill() {
  return request('/exam/fillquestion/list', {
    method: 'POST',
    data: {
      page: 1,
      limit: 99,
    },
  });
}
export async function getAllJudge() {
  return request('/exam/judgequestion/list', {
    method: 'POST',
    data: {
      page: 1,
      limit: 99,
    },
  });
}
export async function getAllMulti() {
  return request('/exam/subjectivequestion/list', {
    method: 'POST',
    data: {
      page: 1,
      limit: 99,
    },
  });
}
export async function addQuetionForPaper(
  body: { paperid: number; questionid: number; questiontype: number }[],
) {
  return request('/exam/paper/addQues', {
    method: 'POST',
    data: body,
  });
}
export async function deleteExam(id: number) {
  return request('/exam/exammanage/delete', {
    method: 'POST',
    data: [id],
  });
}
export async function getAllPaper() {
  return request('/exam/paper/list', {
    method: 'POST',
    data: {
      page: 1,
      limit: 99,
    },
  });
}
export async function addExam(body: {
  source: string;
  examdate: string;
  paperid: number;
  ids: number;
}) {
  return request('/exam/exammanage/save', {
    method: 'POST',
    data: {
      ...body,
      ids: [body.ids],
    },
  });
}
export async function deleteQuestionFromPaper(
  paperid: number,
  questionid: number,
  questiontype: number,
) {
  return request('/exam/paper/deleteQues', {
    method: 'POST',
    data: [
      {
        paperid,
        questionid,
        questiontype,
      },
    ],
  });
}
export async function getUnCheckPaper() {
  return request('/exam/studentanswer/allwaitingcorrect', {
    method: 'POST',
  });
}
export async function autoCheck(key: number, data: API.StuAnswer[]) {
  return request('/exam/studentanswer/autojudge', {
    method: 'POST',
    data: {
      answerDTOS: data,
      score: 0,
    },
  });
}
export async function submitCheck(data: API.StuAnswer[], score: number) {
  return request('/exam/studentanswer/handjudge', {
    method: 'POST',
    data: {
      answerDTOS: data,
      score: score,
    },
  });
}
export async function saveScore(userid: number, examid: number, score: number) {
  return request('/exam/score/save', {
    method: 'POST',
    data: {
      userid,
      examid,
      score,
    },
  });
}
export async function autoAddPaper(body: API.ExamPaperProps) {
  return request('/exam/paper/autoGetPaper', {
    method: 'POST',
    data: {
      ...body,
      totalTime: parseInt(body.totalTime),
    },
  });
}
export async function getLogs(page: number | undefined) {
  return request('/exam/weblog/list', {
    method: 'GET',
    params: {
      page,
      limit: 7,
    },
  });
}
export async function deleteLog(id: number) {
  return request('/exam/weblog/delete', {
    method: 'POST',
    data: [id],
  });
}
