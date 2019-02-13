import { message} from 'antd';
import moment from 'moment';
import {routerRedux} from "dva/router";
import {
} from '../services/roleSupplierBus_S'
import {
  //---------------------------------------------合同管理---------------------------------------------
  getCheckAgreementData,//getImg,//合同查看
  //---------------------------------------------财务管理部分-----------------------------------------
  //------------------货款结算 页---------

  getChildModelPrintData,             // 货款结算 - 打印
  getPaymentSettlementData,           // 货款结算 - 列表
  getSettlementDetailsData,           // 货款结算 - 查看结算明细 - 货款
  getSettlementDetailsElseData,       // 货款结算 - 查看结算明细 - 其他
  changeStatusCompleteReconciliation, // 货款结算 - 完成对账

} from "../services/roleOperationDistribution_S";




export default {
  namespace: 'roleSupplierBus',
  state:{
    //---------------------------------------------合同管理-----------------------------------------
    //-----------------查看合同 页----------
    checkAgreement: {
      tableData:{
        item:{},
        customersCode: "",
        userName: "",
        createTime: "",
        cycle: "",
        model: "",
        contractDuration: "",
        platformPoint: "",
        supplierPoint: "",
        purchasePoint: "",
        freightBelong: "",
        taxBelong: "",
        merchantName: "",
        depositBank: "",
        depositBankSubbranch: "",
        bankCard: "",
        list: [],
        contractCode:''
      },
      childHelpData:{
        visible:false,
        src:''
      }
    },

    


    //---------------------------------------------财务管理部分-----------------------------------------
    //------------------货款结算 页---------
    purchaseSettlement:{
      tableData:{
        list: [],
        pagination:{},
      },
      childDetailsModelVisible:false,
      childDetailsModelHelpId: '',
      childModelDetailsTableTab1Data:{
        item:{},
        list: [],
        pagination:{},
      },
      childModelDetailsTableTab2Data:{
        item:{},
        list: [],
        pagination:{},
      },
      childPrintModelVisible:false,
      childModelPrint:{
        item:{},
        list:[],
        pagination:{}
      }
    },
  },
  effects:{
    //---------------------------------------------合同管理-----------------------------------------
    //-----------------查看合同 页----------

    *getCheckAgreementData({ payload },{ call,put }){
      const response = yield call(getCheckAgreementData, payload);
      //console.log('~~payload',payload)
      if(response!==undefined){
        yield put({
          type: 'getCheckAgreementDataR',
          payload: {...response,contractCode:payload.contractCode,src:payload.src,visible:payload.visible}
        })
        //yield put(routerRedux.push('/agreement/checkAgreement'));
      }
    },
    //查看图片 getImg
    *getImg({ payload },{ call,put }){
      yield put({
        type: 'getImgR',
        payload: {src:payload.src,visible:payload.visible}
      })
    },

    //---------------------------------------------财务管理部分-----------------------------------------
//------------------采购结算 页---------
    // 采购结算 - 列表
    *getPaymentSettlementData({ payload },{ call,put }){
      const response = yield call(getPaymentSettlementData, payload);
      // console.log('~res7777',response)
      if(response!==undefined){
        yield put({
          type: 'getPaymentSettlementDataR',
          payload: response,
        })
      }
    },
    // 采购结算 - 查看结算明细
    *getSettlementDetailsData({ payload },{ call,put }){
      const responseTab1 = yield call(getSettlementDetailsData, payload);
      const responseTab2 = yield call(getSettlementDetailsElseData, payload);
      // console.log('~res',response)
      if(responseTab1!==undefined){
        yield put({
          type: 'getSettlementDetailsDataR',
          payload: {responseTab1,responseTab2,childDetailsModelVisible:true,childDetailsModelHelpId:payload.accountCode},
        })
      }
    },
    // 采购结算 - 查看结算明细 - 货款分页
    *childModelDetailsTableTab1Data({ payload },{ call,put }){
      const response = yield call(getSettlementDetailsData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'childModelDetailsTableTabDataR',
          payload: {data:response,tab:'childModelDetailsTableTab1Data'},
        })
      }
    },
    // 采购结算 - 查看结算明细 - 其他分页
    *childModelDetailsTableTab2Data({ payload },{ call,put }){
      const response = yield call(getSettlementDetailsElseData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'childModelDetailsTableTabDataR',
          payload: {data:response,tab:'childModelDetailsTableTab2Data'},
        })
      }
    },
    // 采购结算 - 打印
    *childModelPrintData({ payload,callback },{ call,put }){
      const response = yield call(getChildModelPrintData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'childModelPrintDataR',
          payload: {response,childPrintModelVisible:true},
        })
        yield
        setTimeout(function () {
          window.print()
        },1000)

      }
    },
    // 采购结算 - 完成对账
    *completeReconciliation({ payload },{ call,put }){
      const response = yield call(changeStatusCompleteReconciliation, payload);
      const responseList = yield call(getPaymentSettlementData, {});
      // console.log('~res',response)
      if(response!==undefined){
        //  判断成功 刷新主列表页面
        //  ...
        if (response.type==1) {
          if(responseList!==undefined){
            yield put({
              type:'getPaymentSettlementDataR',
              payload: responseList
            })
          }
        }else{
          message.error('对账失败，请重新确认');
        }
      }
    },

  },

  reducers:{
    //---------------------------------------------合同管理-----------------------------------------
    //-----------------查看合同 页----------
    getCheckAgreementDataR(state, action){
      // console.log('qqq',action.payload)
      return {
        ...state,
        checkAgreement:{
          ...state.checkAgreement,
          tableData:action.payload,
         // contractCode :action.payload.contractCode
        }
      }
    },

    getImgR(state, action){
      // console.log('qqq',action.payload)
      return {
        ...state,
        checkAgreement:{
          ...state.checkAgreement,
          childHelpData:action.payload,
        }
      }
    },

    getImgCloseR(state, action){
      //console.log('qqq',action.payload)
      return {
        ...state,
        checkAgreement:{
          ...state.checkAgreement,
          childHelpData: {
            visible:action.payload.visible
          }

        }
      }
    },
    //---------------------------------------------财务管理部分-----------------------------------------
//------------------采购结算 页---------
    getPaymentSettlementDataR(state, action){
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          tableData:action.payload
        }
      }
    },
    getSettlementDetailsDataR(state, action){
      // console.log(action.payload)
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          childModelDetailsTableTab1Data:action.payload.responseTab1,
          childModelDetailsTableTab2Data:action.payload.responseTab2,
          childDetailsModelVisible:action.payload.childDetailsModelVisible,
          childDetailsModelHelpId:action.payload.childDetailsModelHelpId
        }
      }
    },
    childModelDetailsTableTabDataR(state, action){
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          [action.payload.tab]:action.payload.data,
        }
      }
    },
    childDetailsModelVisibleR(state, action){
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          childDetailsModelVisible:action.payload
        }
      }
    },
    childPrintModelVisibleR(state, action){
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          childPrintModelVisible:action.payload
        }
      }
    },

    childModelPrintDataR(state, action){
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          childModelPrint:action.payload.response,
          childPrintModelVisible:action.payload.childPrintModelVisible
        }
      }
    },
  }
}

