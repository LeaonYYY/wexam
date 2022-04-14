import request from '../';

export async function getMsg() {
  return request('/exam/announcement/getmyann', {
    method: 'GET',
    params: {
      page: 1,
      limit: 99,
    },
  });
}
export async function getInfo() {
  return request('/exam/user/getinfobytoken', {
    method: 'GET',
  });
}
export async function joinClass(classid: number) {
  return request('/classtostu/binding', {
    method: 'POST',
    data: {
      classid,
      studentid: localStorage.getItem('userid'),
    },
  });
}
export async function getClassList(page: number | undefined) {
  return request('/classtostu/queryClass', {
    method: 'POST',
    data: {
      studentid: localStorage.getItem('userid'),
      page,
      limit: 7,
    },
  });
}

export async function studentQuitClass(id: number) {
  return request('/classtostu/unbinding', {
    method: 'POST',
    data: {
      studentid: localStorage.getItem('userid'),
      classid: id,
    },
  });
}
export async function getExamsList() {
  return request('/exam/exammanage/getmyexam', {
    method: 'get',
    params: {
      page: 1,
      limit: 99,
    },
  });
}
export async function getExamPaperDetail(id: number) {
  return request('/exam/paper/paperselect', {
    method: 'POST',
    data: {
      paperid: id,
    },
  });
}
export async function submitQuestionAnswer(
  paperid: string,
  questionType: number,
  questionid: number,
  userAnswer: string,
) {
  return request('/exam/studentanswer/questionsubmit', {
    method: 'POST',
    data: {
      paperid: parseInt(paperid),
      questionType,
      questionid,
      userAnswer,
    },
  });
}
