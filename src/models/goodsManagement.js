import { message} from 'antd';

import {notification} from "antd/lib/index";
import {getCheckStepStatus, getGoodsPutaway} from '../services/api'
import { } from '../services/goodsManagement_S'
export default {
  namespace: 'goodsManagement',
  state:{
    // 获取渠道商类型
    channelTypeArr:[],
    // 获取供应商
    supplierArr:[],
    // 商品管理 - 商品上架审核
    goodsOnAudit:{
      tableData:{
        list: [],
        pagination:{},
      },

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

  }
}
