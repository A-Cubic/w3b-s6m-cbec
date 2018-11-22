import { message} from 'antd';
import {
  getConfirmReceiptData,
  goodsSales
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
    }
  },
  effects:{
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

  }
}
