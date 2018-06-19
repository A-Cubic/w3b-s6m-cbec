import { getO2OList,getO2OCheck  } from '../services/api';

export default {
  namespace: 'o2o',

  state: {
    list: [],
    pagination:{},
    ModalUnteratedOrderdata:{
      status:'',
      merchantOrderId:'',
      tradeTime:'',
      waybillno:'',
      consigneeName:'',
      tradeAmount:'',
      idNumber:'',
      consigneeMobile:'',
      addrProvince:'',
      addrCity:'',
      addrDistrict:'',
      addrDetail:'',
      o2oOrderGoods:[],

    }
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getO2OList, payload);
      if (response !== undefined) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *orderCheck({ payload }, { call, put }) {
      const response = yield call(getO2OCheck, payload);
      console.log('response',response)
      if (response !== undefined) {
        yield put({
          type: 'orderCheckR',
          payload: response,
        });
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
    orderCheckR(state, action) {
      console.log('madel',action.payload)
      return {
        ...state,
        ModalUnteratedOrderdata:action.payload,
      };
    },


  },
};
