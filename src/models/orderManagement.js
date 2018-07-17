import { message} from 'antd';
import {getSupplierOrderTable} from '../services/orderManagement_S'
export default {
  namespace: 'orderManagement',
  state:{
    supplierOrder:{
      tableData:{
        list: [],
        pagination:{},
      }
    }
  },
  effects:{
    *supplierOrderTable({payload, callback},{call,put}){
      const response = yield call(getSupplierOrderTable,payload);
      console.log('~',response)
      if (response !== undefined){
        yield put({
          type:'supplierOrderTableR',
          payload: response
        })
      }
    }
  },
  reduce:{
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
