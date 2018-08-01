export default function(dynamicWrapper,app){
  return {
    //工作台 - 供应商
    '/workbenchS': {
      component: dynamicWrapper(app, ['workbench'], () => import('../routes/Workbench/workbenchS')),
    },
    //工作台 - 运营
    '/workbenchO': {
      component: dynamicWrapper(app, ['workbench'], () => import('../routes/Workbench/workbenchO')),
    },

    //商品管理 - 商品查看 - 供应商
    '/goods/goodsAboutS': {
      component: dynamicWrapper(app, ['goodsManagement'], () => import('../routes/GoodsManagement/GoodsAboutS')),
    },
    //商品管理 - 商品查看 - 运营
    '/goods/goodsAboutO': {
      component: dynamicWrapper(app, ['goodsManagement'], () => import('../routes/GoodsManagement/GoodsAboutO')),
    },
    //商品管理 - 商品查看 - 代理
    '/goods/goodsAboutA': {
      component: dynamicWrapper(app, ['goodsManagement'], () => import('../routes/GoodsManagement/GoodsAboutA')),
    },

    //商品管理 - 上架审核
    '/goods/onAudit': {
      component: dynamicWrapper(app, ['goodsManagement'], () => import('../routes/GoodsManagement/goodsOnAudit')),
    },


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


    // 渠道管理 - 费用信息
    '/channelManagement/costChannel': {
      component: dynamicWrapper(app, ['channelManagement'], () => import('../routes/ChannelManagement/costChannel')),
    },
    // 渠道管理 - 商品信息
    '/channelManagement/goodsChannel': {
      component: dynamicWrapper(app, ['channelManagement'], () => import('../routes/ChannelManagement/goodsChannel')),
    },


    // 销售统计 - 供应商
    '/sales/salesStatisticsS': {
      component: dynamicWrapper(app, ['salesStatistics'], () => import('../routes/SalesStatistics/SalesStatisticsS')),
    },
    // 销售统计 - 运营
    '/sales/salesStatisticsO': {
      component: dynamicWrapper(app, ['salesStatistics'], () => import('../routes/SalesStatistics/SalesStatisticsO')),
    },
    // 销售统计 - 代理商
    '/sales/salesStatisticsA': {
      component: dynamicWrapper(app, ['salesStatistics'], () => import('../routes/SalesStatistics/SalesStatisticsA')),
    },
  };
};
