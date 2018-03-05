import { getPurOrderListOfOperate,getPurGoodsListOfOperate } from '../services/api';

export default {
  namespace: 'purchaseOperate',

  state: {
    list: [],
    pagination:{},
    listGoods:[],
    paginationGoods:{},
  },

  effects: {
    *list({ payload}, { call, put }) {
      const response = yield call(getPurOrderListOfOperate, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *goodslist({ payload}, { call, put }) {
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
        ...action.payload,
      };
    },
    queryGoodsList(state, action) {
      return {
        ...action.payload,
      };
    },

  },
};
