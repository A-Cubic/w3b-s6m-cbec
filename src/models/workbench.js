import {getWorkbenchDataS, getWorkbenchDataO} from '../services/workbench_S';

export default {
  namespace: 'workbench',

  state: {
    workbenchDataS:{},
    workbenchDataO:{
      DashboardSales:[],
    }
  },

  effects: {
    //工作台 - 供应商
    *getWorkbenchDataS({ payload },{ call,put}){
      const response = yield call(getWorkbenchDataS, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getWorkbenchDataSR',
          payload: response,
        });
      }
    },

    //工作台 - 运营商
    *getWorkbenchDataO({ payload },{ call,put}){
      const response = yield call(getWorkbenchDataO, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getWorkbenchDataOR',
          payload: response,
        });
      }
    },
  },

  reducers: {
    getWorkbenchDataSR(state, action) {
      return {
        ...state,
        workbenchDataS:action.payload,
      };
    },
    getWorkbenchDataOR(state, action) {
      return {
        ...state,
        workbenchDataO:action.payload,
      };
    },

    clear() {
      return {
        workbenchDataS: [],
        workbenchDataO: [],
      };
    },
  },
};
