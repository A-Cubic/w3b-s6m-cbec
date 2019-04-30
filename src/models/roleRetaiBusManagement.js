import { message} from 'antd';
import {
  getDemo, //测试
  getPayOrder,  //付款
  GetRetailMoney, //充值获取页面
  getPopupR,//打开弹窗
  getPopupColoseR,//关闭弹窗
  getPayment,充值接口

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
      }
      
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
      if (response !== undefined) {
        if (response.type==1) {
          
          yield put({
            type: 'getPaymentR',
            payload: response,
            
          });
          message.success('请扫描支付');
          callback(response);
        }else{
          message.error('生成二维码失败，请联系客服！');
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
