import { message} from 'antd';
import {notification} from "antd/lib/index";
import {handlePopupCloseR,handlePopup,getDistributorTable,getUpdateDistributor,getAgentQRCode,} from '../services/distributionManagement_S'
import {getBrandData, getGoodsPutaway, getO2OCheck, getUpdateWarehouse} from "../services/api";
export default {
  namespace: 'distributionManagement',
  state:{
    distributorsMgtData:{
      tableData:{
        list: [],
        pagination:{},
      },
      visible:false,
      // 商品管理 - 商品查看详情 - 供应
      childCheckS:{
        id:'',
        userName:'',
        company:'',
        mobile:'',
        wxName:'',
      },
    },
    agentQRCode:'',

    popupList: {
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
      popup:false
    }



  },
  effects:{
    *changeVisible({ payload },{ call, put }){
      yield put({
        type: 'changeVisibleR',
        payload: {
          visibleValue: payload.visibleValue
        }
      });
      // const response = yield call(getBrandData, payload);
      // if(response !== ''){
      //   yield put({
      //     type: 'changeVisibleR',
      //     payload: {
      //       visibleValue: false
      //     }
      //   });
      // }
    },
    *getDistributorTable({ payload },{ call,put}){
      const response = yield call(getDistributorTable, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getDistributorTableR',
          payload: response,
        });
      }
    },
    *updateDistributor({ payload,callback },{ call,put}){
      const response = yield call(getUpdateDistributor, payload);
      const responseList = yield call(getDistributorTable, payload);
      // console.log('~',response)
      if (response !== undefined) {
        if (response.type==1) {
          message.success('保存成功');
          yield put({
            type: 'getDistributorTableR',
            payload: responseList,
          });
          yield put({
            type: 'changeVisibleR',
            payload: {
              visibleValue: false
            },
          });
          callback();
        }else{
          message.error(response.msg);
        }
      }
    },
    *agentQRCode({ payload,callback },{ call,put}){
      const response = yield call(getAgentQRCode, payload);
      if (response !== undefined) {
          yield put({
            type: 'agentQRCodeR',
            payload: response,
          });

      }else{
        message.error('出错了');
      }
    },

    *handlePopup({ payload,callback },{ call,put}){
      const response = yield call(handlePopup, payload);
      if (response !== undefined) {
          yield put({
            type: 'handlePopupR',
            payload: response,
          });

      }else{
        message.error('出错了');
      }
    },




  },
  reducers:{
    changeVisibleR(state, action){
      // console.log('reducers',action.payload.visibleValue)
      state.distributorsMgtData.visible = action.payload.visibleValue;
      return {...state};
    },
    getDistributorTableR(state, action) {
      return {
        ...state,
        distributorsMgtData:{
          ...state.distributorsMgtData,
          tableData:action.payload,
        },
      };
    },
    editChildR(state, action) {
      // console.log('madel',action.payload)
      return {
        ...state,
        distributorsMgtData:{
          ...state.distributorsMgtData,
          childCheckS:action.payload,
        },
      };
    },
    agentQRCodeR(state, action) {
      // console.log('madel',action.payload)
      return {
        ...state,
        agentQRCode:action.payload.agentQRCodeUrl,
      };
    },

    
    handlePopupR(state, action) {
      //console.log('xxmadel',action.payload)
      return {
        ...state,
        popupList:{
          tableData:{
            item:action.payload.item,
            list: action.payload.list,
            pagination:action.payload.pagination,
          },
          popup:true
        },
      };
    },
    handlePopupCloseR(state, action) {
      //console.log('xxxxxxxstate',state)
      return {
        ...state,
        popupList:{
          tableData:{
            item:{},
            list: [],
            pagination:{},
          },
          popup:false
        },
      };
    },
  }
}
