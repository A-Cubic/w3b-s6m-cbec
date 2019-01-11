import { message} from 'antd';

import {
  //----------------发货管理-------------------
  //库存
  platformStock,getUploadOrderbillDX,
  
  //我要发货
  deleteList,deliverGoodsuploadOrderbill,deleteGoodsList,getDeliverGoods,getDeliverGoodsSave,getChangeNum,getPaging,
  //选择发货商品
  getChooseShipmentData,
  //发货列表
  getDeliveryListData,getdeleteDeliveryList,
   //发货列表 -查看页面
   getShipmentListViewData,getPagingShipmentListView,

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
          sendName:"",
          sendTel:"",
          express:"",
          waybillNo:"",
          getName:"",
          getcode:"",
          getTel:"",
          
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
    },
    //发货管理 - 发货列表
    shippingListBig: {
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },

    //-----------------发货列表 -查看----------------
    //发货列表 -查看 获取数据
    shipmentListView: {
      tableData:{
        item:{},
        list: [],
        pagination:{},
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

      //  我要发货-分页
    *getPaging({ payload,callback },{ call,put }){
      const response = yield call(getPaging, payload);
     //console.log('~分页 改',response)
      if(response!==undefined){
      //  callback(response)
        yield put({
          type: 'getPagingR',
          payload: response,
        })
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

    // 发货列表-获取data列表 翻页，查询等
    *getDeliveryListData({ payload },{ call,put }){
      const response = yield call(getDeliveryListData, payload);
      //console.log('~ 翻页，查询等',response)
      if(response!==undefined){
        yield put({
          type: 'getDeliveryListDataR',
          payload: response,
        })
      }
    },
    // 发货列表 - 删除
    *getdeleteDeliveryList({payload, callback},{call,put}){
      const response = yield call(getdeleteDeliveryList,payload);
     // console.log('~qqxxxxx删除',response)
      //console.log('~qqxxxxxpayload',payload)
        if (response !== undefined) {
          if (response.type==1) {
            message.success('删除成功');
            yield put({
              type:'getdeleteDeliveryListR',
              payload: payload
            })
          }else{
            message.error('失败');
          }
        }
      },

    // 发货列表-改变采购数量
    *getChangeNum({ payload },{ call,put }){
      const response = yield call(getChangeNum, payload);
     // console.log('~xxxx已报价',response)
      if(response!==undefined){
        yield put({
          type: 'getChangeNumR',
          payload: response,
        })
      }
    },
    
    //-----------------发货管理-发货列表 - 查看页面 --------------
    //发货管理-发货列表 - 查看页面 - 获取数据
    *getShipmentListViewData({ payload },{ call,put }){
      const response = yield call(getShipmentListViewData, payload);
      console.log('~ 查看页面 - 获取数据',response)
      if(response!==undefined){
        yield put({
          type: 'getShipmentListViewDataR',
          payload: response,
        })
      }
    },


    
    //  发货管理-发货列表 - 查看页面 - 分页
    *getPagingShipmentListView({ payload,callback },{ call,put }){
      const response = yield call(getPagingShipmentListView, payload);
    //console.log('~分页 改',response)
      if(response!==undefined){
      //  callback(response)
        yield put({
          type: 'getPagingShipmentListViewR',
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

    

      //平台库存 - 导入列表
    uploadOrderbillR(state, action){
     // console.log('xxx',action)
     return {
       ...state,
       importList:{
         ...state.importList,
       //  pur:action.payload.list[0].purchasesn,
         tableData:action.payload
         //list:action.payload
       }
     }
   },


    //-----------------库存 - 门店库存 页-----------

    //---------------------------------------------发货管理部分-----------------------------------------
    //-----------------发货单表单 页---------------
     // 我要发货- 导入询价商品 
     deliverGoodsuploadOrderbillR(state, action){
      // console.log('xxx',action.payload.list)
      return {
        ...state,
        shippingList:{
          ...state.shippingList,
          //pur:action.payload.list[0].purchasesn,
          tableData:{
            ...state.shippingList.tableData,
            list:action.payload.list,
            pagination:action.payload.pagination,
          }
        }
      }
    },
    // 我要发货- 删除
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

     
//  我要发货- 分页 -
    getPagingR(state, action){
      return {
        ...state,
        shippingList:{
          ...state.shippingList,
  
            list:action.payload.list,
            pagination:action.payload.pagination,
        }
      }
    },


     // 我要发货-提交接口 
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

    // 我要发货-保存接口  
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

    
// 发货列表-改变采购数量
getChangeNumR(state,action){
  // console.log('okokokokokok')
 
   const inList = state.shippingList.tableData.list
   const bb = action.payload.barcode
   const dataSource = [...inList]
   //const newData=state.shippingList.tableData.list.filter(item => item.barcode == bb)
 //   const b =state.goodsChannel.tableData.list.findIndex(item=>
 //     item.id===action.payload.id
 //   )
 //  state.goodsChannel.tableData.list[b] = {...state.goodsChannel.tableData.list[b], ...action.payload};
 //  return{
 //    ...state
 //  }
  // _.find(state.goodsAboutData.childCheckO.goodsSelectSupplierList,function(item){ return item.id === action.payload.id}).ifSel = '1';
  //console.log('p11111',action.payload)

   const b =state.shippingList.tableData.list.find(item=>
     item.barcode===action.payload.barcode
   )

   console.log('action.payload.pNum',action.payload.pNum == null?b.pNum:action.payload.pNum )
   //b.pNum = action.payload.pNum
   state.shippingList.tableData.item.purchasePrice = action.payload.allPrice
   b.pNum =  action.payload.pNum == null?b.pNum:action.payload.pNum
   const num = action.payload.pNum == null?b.pNum:action.payload.pNum
   // console.log('b',action.payload)
   //  console.log('totalPrice',action.payload.totalPrice)
   //  console.log('purchasePrice',state.shippingList.tableData.item.purchasePrice)     

   return {
     ...state,
     shippingList:{
       ...state.shippingList,
       //tableData:action.payload
      // 'item.purchasePrice':action.payload.allPrice,
       'b.pNum': num ,
     },
   }
   }, 



    //-----------------发货管理-选择发货商品 --------------
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



     //-----------------发货管理-发货列表 --------------

     // 发货列表-获取data列表 翻页，查询等
      
     getDeliveryListDataR(state, action){
       // console.log('fs',action)
        return {
          ...state,
          shippingListBig:{
            ...state.shippingListBig,
            tableData:action.payload
          }
        }
      },

      // 发货列表 - 删除
    getdeleteDeliveryListR(state,action){
      
      const inList = state.shippingListBig.tableData.list
      const bb = action.payload.barcode
      console.log('bb',bb)
      const newData=inList.filter(item => item.id != bb)
      console.log('newData',newData)
      return {
        ...state,
        shippingListBig:{
          ...state.shippingListBig,
          tableData:{
            ...state.shippingListBig.tableData,
            list:newData
          }
        }
      }
    },    



    //-----------------发货管理-发货列表 - 查看页面 --------------
    //发货管理-发货列表 - 查看页面 - 获取数据
    getShipmentListViewDataR(state, action){
      // console.log('fs',action)
       return {
         ...state,
         shipmentListView:{
           ...state.shipmentListView,
           tableData:action.payload
         }
       }
     },
     //发货管理-发货列表 - 查看页面 - 分页
     //  我要发货- 分页 -
     getPagingShipmentListViewR(state, action){
      return {
        ...state,
        shipmentListView:{
          ...state.shipmentListView,
  
            list:action.payload.list,
            pagination:action.payload.pagination,
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
