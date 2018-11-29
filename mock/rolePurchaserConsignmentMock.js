// const h = 'http://172.16.10.51:54195/'
export default function rolePurchaserConsignmentMock(url) {
  return {
    // -------- 收货确认 --------------
    // 收货确认 - 列表
    'POST /llback/Warehouse/CollectGoods': url,
    // 操作内商品详情列表
    'POST /llback/Warehouse/CollectGoodsList': url,
    // 操作内 收货确认/提交运单号
    'POST /llback/Warehouse/ConfirmGoods': url,
    // 'POST /llback/Warehouse/ConfirmGoods': 'http://172.16.10.51:54195/',


    // -------- 商品销售 --------------
    // 商品销售-列表查询
    'POST /llback/Sales/GetGoods': url,


    // -------- 合同信息 --------------
    // 代销-财务-合同信息-20181121
    'POST /llback/Agreement/ContractInformation': url,


    // -------- 货款结算 --------------
    // 货款结算 - 列表
    'POST /llback/Balance/GetPayment': url,
    // 货款结算 - 查看结算明细 - 货款
    'POST /llback/Balance/GetPaymentDetailed': url,
    // 货款结算 - 查看结算明细 - 其他
    'POST /llback/Balance/GetPaymentOtherDetailed': url,
    // 货款结算 - 查看结算明细 - 打印
    'POST /llback/Balance/GetPaymentPrinting': url,
  };
}
export function getPayment(req, res) {
  res.send({
    list: [{
      keyId: '1',
      date: '20180101~20180131',
      order: '215451245',
      goMoney: '2000.00',
      tuiMoney: '1000.00',
      elseMoney: '500.00',
      doMoney: '500.00',
      status: 0,
    }, {
      keyId: '2',
      date: '20171201~20171231',
      order: '215451244',
      goMoney: '2000.00',
      tuiMoney: '1000.00',
      elseMoney: '500.00',
      doMoney: '500.00',
      status: 1,
    }],
    pagination: {
      current: 1,
      total: 3,
      pageSize: 10,
    },
    item: {
      money: '50',
      waybillNo: 'ssada',
      settlementNumber: '20180101001',
      supplierName: '岂止科技（大连）有限公司',
      receiptAmount: '壹贰叁肆伍陆柒捌玖拾',
      settlementAccountPeriod: '2018.01.01~2018.01.31',
      contractNumber: 'QZKJ-0001',
      dateOfPrinting: '2018.01.01',
      printer: '胖球1',
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
      status: 0,
      sendType: 1,
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
    }, {
      id: '2',
      status: 1,
      sendType: 1,
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
    }, {
      id: '3',
      sendid: 3,
      status: 0,
      sendType: 2,
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
    }, {
      id: '4',
      sendid: 4,
      status: 1,
      sendType: 2,
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
    }, {
      id: '5',
      status: 2,
      sendType: 2,
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
export function UpdateDistributor(req, res) {
  res.send({
    type: 1,
    mes: '修改成功',
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
    url: 'https://ant.design/components/select-cn/',
  });
}
export function getWaybill(req, res) {
  res.send({
    type: 1,
    mes: 'aaa',
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
