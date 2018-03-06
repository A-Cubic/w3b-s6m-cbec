import { getPurOrderListOfOperate, getPurGoodsListOfOperate, getPurInfoDetailsOfOperate } from '../services/api';

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
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *goodslist({ payload }, { call, put }) {
      const response1 = yield call(getPurInfoDetailsOfOperate, payload);
      yield put({
        type: 'queryDetails',
        payload: response1,
      });

      const response = yield call(getPurGoodsListOfOperate, payload);
      yield put({
        type: 'queryGoodsList',
        payload: response,
      });
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
