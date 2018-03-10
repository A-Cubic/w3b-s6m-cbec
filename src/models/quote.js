import {getOfferOfSupplier, updateOfferflagOfSupplier,offerbyid} from '../services/api';

export default {
  namespace: 'quote',

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
    *updateStatus({ payload, callback }, { call }) {
      const response = yield call(updateOfferflagOfSupplier, payload);
      if (response === undefined) {

      } else {
        callback(response);
      }
    },
    *info({ payload, callback }, { call }) {
      const response = yield call(getOfferOfSupplier, payload);
      if (response !== undefined) {
        callback(response);
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
