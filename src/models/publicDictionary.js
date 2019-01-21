// 公共字典
import {
  getPartnerData,
  getChannelTypeData,
  getPurchaseData,
  getSupplier,
  getDistributorsData,
  getBrandData,
  getWareHouseData,
  getExpressData,
  getGoodsWareHouse,
  getPurchaserArr,
  merchantName
} from "../services/publicDictionary_S";

export default {
  namespace: 'publicDictionary',
  state:{
    // 获取代理合作方
    partnerArr:[],
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
    // 获取采购商
    purchaserArr:[],
    //客商名称
    nameOfMerchant:[],
    //客商名称
    merchantName:[]
  },
  effects:{
    // 获取平台渠道类型
    *getPartner({ payload },{ call,put}){

      const response = yield call(getPartnerData, payload);
      // console.log('re',response)
      if (response !== undefined) {
        yield put({
          type: 'getPartnerR',
          payload: response,
        });
      }
    },
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

    // 获取采购商
    *getPurchaserArr({ payload },{ call,put}){
      const response = yield call(getPurchaserArr, payload);
     //  console.log('XXXgetPurchaserArr',response)
      if (response !== undefined) {
        yield put({
          type: 'getPurchaserArrR',
          payload: response,
        });
      }
    },


    // 客商名称
    *nameOfMerchant({ payload },{ call,put}){
      const response = yield call(nameOfMerchant, payload);
      if (response !== undefined) {
        yield put({
          type: 'nameOfMerchantR',
          payload: response,
        });
      }
    },
    // 客商名称
    *merchantName({ payload },{ call,put}){
      const response = yield call(merchantName, payload);
      if (response !== undefined) {
        yield put({
          type: 'merchantNameR',
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
    getPartnerR(state, action) {
      return {
        ...state,
        partnerArr:action.payload,
      };
    },
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
    getPurchaserArrR(state, action) {
     // console.log('XXXgetPurchaserArr',action.payload)
      return {
        ...state,
        purchaserArr:action.payload,
      };
    },
    nameOfMerchantR(state, action) {
       console.log('XXXnameOfMerchant',action.payload)
       return {
         ...state,
         nameOfMerchant:action.payload,
       };
     },

     merchantName(state, action) {
      console.log('qqqqmerchantName',action.payload)
      return {
        ...state,
        merchantName:action.payload,
      };
    },
  }
}
