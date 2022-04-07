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
export async function addNotice(title: string, content: string) {
  return request('/exam/announcement/save', {
    method: 'POST',
    data: {
      title,
      content,
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
//
export async function getStudent() {
  return request('/teacher/student_charge', {
    method: 'GET',
  });
}

export async function getScore() {
  return request('/teacher/score', {
    method: 'GET',
  });
}

export async function getExamPage() {
  return request('/teacher/examPage', {
    method: 'GET',
  });
}
export async function getExamInfo() {
  return request('/teacher/examInfo', {
    method: 'GET',
  });
}
export async function getExamCheck() {
  return request('/teacher/checkInfo', {
    method: 'GET',
  });
}
