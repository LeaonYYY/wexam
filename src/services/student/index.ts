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
