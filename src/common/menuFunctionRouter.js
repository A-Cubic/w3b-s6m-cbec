export default function(dynamicWrapper,app){
  return {
    //订单管理 - 供应商
    '/orderManagement/supplierOrder': {
      component: dynamicWrapper(app, ['orderManagement'], () => import('../routes/OrderManagement/supplierOrder')),
    },
    //订单管理 - 运营商
    '/orderManagement/operatorOrder': {
      component: dynamicWrapper(app, ['orderManagement'], () => import('../routes/OrderManagement/operatorOrder')),
    },
    //订单管理 - 渠道商
    '/orderManagement/channelOrder': {
      component: dynamicWrapper(app, ['orderManagement'], () => import('../routes/OrderManagement/channelOrder')),
    },
  };
};
