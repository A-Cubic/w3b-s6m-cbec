import { message} from 'antd';

import {notification} from "antd/lib/index";
import {getSupplier} from '../services/api'
import {
  getPurchaseData,getDistributorsData,
  getSalesStatisticsListA,getSalesStatisticsListS,getSalesStatisticsListO
} from '../services/salesStatistics_S'
import {getChannelTypeData} from "../services/channelManagement_S";
import {
  getSettlementListS,
  getSettlementListO,
  getSettlementListP,
  getSettlementListA,
  getSettlementListD
} from "../services/settlementManagement_S";
export default {
  namespace: 'settlementManagement',
  state:{
    // 获取平台渠道类型
    channelTypeArr:[],
    // 获取销售商（渠道商）
    purchaseArr:[],
    // 获取供应商
    supplierArr:[],
    // 结算管理 - 运营/供应商/采购商/代理/分销商
    settlementAll:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },

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
    // 销售统计列表 - 供应商
    *getSettlementListS({ payload },{ call,put}){
      const response = yield call(getSettlementListS, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSettlementListR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 运营
    *getSettlementListO({ payload },{ call,put}){
      const response = yield call(getSettlementListO, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSettlementListR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 采购
    *getSettlementListP({ payload },{ call,put}){
      const response = yield call(getSettlementListP, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSettlementListR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 代理
    *getSettlementListA({ payload },{ call,put}){
      const response = yield call(getSettlementListA, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSettlementListR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 分销
    *getSettlementListD({ payload },{ call,put}){
      const response = yield call(getSettlementListD, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSettlementListR',
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
    getSettlementListR(state, action) {
      return {
        ...state,
        settlementAll:{
          ...state.settlementAll,
          tableData:action.payload
        },
      };
    },
  }
}
