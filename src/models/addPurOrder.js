import { goodsList,getSendType,addPurGoods,savePurOrder,splitPurGoods } from '../services/api';
import { notification  } from 'antd';
export default {
  namespace: 'addPurOrder',

  state: {
    goodsList: {
      list: [],
      pagination: {},
    },
    sendTypeDate : []
  },

  effects: {
    *goodsList({ payload }, { call, put }) {
      const response = yield call(goodsList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *getSendType({ payload }, { call, put }) {
      const response = yield call(getSendType, payload);
      yield put({
        type: 'sendType',
        payload: response,
      });
    },
    *savePurOrder({ payload,callback }, { call, put }) {
      const response = yield call(savePurOrder, payload);
      if ('purchasesn' in response) {
        if(callback) callback(response.purchasesn);
      }
    },
    *addPurGoods({ payload,callback }, { call, put }) {
      const response = yield call(addPurGoods, payload);
      if(callback)callback(response);
    },
    *splitPurGoods({ payload,callback }, { call, put }) {
      const response = yield call(splitPurGoods, payload);
      console.log(response);
      if(callback)callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        goodsList: action.payload,
      };
    },
    sendType(state, action) {
      return {
        ...state,
        sendTypeDate: action.payload,
      };
    }
  },
};
