// import {
//   getGoodsListOfOperate, updateGoodsOfOperate, getGoodsById, getGoodsNum, updateGoodsNum, getSellNum, getGoodsNumByBarcode
// } from '../services/api';
import { message} from 'antd';
import {notification} from "antd/lib/index";
import {
  getGoodsList,getBrandData,getWareHouseData,downloadStoreTempUrl,downloadGoodsTempUrl,downloadPicZipUrl,
  getWarehouseList,getgoodsDetail,
  getStep1Upload,
} from '../services/api';
export default {
  namespace: 'goods',

  state: {
    //商品
    goodsTable:{
      list: [],
      pagination:{},
    },
    brandData:[],
    wareHouseData:[],
    ModalGoodsAboutEdit:{},
    //仓库
    warehouseTable:{
      list: [],
      pagination:{},
    },
    //编辑仓库信息
    ModalwarehouseEdit:{},
    // 商品入库
    goodsPutaway:{
      list: [],
      pagination:{},
    },
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    *getBrand({ payload },{ call,put}){
      const response = yield call(getBrandData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getBrandR',
          payload: response,
        });
      }
    },
    *getWareHouse({ payload },{ call,put}){
      const response = yield call(getWareHouseData, payload);
      if (response !== undefined) {
        yield put({
          type: 'getWareHouseR',
          payload: response,
        });
      }
    },
    *goodslist({ payload },{ call,put}){
      const response = yield call(getGoodsList, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'goodslistR',
          payload: response,
        });
      }
    },
    *goodsDetail({ payload },{ call,put}){
      const response = yield call(getgoodsDetail, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'goodsDetailR',
          payload: response,
        });
      }
    },
    *downloadStoreTemp({ payload, callback }, { call, put }) {
      const response = yield call(downloadStoreTempUrl, payload);
      console.log(response);
      if (response !== undefined) {
        message.success('导出成功');
        let downloadUrl = response.url;
        window.location.href = downloadUrl;
      }else{
        notification.error({
          message: response.error,
        });
      }
    },
    *downloadGoodsTemp({ payload, callback }, { call, put }) {
      const response = yield call(downloadGoodsTempUrl, payload);
      console.log(response);
      if (response !== undefined) {
        message.success('导出成功');
        let downloadUrl = response.url;
        window.location.href = downloadUrl;
      }else{
        notification.error({
          message: response.error,
        });
      }
    },
    *downloadPicZip({ payload, callback }, { call, put }) {
      const response = yield call(downloadPicZipUrl, payload);
      console.log(response);
      if (response !== undefined) {
        message.success('导出成功');
        let downloadUrl = response.url;
        window.location.href = downloadUrl;
      }else{
        notification.error({
          message: response.error,
        });
      }
    },
    *warehouseList({ payload },{ call,put}){
      const response = yield call(getWarehouseList, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'warehouseListR',
          payload: response,
        });
      }
    },

    *step1Upload({ payload },{ call,put}){
      const response = yield call(getStep1Upload, payload);
      console.log('~',response)
      // if (response !== undefined) {
      //   yield put({
      //     type: 'warehouseListR',
      //     payload: response,
      //   });
      // }
    },



    // *list({ payload }, { call, put }) {
    //   const response = yield call(getGoodsListOfOperate, payload);
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'queryList',
    //       payload: response,
    //     });
    //   }
    // },
    // *numlist({ payload, callback }, { call, put }) {
    //   const response = yield call(getGoodsNum, payload);
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'queryList',
    //       payload: response,
    //     });
    //
    //     callback(response);
    //   }
    // },
    // *update({ payload, callback }, { call }) {
    //   const response = yield call(updateGoodsOfOperate, payload);
    //   if (response === undefined) {
    //
    //   } else {
    //     callback(response);
    //   }
    // },
    // *updateKC({ payload, callback }, { call }) {
    //   const response = yield call(updateGoodsNum, payload);
    //   if (response === undefined) {
    //
    //   } else {
    //     callback(response);
    //   }
    // },
    // *info({ payload, callback }, { call }) {
    //   const response = yield call(getGoodsById, payload);
    //   if (response !== undefined) {
    //     callback(response);
    //   }
    // },
    // *sell({ payload }, { call, put }) {
    //   const response = yield call(getSellNum, payload);
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'queryList',
    //       payload: response,
    //     });
    //   }
    // },
    // *numinfo({ payload, callback }, { call ,put}) {
    //   const response = yield call(getGoodsNumByBarcode, payload);
    //   if (response !== undefined) {
    //     callback(response);
    //   }
    // },
  },

  reducers: {
    getBrandR(state, action) {
      return {
        ...state,
        brandData:action.payload,
      };
    },
    getWareHouseR(state, action) {
      return {
        ...state,
        wareHouseData:action.payload,
      };
    },
    goodslistR(state, action) {
      return {
        ...state,
        goodsTable:action.payload,
      };
    },
    goodsDetailR(state, action) {
      return {
        ...state,
        ModalGoodsAboutEdit:action.payload,
      };
    },
    warehouseListR(state, action) {
      return {
        ...state,
        warehouseTable:action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        goodsList: action.payload,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
