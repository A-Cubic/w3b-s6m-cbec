import { getMenu } from '../services/api';
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

function isUrl(path) {
  return reg.test(path);
}

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export default {
  namespace: 'menu',

  state: {
    menu: [],
  },

  effects: {
    *init({ payload }, { call, put }) {
      const response = yield call(getMenu, payload);
      yield put({
        type: 'initMenuData',
        payload: response,
      });
    },
  },

  reducers: {
    initMenuData(state, { payload }) {
      return {
        ...state,
        menu: formatter(payload),
      };
    },
  },
};
