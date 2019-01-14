import { routerRedux } from 'dva/router';
import { realAccountLogin } from '../services/api';
import { setAuthority, setToken, setRole,getRole} from '../utils/Global';
import { reloadAuthorized } from '../utils/Authorized';
import { getAuthority } from '../utils/Global';

export default {
  namespace: 'login',

  state: {
    status: true,
  },

  effects: {
    *login({ payload }, { call, put }) {
      // console.log('111',payload)
      const response = yield call(realAccountLogin, payload);
      // let changeResponse = [
      //   {
      //     roleKey:0,
      //     roleDisplay:'采购商',
      //     roleValue:{
      //       currentAuthority: "admin",
      //       status: true,
      //       token: {userId: "tlf", token: "bfc832386f49a1cc035b8a96430740fa"}
      //
      //     }
      //   },{
      //     roleKey:1,
      //     roleDisplay:'供应商',
      //     roleValue:{
      //       currentAuthority: "admin",
      //       status: true,
      //       token: {userId: "tlf", token: "bfc832386f49a1cc035b8a96430740fa"}
      //
      //     }
      //   }
      // ]
      //
      //
      //
      // setRole(changeResponse);

      // console.log(getRole())
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
            //供应商
            case 'supplier':
              tUrl = '/workbenchS';
              break;
            //  采购商
            case 'purchasers':
              tUrl = '/consignment/goodsSales';
              break;
            //  运营客服
            case 'operate':
              tUrl = '/workbenchO';
              break;
            //  渠道代理
            case 'agent':
              tUrl = '/orderManagement/agentOrder';
              break;
              //  供货代理
            case 'sagent':
              tUrl = '/settlement/incomeA';
              break;
              //  采购代理
            case 'pagent':
              tUrl = '/settlement/incomeA';
              break;
            //  分销商
            case 'distribution':
              tUrl = '/orderManagement/distributionOrder';
              break;
            //  未审核通过的供应商
            case 'unaudited-s':
              tUrl = '/user/register-verify';
              break;
            //  未审核通过的渠道商
            case 'unaudited-p':
              tUrl = '/user/register-verify';
              break;
            //  仓库
            case 'warehouse':
              tUrl = '/orderManagement/order-w';
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
