import { message} from 'antd';

import {notification} from "antd/lib/index";
import {getCheckStepStatus, getGoodsPutaway} from '../services/api'
import { getSalesStatisticsList} from '../services/salesStatistics_S'
export default {
  namespace: 'salesStatistics',
  state:{

    // 商品管理 - 商品上架审核
    salesStatisticsAll:{
      tableData:{
        item:'',
        list: [],
        pagination:{},
      },

    },

  },
  effects:{
    // 上架审核列表
    *getSalesStatisticsList({ payload },{ call,put}){
      const response = yield call(getSalesStatisticsList, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSalesStatisticsListR',
          payload: response,
        });
      }
    },
    // 查看审核状态校验



  },
  reducers:{
    getSalesStatisticsListR(state, action) {
      return {
        ...state,
        salesStatisticsAll:{
          ...state.salesStatisticsAll,
          tableData:action.payload
        },
      };
    },


  }
}
