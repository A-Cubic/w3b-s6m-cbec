export default function(dynamicWrapper,app){
  return {
    //代销-商品-商品库存-20181115
    '/goods/consignmentStock': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/consignmentStock')),
    },
    //代销-商品-收货确认-20181121
    '/goods/receivingConfirmation': {
      component: dynamicWrapper(app, ['rolePurchaserConsignment'], () => import('../roles/purchaser/consignment/receivingConfirmation')),
    },
    //代销-订单-商品销售-20181121
    '/order/goodsSales': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../roles/purchaser/consignment/goodsSales')),
    },
    //代销-财务-合同信息-20181121
    '/finance/contractInformation': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../roles/purchaser/consignment/contractInformation')),
    },
    //代销-统计-货款结算-20181121
    '/statistics/paymentSettlement': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../roles/purchaser/consignment/paymentSettlement')),
    },





    //测试demo
    '/goods/test': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/test')),
    },

  };
};
