export default function(dynamicWrapper,app){
  return {

    //-------------代销业务-------------

    //代销-商品-商品库存-20181115
    '/consignment/consignmentStock': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/consignmentStock')),
    },
    //代销-商品-收货确认-20181121
    '/consignment/receivingConfirmation': {
      component: dynamicWrapper(app, ['rolePurchaserConsignment'], () => import('../roles/purchaser/consignment/receivingConfirmation')),
    },
    //代销-订单-数据统计-20181204
    '/consignment/statistics': {
      component: dynamicWrapper(app, ['rolePurchaserConsignment'], () => import('../roles/purchaser/consignment/dataStatistics')),
    },
    //代销-订单-商品销售-20181204
    '/consignment/goodsSales': {
      component: dynamicWrapper(app, ['rolePurchaserConsignment'], () => import('../roles/purchaser/consignment/goodsSales')),
    },
    //代销-财务-合同信息-20181121
    '/consignment/contractInformation': {
      component: dynamicWrapper(app, ['rolePurchaserConsignment'], () => import('../roles/purchaser/consignment/contractInformation')),
    },
    //代销-统计-货款结算-20181121
    '/consignment/paymentSettlement': {
      component: dynamicWrapper(app, ['rolePurchaserConsignment'], () => import('../roles/purchaser/consignment/paymentSettlement')),
    },

    //-------------批量采购-------------

    //批量采购-发起询价-
    '/bulkPurchases/initiateInquiry': {
      component: dynamicWrapper(app, ['rolePurchaserBulkPurchases'], () => import('../roles/purchaser/bulkPurchases/initiateInquiry')),
    },
    //批量采购-询价列表-
    '/bulkPurchases/inquiryList': {
      component: dynamicWrapper(app, ['rolePurchaserBulkPurchases'], () => import('../roles/purchaser/bulkPurchases/inquiryList')),
    },
    //批量采购-采购列表-
    '/bulkPurchases/purchaseList': {
      component: dynamicWrapper(app, ['rolePurchaserBulkPurchases'], () => import('../roles/purchaser/bulkPurchases/purchaseList')),
    },
    //批量采购 - 询价列表/采购列表 - 查看列表详情
    '/bulkPurchases/listDetails': {
      component: dynamicWrapper(app, ['rolePurchaserBulkPurchases'], () => import('../roles/purchaser/bulkPurchases/listDetails')),
    },
    //批量采购 - 发起询价/询价列表 - 询价单
    '/bulkPurchases/inquiryForm': {
      component: dynamicWrapper(app, ['rolePurchaserBulkPurchases'], () => import('../roles/purchaser/bulkPurchases/initiateInquiry')),
    },


    //测试demo
    '/goods/test': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/test')),
    },

  };
};
