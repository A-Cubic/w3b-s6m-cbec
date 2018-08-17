import { message} from 'antd';
import {notification} from "antd/lib/index";
import {getDistributorTable} from '../services/distributionManagement_S'
import {getBrandData, getGoodsPutaway, getUpdateWarehouse} from "../services/api";
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
      childCheckS:{},
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
      console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getDistributorTableR',
          payload: response,
        });
      }
    },
    *updateWarehouse({ payload,callback },{ call,put}){
      const response = yield call(getUpdateWarehouse, payload);
      // console.log('~',response)
      if (response !== undefined) {
        if (response.type==1) {
          callback();
          message.success('保存成功');
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
  }
}
