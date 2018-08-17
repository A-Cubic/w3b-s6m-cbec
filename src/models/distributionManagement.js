import { message} from 'antd';
import {notification} from "antd/lib/index";
import {getDistributorTable,getUpdateDistributor} from '../services/distributionManagement_S'
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
  }
}
