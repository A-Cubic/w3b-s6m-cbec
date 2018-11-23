import { message} from 'antd';
import {
  getConfirmReceiptData,getChildModelTableData,childModelSubmit,
  goodsSales
} from '../services/rolePurchaserConsignment_S'
import {ReceiptModel} from "../roles/purchaser/consignment/receivingConfirmation";
export default {
  namespace: 'rolePurchaserConsignment',
  state:{
    // -------- 收货确认 --------------
    confirmReceipt:{
      tableData:{
        list: [],
        pagination:{},
      },
      childReceiptModelVisible:false,
      childModelHelpData:{
        visible:false,
        type:0,
        status:0,
        sendType:0,
        sendid:0
      },
      childModelTableData:{
        item:{},
        list: [],
        pagination:{},
      }
    }
    // -------- 商品销售 --------------

    // -------- 合同信息 --------------
    // -------- 货款结算 --------------
  },
  effects:{
    // -------- 收货确认 --------------
    // 收货确认 - 列表
    *getConfirmReceiptData({ payload },{ call,put }){
      const response = yield call(getConfirmReceiptData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getConfirmReceiptDataR',
          payload: response,
        })
      }
    },
    // 收货确认 - 操作内商品详情列表
    *getChildModelTableData({ payload },{ call,put }){
      const response = yield call(getChildModelTableData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getChildModelTableDataR',
          payload: response,
        })
      }
    },
    // 收货确认操作辅助信息
    *childModel({ payload },{ call,put }){
      // console.log('childModel',payload)
      const response = yield call(getChildModelTableData, {sendid:payload.sendid});
      if (response !== undefined) {
        yield put({
          type: 'childModelR',
          payload: payload,
        })
        yield put({
          type: 'childReceiptModelVisibleR',
          payload: payload.visible,
        })
        yield put({
          type: 'getChildModelTableDataR',
          payload: response,
        })
      }
    },
    // 收货确认 - 操作内提交或确认
    *childModelSubmit({ payload,callback },{ call,put }) {
      const response = yield call(childModelSubmit, payload);
      const initDataResponse = yield call(getConfirmReceiptData, {});
      if (response !== undefined) {
        if(response.type==='1'){
          message.success("提交成功");

          yield put({
            type: 'childReceiptModelVisibleR',
            payload: false,
          })
          callback();
          if(initDataResponse !== undefined){
            yield put({
              type: 'getConfirmReceiptDataR',
              payload: initDataResponse,
            })
          }
        }else{
          message.error(response.msg);
        }

      }

    }


    // -------- 商品销售 --------------
    //商品销售-列表查询
    *goodsSales({ payload },{ call,put }){
        const response = yield call(goodsSales, payload);
        // console.log('~res',response)
        if(response!==undefined){
          yield put({
          type: 'goodsSalesR',
          payload: response,
        })
      }
    },


    // -------- 合同信息 --------------
    // -------- 货款结算 --------------
  },
  reducers:{
    getConfirmReceiptDataR(state, action){
      return {
        ...state,
        confirmReceipt:{
          ...state.confirmReceipt,
          tableData:action.payload
        }
      }
    },
    childModelR(state, action){
      return {
        ...state,
        confirmReceipt:{
          ...state.confirmReceipt,
          childModelHelpData:action.payload
        }
      }
    },
    getChildModelTableDataR(state, action){
      return {
        ...state,
        confirmReceipt:{
          ...state.confirmReceipt,
          childModelTableData:action.payload
        }
      }
    },
    childReceiptModelVisibleR(state,action){
      return {
        ...state,
        confirmReceipt:{
          ...state.confirmReceipt,
          childReceiptModelVisible:action.payload
        }
      }
    },
    goodsSalesR(state, action){
      return {
        ...state,
        confirmReceipt:{
          ...state.confirmReceipt,
          tableData:action.payload
        }
      }
    },

  }
}
