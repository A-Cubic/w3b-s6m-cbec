import { message} from 'antd';
import {
  // -------- 发起询价 --------------
  getInitiateInquiryData,
  // -------- 询价列表 --------------
  getInquiryListData,
  // -------- 采购列表 --------------
  getPurchaseListData,
  //查看
  childrenCheck
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
    // 查看
    seeList:{
      show: false,
      tableData:{
        list: [],
        item:{}
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
    *getInquiryListData({ payload },{ call,put }){
      const response = yield call(getInquiryListData, payload);
      //console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getInquiryListDataR',
          payload: response,
        })
      }
    },
    // -------- 采购列表 --------------
    *getPurchaseListData({ payload },{ call,put }){
      const response = yield call(getPurchaseListData, payload);
      //console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getPurchaseListDataR',
          payload: response,
        })
      }
    },
    // 查看事件        
    *childrenCheck({ payload }, { call, put }) {
      const response = yield call(childrenCheck, payload)
      //console.log('查看事件',response)
      if (response !== '') {
        yield put({
          type: 'childrenCheckR',
          payload: { response, show: true }
        })
      }
    },
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
    getInquiryListDataR(state, action){
      return {
        ...state,
        inquiryList:{
          ...state.inquiryList,
          tableData:action.payload
        }
      }
    },
    // -------- 采购列表 --------------
    getPurchaseListDataR(state, action){
      return {
        ...state,
        purchaseList:{
          ...state.purchaseList,
          tableData:action.payload
        }
      }
    },
    // 查看
    childrenCheckR(state, action) {
      return {
        ...state,
        seeList: {
          ...state.seeList,
          tableData: action.payload.response,
          //childTestModelVisible:action.payload.childTestModelVisible
          show: action.payload.show
        },
      };
    },


      //删除
      childrenCheckDelR(state, action) {
        return {
          ...state,
          seeList: {
            ...state.seeList,
            show: action.payload.show
          }
        }
      },
  }
}

