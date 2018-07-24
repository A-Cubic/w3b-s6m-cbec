import { message} from 'antd';

import {notification} from "antd/lib/index";
import {getCheckStepStatus, getGoodsPutaway} from '../services/api'
import { getGoodsDetails} from '../services/goodsManagement_S'
export default {
  namespace: 'goodsManagement',
  state:{

    // 商品管理 - 商品上架审核
    goodsOnAudit:{
      tableData:{
        list: [],
        pagination:{},
      },
      // 审核、查看获取详细信息
      goodsDetails:{},
    },

  },
  effects:{
    // 上架审核列表
    *getGoodsOnAuditList({ payload },{ call,put}){
      const response = yield call(getGoodsPutaway, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getGoodsOnAuditListR',
          payload: response,
        });
      }
    },
    // 查看审核状态校验
    *checkStepStatus({ payload,callback },{ call,put}){
      const response = yield call(getCheckStepStatus, payload);
      // console.log('~',response)
      if (response !== undefined) {
        callback(response)
      }
    },
    // 上架审核列表
    *getGoodsDetails({ payload },{ call,put}){
      const response = yield call(getGoodsDetails, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getGoodsDetailsR',
          payload: response,
        });
      }
    },
  },
  reducers:{
    getGoodsOnAuditListR(state, action) {
      return {
        ...state,
        goodsOnAudit:{
          ...state.goodsOnAudit,
          tableData:action.payload
        },
      };
    },
    getGoodsDetailsR(state, action) {
      return {
        ...state,
        goodsOnAudit:{
          ...state.goodsOnAudit,
          goodsDetails:action.payload
        },
      };
    },

  }
}
