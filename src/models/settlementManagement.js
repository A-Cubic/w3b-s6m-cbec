import {
  getIncomeStoreInformationData,getIncomeStoreUnSettlementData,getIncomeStoreSettlementData,getIncomeStoreSettlementOrderData,
  getIncomeAInformationData,getIncomeAForecastData,getIncomeASettlementData,getIncomeASettlementOrderData,
  getSettlementListS,getSettlementListO,getSettlementListP,getSettlementListA,getSettlementListD
} from "../services/settlementManagement_S";
export default {
  namespace: 'settlementManagement',
  state:{
    // 我的收益（门店）
    incomeStoreData:{
      // 信息展示
      informationData:{},
      // 待结算收益
      unSettlementData:{
        item:{},
        list: [],
        pagination:{},
      },
      // 已结算收益
      settlementData:{
        item:{},
        list: [],
        pagination:{},
      },
      // 已结算收益 - 查看订单
      settlementOrderData:{
        item:{},
        list: [],
        pagination:{},
      }
    },
    // 我的收益（代理）
    incomeAgencyData:{
      // 信息展示
      informationData:{},
      // 预估收益
      forecastData:{
        item:{},
        list: [],
        pagination:{},
      },
      // 已结算收益
      settlementData:{
        item:{},
        list: [],
        pagination:{},
      },
      // 已结算收益 - 查看订单
      settlementOrderData:{
        item:{},
        list: [],
        pagination:{},
      }
    },
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
    // 我的收益（门店）- 已结算收益 - 查看订单
    *getIncomeStoreSettlementOrderData({ payload },{ call,put}){
      const response = yield call(getIncomeStoreSettlementOrderData, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getIncomeStoreSettlementOrderDataR',
          payload: response,
        });
      }
    },
    // 我的收益（门店）- 已结算收益
    *getIncomeStoreSettlementData({ payload },{ call,put}){
      const response = yield call(getIncomeStoreSettlementData, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getIncomeStoreSettlementDataR',
          payload: response,
        });
      }
    },
    // 我的收益（门店）- 待结算收益
    *getIncomeStoreUnSettlementData({ payload },{ call,put}){
      const response = yield call(getIncomeStoreUnSettlementData, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getIncomeStoreUnSettlementDataR',
          payload: response,
        });
      }
    },
    // 我的收益（门店）- 信息展示
    *getIncomeStoreInformationData({ payload },{ call,put}){
      const response = yield call(getIncomeStoreInformationData, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getIncomeStoreInformationDataR',
          payload: response,
        });
      }
    },

    // 我的收益（代理）- 已结算收益 - 查看订单
    *getIncomeASettlementOrderData({ payload },{ call,put}){
      const response = yield call(getIncomeASettlementOrderData, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getIncomeASettlementOrderDataR',
          payload: response,
        });
      }
    },
    // 我的收益（代理）- 已结算收益
    *getIncomeASettlementData({ payload },{ call,put}){
      const response = yield call(getIncomeASettlementData, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getIncomeASettlementDataR',
          payload: response,
        });
      }
    },
    // 我的收益（代理）- 预估收益
    *getIncomeAForecastData({ payload },{ call,put}){
      const response = yield call(getIncomeAForecastData, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getIncomeAForecastDataR',
          payload: response,
        });
      }
    },
    // 我的收益（代理）- 信息展示
    *getIncomeAInformationData({ payload },{ call,put}){
      const response = yield call(getIncomeAInformationData, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getIncomeAInformationDataR',
          payload: response,
        });
      }
    },

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
    getIncomeStoreSettlementOrderDataR(state, action) {
      return {
        ...state,
        incomeStoreData:{
          ...state.incomeStoreData,
          settlementOrderData:action.payload
        },
      };
    },
    getIncomeStoreSettlementDataR(state, action) {
      return {
        ...state,
        incomeStoreData:{
          ...state.incomeStoreData,
          settlementData:action.payload
        },
      };
    },
    getIncomeStoreUnSettlementDataR(state, action) {
      return {
        ...state,
        incomeStoreData:{
          ...state.incomeStoreData,
          unSettlementData:action.payload
        },
      };
    },
    getIncomeStoreInformationDataR(state, action) {
      return {
        ...state,
        incomeStoreData:{
          ...state.incomeStoreData,
          informationData:action.payload
        },
      };
    },

    getIncomeASettlementOrderDataR(state, action) {
      return {
        ...state,
        incomeAgencyData:{
          ...state.incomeAgencyData,
          settlementOrderData:action.payload
        },
      };
    },
    getIncomeASettlementDataR(state, action) {
      return {
        ...state,
        incomeAgencyData:{
          ...state.incomeAgencyData,
          settlementData:action.payload
        },
      };
    },
    getIncomeAForecastDataR(state, action) {
      return {
        ...state,
        incomeAgencyData:{
          ...state.incomeAgencyData,
          forecastData:action.payload
        },
      };
    },
    getIncomeAInformationDataR(state, action) {
      return {
        ...state,
        incomeAgencyData:{
          ...state.incomeAgencyData,
          informationData:action.payload
        },
      };
    },
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
