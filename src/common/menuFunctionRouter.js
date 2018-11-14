import {getSettlementListS} from "../services/settlementManagement_S";

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
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/GoodsAboutS')),
    },
    //商品管理 - 商品查看 - 运营
    '/goods/goodsAboutO': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/GoodsAboutO')),
    },
    //商品管理 - 商品查看 - 代理
    '/goods/goodsAboutA': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/GoodsAboutA')),
    },
    //商品管理 - 商品查看 - 分销
    '/goods/goodsAboutD': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/GoodsAboutA')),
    },
    //商品管理 - 商品查看 - 采购purchase
    '/goods/goodsAboutP': {
      component: dynamicWrapper(app, ['goodsManagement','publicDictionary'], () => import('../routes/GoodsManagement/GoodsAboutP')),
    },
    //分销管理 - 分销商管理 - 代理
    '/agent/agentMgt': {
      component: dynamicWrapper(app, ['distributionManagement'], () => import('../routes/DistributionManagement/distributorsMgt')),
    },

    //分销管理 - 推广二维码
    '/agentQR': {
      component: dynamicWrapper(app, ['distributionManagement'], () => import('../routes/DistributionManagement/agentQRCode')),
    },
    //关注公众号 - 二维码
    '/mediaPlatform': {
      component: dynamicWrapper(app, [], () => import('../routes/MediaPlatform/mediaPlatform')),
    },


    //商品管理 - 上架审核（复制新）
    '/goods/onAudit': {
      component: dynamicWrapper(app, ['goodsManagement'], () => import('../routes/GoodsManagement/goodsOnAudit')),
    },
    //商品管理 - 上架审核（新）
    // '/goods/onAuditNew': {
    //   component: dynamicWrapper(app, ['goodsManagementNew'], () => import('../routes/GoodsManagement/goodsOnAuditNew')),
    // },


    //订单管理 - 供应商
    '/orderManagement/supplierOrder': {
      component: dynamicWrapper(app, ['orderManagement','publicDictionary'], () => import('../routes/OrderManagement/supplierOrder')),
    },
    //订单管理 - 运营商
    '/orderManagement/operatorOrder': {
      component: dynamicWrapper(app, ['orderManagement','publicDictionary'], () => import('../routes/OrderManagement/operatorOrder')),
    },
    //订单管理 - 渠道商
    '/orderManagement/channelOrder': {
      component: dynamicWrapper(app, ['orderManagement','publicDictionary'], () => import('../routes/OrderManagement/channelOrder')),
    },
    //订单管理 - 代理
    '/orderManagement/agentOrder': {
      component: dynamicWrapper(app, ['orderManagement','publicDictionary'], () => import('../routes/OrderManagement/agentOrder')),
    },
    //订单管理 - 分销商
    '/orderManagement/distributionOrder': {
      component: dynamicWrapper(app, ['orderManagement','publicDictionary'], () => import('../routes/OrderManagement/distributionOrder')),
    },


    // 渠道管理 - 费用信息
    '/channelManagement/costChannel': {
      component: dynamicWrapper(app, ['channelManagement','publicDictionary'], () => import('../routes/ChannelManagement/costChannel')),
    },
    // 渠道管理 - 商品信息
    '/channelManagement/goodsChannel': {
      component: dynamicWrapper(app, ['channelManagement','publicDictionary'], () => import('../routes/ChannelManagement/goodsChannel')),
    },

    // ----销售管理-----
    // 销售统计 - 供应商
    '/sales/salesStatisticsS': {
      component: dynamicWrapper(app, ['salesStatistics'], () => import('../routes/SalesStatistics/SalesStatisticsS')),
    },
    // 销售统计 - 运营
    '/sales/salesStatisticsO': {
      component: dynamicWrapper(app, ['salesStatistics','publicDictionary'], () => import('../routes/SalesStatistics/SalesStatisticsO')),
    },
    // 销售统计 - 代理商
    '/sales/salesStatisticsA': {
      component: dynamicWrapper(app, ['salesStatistics','publicDictionary'], () => import('../routes/SalesStatistics/SalesStatisticsA')),
    },
    // 我的客户 - 代理20181025
    '/sales/client': {
      component: dynamicWrapper(app, ['salesStatistics'], () => import('../routes/SalesStatistics/client')),
    },
    //----结算管理----
    // 结算管理 - 运营
    '/settlement/settlementO': {
      component: dynamicWrapper(app, ['settlementManagement','publicDictionary'], () => import('../routes/SettlementManagement/settlementMgtO')),
    },
    // 结算管理 - 供应商
    '/settlement/settlementS': {
      component: dynamicWrapper(app, ['settlementManagement'], () => import('../routes/SettlementManagement/settlementMgtS')),
    },
    // 结算管理 - 采购
    '/settlement/settlementP': {
      component: dynamicWrapper(app, ['settlementManagement'], () => import('../routes/SettlementManagement/settlementMgtP')),
    },
    // 结算管理 - 代理
    '/settlement/settlementA': {
      component: dynamicWrapper(app, ['settlementManagement'], () => import('../routes/SettlementManagement/settlementMgtA')),
    },
    // 结算管理 - 分销
    '/settlement/settlementD': {
      component: dynamicWrapper(app, ['settlementManagement'], () => import('../routes/SettlementManagement/settlementMgtD')),
    },
    // 我的收益 - 代理20181025
    '/settlement/incomeA': {
      component: dynamicWrapper(app, ['settlementManagement','publicDictionary'], () => import('../routes/SettlementManagement/incomeA')),
    },
    // 我的收益 - 门店20181025
    '/settlement/incomeStore': {
      component: dynamicWrapper(app, ['settlementManagement'], () => import('../routes/SettlementManagement/incomeStore')),
    },

  //


    

  };
};
