import request from '../';

export async function getInfo() {
  return request('/teacher/info', {
    method: 'GET',
  });
}
export async function getNotice() {
  return request('/teacher/notice', {
    method: 'GET',
  });
}
export async function getStudent() {
  return request('/teacher/student_charge', {
    method: 'GET',
  });
}
export async function getClass() {
  return request('/teacher/class', {
    method: 'GET',
  });
}
export async function getScore() {
  return request('/teacher/score', {
    method: 'GET',
  });
}
export async function getExamBase() {
  return request('/teacher/examBase', {
    method: 'GET',
  });
}
export async function getExamPage() {
  return request('/teacher/examPage', {
    method: 'GET',
  });
}
