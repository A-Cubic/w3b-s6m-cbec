import {getWorkbenchDataS, getWorkbenchDataO,getWorkbenchNewSupplierData} from '../services/workbench_S';

export default {
  namespace: 'workbench',

  state: {
    //old
    workbenchDataS:{},
    workbenchDataO:{
      DashboardSales:[],
    },
    workbenchNewSupplier:{
      getData:{
        company:'',
        lastTime:'',
        batchSupply:{},
        bussness:{},
        distribution:{},
        goods:{},
        substitute:{}
      }
    }
  },

  effects: {

    //工作台 - 供应商 - new
    *getWorkbenchNewSupplierData({ payload },{ call,put}){
      const response = yield call(getWorkbenchNewSupplierData, payload);
     // console.log('8888888~',response)
      if (response !== undefined) {
        yield put({
          type: 'getWorkbenchNewSupplierDataR',
          payload: response,
        });
      }
    },

    //工作台 - 供应商  old 旧
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

    //工作台 - 运营商  old 旧
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
    },//old 旧
    getWorkbenchDataOR(state, action) {

      return {
        ...state,
        workbenchDataO:action.payload,
      };
    },//old 旧
    

    clear() {
      return {
        workbenchDataS: [],
        workbenchDataO: [],
      };
    },//old 旧
    getWorkbenchNewSupplierDataR(state, action) {
     // console.log('res',action.payload.goods)
      return {
        ...state,
        workbenchNewSupplier:{
          ...state.workbenchNewSupplier,
          getData:{
            company:action.payload.company,
            lastTime:action.payload.lastTime,
            batchSupply:action.payload.batchSupply,
            bussness:action.payload.bussness,
            distribution:action.payload.distribution,
            goods:action.payload.goods,
            substitute:action.payload.substitute
          }
        }
      };
    },

  },
};
