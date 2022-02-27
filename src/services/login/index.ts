import request from '../';

export async function login(body: API.LoginProps) {
  return request('/login', {
    method: 'POST',
    data: {
      username: body.username,
      password: body.password,
    },
  });
}
