import {
  getGoodsListOfOperate, updateGoodsOfOperate,getGoodsById,getGoodsNum,updateGoodsNum,getSellNum
} from '../services/api';

export default {
  namespace: 'goods',

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
      const response = yield call(getGoodsListOfOperate, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *numlist({ payload, callback }, { call, put }) {
      const response = yield call(getGoodsNum, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });

        callback(response);
      }
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(updateGoodsOfOperate, payload);
      if (response === undefined) {

      } else {
        callback(response);
      }
    },
    *updateKC({ payload, callback }, { call }) {
      const response = yield call(updateGoodsNum, payload);
      if (response === undefined) {

      } else {
        callback(response);
      }
    },
    *info({ payload, callback }, { call }) {
      const response = yield call(getGoodsById, payload);
      if (response !== undefined) {
        callback(response);
      }
    },
    *sell({ payload }, { call, put }) {
      const response = yield call(getSellNum, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });
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
