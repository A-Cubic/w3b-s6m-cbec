// 公共字典
import {
  getChannelTypeData,
  getPurchaseData,
  getSupplier,
  getDistributorsData,
  getBrandData,
  getWareHouseData,
  getExpressData
} from "../services/publicDictionary_S";

export default {
  namespace: 'publicDictionary',
  state:{
    // 获取平台渠道类型
    channelTypeArr:[],
    // 获取销售商（渠道商）
    purchaseArr:[],
    // 获取供应商
    supplierArr:[],
    // 获取分销商
    distributorsArr:[],
    // 获取品牌
    brandArr:[],
    // 获取仓库
    wareHouseArr:[],
    // 获取快递
    expressArr:[],

  },
  effects:{
    // 获取平台渠道类型
    *getChannelType({ payload },{ call,put}){

      const response = yield call(getChannelTypeData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getChannelTypeR',
          payload: response,
        });
      }
    },
    // 获取销售商（渠道商）
    *getPurchase({ payload },{ call,put}){
      const response = yield call(getPurchaseData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getPurchaseR',
          payload: response,
        });
      }
    },
    // 供应商 下拉
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
    // 获取分销商类型
    *getDistributors({ payload },{ call,put}){
      const response = yield call(getDistributorsData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getDistributorsR',
          payload: response,
        });
      }
    },
    // 获取品牌
    *getBrand({ payload },{ call,put}){
      const response = yield call(getBrandData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getBrandR',
          payload: response,
        });
      }
    },
    // 获取仓库
    *getWareHouse({ payload },{ call,put}){
      const response = yield call(getWareHouseData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getWareHouseR',
          payload: response,
        });
      }
    },
    // 获取快递
    *getExpress({ payload },{ call,put}){
      const response = yield call(getExpressData, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'getExpressR',
          payload: response,
        });
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
    getPurchaseR(state, action) {
      return {
        ...state,
        purchaseArr:action.payload,
      };
    },
    getSupplierR(state, action) {
      return {
        ...state,
        supplierArr:action.payload,
      };
    },
    getDistributorsR(state, action) {
      return {
        ...state,
        distributorsArr:action.payload,
      };
    },
    getBrandR(state, action) {
      return {
        ...state,
        brandArr:action.payload,
      };
    },
    getWareHouseR(state, action) {
      return {
        ...state,
        wareHouseArr:action.payload,
      };
    },
    getExpressR(state, action) {
      return {
        ...state,
        expressArr:action.payload,
      };
    },
  }
}
