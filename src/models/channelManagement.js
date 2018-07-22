import { message} from 'antd';
import {getChannelTypeData,
  getChannelTable,saveCostChannel
} from '../services/channelManagement_S'
import {notification} from "antd/lib/index";
import {confirmDelivery} from "../services/orderManagement_S";
export default {
  namespace: 'channelManagement',
  state:{
    // 获取渠道商类型
    channelTypeArr:[],
    // 渠道管理 - 费用信息
    costChannel:{
      tableData:{
        list: [],
        pagination:{},
      },
      childEdit:{
        id:''
      },
    }
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

    //获取订单列表
    *getCostChannelTable({payload, callback},{call,put}){
      const response = yield call(getChannelTable,payload);
      // console.log('~',response)
      if (response !== undefined){
        yield put({
          type:'getChannelTableR',
          payload: response
        })
      }
    },
    //渠道管理 - 费用信息 - 编辑
    *editCostChannel({payload, callback},{call,put}){
      // console.log('~',payload)
        yield put({
          type:'editCostChannelR',
          payload: payload
        })
    },
    //渠道管理 - 费用信息 - 编辑保存
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
  },
  reducers:{
    getChannelTypeR(state, action) {
      return {
        ...state,
        channelTypeArr:action.payload,
      };
    },

    getChannelTableR(state,action){
      return{
        ...state,
        costChannel:{
          ...state.costChannel,
          tableData:action.payload
        }
      }
    },
    editCostChannelR(state,action){
      console.log(action.payload)
      return{
        ...state,
        costChannel:{
          ...state.costChannel,
          childEdit:action.payload
        }
      }
    },

  }
}
