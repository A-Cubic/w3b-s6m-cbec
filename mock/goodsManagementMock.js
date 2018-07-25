// const orderManagement = 'http://console.llwell.net/';
export default function goodsManagementMock() {
  return {
    // 获取渠道商类型
    'POST /llback/Goods/WarehouseGoodsList': getChannelList,
    // 上架审核-审核操作
    'POST /llback/Goods/ExamineWarehouseGoods': shipmentOverseas,

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
    logId: '3',
    username: '管理员',
    goodsUrl: '',
    goodsImgUrl: '',
    warehouseGoodsList: [
      {
        id: '1118',
        barcode: '4580012350011',
        goodsName: '翡翠皂 NN 100g',
        wname: '大连仓',
        inprice: 185.9,
        goodsnum: 1000,
        status: '等待审核',
      },
      {
        id: '1119',
        barcode: '4580012350022',
        goodsName: '',
        wname: '大连仓',
        inprice: 200,
        goodsnum: 2000,
        status: '等待补全信息',
      },
      {
        id: '1120',
        barcode: '4580012350033',
        goodsName: '',
        wname: '大连仓',
        inprice: 300,
        goodsnum: 3000,
        status: '等待补全信息',
      },
      {
        id: '1121',
        barcode: '4580012350044',
        goodsName: '',
        wname: '大连仓',
        inprice: 400,
        goodsnum: 4000,
        status: '等待补全信息',
      },
    ],
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
