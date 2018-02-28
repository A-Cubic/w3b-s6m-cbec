import { getRegisterCheckUsers,realRegisterCheck } from '../services/api';

export default {
  namespace: 'registerCheck',

  state: {
    list: [],
    pagination:{},
  },

  effects: {
    *fetch({ payload}, { call, put }) {
      const response = yield call(getRegisterCheckUsers, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *check({ payload, callback }, { call }) {
      const response = yield call(realRegisterCheck, payload);
      if (response === undefined) {

      } else {
        callback(response);
      }
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
