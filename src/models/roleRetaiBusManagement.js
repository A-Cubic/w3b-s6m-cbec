import { message} from 'antd';
import {
  getDemo, //测试
  getPayOrder,  //付款
  GetRetailMoney, //充值获取页面
  getPopupR,//打开弹窗
  getPopupColoseR,//关闭弹窗
  getPayment,//充值接口
  handleFormPopupR,//新加弹窗
  getPopupFormColoseR,//关闭新加弹窗
  handleNumR,//传弹窗值
  getQRColoseR,//二维码弹窗关闭
  getQROpenR,//二维码弹窗打开
  handleOpenRefundR,//退货弹窗
  handleCloseRefundR,//退货弹窗
  getReGoodsApply,//退款接口
  handleOpenWaybillR, //填写单号弹窗
  handleColoseWaybillR,//填写单号弹窗
  getReGoodsFundId, //填写运单号
  getReGoodsFundIdMessage, //快递获取接口

} from '../services/roleRetaiBusManagement_S'

export default {
  namespace: 'roleRetaiBusManagement',
  state:{

   

    SalesForm:{
      tableData:{
        item:'',
        list:[],
        pagination:{},
        
      },
      childDetailsModelVisible:false,
      num:'',
      amountOfMoney:'',
      totalSum:'',
      refund:false,
      waybill:false,
      reGoodsFundIdMessage: {
        refundId:'',
        expressName:'',
        type:0
      }
    },
    //充值
    rechargeDetails:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
      childDetailsModelVisible:false,
      qRCode:false,
      img:''
      
    }



  },
  effects:{
    

   
    

    // //测试
    *getDemo({ payload ,callback },{ call,put}){
     
      const response = yield call(getDemo, payload);
      if (response !== undefined) {
        //console.log('666')
        yield put({
          type: 'getDemoR',
          payload: response,
        });
      }
    },

    //付款
    *getPayOrder({ payload,callback },{ call,put}){
      const response = yield call(getPayOrder, payload);
      //console.log('xxx')
      if (response !== undefined) {
        if (response.type==1) {
          message.success('付款成功');
          callback(response);
        }else{
          message.error(response.msg);
        }
      }
    },
    //退款
    *getReGoodsApply({ payload,callback },{ call,put}){
      const response = yield call(getReGoodsApply, payload);
      //console.log('xxx')
      if (response !== undefined) {
        if (response.type==1) {
          message.success('退款成功');
          callback(response);
        }else{
          message.error(response.msg);
        }
      }
    },

    //充值获取页面
    *GetRetailMoney({ payload ,callback },{ call,put}){
     
      const response = yield call(GetRetailMoney, payload);
      if (response !== undefined) {
        //console.log('666')
        yield put({
          type: 'GetRetailMoneyR',
          payload: response,
          
        });
      }
    },

    //充值接口  payment
    *getPayment({ payload,callback },{ call,put}){
      const response = yield call(getPayment, payload);
      //console.log(response.msg)
      if (response !== undefined) {
        if (response.type==1) {
         // console.log('ok',response.msg)
          yield put({
            type: 'getPaymentR',
            payload: response,
            
          });
          message.success('请扫描支付');
          callback(response);
        }else{
          message.error(response.msg);
        }
      }
    },


    //填写运单号接口
  *getReGoodsFundId({ payload,callback },{ call,put}){
    const response = yield call(getReGoodsFundId, payload);
   // console.log('xxx')
    if (response !== undefined) {
      if (response.type==1) {
        message.success('填写完成');
        callback(response);
      }else{
        message.error(response.msg);
      }
    }
  },  


  //快递获取
  *getReGoodsFundIdMessage({ payload ,callback },{ call,put}){
     
    const response = yield call(getReGoodsFundIdMessage, payload);
    if (response !== undefined) {
      //console.log('666')
      yield put({
        type: 'getReGoodsFundIdMessageR',
        payload: response,
        
      });
    }
  },

  },
  reducers:{
    

    getDemoR(state,action){
      return{
        ...state,
        SalesForm:{
          ...state.SalesForm,
          tableData:action.payload
        }
      }
    },

    GetRetailMoneyR(state,action){
      return{
        ...state,
        rechargeDetails:{
          ...state.rechargeDetails,
          tableData:action.payload
        }
      }
    },

    //打开弹窗
    getPopupR(state,action){
      return{
        ...state,
        rechargeDetails:{
            ...state.rechargeDetails,
            //tableData:action.payload.list,
            childDetailsModelVisible:true,
      
          }
      }
    },
    //关闭弹窗
    getPopupColoseR(state,action){
      return{
        ...state,
        rechargeDetails:{
            ...state.rechargeDetails,
            //tableData:action.payload.list,
            childDetailsModelVisible:false,
      
          }
      }
    },


    //二维码打开弹窗
    getQROpenR(state,action){
      return{
        ...state,
        rechargeDetails:{
            ...state.rechargeDetails,
            //tableData:action.payload.list,
            qRCode:true,
      
          }
      }
    },
    //二维码关闭弹窗
    getQRColoseR(state,action){
      return{
        ...state,
        rechargeDetails:{
            ...state.rechargeDetails,
            //tableData:action.payload.list,
            qRCode:false,
      
          }
      }
    },

    //新加弹窗 SalesForm
    //打开弹窗
    handleFormPopupR(state,action){
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            //tableData:action.payload.list,
            childDetailsModelVisible:true,
      
          }
      }
    },
    //新加弹窗 SalesForm
    //关闭弹窗
    getPopupFormColoseR(state,action){
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            //tableData:action.payload.list,
            childDetailsModelVisible:false,
      
          }
      }
    },
    //退货弹窗
    handleOpenRefundR(state,action){
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            //tableData:action.payload.list,
            refund:true,
      
          }
      }
    },
    //退货弹窗
    //关闭弹窗
    handleCloseRefundR(state,action){
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            //tableData:action.payload.list,
            refund:false,
      
          }
      }
    },



    //传弹窗值handleNumR
    handleNumR(state,action){
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            //tableData:action.payload.list,
            num:action.payload.num,
            amountOfMoney:action.payload.amountOfMoney,
            totalSum:action.payload.totalSum
          }
      }
    },



    getPaymentR(state,action){
      return{
        ...state,
        rechargeDetails:{
            ...state.rechargeDetails,
            //tableData:action.payload.list,
            img:action.payload.url
          }
      }
    },

    //填写单号弹窗
    handleOpenWaybillR(state,action){
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            //tableData:action.payload.list,
            waybill:true,
      
          }
      }
    },

     //填写单号弹窗
     handleColoseWaybillR(state,action){
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            //tableData:action.payload.list,
            waybill:false,
      
          }
      }
    },

    //快递获取
    getReGoodsFundIdMessageR(state,action){
      //console.log('xxx',action.payload)
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            reGoodsFundIdMessage: {
              refundId:action.payload.refundId,
              expressName:action.payload.expressName,
              type:action.payload.type,
            }
          }
      }
    },


  }
}
