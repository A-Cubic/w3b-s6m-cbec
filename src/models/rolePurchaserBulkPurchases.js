import { message} from 'antd';
import moment from 'moment';
import {routerRedux} from "dva/router";
import {
  // -------- 发起询价 --------------
  getPreservationData,getUploadOrderbillDX, deleteInterface,getPagingData,getSubmissionData,deleteList,getquotedPriceOver,
  getPaging,
  // -------- 询价列表 --------------
  getInquiryListData,getSeeData, getquotedPrice,getAllListdetails,getPlaceAnOrder,completedDetails,getQuotedPriceDel,getOffer,
  getCancel,getChangeNum,getQuotationPaging,CommodityDetails,
  //询价列表 -询价中
  getlistInquiry,
  // -------- 采购列表 分页 --------------
  getPurchaseListData, getpurchasepaging,
  // -------- 采购列表-采购单 --------------
  getpurchaseOrder,
  // -------- 采购列表-采购单-点击详情 --------------
  getClickDetails,


} from '../services/rolePurchaserBulkPurchases_S'
export default {
  namespace: 'rolePurchaserBulkPurchases',
  state:{
    // -------- 发起询价 --------------
    initiateInquiry:{
      // delList:[],
      pur:'',
      tableData:{
        item:{
          purchasesn: "",
          sendType:"",
          contacts:"",
          sex:0,
          tel:"",
          deliveryTime:'',
          remark:""
        },
      list: [],
      pagination:{},
    },

      // information:{
      //   purchasesn: "",
      //   sendType:"",
      //   contacts:"",
      //   sex:0,
      //   tel:"",
      //   deliveryTime:'2015.01.01',
      //   remark:""
      // },
    },



    initiateInquiryQa:{
      // delList:[],
      pur:'',
      tableData:{
        item:{
          purchasesn: "",
          sendType:"",
          contacts:"",
          sex:0,
          tel:"",
          deliveryTime:null,
          remark:""
        },
      list: [],
      pagination:{},
    },

      information:{
        purchasesn: "",
        sendType:"",
        contacts:"",
        sex:0,
        tel:"",
        deliveryTime:null,
        remark:""
      },
    },

    // -------- 询价列表 --------------
    inquiryList:{
      tableData:{
        item:"",
        list: [],
        pagination:{},
      },
    },
    //询价列表 - 询价中
    listInquiry:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },
    //询价列表 - 报价中
    listQuotedQrice:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },
    // 询价列表-报价中 - 点击详情
    inquiryDetailsList:{
      show: false,
      tableData:[]
    },

     //询价列表 - 已报价
     listQuotedQriceOver:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },

     //询价列表 - 已报价 - 点击详情
     inquiryDetailsListDetails:{
      show: false,
      tableData:[],
      obj:''
    },

    // -------- 采购列表 --------------
    purchaseList:{
      tableData:{
        item:"",
        list: [],
        pagination:{},
      },
    },
    // -------- 询价列表/采购列表 - 查看列表详情 --------------
    listDetails:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },
    // 采购列表 - 详情隐藏
    seeList:{
      show: false,
      tableData:{
        list: [],
        item:{}
      },
    },
     // 询价列表/采购列表- 点击详情
     detailsList:{
      show: false,
      tableData:[]
    },

    placeAnOrder:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },

    // 询价列表-已报价 - 提交
    offerList:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },

    // 询价列表-已报价 - 提交
    cancelList:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
    },
  },
  effects:{
    // -------- 发起询价 --------------

    *getInitiateInquiryData({ payload },{ call,put }){
      const response = yield call(getInitiateInquiryData, payload);
      //console.log('~res发起询价',response)
      if(response!==undefined){
        yield put({
          type: 'getInitiateInquiryDataR',
          payload: response,
        })
      }
    },

    //  发起询价-保存接口
    *getPreservationData({ payload,callback  },{ call,put }){
      const response = yield call(getPreservationData, payload);
    console.log('~res111保存接口',response)
      if(response!==undefined){
        callback(response)
        // yield put({
        //   type: 'getPreservationDataR',
        //   payload: response,
        // })
        // yield put(routerRedux.push('/bulkPurchases/inquiryList'));
      }
    },

     // 发起询价-提交接口
     *getSubmissionData({ payload,callback  },{ call,put }){
      const response = yield call(getSubmissionData, payload);
    // console.log('~resxxxx提交接口',response)
      if(response!==undefined){
        callback(response)
        yield put({
          type: 'getSubmissionDataR',
          payload: response,
        })
        yield put(routerRedux.push('/bulkPurchases/inquiryList'));
      }
    },

    //  发起询价-分页
    *getPagingData({ payload,callback },{ call,put }){
      const response = yield call(getPagingData, payload);
      //console.log('~res分页',response)
      if(response!==undefined){
      //  callback(response)
        yield put({
          type: 'getPagingDataR',
          payload: response,
        })
      }
    },

    //  发起询价-分页 改
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





    //发起询价 - 导入询价商品
    *uploadOrderbill({ payload,callback },{ call,put}){
      const response = yield call(getUploadOrderbillDX, payload);
      console.log('~uploadOrderbill',response)
      if (response !== undefined) {
        callback(response)
        yield put({
          type: 'uploadOrderbillR',
          payload: response,
        })
      }
    },

    //发起询价 - 删除
    *deleteInterface({payload, callback},{call,put}){
      const response = yield call(deleteInterface,payload);
    //  console.log('~qqxxxxx删除',response)
      if (response !== undefined) {
        if (response.item.type==1) {
          message.success('删除成功');
          yield put({
            type:'deleteInterfaceR',
            payload: {payload}
          })
          // callback(response);
         // console.log('xxxx',response)
        }else{
          message.error('失败');
        }
      }
    },


    // -------- 询价列表 --------------
    *getInquiryListData({ payload },{ call,put }){
      const response = yield call(getInquiryListData, payload);
      //console.log('~询价列表res',response)
      if(response!==undefined){
        yield put({
          type: 'getInquiryListDataR',
          payload: response,
        })
      }
    },

    //询价列表 - 删除
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

     // 询价列表 - 查看 getSeeData
     *getSeeData({ payload,callback },{ call,put}){
      const response = yield call(getSeeData, payload);
     //  console.log('~查看',response)
      if (response !== undefined) {
        yield put({
          type: 'getSeeDataR',
          payload: response,
        })
      }
    },
    // 询价列表 - 询价中
    *getlistInquiry({ payload },{ call,put }){
      const response = yield call(getlistInquiry, payload);
     // console.log('~xxxxxxxxxx询价中',response)
      if(response!==undefined){
        yield put({
          type: 'getlistInquiryR',
          payload: response,
        })
      }
    },

    // 询价列表 - 报价中
    *getquotedPrice({ payload },{ call,put }){
      const response = yield call(getquotedPrice, payload);
      //console.log('~xxxx报价中',response)
      if(response!==undefined){
        yield put({
          type: 'getquotedPriceR',
          payload: response,
        })
      }
    },


    // // 询价列表 - 报价中-点击详情
    *getAllListdetails({ payload },{ call,put }){
      const response = yield call(getAllListdetails, payload);
    //  console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getAllListdetailsR',
          payload: {response,show: true}
        })
      }
    },
    // 询价列表-已报价(二次) - 立即下单
    *getPlaceAnOrder({ payload,callback },{ call,put}){
      const response = yield call(getPlaceAnOrder, payload);
     //  console.log('~查看',response)
      if (response !== undefined) {
        if (response.type==1) {
          yield put({
            type: 'getPlaceAnOrderR',
            payload: response,
          }),
          yield put(routerRedux.push('/bulkPurchases/inquiryList'));
        } else {

        }
      }
    },


    // 询价列表 - 已报价
    *getquotedPriceOver({ payload },{ call,put }){
      const response = yield call(getquotedPriceOver, payload);
     // console.log('~xxxx已报价',response)
      if(response!==undefined){
        yield put({
          type: 'getquotedPriceOverR',
          payload: response,
        })
      }
    },

    // 询价列表 - 已报价-点击详情
    *completedDetails({ payload },{ call,put }){
    const response = yield call(completedDetails, payload);
  //  console.log('~res',response)
    if(response!==undefined){
      yield put({
        type: 'completedDetailsR',
        payload: {response,show: true}
      }),
      yield put({
        type: 'detailsArePassedR',
        payload: payload
      })
    }
  },


    //已报价 - 删除
    *getQuotedPriceDel({payload, callback},{call,put}){
      const response = yield call(getQuotedPriceDel,payload);
     //console.log('~xxxxx删除',response.item.type)
      if (response !== undefined) {
        if (response.type==1) {
          message.success('删除成功');
          yield put({
            type:'getQuotedPriceDelR',
            payload: payload
          })
          // callback(response);
         // console.log('xxxx',response)
        }else{
          message.error('失败');
        }
      }
    },

    // 询价列表-已报价 - 改变采购数量
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

      // 询价列表-已报价 - 详情改变采购数量
      *CommodityDetails({ payload },{ call,put }){
        const response = yield call(CommodityDetails, payload);
       // console.log('~xxxx已报价',response)
        if(response!==undefined){
          yield put({
            type: 'CommodityDetailsR',
            payload: response,
          })
        }
      },



    // 询价列表-已报价 - 提交
    *getOffer({ payload,callback },{ call,put}){
      const response = yield call(getOffer, payload);
     //  console.log('~查看',response)
      if (response !== undefined) {
        if (response.type==1) {
          yield put({
            type: 'getOfferR',
            payload: response,
          })
          yield put(routerRedux.push('/bulkPurchases/inquiryList'));
          // console.log(111)
          // this.props.dispatch(routerRedux.push('/bulkPurchases/inquiryList'   ));
          //yield put(routerRedux.push('/bulkPurchases/inquiryList/'));
        } else {

        }
      }
    },

    // 询价列表-已报价 - 取消
    *getCancel({ payload,callback },{ call,put}){
      const response = yield call(getCancel, payload);
     //  console.log('~查看',response)
      if (response !== undefined) {
        if (response.type==1) {
          yield put({
            type: 'getCancelR',
            payload: response,
          })
         // console.log(111)
          //this.props.dispatch(routerRedux.push('/bulkPurchases/inquiryList'   ));
          yield put(routerRedux.push('/bulkPurchases/inquiryList'));

        } else {

        }
      }
    },

    // 询价列表 - 已报价 -分页
    *getQuotationPaging({ payload },{ call,put }){
      const response = yield call(getQuotationPaging, payload);
     // console.log('~xxxx已报价',response)
      if(response!==undefined){
        yield put({
          type: 'getQuotationPagingR',
          payload: response,
        })
      }
    },

    // -------- 采购列表 --------------
    //
    *getPurchaseListData({ payload },{ call,put }){
      const response = yield call(getPurchaseListData, payload);
      //console.log('~询价列表res',response)
      if(response!==undefined){
        yield put({
          type: 'getPurchaseListDataR',
          payload: response,
        })
      }
    },

    // // 采购列表 - 点击详情
    *getClickDetails({ payload },{ call,put }){
      const response = yield call(getClickDetails, payload);
     // console.log('~res',response)
      if(response!==undefined){
        yield put({
          type: 'getClickDetailsR',
          payload: {response,show: true}
        })
      }
    },

     //  采购列表-分页
     *getpurchasepaging({ payload,callback },{ call,put }){
      const response = yield call(getpurchasepaging, payload);
      //console.log('~res分页',response)
      if(response!==undefined){
      //  callback(response)
        yield put({
          type: 'getpurchasepagingR',
          payload: response,
        })
      }
    },


    // -------- 采购列表 - 查看列表详情 --------------
    // -------- 询价列表/采购列表 - 查看列表详情 --------------
    *getpurchaseOrder({ payload },{ call,put }){
      const response = yield call(getpurchaseOrder, payload);
      //console.log('~xxxxxxxxxx查看列表详情',response)
      if(response!==undefined){
        yield put({
          type: 'getpurchaseOrderR',
          payload: response,
        })
      }
    },


  },

  reducers:{
    // -------- 发起询价 --------------
    getInitiateInquiryDataR(state, action){
      return {
        ...state,
        initiateInquiry:{
          ...state.initiateInquiry,
          tableData:action.payload
        }
      }
    },
    // 发起询价-保存接口
    getPreservationDataR(state, action){
      const delList = []
      return {
        ...state,
        information:{
          ...state.information,
          tableData:action.payload
        },
        initiateInquiry:{
          ...state.initiateInquiry,
          tableData:{
            ...state.initiateInquiry.tableData,
            list:delList
          }
        }
      }
    },

    // 发起询价-提交接口
    getSubmissionDataR(state, action){
     // console.log('state',state.initiateInquiry.tableData.list )
      const onempty =state.initiateInquiry.tableData.list
      const delList = []
      return {
        ...state,
        information:{
          ...state.information,
          tableData:action.payload
        },
        initiateInquiry:{
          ...state.initiateInquiry,
          tableData:{
            ...state.initiateInquiry.tableData,
            list:delList
          }
        }

      }
    },


    //  发起询价- 分页
    getPagingDataR(state, action){
     // console.log('action',action.payload.list[0].purchasesn)
      return {
        ...state,
        initiateInquiry:{
          ...state.initiateInquiry,
          tableData:action.payload
        }
      }
    },

    //  发起询价- 分页 -改
    getPagingR(state, action){
       return {
         ...state,
         initiateInquiry:{
           ...state.initiateInquiry,
          // tableData:action.payload
          // ...state.initiateInquiry.tableData,
             list:action.payload.list,
             pagination:action.payload.pagination,
         }
       }
     },



    // 发起询价- 导入询价商品
    uploadOrderbillR(state, action){
      return {
        ...state,
        initiateInquiry:{
          ...state.initiateInquiry,
          tableData:{
            ...state.initiateInquiry.tableData,

            list:action.payload.list
          }
          //list:action.payload
        }
      }
    },


    //发起询价 - 删除
    deleteInterfaceR(state,action){
      //console.log('sssss',action.payload.payload.barcode)
      //console.log('ssssssssdsdsdss',state.initiateInquiry.tableData.list)
      //console.log('barcode',barcode)
      //console.log('inList',inList)
      const barcode = action.payload.payload.barcode
      const inList = state.initiateInquiry.tableData.list
      const index = action.payload.payload.index
      const dataSource = [...inList]
      const newData=dataSource.filter(item => item.barcode != inList[index].barcode)
     // console.log('newData',newData)
      return {
        ...state,
        initiateInquiry:{
          ...state.initiateInquiry,
          tableData:{
            ...state.initiateInquiry.tableData,
            list:newData
          }
        }
      }
    },


    // -------- 询价列表 --------------
    getInquiryListDataR(state, action){
     // console.log('action',action)
      return {
        ...state,
        inquiryList:{
          ...state.inquiryList,
          tableData:action.payload
        }
      }
    },


    // //询价列表 - 删除
    deleteListR(state,action){
      //console.log('sssss',action.payload.payload.barcode)
      //console.log('ssssssssdsdsdss',state.initiateInquiry.tableData.list)
      //console.log('barcode',barcode)
      //console.log('inList',inList)
      //const barcode = action.payload.payload.barcode
      //console.log('555',state)
      const inList = state.inquiryList.tableData.list
      //console.log('inList',inList)
      //console.log('action',action.payload.purchasesn)
      const bb = action.payload.purchasesn
      //const index = action.payload.payload.index
      const dataSource = [...inList]
      // const newData=dataSource.filter(item => item.barcode != inList[index].barcode)purchasesn
      const newData=dataSource.filter(item => item.purchasesn != bb)
      //console.log('newData',newData)
      return {
        ...state,
        inquiryList:{
          ...state.inquiryList,
          tableData:{
            ...state.inquiryList.tableData,
            list:newData
          }
        }
      }
    },


     // 询价列表 - 查看 getSeeData
     getSeeDataR(state, action){
       return {
         ...state,
         initiateInquiry:{
           ...state.initiateInquiry,
           //pur:action.payload.list[0].purchasesn,
           tableData:action.payload
         },
         information:{
           ...state.initiateInquiry.information,
           information:action.payload
         },
       }

     },
     // 询价列表 - 询价中
     getlistInquiryR(state, action){
      return {
        ...state,
        listInquiry:{
          ...state.listInquiry,
          tableData:action.payload
        }
      }
    },
    // 询价列表 - 报价中
    getquotedPriceR(state, action){
      return {
        ...state,
        listQuotedQrice:{
          ...state.listQuotedQrice,
          tableData:action.payload
        }
      }
    },
    // 询价列表 - 报价中-详情
    getAllListdetailsR(state, action) {
      return {
        ...state,
        inquiryDetailsList: {
          ...state.inquiryDetailsList,
          tableData: action.payload.response,
          //childTestModelVisible:action.payload.childTestModelVisible
          show: action.payload.show
        },
      };
    },

     // 询价列表-报价中-点击详情-隐藏
     getAllListdetailsDelR(state, action) {
      return {
        ...state,
        inquiryDetailsList: {
          ...state.inquiryDetailsList,
          show: action.payload.show
        }
      }
     },


      // 询价列表 - 已报价
    getquotedPriceOverR(state, action){
      return {
        ...state,
        listQuotedQriceOver:{
          ...state.listQuotedQriceOver,
          tableData:action.payload
        }
      }
    },

    // 询价列表 - 已报价-详情
    completedDetailsR(state, action) {
      return {
        ...state,
        inquiryDetailsListDetails  : {
          ...state.inquiryDetailsListDetails  ,
          tableData: action.payload.response,
          //childTestModelVisible:action.payload.childTestModelVisible
          show: action.payload.show
        },
      };
    },


    // 询价列表 - 已报价-详情 传值
    detailsArePassedR(state, action) {
      //console.log(action)
      return {
        ...state,
        inquiryDetailsListDetails  : {
          ...state.inquiryDetailsListDetails  ,
          obj:action.payload
          // obj: action.payload.response,
          // //childTestModelVisible:action.payload.childTestModelVisible
          // show: action.payload.show
        },
      };
    },



    // 询价列表-已报价-点击详情-隐藏
    gethideR(state, action) {
      return {
        ...state,
        inquiryDetailsListDetails: {
          ...state.inquiryDetailsListDetails,
          show: action.payload.show
        }
      }
     },

     //已报价 - 删除
     getQuotedPriceDelR(state,action){
      const inList = state.listQuotedQriceOver.tableData.list
      const bb = action.payload.barcode
      //const index = action.payload.payload.index
      const dataSource = [...inList]
      // const newData=dataSource.filter(item => item.barcode != inList[index].barcode)purchasesn
      const newData=state.listQuotedQriceOver.tableData.list.filter(item => item.barcode != bb)
      // console.log('555',state.listQuotedQriceOver.tableData.list)
      // console.log('newData',newData)
       //console.log('删除bb',bb)
      return {
        ...state,
        listQuotedQriceOver:{
          ...state.listQuotedQriceOver,
          tableData:{
            ...state.listQuotedQriceOver.tableData,
            list:newData
          }
        }
      }
    },

    // 询价列表-已报价 - 改变采购数量
    getChangeNumR(state,action){
     // console.log('okokokokokok')

      const inList = state.listQuotedQriceOver.tableData.list
      const bb = action.payload.barcode
      const dataSource = [...inList]
      //const newData=state.listQuotedQriceOver.tableData.list.filter(item => item.barcode == bb)
    //   const b =state.goodsChannel.tableData.list.findIndex(item=>
    //     item.id===action.payload.id
    //   )
    //  state.goodsChannel.tableData.list[b] = {...state.goodsChannel.tableData.list[b], ...action.payload};
    //  return{
    //    ...state
    //  }
     // _.find(state.goodsAboutData.childCheckO.goodsSelectSupplierList,function(item){ return item.id === action.payload.id}).ifSel = '1';
     //console.log('p11111',action.payload)

      const b =state.listQuotedQriceOver.tableData.list.find(item=>
        item.barcode===action.payload.barcode
      )
      b.totalPrice = action.payload.totalPrice
      state.listQuotedQriceOver.tableData.item.purchasePrice = action.payload.allPrice

      // console.log('b',action.payload)
      //  console.log('totalPrice',action.payload.totalPrice)
      //  console.log('purchasePrice',state.listQuotedQriceOver.tableData.item.purchasePrice)

      return {
        ...state,
        listQuotedQriceOver:{
          ...state.listQuotedQriceOver,
          //tableData:action.payload
          'item.purchasePrice':action.payload.allPrice,
          'b.totalPric':action.payload.totalPrice
        },
      }
      },




       // 询价列表-已报价 - 详情改变采购数量
      CommodityDetailsR(state,action){
      const inList = state.listQuotedQriceOver.tableData.list
      const bb = action.payload.barcode
      const dataSource = [...inList]
      const b =state.listQuotedQriceOver.tableData.list.find(item=>
        item.barcode===action.payload.barcode
      )
      b.totalPrice = action.payload.totalPrice
      b.purchaseNum = action.payload.purchaseNum
      //console.log('b.purchaseNum',b.purchaseNum)
      //b.purchaseNum = action.payload.purchaseNum
      state.listQuotedQriceOver.tableData.item.purchasePrice = action.payload.allPrice
      return {
        ...state,
        listQuotedQriceOver:{
          ...state.listQuotedQriceOver,
          //tableData:action.payload
          'item.purchasePrice':action.payload.allPrice,
          'b.totalPric':action.payload.totalPrice,
          'b.purchaseNum':action.payload.purchaseNum,
          // tableData:{
          //   ...state.listQuotedQriceOver.tableData,
          //   list:newData
          // }
        },
      }
      },

    // 询价列表-已报价 - 提交
    getOfferR(state, action){
       return {
         ...state,
         offerList:{
           ...state.offerList,
           tableData:action.payload
         },
       }
      },

     // 询价列表-已报价 - 详情传值
     detailsArePassed(state, action){
       return {
         ...state,
         offerList:{
           ...state.offerList,
           tableData:action.payload
         },
       }
      },



    // 询价列表-已报价 - 取消
    getCancelR(state, action){
      return {
        ...state,
        cancelList:{
          ...state.cancelList,
          tableData:action.payload
        },
      }
      },



  // 询价列表 - 已报价 -分页
    getQuotationPagingR(state, action){
      return {
        ...state,
        listQuotedQriceOver:{
          ...state.listQuotedQriceOver,
          //tableData:action.payload
          list:action.payload.list,
          pagination:action.payload.pagination
        }
      }
    },

     getPlaceAnOrderR(state, action){
       return {
         ...state,
         placeAnOrder:{
           ...state.placeAnOrder,
           tableData:action.payload
         },
       }
      },
    // -------- 采购列表 --------------
    getPurchaseListDataR(state, action){
      // console.log('action',action)
       return {
         ...state,
         purchaseList:{
           ...state.purchaseList,
           tableData:action.payload
         }
       }
     },


    //采购列表-采购单-点击详情
    childrenCheckDelR(state, action) {
      return {
        ...state,
        seeList: {
          ...state.seeList,
          show: action.payload.show
        }
      }
    },

     // 采购列表-采购单-点击详情-隐藏
     getdetailsCheckDelR(state, action) {
      return {
        ...state,
        detailsList: {
          ...state.detailsList,
          show: action.payload.show
        }
      }
    },
    //  采购列表- 分页
    getpurchasepagingR(state, action){
      // console.log('action',action.payload.list[0].purchasesn)
       return {
         ...state,
         listDetails:{
           ...state.listDetails,
           tableData:action.payload
         }
       }
     },


    //采购列表
    //-------- 询价列表/采购列表 - 查看列表详情 --------------
    getpurchaseOrderR(state, action){
      return {
        ...state,
        listDetails:{
          ...state.listDetails,
          tableData:action.payload
        }
      }
    },
    // 采购列表-采购单-点击详情

    getClickDetailsR(state, action) {
      return {
        ...state,
        detailsList: {
          ...state.detailsList,
          tableData: action.payload.response,
          //childTestModelVisible:action.payload.childTestModelVisible
          show: action.payload.show
        },
      };
    },
  }
}

