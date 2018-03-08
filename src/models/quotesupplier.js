import { getOfferOfSupplier } from '../services/api';

export default {
  namespace: 'quotesupplier',

  state: {
    list: [],
    pagination:{},
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getOfferOfSupplier, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
