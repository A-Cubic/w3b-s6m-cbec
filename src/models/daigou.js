import {
  getTicketList, getTicketForCode, updateTicketStatus
} from '../services/api';

export default {
  namespace: 'daigou',

  state: {
    list: [],
    pagination:{},
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getTicketList, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *info({ payload, callback }, { call }) {
      const response = yield call(getTicketForCode, payload);
      if (response !== undefined) {
        callback(response);
      }
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(updateTicketStatus, payload);
      if (response === undefined) {

      } else {
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
  },
};
