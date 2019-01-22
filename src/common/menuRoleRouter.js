
export default function(dynamicWrapper,app){
  return {
    // 供应商

    // 采购商
    ...procurement(dynamicWrapper,app),
    // 运营
    ...operation(dynamicWrapper,app)

  }

};
//-------------------------------------供应商-------------------------------------
export function supplier (dynamicWrapper,app){
  return{
    //测试demo
    '/goods/test': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/test')),
    },

  }
}
//-------------------------------------采购商-------------------------------------
export function procurement (dynamicWrapper,app){
  return{
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
    //批量采购-发起询价-（带参）
    '/bulkPurchases/initiateInquiryCan/:biography': {
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
    '/bulkPurchases/listDetails/:biography': {
      component: dynamicWrapper(app, ['rolePurchaserBulkPurchases'], () => import('../roles/purchaser/bulkPurchases/listDetails')),
    },


    // //批量采购 - 发起询价/询价列表 - 询价单
    // '/bulkPurchases/inquiryForm': {
    //   component: dynamicWrapper(app, ['rolePurchaserBulkPurchases'], () => import('../roles/purchaser/bulkPurchases/inquiryForm')),
    // },

    //------------增加-------
    //批量采购 - 询价中
    '/bulkPurchases/inTheInquiry/:biography': {
      component: dynamicWrapper(app, ['rolePurchaserBulkPurchases'], () => import('../roles/purchaser/bulkPurchases/inTheInquiry')),
    },
    //批量采购 - 报价中/已报价（二次）/已完成
    '/bulkPurchases/quoteWithDetails/:biography': {
      component: dynamicWrapper(app, ['rolePurchaserBulkPurchases'], () => import('../roles/purchaser/bulkPurchases/quoteWithDetails')),
    },
    //批量采购 - 已报价
    '/bulkPurchases/quoted/:biography': {
      component: dynamicWrapper(app, ['rolePurchaserBulkPurchases'], () => import('../roles/purchaser/bulkPurchases/quoted')),
    },

  }
}
//-------------------------------------运营-------------------------------------
export function operation (dynamicWrapper,app){
  return {
    //--------------------铺货--------------------
    //-----------------------------库存-----------------------------
    //库存 - 平台库存
    '/stock/platformStock': {
      component: dynamicWrapper(app, ['roleOperationDistribution'], () => import('../roles/operation/stock/platformStock')),
    },
    //库存 - 门店库存
    '/stock/storesStock': {
      component: dynamicWrapper(app, ['roleOperationDistribution'], () => import('../roles/operation/stock/storesStock')),
    },
    //-----------------------------发货-----------------------------
    //发货单表单
    '/delivery/deliveryForm': {
      component: dynamicWrapper(app, ['roleOperationDistribution','publicDictionary'], () => import('../roles/operation/delivery/deliveryForm')),
    },
    //选择发货商品
    '/delivery/selectProduct': {
      component: dynamicWrapper(app, ['roleOperationDistribution','publicDictionary'], () => import('../roles/operation/delivery/selectProduct')),
    },
    //选择商品返回发货单（带参）
    '/delivery/returnDeliveryForm': {
      component: dynamicWrapper(app, ['roleOperationDistribution','publicDictionary'], () => import('../roles/operation/delivery/returnDeliveryForm')),
    },
    //发货列表
    '/delivery/deliveryList': {
      component: dynamicWrapper(app, ['roleOperationDistribution'], () => import('../roles/operation/delivery/deliveryList')),
    },
    //发货列表- 查看发货单
    '/delivery/checkDelivery': {
      component: dynamicWrapper(app, ['roleOperationDistribution'], () => import('../roles/operation/delivery/checkDelivery')),
    },

    //-----------------------------销售-----------------------------
    //门店销售//（查看弹窗）
    '/sales/storesSales': {
      component: dynamicWrapper(app, ['roleOperationDistribution'], () => import('../roles/operation/sales/storesSales')),
    },


    //-----------------------------合同-----------------------------
    //合同列表
    '/agreement/agreementList': {
      component: dynamicWrapper(app, ['roleOperationDistribution'], () => import('../roles/operation/agreement/agreementList')),
    },
    //创建合同
    '/agreement/createAgreement': {
      component: dynamicWrapper(app, ['roleOperationDistribution'], () => import('../roles/operation/agreement/createAgreement')),
    },
    //查看合同
    '/agreement/checkAgreement': {
      component: dynamicWrapper(app, ['roleOperationDistribution'], () => import('../roles/operation/agreement/checkAgreement')),
    },

    //-----------------------------财务-----------------------------
    //采购结算
    '/finance/purchaseSettlement': {
      component: dynamicWrapper(app, ['roleOperationDistribution'], () => import('../roles/operation/finance/purchaseSettlement')),
    },
    //手动调账（查看）
    '/finance/manualTransfer': {
      component: dynamicWrapper(app, ['roleOperationDistribution'], () => import('../roles/operation/finance/manualTransfer')),
    },





    //测试demo
    '/goods/test': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/test')),
    },


  }
}
