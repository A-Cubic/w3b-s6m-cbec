import { message} from 'antd';
import moment from 'moment';
import {routerRedux} from "dva/router";
import {
  //---------------------------------------------报表管理---------------------------------------------
  //------------------销售日报表 页---------
  salesDayReport
} from "../services/roleFinanceManagement_S";
export default {
  namespace: 'roleFinanceManagement',
  state:{
    //---------------------------------------------报表管理-----------------------------------------
    //-----------------销售日报表 页----------
  //列表获取
    salesDayReport:{
        tableData:{
          item:{
            a:'1',
            b:"2",
          },
          list: [],
          pagination:{},
        },
      },
  },
  effects:{
    //---------------------------------------------报表管理-----------------------------------------
    //-----------------销售日报表 页----------
    //平台库存 - 列表查询
    *salesDayReport({ payload },{ call,put }){
      const response = yield call(salesDayReport, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'salesDayReportR',
          payload: response,
        })
      }
    },
  },

  reducers:{
    //---------------------------------------------报表管理-----------------------------------------
    //-----------------销售日报表 页----------
    salesDayReportR(state, action){
      return {
        ...state,
        salesDayReport:{
          ...state.salesDayReport,
          tableData:action.payload
        }
      }
    },
  }
}

