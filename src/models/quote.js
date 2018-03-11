import {getOfferOfSupplier, updateOfferflagOfSupplier,offerbyid,updateOfferOfSupplier} from '../services/api';

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
    *info({ payload, callback }, { call ,put}) {
      const response = yield call(offerbyid, payload);
      if (response !== undefined) {
        callback(response);
      }
    },
    *updateOffer({ payload, callback }, { call }) {
      const response = yield call(updateOfferOfSupplier, payload);
      if (response === undefined) {

      } else {
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
