import request from '..';

export async function getFuntion() {
  return request('/admin/function', {
    method: 'GET',
  });
}
