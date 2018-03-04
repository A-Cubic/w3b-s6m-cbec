import { getPurOrderList } from '../services/api';

export default {
  namespace: 'purchase',

  state: {
    list: [],
    pagination:{},
  },

  effects: {
    *list({ payload}, { call, put }) {
      const response = yield call(getPurOrderList, payload);
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
