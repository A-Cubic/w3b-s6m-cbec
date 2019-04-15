import { message} from 'antd';
import moment from 'moment';
import {routerRedux} from "dva/router";
import {
  //---------------------------------------------报表管理---------------------------------------------
  //------------------销售日报表 页---------
  salesDayReport,
  //-----------------------------平台-财务角色-结算管理-----------------------------
  //供货结算 - 采购结算-获取数据
  getsupplySettlementDate,
  //供货结算 - 采购结算-确认付款
  getSupplySettlementSubmit,
   //供货结算 - 采购结算-结算明细
  getSupplySettlementDetails,
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
  //-----------------------------平台-财务角色-结算管理-----------------------------
  //供货结算 - 采购结算
    supplySettlement:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
        type1:'一件代发',
        type2:'待结算'
      },  
      
    }
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
    //-----------------------------平台-财务角色-结算管理-----------------------------
    //供货结算 - 采购结算
    *getsupplySettlementDate({ payload },{ call,put }){
      const response = yield call(getsupplySettlementDate, payload);
    //  console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getsupplySettlementDateR',
          payload: {
            response,
            ...payload
          }
        })
      }
    },

    //供货结算 - 采购结算-确认付款
    *getSupplySettlementSubmit({ payload ,callback},{ call,put }){
      const response = yield call(getSupplySettlementSubmit, payload);
    //  console.log('~res',response)
      if(response!==undefined){
        if (response.type==1) {
          message.success('付款成功');
          callback(response);
         // console.log('xxxx',response)
        }else{
          message.error(response.msg);
        }
      }
    },

  //供货结算 - 采购结算-结算明细
  *getSupplySettlementDetails({ payload ,callback},{ call,put }){
    const response = yield call(getSupplySettlementDetails, payload);
    //console.log('~res',response)
    if(response!==undefined){
      if (response.type==1) {
        //message.success('付款成功');
        window.location.href=response.msg
      }else{
        //message.error(response.msg);
      }
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

    getsupplySettlementDateR(state, action){
      return {
        ...state,
        supplySettlement:{
          ...state.supplySettlement,
          //tableData:action.payload.response,
          // type1:action.payload.model,
          // type2:action.payload.status,
          tableData :{
            ...state.supplySettlement.tableData,
            list:action.payload.response.list,
            pagination:action.payload.response.pagination,
            item:action.payload.response.item,
            ...state.supplySettlement.tableData.item,
            type1:action.payload.model==undefined?'一件代发':action.payload.model,
            type2:action.payload.status==undefined?'待结算':action.payload.status
          }
        }
      }
    },
  }
}

