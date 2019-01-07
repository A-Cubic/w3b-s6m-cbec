import { message} from 'antd';

import {
  //库存
  platformStock,getUploadOrderbillDX,deleteList
  //发货管理
} from "../services/roleOperationDistribution_S";
export default {
  namespace: 'roleOperationDistribution',
  state:{
    //---------------------------------------------以下--运营铺货--------------------------------------
    //---------------------------------------------库存管理部分-----------------------------------------
    //-----------------库存 - 平台库存 页-----------
    platformStock:{
      //列表获取
      tableData:{
        list: [],
        pagination:{},
      },
    },
    //-----------------库存 - 门店库存 页-----------

    //---------------------------------------------发货管理部分-----------------------------------------
    //-----------------发货单表单 页---------------
    shippingList:{
      //列表获取
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
      console.log('~res',response)
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
      console.log('~',response)
      if (response !== undefined) {
        callback(response)
      }
    },

    //平台库存 - 删除
    *deleteList({payload, callback},{call,put}){
    const response = yield call(deleteList,payload);
    console.log('~qqxxxxx删除',response)
    console.log('~qqxxxxxpayload',payload)
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
    // //询价列表 - 删除
    deleteListR(state,action){
      //console.log('sssss',action.payload.payload.barcode)
      //console.log('ssssssssdsdsdss',state.initiateInquiry.tableData.list)
      //console.log('barcode',barcode)   
      //console.log('inList',inList)
      //const barcode = action.payload.payload.barcode
      //console.log('555',state)
      const inList = state.platformStock.tableData.list
      //console.log('inList',inList)
      //console.log('action',action.payload.purchasesn)
      const bb = action.payload.purchasesn
      console.log('bbb',action.payload.purchasesn)
      //const index = action.payload.payload.index
      const dataSource = [...inList]
      // const newData=dataSource.filter(item => item.barcode != inList[index].barcode)purchasesn
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




    //-----------------库存 - 门店库存 页-----------

    //---------------------------------------------发货管理部分-----------------------------------------
    //-----------------发货单表单 页---------------
     // 发货单表单- 导入询价商品 
     uploadOrderbillR(state, action){
      return {
        ...state,
        shippingList:{
          ...state.shippingList,
          pur:action.payload.list[0].purchasesn,
          tableData:action.payload
          //list:action.payload
        }
      }
    },





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



  }
}
