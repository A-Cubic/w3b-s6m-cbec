import { message} from 'antd';
import {
  getDemo, //测试
  getPayOrder,  //付款
  GetRetailMoney, //充值获取页面
  getPopupR,//打开弹窗
  getPopupColoseR,//关闭弹窗
  getPayment,//充值接口
  handleFormPopupR,//新加弹窗
  getPopupFormColoseR,//关闭新加弹窗
  handleNumR,//传弹窗值
} from '../services/roleRetaiBusManagement_S'

export default {
  namespace: 'roleRetaiBusManagement',
  state:{

    //供应商-运营商-渠道商接口共用table
    // supplierOrder:{
    //   tableData:{
    //     list: [],
    //     pagination:{},
    //   },
    //   fs:{
    //     consigneeName:'',
    //     consigneeMobile:'',
    //     consigneeAdr:''
    //   },
    //   childCheck:{
    //     id:'',
    //   },
    // },
    // customsVisible:false,
    // customsInformationList:[],
    // codeVisible:false,
    // codeUrl:'',

    SalesForm:{
      tableData:{
        item:'',
        list:[],
        pagination:{}
      },
      childDetailsModelVisible:false,
      num:''
    },
    //充值
    rechargeDetails:{
      tableData:{
        item:{},
        list: [],
        pagination:{},
      },
      childDetailsModelVisible:false,
      img:''
      
    }



  },
  effects:{
    

   
    

    // //测试
    *getDemo({ payload ,callback },{ call,put}){
     
      const response = yield call(getDemo, payload);
      if (response !== undefined) {
        //console.log('666')
        yield put({
          type: 'getDemoR',
          payload: response,
        });
      }
    },

    //付款
    *getPayOrder({ payload,callback },{ call,put}){
      const response = yield call(getPayOrder, payload);
      //console.log('xxx')
      if (response !== undefined) {
        if (response.type==1) {
          message.success('付款成功');
          callback(response);
        }else{
          message.error(response.msg);
        }
      }
    },

    //充值获取页面
    *GetRetailMoney({ payload ,callback },{ call,put}){
     
      const response = yield call(GetRetailMoney, payload);
      if (response !== undefined) {
        //console.log('666')
        yield put({
          type: 'GetRetailMoneyR',
          payload: response,
          
        });
      }
    },

    //充值接口  payment
    *getPayment({ payload,callback },{ call,put}){
      const response = yield call(getPayment, payload);
      //console.log(response.msg)
      if (response !== undefined) {
        if (response.type==1) {
         // console.log('ok',response.msg)
          yield put({
            type: 'getPaymentR',
            payload: response,
            
          });
          message.success('请扫描支付');
          callback(response);
        }else{
          message.error(response.msg);
        }
      }
    },


  },
  reducers:{
    

    getDemoR(state,action){
      return{
        ...state,
        SalesForm:{
          ...state.SalesForm,
          tableData:action.payload
        }
      }
    },

    GetRetailMoneyR(state,action){
      return{
        ...state,
        rechargeDetails:{
          ...state.rechargeDetails,
          tableData:action.payload
        }
      }
    },

    //打开弹窗
    getPopupR(state,action){
      return{
        ...state,
        rechargeDetails:{
            ...state.rechargeDetails,
            //tableData:action.payload.list,
            childDetailsModelVisible:true,
      
          }
      }
    },
    //关闭弹窗
    getPopupColoseR(state,action){
      return{
        ...state,
        rechargeDetails:{
            ...state.rechargeDetails,
            //tableData:action.payload.list,
            childDetailsModelVisible:false,
      
          }
      }
    },

    //新加弹窗 SalesForm
    //打开弹窗
    handleFormPopupR(state,action){
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            //tableData:action.payload.list,
            childDetailsModelVisible:true,
      
          }
      }
    },
    //新加弹窗 SalesForm
    //关闭弹窗
    getPopupFormColoseR(state,action){
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            //tableData:action.payload.list,
            childDetailsModelVisible:false,
      
          }
      }
    },

    //传弹窗值handleNumR
    handleNumR(state,action){
      return{
        ...state,
        SalesForm:{
            ...state.SalesForm,
            //tableData:action.payload.list,
            num:action.payload.num,
      
          }
      }
    },



    getPaymentR(state,action){
      return{
        ...state,
        rechargeDetails:{
            ...state.rechargeDetails,
            //tableData:action.payload.list,
            img:action.payload.url
          }
      }
    },


  }
}
