import { getPurOrderListOfOperate, getPurGoodsListOfOperate, getPurInfoDetailsOfOperate, updateFeeOfOperate } from '../services/api';

export default {
  namespace: 'purchaseOperate',

  state: {
    list: [],
    pagination: {},
    listGoods: [],
    paginationGoods: {},
    purchase: {},
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getPurOrderListOfOperate, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *goodslist({ payload,callback }, { call, put }) {
      const response1 = yield call(getPurInfoDetailsOfOperate, payload);
      if (response1 !== undefined) {
        yield put({
          type: 'queryDetails',
          payload: response1,
        });
        callback(response1);
      }

      const response = yield call(getPurGoodsListOfOperate, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryGoodsList',
          payload: response,
        });

      }

    },
    *updateFee({ payload, callback }, { call }) {
      const response = yield call(updateFeeOfOperate, payload);
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
