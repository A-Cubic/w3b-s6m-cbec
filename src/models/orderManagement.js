import { message} from 'antd';
import {getSupplierOrderTable,getSupplierOrderChildCheck,
  getDownloadToSendOrder,getUploadWaybill,getUploadOrderbill,getUploadDistributorsOrderbill,getExportWaybill,getExportOrders,
  confirmDelivery,shipmentOverseas,getCode
} from '../services/orderManagement_S'
export default {
  namespace: 'orderManagement',
  state:{

    //供应商-运营商-渠道商接口共用table
    supplierOrder:{
      tableData:{
        list: [],
        pagination:{},
      },
      childCheck:{
        id:'',
      },
    },
    codeVisible:false,
    codeUrl:''
  },
  effects:{
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
  },
  reducers:{
    // getChannelTypeR(state, action) {
    //   return {
    //     ...state,
    //     channelTypeArr:action.payload,
    //   };
    // },
    // getWareHouseR(state, action) {
    //   return {
    //     ...state,
    //     wareHouseData:action.payload,
    //   };
    // },
    // getExpressR(state, action) {
    //   return {
    //     ...state,
    //     expressArr:action.payload,
    //   };
    // },
    supplierOrderTableR(state,action){
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          tableData:action.payload
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
    }
  }
}
