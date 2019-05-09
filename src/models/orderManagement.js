import { message} from 'antd';
import {getSupplierOrderTable,getSupplierOrderChildCheck,
  getDownloadToSendOrder,getUploadWaybill,getUploadOrderbill,getUploadDistributorsOrderbill,getExportWaybill,getExportOrders,
  confirmDelivery,shipmentOverseas,getCode,getCustoms,getgoodsData,
  getAgreedToReturnR,//获取id
  getOpenAgreedToReturn,//同意退货弹窗
  getCloseAgreedToReturn,//同意退货弹窗
  getAgreeReGoods,//同意退货
  getOpenCompleteReturnR, //填写运单弹窗
  getCloseCompleteReturnR, //填写运单弹窗
  getMakeSureReGoods, //完成退货接口
  getReGoodsMessage,//退货原因
  getOpenReturnGoods,//完全退货弹窗
  getCloseReturnGoods,//完全退货弹窗
} from '../services/orderManagement_S'
import {getBrandData} from "../services/publicDictionary_S";
export default {
  namespace: 'orderManagement',
  state:{

    //供应商-运营商-渠道商接口共用table
    supplierOrder:{
      tableData:{
        list: [],
        pagination:{},
      },
      fs:{
        consigneeName:'',
        consigneeMobile:'',
        consigneeAdr:''
      },
      childCheck:{
        id:'',
      },
      item:''
    },
    customsVisible:false,
    customsInformationList:[],
    codeVisible:false,
    codeUrl:'',
    agreedToReturn:false,
    orderId:'',
    completeReturn:false,
    AddReturnGoods:false,
    
  },
  effects:{
    // 运营 - 增加获取海关清关状态数据
    *operatorCustoms({ payload },{ call, put }){
      const response = yield call(getCustoms, payload);
      if(response !== ''){
        yield put({
          type: 'changeCustomsVisibleR',
          payload: true,
        });
        yield put({
          type:'operatorCustomsR',
          payload: response
        })
      }
    },
    // *supplierOrderChildCheck({payload, callback},{call,put}){
    //   const response = yield call(getSupplierOrderChildCheck,payload);
    //   // console.log('~',response)
    //   if (response !== undefined){
    //     yield put({
    //       type:'supplierOrderChildCheckR',
    //       payload: response
    //     })
    //   }
    // },

    // 获取平台渠道类型
    // *getChannelType({ payload },{ call,put}){
    //   const response = yield call(getChannelTypeData, payload);
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'getChannelTypeR',
    //       payload: response,
    //     });
    //   }
    // },
    // //获取仓库
    // *getWareHouse({ payload },{ call,put}){
    //   const response = yield call(getWareHouseData, payload);
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'getWareHouseR',
    //       payload: response,
    //     });
    //   }
    // },
    // //获取快递
    // *getExpress({ payload },{ call,put}){
    //   const response = yield call(getExpressData, payload);
    //   // console.log('~',response)
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'getExpressR',
    //       payload: response,
    //     });
    //   }
    // },
    //获取订单列表
    *supplierOrderTable({payload, callback},{call,put}){
      const response = yield call(getSupplierOrderTable,payload);
      // console.log('~',response)
      if (response !== undefined){
        yield put({
          type:'supplierOrderTableR',
          payload: response
        })
      }
    },

      //新增发货接口
      *getgoodsData({payload, callback},{call,put}){
        const response = yield call(getgoodsData,payload);
        // console.log('~',response)
        if (response !== undefined){
          yield put({
            type:'getgoodsDataR',
            payload: response
          })
        }
      },


    //获取查看详情
    *supplierOrderChildCheck({payload, callback},{call,put}){
      const response = yield call(getSupplierOrderChildCheck,payload);
      // console.log('~',response)
      if (response !== undefined){
        yield put({
          type:'supplierOrderChildCheckR',
          payload: response
        })
      }
    },
    //导出需发货的订单
    *downloadToSendOrder({ payload, callback }, { call, put }) {
      const response = yield call(getDownloadToSendOrder, payload);

      if (response !== undefined) {
        if(response.type==1){
          message.success('导出成功');
          let downloadUrl = response.msg;
          window.location.href = downloadUrl;
        }else{
          message.error(response.msg)
        }

      }else{
        message.error(response.msg);
      }
    },
    //导入订单
    *uploadOrderbill({ payload,callback },{ call,put}){
      const response = yield call(getUploadOrderbill, payload);
      // console.log('~',response)
      if (response !== undefined) {
        callback(response)
      }
    },
    //分销商 - 导入订单
    *uploadDistributorsOrderbill({ payload,callback },{ call,put}){
      const response = yield call(getUploadDistributorsOrderbill, payload);
      // console.log('~',response)
      if (response !== undefined) {
        callback(response)
      }
    },
    //导入运单
    *uploadWaybill({ payload,callback },{ call,put}){
      const response = yield call(getUploadWaybill, payload);
      // console.log('~',response)
      if (response !== undefined) {
        callback(response)
      }
    },
    //导出运单
    *exportWaybill({ payload,callback },{ call,put}){
      const response = yield call(getExportWaybill, payload);
      // console.log('~',response)
      if (response !== undefined) {
        callback(response)
      }
    },
    //导出订单
    *exportOrders({ payload,callback },{ call,put}){
      const response = yield call(getExportOrders, payload);
      // console.log('~',response)
      if (response !== undefined) {
        if(response.type==1){
          let downloadUrl = response.msg;
          // console.log(downloadUrl)
          window.location.href = downloadUrl;
          message.success('导出成功');
        }else{
          message.error(response.msg)
        }
      }else{
        message.error(response.msg);
      }
    },
    //确认发货
    *confirmDelivery({ payload,callback },{ call,put}){
      const response = yield call(confirmDelivery, payload);
      // console.log('~',response)
      if (response !== undefined) {
        if(response.type==1){
          callback();
          message.success('发货成功')
        }else{
          message.error(response.msg)
        }
      }else{
        message.error(response.error)
      }
    },
    // 海外已出货
    *shipmentOverseas({ payload,callback },{ call,put}){
      const response = yield call(shipmentOverseas, payload);
      // console.log('~',response)
      if (response !== undefined) {
        if(response.type==1){
          callback();
          message.success('发货成功')
        }else{
          message.error(response.msg)
        }
      }else{
        message.error(response.msg)
      }
    },

  //  分销商 - 扫码支付
    *getCode({ payload,callback },{ call,put}){
      const response = yield call(getCode, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type:'getCodeR',
          payload: response.url
        })
        yield put({
          type:'getCodeVisibleR',
          payload: {
            codeVisible:true
          }
        })
      }else{
        message.error(response.msg)
      }
    },

  //同意退货接口
  *getAgreeReGoods({ payload,callback },{ call,put}){
    const response = yield call(getAgreeReGoods, payload);
    //console.log('xxx')
    if (response !== undefined) {
      if (response.type==1) {
        message.success('同意退货');
        callback(response);
      }else{
        message.error(response.msg);
      }
    }
  },  

  //完成退货接口
  *getMakeSureReGoods({ payload,callback },{ call,put}){
    const response = yield call(getMakeSureReGoods, payload);
    //console.log('xxx')
    if (response !== undefined) {
      if (response.type==1) {
        message.success('退货完成');
        callback(response);
      }else{
        message.error(response.msg);
      }
    }
  },  

  //获取退货理由等信息
  //获取订单列表
  *getReGoodsMessage({payload, callback},{call,put}){
    const response = yield call(getReGoodsMessage,payload);
    // console.log('~',response)
    if (response !== undefined){
      yield put({
        type:'getReGoodsMessageR',
        payload: response
      })
    }
  },



  },
  reducers:{
   
    changeCustomsVisibleR(state, action) {
      return {
        ...state,
        customsVisible:action.payload,
      };
    },
    operatorCustomsR(state, action) {
      return {
        ...state,
        customsInformationList:action.payload,
      };
    },
    supplierOrderTableR(state,action){
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          tableData:action.payload
        }
      }
    },

    getgoodsDataR(state,action){
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          fs: {
            consigneeName:action.payload.consigneeName,
            consigneeMobile:action.payload.consigneeMobile,
            consigneeAdr:action.payload.consigneeAdr
          }
        }
      }
    },



    supplierOrderChildCheckR(state,action){
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          childCheck:action.payload
        }
      }
    },

    

    getCodeR(state,action){
      return{
        ...state,
        codeUrl:action.payload
      }
    },
    getCodeVisibleR(state,action){
      return{
        ...state,
        codeVisible:action.payload.codeVisible
      }
    },
    //获取id
    getAgreedToReturnR(state,action){
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          orderId:action.payload.id
        }
      }
    },

  
  //同意退货弹窗
  getOpenAgreedToReturn(state,action){
    //console.log('xxx',action.payload.id)
    return{
      ...state,
      supplierOrder:{
        ...state.supplierOrder,
        agreedToReturn:true,
      }
    }
  },
  getCloseAgreedToReturn(state,action){
    return{
      ...state,
      supplierOrder:{
        ...state.supplierOrder,
        agreedToReturn:false,
      }
    }
  },

    //填写运单弹窗   
    getOpenCompleteReturnR(state,action){
      //console.log('xxx',action.payload.id)
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          completeReturn:true,
        }
      }
    },
    getCloseCompleteReturnR(state,action){
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          completeReturn:false,
        }
      }
    },

    //退货原因
    
    getReGoodsMessageR(state,action){
      console.log('xx',action.payload)
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          item:action.payload,
        }
      }
    },

    //完全退货弹窗   
    getOpenReturnGoods(state,action){
      //console.log('xxx',action.payload.id)
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          AddReturnGoods:true,
        }
      }
    },
    getCloseReturnGoods(state,action){
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          AddReturnGoods:false,
        }
      }
    },



  }
}
