import { routerRedux } from 'dva/router';
import { realAccountLogin } from '../services/api';
import { setAuthority, setToken } from '../utils/Global';
import { reloadAuthorized } from '../utils/Authorized';
import { getAuthority } from '../utils/Global';

export default {
  namespace: 'login',

  state: {
    status: true,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(realAccountLogin, payload);
      if (response == null) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        // Login successfully
        if (response.status) {
          reloadAuthorized();
          const auth = getAuthority();
          let tUrl = '/user/login';
          switch (auth) {
            case 'admin':
              tUrl = '/dashboard-o';
              break;
            case 'supplier':
              tUrl = '/dashboard-s';
              break;
            case 'purchasers':
              tUrl = '/account/order-p';
              break;
            case 'operate':
              tUrl = '/dashboard-o';
              break;
            case 'unaudited-s':
              tUrl = '/user/register-verify';
              break;
            case 'unaudited-p':
              tUrl = '/user/register-verify';
              break;
            case 'warehouse':
              tUrl = '/dashboard-o';
              break;
            case '':
              tUrl = '/user/login';
              break;
          }
          yield put(routerRedux.push(tUrl));
        }
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.status) {
        setToken(payload.token);
        setAuthority(payload.currentAuthority);
      } else {
        setToken('');
        setAuthority('guest');
      }
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
