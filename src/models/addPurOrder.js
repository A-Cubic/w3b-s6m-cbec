import { goodsList } from '../services/api';

export default {
  namespace: 'addPurOrder',

  state: {
    goodsList: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *goodsList({ payload }, { call, put }) {
      console.log('111');
      const response = yield call(goodsList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        goodsList: action.payload,
      };
    },
  },
};
