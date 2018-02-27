import { getRegisterCheckUsers } from '../services/api';

export default {
  namespace: 'registerCheck',

  state: {
    list: [],
    pagination:{},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getRegisterCheckUsers, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...action.payload,
      };
    },
  },
};
