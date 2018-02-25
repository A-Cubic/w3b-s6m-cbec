import { realRegisterStatus, realRegisterUpload } from '../services/api';
import { routerRedux } from 'dva/router';
import { setAuthority, setToken } from '../utils/Global';

export default {
  namespace: 'registerVerify',

  state: {
    currentStep : 1
  },

  effects: {
    *upload({payload, callback}, { call }) {
      const response = yield call(realRegisterUpload, payload);
      if (response === undefined) {

      } else {
        yield put({
          type: 'netxStep',
        });
        callback(response);
      }
    },
    *status({payload},{call, put }) {
      const response = yield call(realRegisterStatus, payload);
      if (response === undefined) {

      } else {
        const verifycode = response.verifycode*1;
        let stepc;
        if (verifycode == 2) {
          stepc = 1
        }else if (verifycode == 3 || verifycode == -1) {
          stepc = 2
        }else{
          setToken('');
          setAuthority('guest');
          yield put(routerRedux.push('/'));
        }
        yield put({
          type: 'changeStep',
          payload: stepc,
        });
      }
    }

  },

  reducers: {
    changeStep(state, { payload }) {
      return {
        ...state,
        currentStep: payload,
      };
    },
    netxStep(state, _) {
      const step = state.currentStep + 1;
      return {
        ...state,
        currentStep: step,
      };
    },
  },
};
