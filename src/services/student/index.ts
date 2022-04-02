import request from '../';

export async function getInfo() {
  return request('/student/info', {
    method: 'GET',
  });
}

export async function getScore() {
  return request('/student/score', {
    method: 'GET',
  });
}

export async function getExam() {
  return request('/student/exam', {
    method: 'GET',
  });
}
export async function getMsg() {
  return request('/exam/announcement/info', {
    method: 'POST',
    data: {
      page: 1,
      limit: 99,
    },
  });
}
export async function getExamData() {
  return request('/student/examData', {
    method: 'GET',
  });
}
