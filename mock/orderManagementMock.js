// const orderManagement = 'http://console.llwell.net/';
export default function orderManagementMock() {
  return {
    // 订单管理-获取订单列表
    'POST /llback/Order/GetOrderList': {
      list: [{
        id: '3004',
        status: '已完成',
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
    },
  };
}
