import { message} from 'antd';
import {routerRedux} from "dva/router";
import {
  //----------------发货管理-------------------
  //库存
  platformStock,getUploadOrderbillDX,
  storesStock,//门店库存

  //我要发货
  deleteList,deliverGoodsuploadOrderbill,deleteGoodsList,getDeliverGoods,getDeliverGoodsSave,getChangeNum,getPaging,
  //选择发货商品
  getChooseShipmentData,getchooseShipment,getChecklist,
  //发货列表
  getDeliveryListData,getdeleteDeliveryList,getSubmission,
   //发货列表 -查看页面
  getShipmentListViewData,getPagingShipmentListView,getWithdraw,getSeeData,
  //--------------销售管理--------------
  storesSales,//门店销售-获取列表-翻页-查询
  storesSalesClickList, //门店销售-获取列表-翻页-查询

  //---------------------------------------------合同管理---------------------------------------------
  getAgreementListData, //合同列表

  //---------------------------------------------财务管理部分-----------------------------------------
  //------------------采购结算 页---------

  getChildModelPrintData,             // 采购结算 - 打印
  getPaymentSettlementData,           // 采购结算 - 列表
  getSettlementDetailsData,           // 采购结算 - 查看结算明细 - 货款
  getSettlementDetailsElseData,       // 采购结算 - 查看结算明细 - 其他
  changeStatusCompleteReconciliation, // 采购结算 - 完成对账
  //------------------手动调账 页---------
  getManualTransferData,               // 获取调账列表
  saveCreatOrder                       // 保存 新建调账单

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
        item:[],
        list: [],
        pagination:{},
      },
    },
    //-----------------库存 - 门店库存 页-----------
    storesStock:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },


    //---------------------------------------------发货管理部分-----------------------------------------
    //-----------------发货单表单 页---------------
    //发货管理-我要发货
    deliveryForm:{
      tableData:{
        list: [],
        purchase:[],
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

    //-----------------选择发货商品 页--------------
    //发货管理-选择发货商品
    selectProduct: {
      tableData:{
        item:{
          list:[]
        },
        list: [],
        pagination:{},
        id:'',
        usercode:'',
        isDelete:'',
      },
      dotNum:'0',
    },

    //-----------------选择商品返回发货单（带参） 页--

    //-----------------发货列表 页----------------
    //发货管理 - 发货列表
    deliveryList: {
      tableData:{
        item:{},
        list: [],
        pagination:{},

      },
    },

    //-----------------发货列表- 查看发货单 页------

    //发货列表 -查看 获取数据
    checkDelivery: {
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },
    //---------------------------------------------销售管理部分-----------------------------------------
    //-----------------门店销售//（查看弹窗） 页-----
    //获取列表
    storesSales: {
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
      childDetailsModelVisible:false,
      storesSalesDetails: {
        item:{},
        list: [],
        pagination:{},
      }
    },

    //---------------------------------------------合同管理部分-----------------------------------------
    //-----------------合同列表 页----------
    agreementList: {
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },

    //-----------------创建合同 页----------

    //-----------------查看合同 页----------

    //---------------------------------------------财务管理部分-----------------------------------------
    //------------------采购结算 页---------
    purchaseSettlement:{
      tableData:{
        list: [],
        pagination:{},
      },
      childDetailsModelVisible:false,
      childDetailsModelHelpId: '',
      childModelDetailsTableTab1Data:{
        item:{},
        list: [],
        pagination:{},
      },
      childModelDetailsTableTab2Data:{
        item:{},
        list: [],
        pagination:{},
      },
      childPrintModelVisible:false,
      childModelPrint:{
        item:{},
        list:[],
        pagination:{}
      }
    },

    //------------------手动调账（查看） 页---
    manualTransfer:{
      tableData:{
        list: [],
        pagination:{},
      },
      childCreatOrderModelVisible:false,
      childModelCreatOrder:{}
    }
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
    //平台库存 - 列表查询
    *storesStock({ payload },{ call,put }){
      const response = yield call(storesStock, payload);
     // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'storesStockR',
          payload: response,
        })
      }
    },

    //---------------------------------------------发货管理部分-----------------------------------------
    //-----------------发货单表单 页---------------

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
    //  console.log('~分页 改',response)
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
     //console.log('~resxxxx提交接口',response)
      if(response!==undefined){
        if(response.type == 1){
          callback(response)
          yield put({
            type: 'getDeliverGoodsR',
            payload: response,
          })
          yield put(routerRedux.push('/delivery/deliveryList'));
        } else {
          message.error('发货商品不能为0');

        }
      }
    },

     //  我要发货-保存接口
     *getDeliverGoodsSave({ payload,callback  },{ call,put }){
      const response = yield call(getDeliverGoodsSave, payload);
    // console.log('~res111保存接口',response)
      if(response!==undefined){
        if(response.type == 1){
          callback(response)
          yield put({
            type: 'getDeliverGoodsSaveR',
            payload: response,
          })
          yield put(routerRedux.push('/delivery/deliveryList'));
        }
      }
    },

   // 我要发货-改变采购数量
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


    //-----------------发货管理-选择发货商品 --------------
    //选择发货商品 - 获取数据
    *getChooseShipmentData({ payload },{ call,put }){
      const response = yield call(getChooseShipmentData, payload);
      //console.log('~选择发货商品',response)
      if(response!==undefined){
        yield put({
          type: 'getChooseShipmentDataR',
          payload: response,
        })
      }
    },


     //我要发货- 跳到选择发货商品页面
     *getchooseShipment({ payload,callback },{ call,put }){
      const response = yield call(getchooseShipment, payload);
      if(response!==undefined){
      //  callback(response)
        yield put({
          type: 'getchooseShipmentR',
          payload: {...response,id:payload.id,usercode:payload.usercode,isDelete:payload.isDelete},
        }),
        yield put({
          type: 'getDeliveryFormSaveFormR',
          payload: {payload},
        }),
        yield put(routerRedux.push('/delivery/selectProduct'));
      }
    },

    //选择发货商品 - 勾选
    *getChecklist({ payload },{ call,put }){
      const response = yield call(getChecklist, payload);
      //console.log('~选择发货商品',response)
      if(response!==undefined){
        yield put({
          type: 'getChecklistR',
          payload: {...response,message:response},
        })
      }
    },

    //-----------------发货管理-发货列表 - 查看页面 --------------
    //发货管理-发货列表 - 查看页面 - 获取数据
    *getShipmentListViewData({ payload },{ call,put }){
      const response = yield call(getShipmentListViewData, payload);
     //console.log('~ 查看页面 - 获取数据',response)
      if(response!==undefined){
        yield put({
          type: 'getShipmentListViewDataR',
          payload: response,
        })
      }
    },

    //发货管理-发货列表 - 点击查看
    *getSeeData({ payload },{ call,put }){
      const response = yield call(getSeeData, payload);
     //console.log('~ 查看页面 - 获取数据',response)
      if(response!==undefined){
        yield put({
          type: 'getSeeDataR',
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


    //  发货管理-发货列表 - 查看页面 - 分页
    *getPagingShipmentListView({ payload,callback },{ call,put }){
      const response = yield call(getPagingShipmentListView, payload);

      if(response!==undefined){
      //  callback(response)
        yield put({
          type: 'getPagingShipmentListViewR',
          payload: response,
        })
      }
    },

     //  发货管理-发货列表 - 提交
     *getSubmission({ payload,callback },{ call,put }){
      const response = yield call(getSubmission, payload);

      if(response!==undefined){
      //  callback(response)
        yield put({
          type: 'getSubmissionR',
          payload: response,
        })
        yield put(routerRedux.push('/delivery/deliveryForm'));
      }
    },

     //  发货管理-发货列表 - 撤回
     *getWithdraw({ payload,callback },{ call,put }){
      const response = yield call(getWithdraw, payload);
    //console.log('~撤回',response)
      if(response!==undefined){
        if (response.type==1) {
          yield put({
            type: 'getWithdrawR',
            payload: response,
          })
          const response = yield call(getDeliveryListData);
          console.log('~ ',payload)
          if(response!==undefined){
            yield put({
              type: 'getDeliveryListDataR',
              payload: response,
            })
          }
        }

      }
    },


    //-----------------选择商品返回发货单（带参） 页--

    //-----------------发货列表 页----------------

    //-----------------发货列表- 查看发货单 页------

    //---------------------------------------------销售管理部分-----------------------------------------
    //-----------------门店销售//（查看弹窗） 页-----
    //门店销售 - 列表查询
    *storesSales({ payload },{ call,put }){
      const response = yield call(storesSales, payload);
     // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'storesSalesR',
          payload: response,
        })
      }
    },
    //门店销售 - 查看
    *storesSalesClickList({ payload },{ call,put }){
      const response = yield call(storesSalesClickList, payload);
     // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'storesSalesClickListR',
          payload: {response,childDetailsModelVisible:true,}
        })
      }
    },


    //---------------------------------------------合同管理部分-----------------------------------------
    //-----------------合同列表 页----------
    *getAgreementListData({ payload },{ call,put }){
      const response = yield call(getAgreementListData, payload);
     // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getAgreementListDataR',
          payload: response,
        })
      }
    },

    //-----------------创建合同 页----------

    //-----------------查看合同 页----------

    //---------------------------------------------财务管理部分-----------------------------------------
    //------------------采购结算 页---------
    // 采购结算 - 列表
    *getPaymentSettlementData({ payload },{ call,put }){
      const response = yield call(getPaymentSettlementData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getPaymentSettlementDataR',
          payload: response,
        })
      }
    },
    // 采购结算 - 查看结算明细
    *getSettlementDetailsData({ payload },{ call,put }){
      const responseTab1 = yield call(getSettlementDetailsData, payload);
      const responseTab2 = yield call(getSettlementDetailsElseData, payload);
      // console.log('~res',response)
      if(responseTab1!==undefined){
        yield put({
          type: 'getSettlementDetailsDataR',
          payload: {responseTab1,responseTab2,childDetailsModelVisible:true,childDetailsModelHelpId:payload.accountCode},
        })
      }
    },
    // 采购结算 - 查看结算明细 - 货款分页
    *childModelDetailsTableTab1Data({ payload },{ call,put }){
      const response = yield call(getSettlementDetailsData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'childModelDetailsTableTabDataR',
          payload: {data:response,tab:'childModelDetailsTableTab1Data'},
        })
      }
    },
    // 采购结算 - 查看结算明细 - 其他分页
    *childModelDetailsTableTab2Data({ payload },{ call,put }){
      const response = yield call(getSettlementDetailsElseData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'childModelDetailsTableTabDataR',
          payload: {data:response,tab:'childModelDetailsTableTab2Data'},
        })
      }
    },
    // 采购结算 - 打印
    *childModelPrintData({ payload,callback },{ call,put }){
      const response = yield call(getChildModelPrintData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'childModelPrintDataR',
          payload: {response,childPrintModelVisible:true},
        })
        yield
        setTimeout(function () {
          window.print()
        },1000)

      }
    },
    // 采购结算 - 完成对账
    *completeReconciliation({ payload },{ call,put }){
      const response = yield call(changeStatusCompleteReconciliation, payload);
      const responseList = yield call(getPaymentSettlementData, payload);
      // console.log('~res',response)
      if(response!==undefined){
      //  判断成功 刷新主列表页面
      //  ...
        if (response.type==1) {
          if(responseList!==undefined){
            yield put({
              type:'getPaymentSettlementDataR',
              payload: responseList
            })
          }
        }else{
          message.error('对账失败，请重新确认');
        }
      }
    },

    //------------------手动调账（查看） 页---
    //获取手动调账列表
    *getManualTransferData({ payload },{ call,put }){
      const response = yield call(getManualTransferData, payload);
      // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getManualTransferDataR',
          payload: response,
        })
      }
    },
    //获取手动调账列表
    *saveCreatOrder({ callback,payload },{ call,put }){
      const response = yield call(saveCreatOrder, payload);
      if(response!==undefined){
        if(response.type==1){
          message.success('保存成功')
          yield put({
            type: 'changeVisibleR',
            payload: false,
          })
          callback()
        }else{
          message.error(response.msg)
        }
      }
    },


  },
  reducers:{
    //---------------------------------------------库存管理部分-----------------------------------------
    //-----------------库存 - 平台库存 页-----------
    //获取列表
    platformStockR(state, action){
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
      const dataSource = [...inList]
      const newData=dataSource.filter(item => item.barcode != bb)
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
     return {
       ...state,
       importList:{
         ...state.importList,
         tableData:action.payload
       }
     }
   },


    //-----------------库存 - 门店库存 页-----------
     //获取列表
     storesStockR(state, action){
      //  console.log('fs',action.payload)
        return {
          ...state,
          storesStock:{
            ...state.storesStock,
            tableData:action.payload
          }
        }
      },


    //---------------------------------------------发货管理部分-----------------------------------------

    //-----------------发货单表单 页---------------
     // 我要发货- 导入询价商品

     deliverGoodsuploadOrderbillR(state, action){
      // console.log('xxx',action.payload.list)
      return {
        ...state,
        deliveryForm:{
          ...state.deliveryForm,
          tableData:{
            ...state.deliveryForm.tableData,
            list:action.payload.list,
            pagination:action.payload.pagination,
          }
        }
      }
    },

    // 我要发货- 删除
    deleteGoodsListR(state,action){
      const inList = state.deliveryForm.tableData.list
      const bb = action.payload.barcode
      const newData=inList.filter(item => item.barcode != bb)
      return {
        ...state,
        deliveryForm:{
          ...state.deliveryForm,
          tableData:{
            ...state.deliveryForm.tableData,
            list:newData
          }
        }
      }
    },

    // 我要发货- 分页 -
    getPagingR(state, action){
      return {
        ...state,
        deliveryForm:{
          ...state.deliveryForm,
          tableData:{
            ...state.deliveryForm.tableData,
            list:action.payload.list,
            pagination:action.payload.pagination,
          }
        }
      }
    },

    // 我要发货-提交接口
    getDeliverGoodsR(state, action){
    // console.log('state',state.deliveryForm.tableData.list )
      const onempty =state.deliveryForm.tableData.list
      const delList = []
      return {
        ...state,
        deliveryForm:{
          ...state.deliveryForm,
          tableData:{
            ...state.deliveryForm.tableData,
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
        deliveryForm:{
          ...state.initiateInquiry,
          tableData:{
            ...state.deliveryForm.tableData,
            list:delList
          }
        }
      }
    },

    // 发货列表-改变采购数量
    getChangeNumR(state,action){

   const inList = state.deliveryForm.tableData.list
   const bb = action.payload.barcode
   const dataSource = [...inList]

   const b =state.deliveryForm.tableData.list.find(item=>
     item.barcode===action.payload.barcode
   )


   state.deliveryForm.tableData.item.purchasePrice = action.payload.allPrice
   b.pNum =  action.payload.pNum == null?b.pNum:action.payload.pNum
   const num = action.payload.pNum == null?b.pNum:action.payload.pNum

   return {
     ...state,
     deliveryForm:{
       ...state.deliveryForm,
       'b.pNum': num ,
     },
   }
   },


    // 缓存发货单表单基本内容
    getDeliveryFormSaveFormR(state, action){
      return {
        ...state,
        deliveryForm:{
          ...state.deliveryForm,
          tableData:{
            ...state.deliveryForm.tableData,
            item:action.payload.payload
          }
        }
      }
    },

    //-----------------发货管理-选择发货商品 --------------



    //选择发货商品 跳页接口
    getchooseShipmentR(state, action){
      return {
        ...state,
        selectProduct:{
          ...state.selectProduct,
          tableData:action.payload,
          id:action.payload.id,
          isDelete:action.payload.isDelete,
          usercode:action.payload.usercode,
        },
      }
    },


    //发货管理-选择发货商品-获取数据
    getChooseShipmentDataR(state, action){
      // console.log('获取数据',action.payload)
      return {
        ...state,
        selectProduct:{
          ...state.selectProduct,
          tableData:action.payload,
          dotNum:action.payload.item.num
        }
      }
    },


     //发货管理-选择发货商品-勾选
     getChecklistR(state, action){
      //  console.log('勾选',action.payload)
        return {
          ...state,
          selectProduct:{
            ...state.selectProduct,
            ...state.selectProduct.tableData,
            dotNum:action.payload.msg
          }
        }
      },


     //-----------------发货管理-发货列表 --------------

     // 发货列表-获取data列表 翻页，查询等

     getDeliveryListDataR(state, action){
        return {
          ...state,
          deliveryList:{
            ...state.deliveryList,
            tableData:action.payload
          }
        }
      },

      // 发货列表 - 删除
    getdeleteDeliveryListR(state,action){

      const inList = state.deliveryList.tableData.list
      const bb = action.payload.barcode
     // console.log('bb',bb)
      const newData=inList.filter(item => item.id != bb)
    //  console.log('newData',newData)
      return {
        ...state,
        deliveryList:{
          ...state.deliveryList,
          tableData:{
            ...state.deliveryList.tableData,
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
         checkDelivery:{
           ...state.checkDelivery,
           tableData:action.payload
         }
       }
     },

      //发货管理-发货列表 - 点击查看
      getSeeDataR(state, action){
      // console.log('fs',action)
       return {
         ...state,
         checkDelivery:{
           ...state.checkDelivery,
           tableData:action.payload
         }
       }
     },
     //发货管理-发货列表 - 查看页面 - 分页
     //  我要发货- 分页 -
     getPagingShipmentListViewR(state, action){
      return {
        ...state,
        checkDelivery:{
          ...state.checkDelivery,

            list:action.payload.list,
            pagination:action.payload.pagination,
        }
      }
    },



    //发货管理-发货列表 - 提交
    getSubmissionR(state, action){
      return {
        ...state,
        deliveryForm:{
          ...state.deliveryForm,
          //pur:action.payload.list[0].purchasesn,
          tableData:{
            ...state.deliveryForm.tableData,
            list:action.payload.list,
            pagination:action.payload.pagination,
            item:action.payload.item,
          }
        }
      }
    },

    //发货管理-发货列表 - 撤回
    getWithdrawR(state, action){
      return {
        ...state,
        checkDelivery:{
          ...state.checkDelivery,
          ...state.checkDelivery.tableData,
          item:action.payload

        }
      }
    },

    //-----------------选择商品返回发货单（带参） 页--

    //-----------------发货列表 页----------------

    //-----------------发货列表- 查看发货单 页------

    //---------------------------------------------销售管理部分-----------------------------------------
    //-----------------门店销售//（查看弹窗） 页-----
     //获取列表
     storesSalesR(state, action){
      //  console.log('fs',action.payload)
        return {
          ...state,
          storesSales:{
            ...state.storesSales,
            tableData:action.payload
          }
        }
      },
      
      //查看弹窗 storesSalesClickList  storesSales
      storesSalesClickListR(state, action){
        return {
          ...state,
          storesSales:{
            ...state.storesSales,
            //tableData:action.payload.list,
            childDetailsModelVisible: action.payload.childDetailsModelVisible,
            storesSalesDetails: {
              list:action.payload.response.list,
              pagination:action.payload.response.pagination,
              item:action.payload.response.item,
            }
          }
        }
      }, 
      // 关闭 - 弹窗
      storesSalesCloseR(state, action) {
        return {
          ...state,
          storesSales: {
            ...state.storesSales,
            childDetailsModelVisible: action.payload.childDetailsModelVisible
          }
        }
      },

    //---------------------------------------------合同管理部分-----------------------------------------
    //-----------------合同列表 页----------
    //获取列表
    getAgreementListDataR(state, action){
      //  console.log('fs',action.payload)
        return {
          ...state,
          agreementList:{
            ...state.agreementList,
            tableData:action.payload
          }
        }
      },  
    
    //-----------------创建合同 页----------

    //-----------------查看合同 页----------

    //---------------------------------------------财务管理部分-----------------------------------------
    //------------------采购结算 页---------
    getPaymentSettlementDataR(state, action){
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          tableData:action.payload
        }
      }
    },
    getSettlementDetailsDataR(state, action){
      // console.log(action.payload)
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          childModelDetailsTableTab1Data:action.payload.responseTab1,
          childModelDetailsTableTab2Data:action.payload.responseTab2,
          childDetailsModelVisible:action.payload.childDetailsModelVisible,
          childDetailsModelHelpId:action.payload.childDetailsModelHelpId
        }
      }
    },
    childModelDetailsTableTabDataR(state, action){
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          [action.payload.tab]:action.payload.data,
        }
      }
    },
    childDetailsModelVisibleR(state, action){
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          childDetailsModelVisible:action.payload
        }
      }
    },
    childPrintModelVisibleR(state, action){
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          childPrintModelVisible:action.payload
        }
      }
    },

    childModelPrintDataR(state, action){
      return {
        ...state,
        purchaseSettlement:{
          ...state.purchaseSettlement,
          childModelPrint:action.payload.response,
          childPrintModelVisible:action.payload.childPrintModelVisible
        }
      }
    },

    //------------------手动调账（查看） 页---
    //手动调账列表
    getManualTransferDataR(state, action){
      return {
        ...state,
        manualTransfer:{
          ...state.manualTransfer,
          tableData:action.payload
        }
      }
    },
    //改变弹窗状态
    changeVisibleR(state, action){
      return {
        ...state,
        manualTransfer:{
          ...state.manualTransfer,
          childCreatOrderModelVisible:action.payload
        }
      }
    },

  }
}
