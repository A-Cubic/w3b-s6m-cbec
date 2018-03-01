import { getMemberInfoList,updateUserStatus,getMemberInfoDetails } from '../services/api';

export default {
  namespace: 'member',

  state: {
    list: [],
    pagination:{},
  },

  effects: {
    *list({ payload}, { call, put }) {
      const response = yield call(getMemberInfoList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *details({ payload, callback }, { call, put }) {
      const response = yield call(getMemberInfoDetails, payload);
      if (response === undefined) {

      } else {
        callback(response);
        // yield put({
        //   type: 'queryUser',
        //   payload: response,
        // });
      }
    },
    *updateStatus({ payload, callback }, { call }) {
      const response = yield call(updateUserStatus, payload);
      if (response === undefined) {

      } else {
        callback(response);
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...action.payload,
      };
    },
    queryUser(state, action) {
      // console.log(action.payload);
      return {
        currentUser: action.payload,
      };
    },

  },
};
