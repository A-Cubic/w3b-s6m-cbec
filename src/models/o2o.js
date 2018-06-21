import {getO2OList, getO2OCheck, importUpload} from '../services/api';

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
      OrderGoods:[],

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
      // console.log('response',response)
      if (response !== undefined) {
        yield put({
          type: 'orderCheckR',
          payload: response,
        });
      }
    },
    *upload({payload, callback}, { call, put }) {
      const response = yield call(importUpload, payload);
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
    orderCheckR(state, action) {
      // console.log('madel',action.payload)
      return {
        ...state,
        ModalUnteratedOrderdata:action.payload,
      };
    },


  },
};
