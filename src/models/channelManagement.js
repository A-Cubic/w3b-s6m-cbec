import { message} from 'antd';
import {getSupplier} from '../services/api'
import {getChannelTypeData,
  getCostChannelTable,saveCostChannel,
  getGoodsChannelTable,saveGoodsChannel
} from '../services/channelManagement_S'
import {notification} from "antd/lib/index";
import {confirmDelivery} from "../services/orderManagement_S";
export default {
  namespace: 'channelManagement',
  state:{
    // 获取渠道商类型
    channelTypeArr:[],
    // 获取供应商
    supplierArr:[],
    // 渠道管理 - 费用信息
    costChannel:{
      tableData:{
        list: [],
        pagination:{},
      },
      childEdit:{
        id:''
      },
    },
    // 渠道管理 - 商品信息
    goodsChannel:{
      tableData:{
        list: [],
        pagination:{},
      },
      childEdit:{
        id:''
      },
    },
  },
  effects:{
    // 获取渠道商类型
    *getChannelType({ payload },{ call,put}){
      const response = yield call(getChannelTypeData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getChannelTypeR',
          payload: response,
        });
      }
    },
    // 获取供应商下拉
    *getSupplier({ payload },{ call,put}){
      const response = yield call(getSupplier, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSupplierR',
          payload: response,
        });
      }
    },

    // 渠道管理 - 费用信息 - 获取订单列表
    *getCostChannelTable({payload, callback},{call,put}){
      const response = yield call(getCostChannelTable,payload);
      // console.log('~',response)
      if (response !== undefined){
        yield put({
          type:'getCostChannelTableR',
          payload: response
        })
      }
    },
    // 渠道管理 - 费用信息 - 编辑
    *editCostChannel({payload, callback},{call,put}){
      // console.log('~',payload)
        yield put({
          type:'editCostChannelR',
          payload: payload
        })
    },
    // 渠道管理 - 费用信息 - 编辑保存
    *saveCostChannel({payload, callback},{call,put}){
      const response = yield call(saveCostChannel, payload);
      // console.log('~',response)
      if (response !== undefined) {
        if(response.type==1){
          callback();
          message.success('保存成功')
        }else{
          message.error(response.msg)
        }
      }else{
        message.error(response.error)
      }
    },

    // 渠道管理 - 商品信息 - 获取订单列表
    *getGoodsChannelTable({payload, callback},{call,put}){
      const response = yield call(getGoodsChannelTable,payload);
      // console.log('~',response)
      if (response !== undefined){
        yield put({
          type:'getGoodsChannelTableR',
          payload: response
        })
      }
    },
    // 渠道管理 - 商品信息 - 编辑
    *editGoodsChannel({payload, callback},{call,put}){
      // console.log('~',payload)
      yield put({
        type:'editGoodsChannelR',
        payload: payload
      })
    },
    // 渠道管理 - 商品信息 - 编辑保存
    *saveGoodsChannel({payload, callback},{call,put}){
      const response = yield call(saveGoodsChannel, payload);
      // console.log('~',response)
      if (response !== undefined) {
        if(response.type==1){
          callback();
          message.success('保存成功')
          yield put({
            type:'saveGoodsChannelR',
            payload: payload
          })
        }else{
          message.error(response.msg)
        }
      }else{
        message.error(response.error)
      }
    },
  },
  reducers:{
    getChannelTypeR(state, action) {
      return {
        ...state,
        channelTypeArr:action.payload,
      };
    },
    // 供应商下拉
    getSupplierR(state, action) {
      return {
        ...state,
        supplierArr:action.payload,
      };
    },

    getCostChannelTableR(state,action){
      return{
        ...state,
        costChannel:{
          ...state.costChannel,
          tableData:action.payload
        }
      }
    },
    editCostChannelR(state,action){
      // console.log(action.payload)
      return{
        ...state,
        costChannel:{
          ...state.costChannel,
          childEdit:action.payload
        }
      }
    },
    getGoodsChannelTableR(state,action){
      return{
        ...state,
        goodsChannel:{
          ...state.goodsChannel,
          tableData:action.payload
        }
      }
    },
    editGoodsChannelR(state,action){
      return{
        ...state,
        goodsChannel:{
          ...state.goodsChannel,
          childEdit:{
            ...action.payload,
            supplierId:action.payload.supplierid
          }
        }
      }
    },
    saveGoodsChannelR(state,action){
      const b =state.goodsChannel.tableData.list.findIndex(item=>
         item.id===action.payload.id
       )
      state.goodsChannel.tableData.list[b] = {...state.goodsChannel.tableData.list[b], ...action.payload};
      return{
        ...state
      }
    },
  }
}
