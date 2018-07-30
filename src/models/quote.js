import {
  getOfferOfSupplier, updateOfferflagOfSupplier, offerbyid, updateOfferOfSupplier,
  goodsListOfSupplier,insertOfferOfSupplier
} from '../services/api';

export default {
  namespace: 'quote',

  state: {
    list: [],
    pagination:{},
    goodsList: {
      list: [],
      pagination: {},
    },
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
    *goodsList({ payload }, { call, put }) {
      const response = yield call(goodsListOfSupplier, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *insertOffer({ payload, callback }, { call }) {
      // console.log(payload.list);
      const response = yield call(insertOfferOfSupplier, payload.list);
      if (response === undefined) {

      } else {
        callback(response);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        goodsList: action.payload,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
