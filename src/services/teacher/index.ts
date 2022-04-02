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
    },
  });
}
//
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
