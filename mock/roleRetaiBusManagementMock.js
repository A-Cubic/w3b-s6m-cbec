// const orderManagement = 'http://console.llwell.net/';
// const a = 'http://192.168.0.127:54195/';
//const a = 'http://192.168.191.1:54195/';
export default function roleRetaiBusManagementMock(url) {
  return {
   
    // 运营 - 测试
    'POST /llback/Ordera/GetCustomsStateb': GetOrderList,

    // 运营 - 付款  
    'POST /llback/Order/PayOrder': url,

    // 运营 - 充值获取
    'POST /llback/AccountFund/GetRetailMoney': url,

    // 运营 - 充值按钮
    'POST /llback/AccountFund/RetailRecharge': url,

  };
}
export function GetOrderList(req, res) {
  res.send({
    item:{fund:'7777'},    
    list: [{
      keyId: '3004',
      status: '待发货',
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
    imgUrl: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/goodtest.png',
  });
}
export function getWaybill(req, res) {
  res.send({
    type: 1,
    mes: 'aaa',
  });
}
export function getExpress(req, res) {
  res.send([
    {
      expressId: '0',
      expressName: '其他公司',
    },
    {
      expressId: '1',
      expressName: '韵达快递',
    },
  ]);
}
export function confirmDelivery(req, res) {
  res.send({
    type: 1,
    msg: '成功',
  });
}
export function shipmentOverseas(req, res) {
  res.send({
    type: 1,
    msg: 'http://hellorfimg.zcool.cn/preview/179504174.jpg',
  });
}
