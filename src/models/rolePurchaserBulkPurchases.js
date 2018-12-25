import { message} from 'antd';
import {
  // -------- 发起询价 --------------
  getPreservationData,getUploadOrderbillDX, deleteInterface,getPagingData,getSubmissionData,
  // -------- 询价列表 --------------
  getInquiryListData,getSeeData,
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
    // console.log('~res111保存接口',response)
      if(response!==undefined){
        callback(response)
        yield put({
          type: 'getPreservationDataR',
          payload: response,
        })
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


    //发起询价 - 导入询价商品
    *uploadOrderbill({ payload,callback },{ call,put}){
      const response = yield call(getUploadOrderbillDX, payload);
      // console.log('~uploadOrderbill',response)
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
     //  console.log('~xxxxx删除',response.item.type)
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

     // 询价列表 - 查看 getSeeData
     *getSeeData({ payload,callback },{ call,put}){
      const response = yield call(getSeeData, payload);
       console.log('~查看',response)
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
      console.log('~xxxxxxxxxx询价中',response)
      if(response!==undefined){
        yield put({
          type: 'getlistInquiryR',
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
      console.log('~res',response)
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
      console.log('~xxxxxxxxxx查看列表详情',response)
      if(response!==undefined){
        yield put({
          type: 'getpurchaseOrderR',
          payload: response,
        })
      }
    },
  },
  
  // // 采购列表-采购单-点击详情
  // *getdetailsCheck({ payload }, { call, put }) {
  //   console.log()
  //   const response = yield call(getdetailsCheck, payload)
  //   console.log('查看事件',response)
  //   if (response !== '') {
  //     yield put({
  //       type: 'getdetailsCheckR',
  //       payload: { response, show: true }
  //     })
  //   }
  // },



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

    // 发起询价- 导入询价商品 
    uploadOrderbillR(state, action){
      return {
        ...state,
        initiateInquiry:{
          ...state.initiateInquiry,
          pur:action.payload.list[0].purchasesn,
          tableData:action.payload
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
    // tableData:{
    //   item:{},
    //   list: [],
    //   pagination:{},
    // },

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
     // 询价列表 - 查看 getSeeData
     getSeeDataR(state, action){
      console.log('action',action.payload)
      console.log('state',state.initiateInquiry.information)
       return {
         ...state,
         initiateInquiry:{
           ...state.initiateInquiry,
           pur:action.payload.list[0].purchasesn,
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
  
     // 采购列表-采购单-点击详情-隐藏 错误
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

