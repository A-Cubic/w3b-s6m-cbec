// const orderManagement = 'http://console.llwell.net/';
export default function channelManagementMock() {
  return {
    // 获取渠道商类型
    'POST /llback/Distributor/GetPlatform': getPlatform,
    // 渠道管理-获取渠道费用列表
    'POST /llback/Distributor/DistributorList': getChannelList,
    // 渠道管理-获取渠道费用列表
    'POST /llback/Distributor/UpdateDistributor': UpdateDistributor,

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
    list: [{
      id: 1,
      usercode: 'admin',
      username: '管理员',
      platformId: 1,
      platformType: '渠道1',
      platformCostType: 1,
      priceType: 1,
      platformCost: 2,
    }],
    pagination: {
      current: 1,
      total: 8,
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
export function shipmentOverseas(req, res) {
  res.send({
    type: 1,
    mes: '成功',
  });
}
