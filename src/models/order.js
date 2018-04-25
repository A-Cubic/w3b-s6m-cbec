import {
  getOrderListOfSupplier, getOrderListOfPurchasers,getOrderGoodsByOrderId,getAccount,getOrderListOfWareHouse
} from '../services/api';

export default {
  namespace: 'order',

  state: {
    list: [],
    pagination:{},
    goodsList:[],
    Account:[],
    totalPrice:"",
    total:"",
    totalyj:"",
  },

  effects: {
    *listp({ payload }, { call, put }) {
      const response = yield call(getOrderListOfPurchasers, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *lists({ payload }, { call, put }) {
      const response = yield call(getOrderListOfSupplier, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *listw({ payload }, { call, put }) {
      const response = yield call(getOrderListOfWareHouse, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *goodslist({ payload }, { call, put }) {
      const response = yield call(getOrderGoodsByOrderId, payload);
      if (response !== undefined) {
        yield put({
          type: 'goods',
          payload: response,
        });
      }
    },
    *accountlist({ payload }, { call, put }) {
      const response = yield call(getAccount, payload);
      if (response !== undefined) {
        yield put({
          type: 'account',
          payload: response,
        });

      }
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        total: action.payload.total,
        totalyj: action.payload.totalyj,
        list:action.payload.listOrder.list,
      };
    },
    goods(state, action) {
      return {
        ...state,
        goodsList: action.payload,
      };
    },
    account(state, action) {
      return {
        ...state,
        Account: action.payload.listAG,
        totalPrice:action.payload.total,
      };
    },
  },
};
