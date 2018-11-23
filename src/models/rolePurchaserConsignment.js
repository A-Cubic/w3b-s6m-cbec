import { message} from 'antd';
import {
  getConfirmReceiptData,
  goodsSales,
  contractInformation,
} from '../services/rolePurchaserConsignment_S'
export default {
  namespace: 'rolePurchaserConsignment',
  state:{
    confirmReceipt:{
      tableData:{
        list: [],
        pagination:{},
      },
      childData:{
        list: [],
        pagination:{},
      }
    },
    contractInformation:{
      getData:{
        item:{},
        list:[]
      },
      childHelpData:{
        visible:false,
        src:''
      }
      
    }
  },
  effects:{
    // 代销-财务-合同信息-图片放大20181121
    *sendChildHelpData({ payload },{ call,put }){
      console.log(payload)
        yield put({
          type: 'sendChildHelpDataR',
          payload: payload,
        })
    },

    //代销-财务-合同信息-20181121
    *contractInformation({ payload },{ call,put }){
      const response = yield call(contractInformation, payload);
      console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'contractInformationR',
          payload: response,
        })
      }
    },


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
    // 收货确认
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


    goodsSalesR(state, action){
      return {
        ...state,
        confirmReceipt:{
          ...state.confirmReceipt,
          tableData:action.payload
        }
      }
    },

    contractInformationR(state, action){
      return {
        ...state,
        contractInformation:{
          ...state.contractInformation,
          getData:action.payload
        }
      }
    },
    sendChildHelpDataR(state, action){
      return {
        ...state,
        contractInformation:{
          ...state.contractInformation,
          childHelpData:action.payload
        }
      }
    },
    

  }
}
