export default function(dynamicWrapper,app){
  return {
    '/': {
      component: dynamicWrapper(app, ['user', 'login', 'menu'], () => import('../layouts/BasicLayout')),
    },
    '/dashboard-o': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    // '/dashboard/monitor': {
    //   component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    // },
    // '/dashboard/workplace': {
    //   component: dynamicWrapper(app, ['project', 'activities', 'chart'],
    // () => import('../routes/Dashboard/Workplace')),
    //   // hideInBreadcrumb: true,
    //   // name: '工作台',
    //   // authority: 'admin',
    // },
    // '/form/basic-form': {
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    // },
    // '/form/step-form': {
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    // },
    // '/form/step-form/info': {
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    // },
    // '/form/step-form/confirm': {
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    // },
    // '/form/step-form/result': {
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    // },
    // '/form/advanced-form': {
    //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    // },
    // '/list/table-list': {
    //   component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    // },
    // '/list/basic-list': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    // },
    // '/list/card-list': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    // },
    // '/list/search': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    // },
    // '/list/search/projects': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    // },
    // '/list/search/applications': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    // },
    // '/list/search/articles': {
    //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    // },
    // '/profile/basic': {
    //   component: dynamicWrapper(app, ['profile'], () =>
    // import('../routes/Profile/BasicProfile')),
    // },
    // '/profile/advanced': {
    //   component: dynamicWrapper(app, ['profile'], () =>
    // import('../routes/Profile/AdvancedProfile')),
    // },
    '/dashboard-s': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/dashboard-p': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'],
        () => import('../routes/Dashboard/Workplace')),
      hideInBreadcrumb: true,
      name: '工作台',
      authority: 'admin',
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    // '/exception/trigger': {
    //   component: dynamicWrapper(app, ['error'], () =>
    // import('../routes/Exception/triggerException')),
    // },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register/': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/forgot/': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Rename')),
    },
    '/user/register/:type': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-verify': {
      component: dynamicWrapper(app, ['registerVerify'], () => import('../routes/User/RegisterVerify')),
    },
    '/member/reg/check': {
      component: dynamicWrapper(app, ['registerCheck'], () => import('../routes/Member/RegisterCheck')),
    },
    '/member/info/list': {
      component: dynamicWrapper(app, ['member'], () => import('../routes/Member/UserInfoList')),
    },
    '/member/info/:id': {
      component: dynamicWrapper(app, ['member'], () => import('../routes/Member/UserInfoDetails')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
    '/account/order-p': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/OrderListP')),
    },
    '/account/order-s': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/OrderListS')),
    },
    '/account/order-w': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/OrderListWH')),
    },
    '/account/list-p': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/AccountP')),
    },
    '/account/list-s': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/OrderListP')),
    },
    '/account/ordergoods-p/:id': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/OrderGoodsP')),
    },
    '/account/ordergoods-s/:id': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/OrderGoodsS')),
    },
    '/account/ordergoods-w/:id': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/OrderGoodsWH')),
    },
    '/goods/info/add': {
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/UploadGoods')),
    },
    '/goods/info/list': {
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/GoodsAbout')),
    },
    //仓库
    '/goods/warehouse': {
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/Warehouse')),
    },
    //商品入库
    '/goods/putaway': {
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/Putaway')),
    },
    //商品入库表单
    '/goods/step-form': {
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/StepForm')),
    },
    '/goods/step-form/info': {
      // name: '分步表单（上传入库信息）',
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/StepForm/Step1')),
    },
    '/goods/step-form/confirm/:id': {
      // name: '分步表单（补全入库信息）',
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/StepForm/Step2')),
    },
    '/goods/step-form/wait/:id': {
      // name: '分步表单（等待审核）',
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/StepForm/Step3')),
    },
    '/goods/step-form/result/:isSuccess/:id': {
      // name: '分步表单（完成）',
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/StepForm/Step4')),
    },

    '/goods/info/num': {
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/GoodsNum')),
    },
    '/goods/info/nummod/:id': {
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/GoodsNumMod')),
    },
    '/goods/info/mod/:id': {
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/GoodsMod')),
    },
    '/goods/info/sell': {
      component: dynamicWrapper(app, ['goods'], () => import('../routes/Goods/GoodsNumForDay')),
    },
    '/goods/quote/list': {
      component: dynamicWrapper(app, ['quote'], () => import('../routes/Quote/QuoteList')),
    },
    '/goods/quote/mod/:id': {
      component: dynamicWrapper(app, ['quote'], () => import('../routes/Quote/QuoteMod')),
    },
    '/goods/quote/add': {
      component: dynamicWrapper(app, ['quote'], () => import('../routes/Quote/AddGoodsModal')),
    },
    '/trade/order-s/list': {
      component: dynamicWrapper(app, ['purchaseSupplier'], () => import('../routes/Purorder/ListOfSup')),
    },
    '/trade/order-s/info/:id': {
      component: dynamicWrapper(app, ['purchaseSupplier'], () => import('../routes/Purorder/PurDetailsOfSup')),
    },
    '/trade/order-p/list': {
      component: dynamicWrapper(app, ['purchasePurchasers'], () => import('../routes/Purorder/ListOfPur')),
    },
    '/trade/order-p/info/:id': {
      component: dynamicWrapper(app, ['purchasePurchasers'], () => import('../routes/Purorder/PurDetailsOfPur')),
    },
    '/trade/order-p/add': {
      component: dynamicWrapper(app, ['addPurOrder'], () => import('../routes/Purorder/NewPurOrder')),
    },
    '/trade/order-p/mod/:id': {
      component: dynamicWrapper(app, ['purchasePurchasers','addPurOrder'], () => import('../routes/Purorder/ModPurOrder')),
    },
    '/trade/order-o/list': {
      component: dynamicWrapper(app, ['purchaseOperate'], () => import('../routes/Purorder/ListOfOperate')),
    },
    '/trade/order-o/info/:id': {
      component: dynamicWrapper(app, ['purchaseOperate'], () => import('../routes/Purorder/PurDetailsOfOperate')),
    },
    '/daigou/ticket': {
      component: dynamicWrapper(app, ['daigou'], () => import('../routes/Daigou/TicketList')),
    },
    '/daigou/ticketmod/:id': {
      component: dynamicWrapper(app, ['daigou'], () => import('../routes/Daigou/TicketMod')),
    },

    '/o2o/untreatedOrder': {
      component: dynamicWrapper(app, ['o2o'], () => import('../routes/O2O/untreatedOrder')),
    },
    '/o2o/completedOrder': {
      component: dynamicWrapper(app, ['o2o'], () => import('../routes/O2O/completeOrder')),
    },
    '/o2o/processedOrder': {
      component: dynamicWrapper(app, ['o2o'], () => import('../routes/O2O/processedOrder')),
    },
  };
};

