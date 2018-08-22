import {
  getSettlementListS,
  getSettlementListO,
  getSettlementListP,
  getSettlementListA,
  getSettlementListD
} from "../services/settlementManagement_S";
export default {
  namespace: 'settlementManagement',
  state:{
    // 结算管理 - 运营/供应商/采购商/代理/分销商
    settlementAll:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },
  },
  effects:{
    // 销售统计列表 - 供应商
    *getSettlementListS({ payload },{ call,put}){
      const response = yield call(getSettlementListS, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSettlementListR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 运营
    *getSettlementListO({ payload },{ call,put}){
      const response = yield call(getSettlementListO, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSettlementListR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 采购
    *getSettlementListP({ payload },{ call,put}){
      const response = yield call(getSettlementListP, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSettlementListR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 代理
    *getSettlementListA({ payload },{ call,put}){
      const response = yield call(getSettlementListA, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSettlementListR',
          payload: response,
        });
      }
    },
    // 销售统计列表 - 分销
    *getSettlementListD({ payload },{ call,put}){
      const response = yield call(getSettlementListD, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getSettlementListR',
          payload: response,
        });
      }
    },
  },
  reducers:{
    getSettlementListR(state, action) {
      return {
        ...state,
        settlementAll:{
          ...state.settlementAll,
          tableData:action.payload
        },
      };
    },
  }
}
