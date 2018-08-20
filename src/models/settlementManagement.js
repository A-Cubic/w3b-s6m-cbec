import { message} from 'antd';

import {notification} from "antd/lib/index";
import {getCheckStepStatus, getGoodsPutaway} from '../services/api'
import {
  getPurchaseData,getDistributorsData,
  getSalesStatisticsListA,getSalesStatisticsListS,getSalesStatisticsListO
} from '../services/salesStatistics_S'
import {getChannelTypeData} from "../services/channelManagement_S";
export default {
  namespace: 'settlementManagement',
  state:{
    // 获取平台渠道类型
    channelTypeArr:[],
    // 获取销售商（渠道商）
    purchaseArr:[],
    // 获取分销商
    distributorsArr:[],
    // 商品管理 - 商品上架审核
    salesStatisticsAll:{
      tableData:{
        item:{
          salesNumTotal:0,
        },
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
    // 获取分销商类型
    *getDistributors({ payload },{ call,put}){
      const response = yield call(getDistributorsData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getDistributorsR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 供应商
    *getSalesStatisticsListS({ payload },{ call,put}){
      const response = yield call(getSalesStatisticsListS, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSalesStatisticsListR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 运营
    *getSalesStatisticsListO({ payload },{ call,put}){
      const response = yield call(getSalesStatisticsListO, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSalesStatisticsListR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 代理
    *getSalesStatisticsListA({ payload },{ call,put}){
      const response = yield call(getSalesStatisticsListA, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSalesStatisticsListR',
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
    getDistributorsR(state, action) {
      return {
        ...state,
        distributorsArr:action.payload,
      };
    },
    getSalesStatisticsListR(state, action) {
      // if(action.payload.item==null){
      //   return state
      // }else{
        return {
          ...state,
          salesStatisticsAll:{
            ...state.salesStatisticsAll,
            tableData:action.payload
          },
        };
      // }
    },


  }
}
