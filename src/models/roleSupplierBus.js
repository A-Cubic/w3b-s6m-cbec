import { message} from 'antd';
import moment from 'moment';
import {routerRedux} from "dva/router";
import {
  getQuotationListData,            //供应商 - 报价管理 - 商品报价列表
  getcommodityGeneralPageData,     //供应商 - 报价管理 - 商品报价列表-待报价
  uploadOrderbill,                 //供应商 - 报价管理 - 商品报价列表-待报价-上传文件
  getUploadOfferOrderSubmitData,   //供应商 - 报价管理 - 商品报价列表-待报价-提交
  getWaitingSubmit,                //待确认-提交
  getSelectSupplyGoodsListData,    //供应商 - 商品管理 - 铺货，一件发货获取接口
  getSelectSupplyGoodsDetailsData, //供应商 - 商品管理 - 铺货，一件发货获取接口 -商品详情 
  getUpDownFlagDate,               //供应商 - 商品管理 - 铺货，一件发货获取接口 -商品详情 -上下架
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


    //-------------------------------------报价管理----------------------------------------------------------
    //供应商 - 报价管理 - 商品报价列表
    quotationList: {
      tableData:{
        list: [],
        pagination:{},
      },
      status:''
    },

    commodityGeneralPage: {
      tableData:{
        address: "",
        contacts: "",
        deliverytime: "",
        goodslisturl: "",
        offerlisturl: "",
        offerstatus: "",
        otherprice: "",
        purchasesn: "",
        remark: "",
        tax: "",
        tel: "",
        waybillfee: "",
        status:'',
        item:{},
      },
     
    },
     //-----------------------------商品管理-----------------------------
    bulkSupplyGeneralPage:{
      tableData:{
        type:{},
        flag:[],
        catelog1:[],
        selectSupplyGoodsItems: [],
        pagination:{
          pageSize:10
        },
      },
      classification:'全部',
      upperShelf:'全部',
    },
    commodityDetailsGeneralPage:{
      tableData:{
        barcode: "",
        efficacy: "",
        flag: "",
        goodsDetailImgArr: [],
        goodsParameters: [],
        inprice: '',
        name: "",
        num:[],
        prices:[],
        slt:[],
        type: "",
        waybillfee:'',
      },
      imgone:''
    }



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
      //console.log('~res7777',response)
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




    //-------------------------------------报价管理----------------------------------------------------------
    //供应商 - 报价管理 - 商品报价列表
  
    *getQuotationListData({ payload },{ call,put }){
      const response = yield call(getQuotationListData, payload);
      if(response!==undefined){
        yield put({
          type: 'getQuotationListDataR',
          payload: {
            response,
            ...payload
          }
        })
      }
    },
    //供应商 - 报价管理 - 商品报价列表-待报价
    *getcommodityGeneralPageData({ payload },{ call,put }){
      const response = yield call(getcommodityGeneralPageData, payload);
      if(response!==undefined){
        yield put({
          type: 'getcommodityGeneralPageDataR',
          payload: response
        })
      }
    },
    //供应商 - 报价管理 - 商品报价列表-待报价-上传文件
    *uploadOrderbill({ payload,callback },{ call,put}){
      const response = yield call(uploadOrderbill, payload);
      // console.log('~',response)
      if (response !== undefined) {
        callback(response)
      }
    },

    //供应商 - 报价管理 - 商品报价列表-待报价-提交
    *getUploadOfferOrderSubmitData({ payload,callback  },{ call,put }){
      const response = yield call(getUploadOfferOrderSubmitData, payload);
    // console.log('~resxxxx提交接口',response.type)
      if(response!==undefined){
        if(response.type == 1){
          // callback(response)
          // yield put({
          //   type: 'getUploadOfferOrderSubmitDataR',
          //   payload: response,
          // })
          yield put(routerRedux.push('/bulkPurchases/quotationList'));
        } else {
          message.error(response.msg);

        }
      }
    },
    // 待确认-提交
    *getWaitingSubmit({ payload,callback  },{ call,put }){
      const response = yield call(getWaitingSubmit, payload);
    // console.log('~resxxxx提交接口',response.type)
      if(response!==undefined){
        if(response.type == 1){
          // callback(response)
          // yield put({
          //   type: 'getUploadOfferOrderSubmitDataR',
          //   payload: response,
          // })
          yield put(routerRedux.push('/bulkPurchases/quotationList'));
        } else {
          message.error(response.msg);

        }
      }
    },

    //-----------------------------商品管理-----------------------------

    //铺货，一件发货获取接口
    *getSelectSupplyGoodsListData({ payload },{ call,put }){
      const response = yield call(getSelectSupplyGoodsListData, payload);
      if(response!==undefined){
        yield put({
          type: 'getSelectSupplyGoodsListDataR',
          payload: {
            response,
            ...payload
          }
        })
      }
    },

    //铺货，一件发货获取接口-商品详情
    *getSelectSupplyGoodsDetailsData({ payload },{ call,put }){
      const response = yield call(getSelectSupplyGoodsDetailsData, payload);
    // console.log('xxxxxxxxxxxxxx')
      if(response!==undefined){
        yield put({
          type: 'getSelectSupplyGoodsDetailsDataR',
          // payload: {
          //   response,
          //   ...payload
          // }
          payload: response
        })
      }
    },
     //铺货，一件发货获取接口-商品详情-上下架
    *getUpDownFlagDate({ payload, callback },{ call,put }){
      const response = yield call(getUpDownFlagDate, payload);
    // console.log('~resxxxx提交接口',response.type)
      if(response!==undefined){
        if(response.type == 1){
          callback(response)
          
  
         
        } else {
          message.error(response.msg);

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

     //-------------------------------------报价管理----------------------------------------------------------
    //供应商 - 报价管理 - 商品报价列表

    getQuotationListDataR(state, action){
      return {
        ...state,
        quotationList:{
          ...state.quotationList,
          tableData:action.payload.response,
          status:action.payload.offerstatus
        }
      }
    },

    
    getcommodityGeneralPageDataR(state, action){
      return {
        ...state,
        commodityGeneralPage:{
          ...state.commodityGeneralPage,
          tableData:action.payload
         
        }
      }
    },

    //-----------------------------商品管理-----------------------------
    getSelectSupplyGoodsListDataR(state, action){
      return {
        ...state,
        bulkSupplyGeneralPage:{
          ...state.bulkSupplyGeneralPage,
          tableData:action.payload.response,
          // tableData:{
          //   tableData:action.payload.response,
          // }
          //classification:action.payload.catelog1
          classification:action.payload.catelog1==undefined?"全部":action.payload.catelog1,
          upperShelf:action.payload.flag==undefined?"全部":action.payload.flag,
          ...state.tableData,
          
        }
      }
    },

    getSelectSupplyGoodsDetailsDataR(state, action){
      return {
        ...state,
        commodityDetailsGeneralPage:{
          ...state.commodityDetailsGeneralPage,
          tableData:action.payload,
          ...state.tableData,
          imgone:action.payload.slt[0]
        }
      }
    },

   
    changeShowImgR(state, action){
      if(state.commodityDetailsGeneralPage.tableData.slt.length<2){
        return{
          ...state,
          commodityDetailsGeneralPage:{
            ...state.commodityDetailsGeneralPage,
            imgone:state.commodityDetailsGeneralPage.tableData.slt[0],
          }
        }
      }
        return {
          ...state,
          commodityDetailsGeneralPage:{
            ...state.commodityDetailsGeneralPage,
            imgone:state.commodityDetailsGeneralPage.tableData.slt[action.payload],
          }
        }
    },

    clickShowImgR(state, action){
      
      return {
        ...state,
        commodityDetailsGeneralPage:{
          ...state.commodityDetailsGeneralPage,
          imgone:action.payload,
        }
      }
    },

    




  }
}

