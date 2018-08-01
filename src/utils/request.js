import fetch from 'dva/fetch';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import store from '../index';
import { getHeader } from '../utils/Global';

// 网络错误列表
const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

// 业务错误列表
const serverCodeMessage = {
  '1': { code: 401, msg: '登录信息过期，请重新登录' },
  '2': { code: 403, msg: '没有该功能相关权限' },
  '3': { code: 401, msg: '登录信息有误，请重新登录' },
  '4': { code: 404, msg: '请求目标数据不存在' },
  '5': { code: 500, msg: '服务器繁忙，请稍后重试' },
  '6': { code: 500, msg: '数据处理有误' },
  '7': { code: 500, msg: '请求参数不正确' },
  'default': { code: 500, msg: '未知错误' },

  '500': { code: 5003, msg: '数据处理有误' },
  '4000': { code: 401, msg: '登录信息过期，请重新登录' },
  '4003': { code: 4031, msg: '没有该功能相关权限' },
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    const code = response.headers.get('code');
    if (code !== null && code !== '0') {
      const error = new Error(response.headers.get('msg'));
      error.response = response;
      const serverCode = serverCodeMessage[code].code || serverCodeMessage['default'].code;
      const serverMsg = serverCodeMessage[code].msg || serverCodeMessage['default'].msg;
      notification.error({
        message: serverMsg,
        description: response.headers.get('msg'),
      });
      error.name = serverCode;
      throw error;
    }
    return response;
  }
  const errorText = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errorText,
  });
  const error = new Error(errorText);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    if (getHeader().token !== '') {
      newOptions.headers = {
        ...getHeader(),
        ...newOptions.headers,
      };
    }
    newOptions.body = JSON.stringify(newOptions.body);
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch((e) => {
      const { dispatch } = store;
      const status = e.name;
      if (status === 401) {
        dispatch({
          type: 'login/logout',
        });
        return;
      }
      if (status === 403) {
        dispatch(routerRedux.push('/exception/403'));
        return;
      }
      if (status <= 504 && status >= 500) {
        dispatch(routerRedux.push('/exception/500'));
        return;
      }
      if (status >= 404 && status < 422) {
        dispatch(routerRedux.push('/exception/404'));
        return;
      }
      // console.log(e);
    });
}
