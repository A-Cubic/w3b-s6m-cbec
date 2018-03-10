import { getPurOrderListOfOperate, getPurGoodsListOfOperate,
  getPurInfoDetailsOfOperate, updateFeeOfOperate, updatePriceOfOperate,
  supplyListOfOperate,updateSupplyFlagOfOperate,listChat,sendChat,updatePurchaseStatus } from '../services/api';

export default {
  namespace: 'purchaseOperate',

  state: {
    list: [],
    pagination: {},
    listGoods: [],
    paginationGoods: {},
    purchase: {},
    supplyList: [],
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
      const response = yield call(getPurGoodsListOfOperate, payload);
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
    *updateFee({ payload, callback }, { call }) {
      const response = yield call(updateFeeOfOperate, payload);
      if (response !== undefined) {
          callback(response);
      }
    },
    *updatePrice({ payload, callback }, { call }) {
      const response = yield call(updatePriceOfOperate, payload);
      if (response !== undefined) {
          callback(response);
      }
    },
    *supplyList({ payload, callback }, { call, put }) {
      const response = yield call(supplyListOfOperate, payload);
      if (response !== undefined) {
        yield put({
          type: 'querySupplyList',
          payload: response,
        });
      }
    },
    *updateSupplyFlag({ payload, callback }, { call }) {
      const response = yield call(updateSupplyFlagOfOperate, payload);
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
    querySupplyList(state, action) {
      return {
        ...state,
        supplyList:action.payload,
      };
    },
    // queryChatList(state, action) {
    //   return {
    //     ...state,
    //     chatList:action.payload,
    //   };
    // },

  },
};
