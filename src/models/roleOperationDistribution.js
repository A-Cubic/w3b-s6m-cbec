import { message} from 'antd';

import {
  //----------------发货管理-------------------
  //库存
  platformStock,getUploadOrderbillDX,
  
  //我要发货
  deleteList,deliverGoodsuploadOrderbill,deleteGoodsList,getDeliverGoods,getDeliverGoodsSave,
  //选择发货商品
  getChooseShipmentData,



} from "../services/roleOperationDistribution_S";
export default {
  namespace: 'roleOperationDistribution',
  state:{
    //---------------------------------------------以下--运营铺货--------------------------------------
    //---------------------------------------------库存管理部分-----------------------------------------
    //-----------------库存 - 平台库存 页-----------
    //列表获取
    platformStock:{
      tableData:{
        list: [],
        pagination:{},
      },
    },
    //-----------------库存 - 门店库存 页-----------

    //---------------------------------------------发货管理部分-----------------------------------------
    //-----------------发货单表单 页---------------
    //发货管理-我要发货
    shippingList:{
      tableData:{
        list: [],
        pagination:{},
        item:{
          purchasesn: "",
          sendType:"",
          contacts:"",
          sex:0,
          tel:"",
          deliveryTime:null,
          remark:""
        },
      },
    },
    //发货管理-选择发货商品
    chooseShipment: {
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    }


    //-----------------选择发货商品 页--------------

    //-----------------选择商品返回发货单（带参） 页--

    //-----------------发货列表 页----------------

    //-----------------发货列表- 查看发货单 页------

    //---------------------------------------------销售管理部分-----------------------------------------
    //-----------------门店销售//（查看弹窗） 页-----


    //---------------------------------------------合同管理部分-----------------------------------------
    //-----------------合同列表 页----------

    //-----------------创建合同 页----------

    //-----------------查看合同 页----------

    //---------------------------------------------财务管理部分-----------------------------------------
    //------------------采购结算 页---------

    //------------------手动调账（查看） 页---

  },
  effects:{
    //---------------------------------------------库存管理部分-----------------------------------------
    //-----------------库存 - 平台库存 页-----------
    //平台库存 - 列表查询
    *platformStock({ payload },{ call,put }){
      const response = yield call(platformStock, payload);
     // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'platformStockR',
          payload: response,
        })
      }
    },
    //平台库存 - 上传销售数据
    *uploadOrderbill({ payload,callback },{ call,put}){
      const response = yield call(getUploadOrderbillDX, payload);
    //  console.log('~上传销售数据',response)
      if (response !== undefined) {
        callback(response)
      }
    },

    //平台库存 - 删除
    *deleteList({payload, callback},{call,put}){
      const response = yield call(deleteList,payload);
      // console.log('~qqxxxxx删除',response)
      // console.log('~qqxxxxxpayload',payload)
        if (response !== undefined) {
          if (response.type==1) {
            message.success('删除成功');
            yield put({
              type:'deleteListR',
              payload: payload
            })
          }else{
            message.error('失败');
          }
        }
      },
   


    //-----------------库存 - 门店库存 页-----------

    //---------------------------------------------发货管理部分-----------------------------------------
    //-----------------发货单表单 页---------------
    //-----------------发货管理---------------
     //我要发货 - 导入询价商品
    *deliverGoodsuploadOrderbill({ payload,callback },{ call,put}){
      const response = yield call(deliverGoodsuploadOrderbill, payload);
      // console.log('~uploadOrderbill',response)
      if (response !== undefined) {
        callback(response)
        yield put({
          type: 'deliverGoodsuploadOrderbillR',
          payload: response,
        })
      }
    },

    //我要发货 - 删除
    *deleteGoodsList({payload, callback},{call,put}){
      const response = yield call(deleteGoodsList,payload);
     // console.log('~qqxxxxx删除',response)
      //console.log('~qqxxxxxpayload',payload)
        if (response !== undefined) {
          if (response.type==1) {
            message.success('删除成功');
            yield put({
              type:'deleteGoodsListR',
              payload: payload
            })
          }else{
            message.error('失败');
          }
        }
      },


      // 我要发货-提交接口 
     *getDeliverGoods({ payload,callback  },{ call,put }){
      const response = yield call(getDeliverGoods, payload);
    // console.log('~resxxxx提交接口',response)
      if(response!==undefined){
        callback(response)
        yield put({
          type: 'getDeliverGoodsR',
          payload: response,
        })
       // yield put(routerRedux.push('/bulkPurchases/inquiryList'));
      }
    },

     //  我要发货-保存接口 
     *getDeliverGoodsSave({ payload,callback  },{ call,put }){
      const response = yield call(getDeliverGoodsSave, payload);
    // console.log('~res111保存接口',response)
      if(response!==undefined){
        callback(response)
        yield put({
          type: 'getDeliverGoodsSaveR',
          payload: response,
        })
        //yield put(routerRedux.push('/bulkPurchases/inquiryList'));
      }
    },




    //-----------------选择发货商品 页--------------
    //选择发货商品 - 获取数据
    *getChooseShipmentData({ payload },{ call,put }){
      const response = yield call(getChooseShipmentData, payload);
      console.log('~选择发货商品',response)
      if(response!==undefined){
        yield put({
          type: 'getChooseShipmentDataR',
          payload: response,
        })
      }
    },




    //-----------------选择商品返回发货单（带参） 页--

    //-----------------发货列表 页----------------

    //-----------------发货列表- 查看发货单 页------

    //---------------------------------------------销售管理部分-----------------------------------------
    //-----------------门店销售//（查看弹窗） 页-----


    //---------------------------------------------合同管理部分-----------------------------------------
    //-----------------合同列表 页----------

    //-----------------创建合同 页----------

    //-----------------查看合同 页----------

    //---------------------------------------------财务管理部分-----------------------------------------
    //------------------采购结算 页---------

    //------------------手动调账（查看） 页---


  },
  reducers:{
    //---------------------------------------------库存管理部分-----------------------------------------
    //-----------------库存 - 平台库存 页-----------
    //获取列表
    platformStockR(state, action){
      console.log('fs',action.payload)
      return {
        ...state,
        platformStock:{
          ...state.platformStock,
          tableData:action.payload
        }
      }
    },
    // 平台库存 - 删除
    deleteListR(state,action){
      const inList = state.platformStock.tableData.list
      const bb = action.payload.purchasesn
      console.log('bbb',action.payload.purchasesn)
      const dataSource = [...inList]
      const newData=dataSource.filter(item => item.barcode != bb)
      console.log('newData',newData)
      return {
        ...state,
        platformStock:{
          ...state.platformStock,
          tableData:{
            ...state.platformStock.tableData,
            list:newData
          }
        }
      }
    },    

    uploadOrderbillR(state, action){
     // console.log('xxx',action)
     return {
       ...state,
       importList:{
         ...state.importList,
         pur:action.payload.list[0].purchasesn,
         tableData:action.payload
         //list:action.payload
       }
     }
   },


    //-----------------库存 - 门店库存 页-----------

    //---------------------------------------------发货管理部分-----------------------------------------
    //-----------------发货单表单 页---------------
     // 发货单表单- 导入询价商品 
     deliverGoodsuploadOrderbillR(state, action){
      // console.log('xxx',action.payload.list)
      return {
        ...state,
        shippingList:{
          ...state.shippingList,
          pur:action.payload.list[0].purchasesn,
          tableData:{
            ...state.shippingList.tableData,
            list:action.payload.list,
            pagination:action.payload.pagination,
          }
        }
      }
    },
    // 发货单表单- 删除
    deleteGoodsListR(state,action){
      const inList = state.shippingList.tableData.list
      const bb = action.payload.barcode
      //console.log('bbb',action.payload.barcode)
      const newData=inList.filter(item => item.barcode != bb)
      //console.log('newData',newData)
      return {
        ...state,
        shippingList:{
          ...state.shippingList,
          tableData:{
            ...state.shippingList.tableData,
            list:newData
          }
        }
      }
    },    

     // 发货单表单-提交接口 
    getDeliverGoodsR(state, action){
    // console.log('state',state.shippingList.tableData.list )
      const onempty =state.shippingList.tableData.list
      const delList = []
      return {
        ...state,
        shippingList:{
          ...state.shippingList,
          tableData:{
            ...state.shippingList.tableData,
            list:delList
          }
        }
      }
    },

    // 发货单表单-保存接口  
    getDeliverGoodsSaveR(state, action){
      const delList = []
      return {
        ...state,
        shippingList:{
          ...state.initiateInquiry,
          tableData:{
            ...state.shippingList.tableData,
            list:delList
          }
        }
      }
    },


    //-----------------选择发货商品 页--------------
    //发货管理-选择发货商品-获取数据
    getChooseShipmentDataR(state, action){
      console.log('fs',action)
      return {
        ...state,
        chooseShipment:{
          ...state.chooseShipment,
          tableData:action.payload
        }
      }
    },




    //-----------------选择商品返回发货单（带参） 页--

    //-----------------发货列表 页----------------

    //-----------------发货列表- 查看发货单 页------

    //---------------------------------------------销售管理部分-----------------------------------------
    //-----------------门店销售//（查看弹窗） 页-----


    //---------------------------------------------合同管理部分-----------------------------------------
    //-----------------合同列表 页----------

    //-----------------创建合同 页----------

    //-----------------查看合同 页----------

    //---------------------------------------------财务管理部分-----------------------------------------
    //------------------采购结算 页---------

    //------------------手动调账（查看） 页---



  }
}
