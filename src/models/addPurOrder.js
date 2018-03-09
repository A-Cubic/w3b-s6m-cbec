import { goodsList,getSendType } from '../services/api';

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
    },
  },
};
