import request from '../utils/request';

// const apiUrl = process.env.NODE_ENV === 'development' ? '' : 'http://api.llwell.net';
const apiUrl = process.env.NODE_ENV === 'development' ? '' : 'http://oms.a-cubic.com';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request(`${apiUrl}/llback/user/currentUser`, {
    method: 'POST',
  });
}
