// const orderManagement = 'http://console.llwell.net/';
export default function orderManagementMock(url) {
  return {
    // 订单管理-获取订单列表
    'POST /llback/Order/GetOrderList': url,
    // 订单管理-查看详细订单
    'POST /llback/Order/GetOrder': url,
    // 订单管理-导出需发货的订单
    'POST /llback/Order/ExportOrder': url,
    // 导入订单信息
    'POST /llback/Order/UploadOrder': url,
    // 导入运单信息
    'POST /llback/Order/UploadWaybill': url,
    // 导出运单信息
    'POST /llback/Order/ExportWaybill': url,
    // 导出订单
    'POST /llback/Order/ExportSelectOrder': url,
    // 确认发货
    'POST /llback/Order/SingleWaybill': url,
    // 海外已出货
    'POST /llback/Order/Overseas': url,
  };
}
export function GetOrderList(req, res) {
  res.send({
    list: [{
      id: '3004',
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
    url: 'https://ant.design/components/select-cn/',
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
    msg: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/templet/Waybill.xlsx',
  });
}
