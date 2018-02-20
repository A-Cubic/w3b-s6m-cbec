const menuData = [{
  name: '工作台',
  icon: 'dashboard',
  authority: ['admin', 'supplier'],
  path: 'dashboard-s',
}, {
  name: '工作台',
  icon: 'dashboard',
  authority: ['admin', 'purchasers'],
  path: 'dashboard-p',
}, {
  name: '工作台',
  icon: 'dashboard',
  authority: ['admin', 'operate'],
  path: 'dashboard-o',
}, {
  name: '商品管理',
  icon: 'barcode',
  authority: ['admin', 'supplier', 'operate'],
  path: 'goods',
  children: [{
    name: '新增商品',
    authority: ['admin', 'operate'],
    path: 'info/add',
  }, {
    name: '修改商品',
    authority: ['admin', 'operate'],
    path: 'info/mod/:id',
    hideInMenu: true,
  }, {
    name: '商品管理',
    authority: ['admin', 'operate'],
    path: 'info/list',
  }, {
    name: '新增报价',
    authority: ['admin', 'supplier', 'operate'],
    path: 'quote/add',
  }, {
    name: '修改报价',
    authority: ['admin', 'supplier', 'operate'],
    path: 'quote/mod/:id',
    hideInMenu: true,
  }, {
    name: '商品报价',
    authority: ['admin', 'supplier', 'operate'],
    path: 'quote/list',
  }],
}, {
  name: '海外备货',
  icon: 'global',
  authority: ['admin', 'supplier', 'purchasers', 'operate'],
  path: 'trade',
  children: [{
    name: '采购单管理',
    authority: ['admin', 'purchasers'],
    path: 'order-p/list',
  }, {
    name: '创建采购单',
    authority: ['admin', 'purchasers'],
    path: 'order-p/add',
  }, {
    name: '修改采购单',
    authority: ['admin', 'purchasers'],
    path: 'order-p/mod/:id',
    hideInMenu: true,
  }, {
    name: '查看采购单',
    authority: ['admin', 'purchasers'],
    path: 'order-p/info/:id',
    hideInMenu: true,
  }, {
    name: '处理采购单',
    authority: ['admin', 'purchasers'],
    path: 'order-p/handle/:id',
    hideInMenu: true,
  }, {
    name: '采购单管理',
    authority: ['admin', 'supplier'],
    path: 'order-s/list',
  }, {
    name: '处理采购单',
    authority: ['admin', 'supplier'],
    path: 'order-s/handle/:id',
    hideInMenu: true,
  }, {
    name: '采购单管理',
    authority: ['admin', 'operate'],
    path: 'order-o/list',
  }, {
    name: '处理采购单',
    authority: ['admin', 'operate'],
    path: 'order-o/handle/:id',
    hideInMenu: true,
  }],
}, {
  name: '海外直邮',
  icon: 'rocket',
  authority: ['admin', 'operate'],
  path: 'express',
  children: [],
}, {
  name: 'O2O',
  icon: 'shop',
  authority: ['admin', 'operate'],
  path: 'sale',
  children: [],
}, {
  name: '开放平台',
  icon: 'api',
  authority: ['admin'],
  path: 'open-api',
  children: [],
}, {
  name: '结算管理',
  icon: 'bank',
  authority: ['admin', 'supplier', 'purchasers', 'operate'],
  path: 'account',
  children: [{
    name: '结算单',
    authority: ['admin', 'purchasers', 'operate'],
    path: 'list-p',
  }, {
    name: '结算单',
    authority: ['admin', 'supplier', 'operate'],
    path: 'list-s',
  }],
}, {
  name: '用户管理',
  icon: 'team',
  authority: ['admin', 'operate'],
  path: 'member',
  children: [{
    name: '用户信息',
    authority: ['admin', 'operate'],
    path: 'info/list',
  }, {
    name: '注册审批',
    authority: ['admin', 'operate'],
    path: 'reg/check',
  }],
}, {
  name: '商城首页',
  icon: 'home',
  path: 'http://b2b.llwell.net/mall',
  target: '_blank',
}];

export function getMenuData(req, res) {
  res.send(menuData);
}
