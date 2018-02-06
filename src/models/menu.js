import { getMenu } from '../services/api';

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
        menu: payload,
      };
    },
  },
};
