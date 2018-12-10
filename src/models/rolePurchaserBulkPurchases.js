import { message} from 'antd';
import {
  // -------- 发起询价 --------------
  getInitiateInquiryData,
  // -------- 询价列表 --------------

  // -------- 采购列表 --------------

} from '../services/rolePurchaserBulkPurchases_S'
export default {
  namespace: 'rolePurchaserBulkPurchases',
  state:{
    // -------- 发起询价 --------------
    initiateInquiry:{
      tableData:{
        list: [],
        pagination:{},
      },
    },

    // -------- 询价列表 --------------
    inquiryList:{
      tableData:{
        list: [],
        pagination:{},
      },
    },

    // -------- 采购列表 --------------
    purchaseList:{
      tableData:{
        list: [],
        pagination:{},
      },
    },

  },
  effects:{
    // -------- 发起询价 --------------
    *getInitiateInquiry({ payload },{ call,put }){
      const response = yield call(getInitiateInquiryData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getInitiateInquiryR',
          payload: response,
        })
      }
    },

    // -------- 询价列表 --------------

    // -------- 采购列表 --------------

  },
  reducers:{
    // -------- 发起询价 --------------
    getInitiateInquiryR(state, action){
      return {
        ...state,
        initiateInquiry:{
          ...state.initiateInquiry,
          tableData:action.payload
        }
      }
    },
    // -------- 询价列表 --------------

    // -------- 采购列表 --------------
  }
}
