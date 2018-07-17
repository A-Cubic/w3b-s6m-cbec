import { message} from 'antd';
import {getWareHouseData} from '../services/api'
import {getSupplierOrderTable} from '../services/orderManagement_S'
export default {
  namespace: 'orderManagement',
  state:{
    wareHouseData:[],
    supplierOrder:{
      tableData:{
        list: [],
        pagination:{},
      }
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
    }
  },
  reducers:{
    getWareHouseR(state, action) {
      return {
        ...state,
        wareHouseData:action.payload,
      };
    },
    supplierOrderTableR(state,action){
      return{
        ...state,
        supplierOrder:{
          tableData:action.payload
        }
      }

    }
  }
}
