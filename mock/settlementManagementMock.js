// const orderManagement = 'http://console.llwell.net/';
export default function salesStatisticsMock(url) {
  return {
    // 结算管理 - 代理- 列表
    'POST /llback/Settlement/SettlementA': getChannelList,
    // 结算管理 - 供应商- 列表
    'POST /llback/Settlement/SettlementS': getChannelList,
    // 结算管理 - 运营- 列表
    'POST /llback/Settlement/SettlementO': getChannelList,
    // 获取销售商（渠道商）
    'POST /llback/Sales/GetPurchase': url,
    // 获取分销商类型
    'POST /llback/Sales/GetDistribution': url,

  };
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
