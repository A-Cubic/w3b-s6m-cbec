import { getPurOrderListOfSupplier, getPurGoodsListOfSupplier,
  getPurInfoDetailsOfSupplier,updatePriceOfSupplier,listChat,sendChat,updatePurchaseStatus } from '../services/api';

export default {
  namespace: 'purchaseSupplier',

  state: {
    list: [],
    pagination: {},
    listGoods: [],
    paginationGoods: {},
    purchase: {},
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getPurOrderListOfSupplier, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *goodslist({ payload,callback }, { call, put }) {
      const response1 = yield call(getPurInfoDetailsOfSupplier, payload);
      const response = yield call(getPurGoodsListOfSupplier, payload);
      if (response1 !== undefined) {
        yield put({
          type: 'queryDetails',
          payload: response1,
        });
      }
      if (response !== undefined) {
        yield put({
          type: 'queryGoodsList',
          payload: response,
        });
      }
      if(response !== undefined && response1 !== undefined) {
        const result = {bean:response1,...response};
        callback(result);
      }
    },
    *updatePrice({ payload, callback }, { call }) {
      const response = yield call(updatePriceOfSupplier, payload);
      if (response !== undefined) {
          callback(response);
      }
    },
    *listChat({ payload, callback }, { call }) {
      const response = yield call(listChat, payload);
      if (response !== undefined) {
        callback(response);
      }
    },
    *sendChat({ payload, callback }, { call }) {
      const response = yield call(sendChat, payload);
      if (response !== undefined) {
        callback(response);
      }
    },
    *submitPur({ payload, callback }, { call }) {
      const response = yield call(updatePurchaseStatus, payload);
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
    queryGoodsList(state, action) {
      return {
        // ...action.payload,
        ...state,
        listGoods:action.payload.list,
        paginationGoods:action.payload.pagination,
      };
    },
    queryDetails(state, action) {
      return {
        ...state,
        purchase:action.payload,
      };
    },

  },
};
