import request from '../';

export async function login(body: API.LoginProps) {
  return request('/exam/user/login', {
    method: 'POST',
    data: {
      username: body.username,
      password: body.password,
    },
  });
}
