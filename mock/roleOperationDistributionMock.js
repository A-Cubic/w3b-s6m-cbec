
// const h = 'http://192.168.191.1:54195/';
const a = 'http://192.168.0.127:54195/';


export default function roleOperationDistributionMock(url) {
  return {
    // ---------------------------------------------库存管理部分-----------------------------------------
    // -----------------库存 - 平台库存 页---------------
    // 平台库存 - 列表查询
    // 'POST /llback/Sales/platformStock': getPayment,
    'POST /llback/Warehouse/PlatformInventory': url,
    // 平台库存 - 上传销售数据
    // 'POST /llback/delivery/UploadOrderDXttt': UpdateDistributor,
    'POST /llback/Warehouse/OnloadWarehousingGoods': url,

    // 平台库存 - 删除
    'POST /llback/Sales/deleteList': getPayment,
    // -----------------库存 - 门店库存 页---------------
    // 门店库存 获取列表
    'POST /llback/Warehouse/StoreInventory': url,

    // ---------------------------------------------发货管理部分-----------------------------------------
    // -----------------我要发货-------------------

    // 我要发货 - 选择发货
    'POST /llback/Warehouse/OperationDeliveryImport': a,

    // 我要发货 - 删除
    'POST /llback/Warehouse/DeliverGoodsDelete': a,

    // 我要发货 - 分页
    'POST /llback/Warehouse/DeliverGoodsList': a,

    // 我要发货 - 提交
    'POST /llback/Warehouse/DeliverOrderSubmission': a,

    // 我要发货 - 保存
    'POST /llback/Warehouse/DeliverOrderConserve': a,

    // 我要发货 - 改变数量
    'POST /llback/Warehouse/DeliverGoodsNum': a,

    // -----------------发货管理-选择发货商品 -----------------

    // 发货管理-选择发货商品 - 获取数据 选择发货商品 跳页接口
    'POST /llback/Warehouse/ChooseDeliverGoods': a,

    // 选择发货商品 勾选
    'POST /llback/Warehouse/ChooseGoods': a,


    // -----------------发货管理-发货列表 -----------------
    // 发货列表-获取data列表 翻页，查询等
    'POST /llback/Warehouse/DeliverOrderList': a,

    // 发货列表 - 删除
    'POST /llback/Warehouse/DeliverOrderListDelete': a,

    // 发货列表- 点击查看
    // 'POST /llback/Warehouse/DeliverOrderDetails': a,
    'POST /llback/Warehouse/DeliverOrderDetails': a,

    // 发货列表- 撤回
    'POST /llback/Warehouse/DeliverOrderListWithdraw': a,

    // -----------------选择商品返回发货单（带参） 页------

    // -----------------发货列表 页--------------------

    // -----------------发货列表- 查看发货单 页----------

    // ---------------------------------------------销售管理部分-----------------------------------------
    // -----------------门店销售//（查看弹窗） 页---------
    // 获取列表
    'POST /llback/Sales/ShopSalseOrders': url,
    // 查看-弹窗
    'POST /llback/Sales/ShopSalseOrdersDetails': url,

    // ---------------------------------------------合同管理部分-----------------------------------------
    // -----------------合同列表 页--------------
    'POST /llback/Agreement/ContractList': a,
    // 'POST /llback/Agreement/ContractList': a,

    // 'POST /llback/Agreement/ContractDetails': a, //查看跳页
    // 'POST /llback/Sales/getAgreementListData': getPayment,
    // -----------------创建合同 页--------------

    'POST /llback/Agreement/getcreateAgreementData': contractInformation,

    // -----------------查看合同 页--------------

    'POST /llback/Agreement/ContractDetails': a,
    // 'POST /llback/Agreement/getImg': contractInformation,


    // ---------------------------------------------财务管理部分-----------------------------------------
    // ------------------采购结算 页-------------
    // 采购结算 - 列表
    // 'POST /llback/Balance/AA': GetOrderList,
    'POST /llback/Balance/PurchasePayment': url,
    // 采购结算 - 查看结算明细 - 货款 ------代销 结算 -查看明细 共用接口
    // 'POST /llback/Balance/GetPaymentDetailed': url,
    // 采购结算 - 查看结算明细 - 其他
    // 'POST /llback/Balance/GetPaymentOtherDetailed': url,
    // 采购结算 - 打印  Balance/GetPaymentPrinting
    // 'POST /llback/Balance/GetPaymentPrinting': url,
    // 采购结算 - 完成对账
    'POST /llback/Balance/FinishReconciliation': url,
    // ------------------手动调账（查看） 页-------

    // 采购结算 - 完成对账

    'POST /llback/Balance/ManualChangeAccount': url,

    // 采购结算 - 创建对账单保存按钮
    // 'POST /llback/Balance/saveCreatOrder': SendOrder,
    'POST /llback/Balance/CreateAccount': url,
  };
}
export function getPayment(req, res) {
  res.send({
    msg: '已删除',
    type: '1',
    list: [{
      keyId: '11',
      date: '20190101~20190103',
      order: '215451245',
      goMoney: '2000.00',
      tuiMoney: '1000.00',
      elseMoney: '500.00',
      doMoney: '500.00',
      status: 0,
      purchasesn: '2018121313045638',
      goodsName: '兰芝精华液',
      barcode: '11111',
      ischoose: true,
      id: 1,
      record: 1,
      contractCode: 1,
    }, {
      keyId: '2',
      date: '20190104~20190105',
      order: '215451244',
      goMoney: '2000.00',
      tuiMoney: '1000.00',
      elseMoney: '500.00',
      doMoney: '500.00',
      status: 1,
      purchasesn: '2018121313045639',
      goodsName: '康师傅',
      barcode: '2',
      ischoose: false,
      id: 1,
      record: 2,
      contractCode: 2,
    }],
    pagination: {
      current: 1,
      total: 3,
      pageSize: 10,
    },
    item: {
      msg: '',
      type: '',
      sendName: '1',
      sendTel: '2',
      express: '3',
      waybillNo: '',
      getName: '',
      getcode: '',
      getTel: '',
      usercode: '',

    },
  });
}
// 返回改变数量
export function changingQuantity(req, res) {
  res.send({

    barcode: '8809420800197',
    pNum: 17,
    type: '1',

  });
}

// 发货列表
export function shippingList(req, res) {
  res.send({
    item: {

    },
    list: [
      {
        keyId: '1',
        id: '1',
        purchasersCode: 'cgs',
        purchasersName: '1采购商测试',
        goodsTotal: '500',
        sendTime: '2018/10/30 0:00:00',
        sendName: '1乓球',
        sendTel: '13565458746',
        status: '1',
      }, {
        keyId: '2',
        id: '2',
        purchasersCode: 'cgs',
        purchasersName: '2采购商测试',
        goodsTotal: '500',
        sendTime: '2018/10/30 0:00:00',
        sendName: '2乓球',
        sendTel: '213565458746',
        status: '0',
      }, {
        keyId: '3',
        id: '3',
        purchasersCode: 'cgs',
        purchasersName: '3采购商测试',
        goodsTotal: '500',
        sendTime: '2018/10/30 0:00:00',
        sendName: '3乓球',
        sendTel: '313565458746',
        status: '3',
      },
    ],
    pagination: {
      current: 1,
      total: 3,
      pageSize: 10,
    },
  });
}

// 跳页-我要发货
export function pageshipment(req, res) {
  res.send({
    item: {
      sendName: '小胖',
      sendTel: '15969698698',
      express: '2',
      waybillNo: '3',
      getName: '4',
      contact: '12',
      getTel: '',
      id: '1',
      ifupload: '1',
    },
    list: [
      {
        keyId: '10',
        id: '1',
        goodsName: '10韩国D+29深层洁净美白保湿滋润肌肤修复矿物质洁面皂白色 100g',
        barcode: '8809420800199',
        model: '250ml',
        country: '韩国',
        brand: 'D+29',
        rprice: '',
        pprice: '',
        pNum: '3',
        goodsNum: '900',
        safeNum: '',
      }, {
        keyId: '10',
        id: '1',
        goodsName: '韩国D+29深层洁净美白保湿滋润肌肤修复矿物质洁面皂白色 100g',
        barcode: '8809420800199',
        model: '250ml',
        country: '韩国',
        brand: 'D+29',
        rprice: '',
        pprice: '',
        pNum: '3',
        goodsNum: '900',
        safeNum: '',
      }, {
        keyId: '10',
        id: '1',
        goodsName: '韩国D+29深层洁净美白保湿滋润肌肤修复矿物质洁面皂白色 100g',
        barcode: '8809420800199',
        model: '250ml',
        country: '韩国',
        brand: 'D+29',
        rprice: '',
        pprice: '',
        pNum: '3',
        goodsNum: '900',
        safeNum: '',
      },
    ],
    pagination: {
      current: 1,
      total: 3,
      pageSize: 10,
    },
  });
}

export function contractInformation(req, res) {
  res.send({
    item: {
      contractCode: '123456789',
      cycle: '月结',
      model: '代销',
    },
    list: [
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809420800199_cp_1.jpg',
      },
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809438410106_cp_1.jpg',
      },
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809438410106_cp_1.jpg',
      },
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809438410106_cp_1.jpg',
      },
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809438410106_cp_1.jpg',
      },
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809438410106_cp_1.jpg',
      },
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809438410106_cp_1.jpg',
      },
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809438410106_cp_1.jpg',
      },
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809438410106_cp_1.jpg',
      },
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809438410106_cp_1.jpg',
      },
    ],
    pagination: null,
  });
}
export function goodsSales(req, res) {
  res.send({
    list: [
      {
        keyId: '1',
        goodsName: 'Dr.select Dr.Select 玻尿酸卸妆啫喱',
        slt: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/4580482175534_cp_2.jpg',
        barCode: '4580482175534',
        brand: 'Dr.select',
        skuUnitPrice: 148,
        quantity: 1,
        supplyPrice: 117,
        tradeTime: '2018/2/9 18:08:48',
        money: 148,
      },
      {
        keyId: '2',
        goodsName: 'Skinature 蒲公英净肤洁面乳',
        slt: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809099261666_cp_2.jpg',
        barCode: '8809099261666',
        brand: 'Skinature',
        skuUnitPrice: 88,
        quantity: 1,
        supplyPrice: 64,
        tradeTime: '2017/7/30 1:04:29',
        money: 88,
      },
      {
        keyId: '3',
        goodsName: 'vivekke 防晒喷雾',
        slt: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/4582238542133_cp_2.jpg',
        barCode: '4582238542133',
        brand: 'DOSHISHA',
        skuUnitPrice: 148,
        quantity: 1,
        supplyPrice: 105,
        tradeTime: '2017/7/24 11:48:28',
        money: 148,
      },
    ],
    pagination: {
      current: 1,
      total: 3,
      pageSize: 10,
    },
  });
}
export function GetOrderList(req, res) {
  res.send({
    list: [{
      id: '1',
      status: '0',
      sendType: '1',
      sendid: 1,
      merchantOrderId: 'SH20180127144502664278',
      tradeTime: '2018-01-27 14:45:02',
      waybillno: '',
      consigneeName: null,
      tradeAmount: '1',
      idNumber: null,
      consigneeMobile: null,
      addrProvince: null,
      addrCity: null,
      addrDistrict: null,
      addrDetail: null,
      orderGoods: null,
      flag: '2',
    }, {
      id: '2',
      status: '1',
      sendType: '1',
      sendid: 2,
      merchantOrderId: 'SH20180127144502664278',
      tradeTime: '2018-01-27 14:45:02',
      waybillno: '',
      consigneeName: null,
      tradeAmount: '1',
      idNumber: null,
      consigneeMobile: null,
      addrProvince: null,
      addrCity: null,
      addrDistrict: null,
      addrDetail: null,
      orderGoods: null,
      flag: '2',
    }, {
      id: '3',
      sendid: 3,
      status: '0',
      sendType: '2',
      merchantOrderId: 'SH20180127144502664278',
      tradeTime: '2018-01-27 14:45:02',
      waybillno: '',
      consigneeName: null,
      tradeAmount: '1',
      idNumber: null,
      consigneeMobile: null,
      addrProvince: null,
      addrCity: null,
      addrDistrict: null,
      addrDetail: null,
      orderGoods: null,
      flag: '1',
    }, {
      id: '4',
      sendid: 4,
      status: '1',
      sendType: '2',
      merchantOrderId: 'SH20180127144502664278',
      tradeTime: '2018-01-27 14:45:02',
      waybillno: '',
      consigneeName: null,
      tradeAmount: '1',
      idNumber: null,
      consigneeMobile: null,
      addrProvince: null,
      addrCity: null,
      addrDistrict: null,
      addrDetail: null,
      orderGoods: null,
      flag: '1',
    }, {
      id: '5',
      status: '2',
      sendType: '2',
      sendid: 5,
      merchantOrderId: 'SH20180127144502664278',
      tradeTime: '2018-01-27 14:45:02',
      waybillno: '',
      consigneeName: null,
      tradeAmount: '1',
      idNumber: null,
      consigneeMobile: null,
      addrProvince: null,
      addrCity: null,
      addrDistrict: null,
      addrDetail: null,
      orderGoods: null,
      flag: '1',
    }],
    pagination: {
      current: 1,
      total: 8,
      pageSize: 10,
    },
    item: {
      money: '50',
      waybillNo: 'ssada',
    },
  });
}
export function getPlatform(req, res) {
  res.send([
    {
      platformId: '0',
      platformType: '渠道1',
    },
    {
      platformId: '1',
      platformType: '渠道2',
    },
  ]);
}
export function getChannelList(req, res) {
  res.send({
    item: {
      salesNumTotal: 2584,
      salesPriceTotal: 184124.6,
      costTotal: 207902.44,
      grossProfitTotal: -23777.84,
      brokerageTotal: 0,
    },
    list: [
      {
        barcode: '4571395822073',
        goodsName: 'Fernanda 香气护肤乳(Lilly Crown)',
        slt: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/4571395822073_cp_1.jpg',
        category: [
          '个人护理',
          '身体护理',
          '身体乳',
        ],
        brand: 'Fernanda',
        salesNum: 2584,
        salesPrice: 0,
        cost: 99,
        grossProfit: -99,
        platformType: 'BBC',
        purchaserName: '青春店',
        brokerage: 0,
        distribution: null,
      },
      {
        barcode: '4582238542133',
        goodsName: 'DOSHISHA vivekke 防晒喷雾',
        slt: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/4582238542133_cp_2.jpg',
        category: [
          '美容护肤',
          '防晒修护',
          '防晒喷雾',
        ],
        brand: 'DOSHISHA',
        salesNum: 2584,
        salesPrice: 0,
        cost: 99,
        grossProfit: -99,
        platformType: '',
        purchaserName: '本山',
        brokerage: 0,
        distribution: null,
      },
    ],
    pagination: {
      current: 1,
      total: 2215,
      pageSize: 10,
    },
  });
}

// 发货 导入表格
export function UpdateDistributor(req, res) {
  res.send({

    item: {
      msg: '成功',
      type: '1',
      sendName: '小胖',
      sendTel: '15969698698',
      express: '2',
      waybillNo: '3',
      usercode: '4',
      contact: '12',
      getTel: '11111111',
      id: '1',
      ifupload: '1',

    },
    list: [
      {
        keyId: '1',
        id: 'Send2019010914564524',
        goodsName: '韩国MIGABEE蜂蜜提取美白祛皱成分超保湿精华液蜂蜜80安瓶 120ml',
        barcode: '8809420800197',
        model: '150ml',
        country: '韩国',
        brand: 'Bkcell',
        rprice: '198',
        pprice: '138.62',
        pNum: '1',
        goodsNum: '0',
        safeNum: '1',
      },
      {
        keyId: '2',
        id: 'Send2019010914564525',
        goodsName: '2韩国MIGABEE蜂蜜提取美白祛皱成分超保湿精华液蜂蜜80安瓶 120ml',
        barcode: '8809420800198',
        model: '250ml',
        country: '中国',
        brand: 'Bkcell',
        rprice: '2198',
        pprice: '2138.62',
        pNum: '2',
        goodsNum: '2',
        safeNum: '2',
      },
    ],
    pagination: {
      current: 1,
      total: 2,
      pageSize: 10,
    },
  });
}
export function getorder(req, res) {
  res.send({
    id: '2884',
    status: '准备出库',
    merchantOrderId: 'SH20180317104341828329',
    tradeTime: '2018-03-17 10:43:41',
    waybillno: '',
    consigneeName: null,
    tradeAmount: '125',
    idNumber: null,
    consigneeMobile: null,
    addrProvince: null,
    addrCity: null,
    addrDistrict: null,
    addrDetail: null,
    orderGoods: [
      {
        id: '3247',
        slt: '',
        barCode: '4571395822073',
        skuUnitPrice: '125',
        totalPrice: '125',
        skuBillName: 'Fernanda 香气护肤乳(Lilly Crown)',
        quantity: '1',
        purchasePrice: '0',
      },
    ],
  });
}
export function SendOrder(req, res) {
  res.send({
    msg: 'https://ant.design/components/select-cn/',
    type: 1,
  });
}
export function getWaybill(req, res) {
  res.send({
    type: 1,
    msg: 'aaa',
  });
}
export function confirmDelivery(req, res) {
  res.send({
    type: 1,
    mes: '成功',
  });
}
export function GetPurchase(req, res) {
  res.send([
    {
      purchaseCode: '15904117250',
      purchaseName: 'ceshi',
    },
    {
      purchaseCode: '15642532058',
      purchaseName: '',
    },
  ]);
}
export function GetDistribution(req, res) {
  res.send([
    {
      distributionCode: '456789',
      distributionName: '分销1',
    },
    {
      distributionCode: '567890',
      distributionName: '分销2',
    },
  ]);
}
