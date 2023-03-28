import request from '..';

export async function userRegist(body: API.ResistBody) {
  return await request('/exam/user/register', {
    method: 'POST',
    data: {
      username: body.username,
      password: body.password,
      level: parseInt(body.level),
      clazzid: body.clazzid,
    },
  });
}
export async function getClassList() {
  return await request('/exam/class/list', {
    method: 'POST',
    data: {
      page: 1,
      limit: 99,
    },
  });
}
