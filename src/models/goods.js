// import {
//   getGoodsListOfOperate, updateGoodsOfOperate, getGoodsById, getGoodsNum, updateGoodsNum, getSellNum, getGoodsNumByBarcode
// } from '../services/api';
import { message} from 'antd';
import {notification} from "antd/lib/index";
import {
  downloadStoreTempUrl,downloadGoodsTempUrl,downloadPicZipUrl,
  getWarehouseList,getUpdateWarehouse,getDeleteWarehouse,

  getStep1Upload,getGoodsPutaway,getStep2supplement,
  getCheckStepStatus,
  getStep2Upload,getStep3supplement,getStep4TrueSupplement,getStep4FalseSupplement
} from '../services/api';
import {
  getUploadviewData
} from '../services/roleSupplierBus_S';


import {routerRedux} from "dva/router";
export default {
  namespace: 'goods',

  state: {
    //商品
    goodsTable:{
      list: [],
      pagination:{},
    },
    // brandData:[],
    // wareHouseData:[],
    ModalGoodsAboutEdit:{},
    //仓库 -供应商
    supplierArr:[],
    warehouseTable:{
      list: [],
      pagination:{},
    },
    //编辑仓库信息
    ModalwarehouseEdit:{
      wid:'',
      supplierId:'1',
      wname:'',
      taxation:'',
      taxation2type:'1',
      taxation2line:'',
      taxation2:'',
      freight:''
    },
    // 商品入库
    goodsPutawayTable:{
      list: [],
      pagination:{},
    },
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    step2supplementData:{},
    step3supplementData:{},
    step4supplementData:{},
    Step4:{
      tableData:{
        list: [],
        pagination:{},
      },
      show:false
    },
  },

  effects: {
    // *getBrand({ payload },{ call,put}){
    //   const response = yield call(getBrandData, payload);
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'getBrandR',
    //       payload: response,
    //     });
    //   }
    // },
    // *getWareHouse({ payload },{ call,put}){
    //   const response = yield call(getWareHouseData, payload);
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'getWareHouseR',
    //       payload: response,
    //     });
    //   }
    // },
    // *goodslist({ payload },{ call,put}){
    //   const response = yield call(getGoodsList, payload);
    //   // console.log('~',response)
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'goodslistR',
    //       payload: response,
    //     });
    //   }
    // },
    // *goodsDetail({ payload },{ call,put}){
    //   const response = yield call(getgoodsDetail, payload);
    //   // console.log('~',response)
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'goodsDetailR',
    //       payload: response,
    //     });
    //   }
    // },

    //商品管理-商品上架 -弹窗
    *getUploadviewData({ payload },{ call,put }){
      const response = yield call(getUploadviewData, payload);
     // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getUploadviewDataR',
          payload: {response,show:true,}
        })
      }
    },



    *downloadStoreTemp({ payload, callback }, { call, put }) {
      const response = yield call(downloadStoreTempUrl, payload);
      // console.log(response);
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
      // console.log(response);
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
      // console.log(response);
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
    // // 供应商 下拉
    // *getSupplier({ payload },{ call,put}){
    //   const response = yield call(getSupplier, payload);
    //   // console.log('~',response)
    //   if (response !== undefined) {
    //     yield put({
    //       type: 'getSupplierR',
    //       payload: response,
    //     });
    //   }
    // },
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
    *editWarehouse({ payload,callback },{ call,put}){
      yield put({
        type: 'editWarehouseR',
        payload: {...payload},
      });
    },
    *deleteWarehouse({ payload,callback },{ call,put}){
      const response = yield call(getDeleteWarehouse, payload);
      // console.log('~',response)
      if (response !== undefined) {
        if (response.type==1) {
          callback();
          message.success('删除成功');
        }else{
          message.error(response.msg);
        }
      }
    },


    *step1Upload({ payload,callback },{ call,put}){
      const response = yield call(getStep1Upload, payload);
      // console.log('~',response)
      if (response !== undefined) {
        callback(response)
      }
    },
    *goodsPutaway({ payload },{ call,put}){
      const response = yield call(getGoodsPutaway, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'goodsPutawayR',
          payload: response,
        });
      }
    },
    *checkStepStatus({ payload,callback },{ call,put}){
      const response = yield call(getCheckStepStatus, payload);
      // console.log('~',response)
      if (response !== undefined) {
        callback(response)
      }
    },
    *checkStepStatusIn({ payload,callback },{ call,put}){
      const response = yield call(getCheckStepStatus, payload);
      // console.log('~',response)
      if(payload.status !== response.status){
        switch (response.status){
          case '0':
            yield put(routerRedux.push('/goods/step-form/confirm/' + payload.logId));
            break;
          case '1':
            yield put(routerRedux.push('/goods/step-form/wait/' + payload.logId));
            break;
          case '2':
            yield put(routerRedux.push('/goods/step-form/result/true/' + payload.logId));
            break;
          case '3' :
            yield put(routerRedux.push('/goods/step-form/result/false/'+ payload.logId));
            break;
          default:
            break;
        }
      }else{
        callback();
      }
    },
    *step2supplement({ payload },{ call,put}){
      const response = yield call(getStep2supplement, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'step2supplementR',
          payload: response,
        });
      }
    },
    *step3supplement({ payload },{ call,put}){
      const response = yield call(getStep3supplement, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'step3supplementR',
          payload: response,
        });
      }
    },
    *step4TrueSupplement({ payload },{ call,put}){
      const response = yield call(getStep4TrueSupplement, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'step4TrueSupplementR',
          payload: response,
        });
      }
    },
    *step4FalseSupplement({ payload },{ call,put}){
      const response = yield call(getStep4FalseSupplement, payload);
      // console.log('~',response)
      if (response !== undefined) {
        yield put({
          type: 'step4TrueSupplementR',
          payload: response,
        });
      }
    },
    *step2Upload({ payload,callback },{ call,put}){
      const response = yield call(getStep2Upload, payload);
      // console.log('~',response)
      if (response !== undefined) {
        callback(response)
      }
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
    // getBrandR(state, action) {
    //   return {
    //     ...state,
    //     brandData:action.payload,
    //   };
    // },
    // getWareHouseR(state, action) {
    //   return {
    //     ...state,
    //     wareHouseData:action.payload,
    //   };
    // },

    //商品管理-商品上架 -弹窗 storesSalesClickList  storesSales
    getUploadviewDataR(state, action){
      return {
        ...state,
        Step4:{
          ...state.Step4,
          //tableData:action.payload.list,
          show: action.payload.show,
          tableData:action.payload.response
        }
      }
    },
    //商品上架 -弹窗 关闭 
    storesSalesCloseR(state, action) {
      return {
        ...state,
        Step4: {
          ...state.Step4,
          show: action.payload.show
        }
      }
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
    // // 供应商下拉
    // getSupplierR(state, action) {
    //   return {
    //     ...state,
    //     supplierArr:action.payload,
    //   };
    // },
    editWarehouseR(state, action) {

      // console.log('payload',action.payload)
      return {
        ...state,
        ModalwarehouseEdit:action.payload,
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
    goodsPutawayR(state, action) {
      return {
        ...state,
        goodsPutawayTable:action.payload,
      };
    },
    step2supplementR(state, action) {
      return {
        ...state,
        step2supplementData:action.payload,
      };
    },
    step3supplementR(state, action) {
      return {
        ...state,
        step3supplementData:action.payload,
      };
    },
    step4TrueSupplementR(state, action) {
      return {
        ...state,
        step4supplementData:action.payload,
      };
    },
  },
};
