import { message} from 'antd';
import {downloadGoodsTempUrl, getStep1Upload, getWareHouseData} from '../services/api'
import {getSupplierOrderTable,getSupplierOrderChildCheck,
  getDownloadToSendOrder,getUploadWaybill,
  getExpressData,confirmDelivery,shipmentOverseas
} from '../services/orderManagement_S'
import {notification} from "antd/lib/index";
export default {
  namespace: 'orderManagement',
  state:{
    wareHouseData:[],
    expressArr:[],
    supplierOrder:{
      tableData:{
        list: [],
        pagination:{},
      },
      childCheck:{},
      // childDelivery:{}
    }
  },
  effects:{
    //获取仓库
    *getWareHouse({ payload },{ call,put}){
      const response = yield call(getWareHouseData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getWareHouseR',
          payload: response,
        });
      }
    },
    //获取快递
    *getExpress({ payload },{ call,put}){
      const response = yield call(getExpressData, payload);
      console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getExpressR',
          payload: response,
        });
      }
    },
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
      console.log(response);
      if (response !== undefined) {
        message.success('导出成功');
        let downloadUrl = response.url;
        window.location.href = downloadUrl;
      }else{
        message.error(response.error);
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
        message.error(response.error)
      }
    },
  },
  reducers:{
    getWareHouseR(state, action) {
      return {
        ...state,
        wareHouseData:action.payload,
      };
    },
    getExpressR(state, action) {
      return {
        ...state,
        expressArr:action.payload,
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
    supplierOrderChildCheckR(state,action){
      return{
        ...state,
        supplierOrder:{
          ...state.supplierOrder,
          childCheck:action.payload
        }
      }
    }
  }
}
