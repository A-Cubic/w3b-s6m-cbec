import { message} from 'antd';

import {notification} from "antd/lib/index";
import {getSupplier} from '../services/api'
import {
  getPurchaseData,getDistributorsData,
  getSalesStatisticsListA,getSalesStatisticsListS,getSalesStatisticsListO
} from '../services/salesStatistics_S'
import {getChannelTypeData} from "../services/channelManagement_S";

export default {
  namespace: 'publicDictionary',
  state:{
    // 获取平台渠道类型
    channelTypeArr:[],
    // 获取销售商（渠道商）
    purchaseArr:[],
    // 获取供应商
    supplierArr:[],


  },
  effects:{
    // 获取平台渠道类型
    *getChannelType({ payload },{ call,put}){
      const response = yield call(getChannelTypeData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getChannelTypeR',
          payload: response,
        });
      }
    },
    // 获取销售商（渠道商）
    *getPurchase({ payload },{ call,put}){
      const response = yield call(getPurchaseData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getPurchaseR',
          payload: response,
        });
      }
    },
    // 供应商 下拉
    *getSupplier({ payload },{ call,put}){
      const response = yield call(getSupplier, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSupplierR',
          payload: response,
        });
      }
    },

  },
  reducers:{
    getChannelTypeR(state, action) {
      return {
        ...state,
        channelTypeArr:action.payload,
      };
    },
    getPurchaseR(state, action) {
      return {
        ...state,
        purchaseArr:action.payload,
      };
    },
    getSupplierR(state, action) {
      return {
        ...state,
        supplierArr:action.payload,
      };
    },
  }
}
