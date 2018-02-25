import { realRegister } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {},

  effects: {
    *submit(_, { call, put }) {
      const response = yield call(fakeRegister);
      console.log('response------------------')
      console.log(response);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    *getCode({payload, callback},{call}) {
      const response = yield call(realRegister, payload);
      if (response === undefined) {

      } else {
        callback(response);
      }
    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
