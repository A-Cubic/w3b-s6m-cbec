// const orderManagement = 'http://console.llwell.net/';
export default function goodsManagementMock(url) {
  return {
    // 代销 -商品库存
    'POST /llback/Goods/SelectGoodsList': url,
    // 商品管理 - 商品查看 - 运营/供应商/代理
    'POST /llback/Goods/GetGoodsList': url,
    // 商品管理 - 商品查看详情 - 供应
    'POST /llback/Goods/GetGoods': url,
    // 商品管理 - 商品查看详情 - 运营
    'POST /llback/Goods/GetGoodsForOperator': url,
    // 商品管理 - 商品查看详情 - 运营 - 默认选中供应商
    'POST /llback/Goods/UpdateGoodsSelect': url,
    // 商品管理 - 商品查看详情 - 代理
    'POST /llback/Goods/GetGoodsForAgent': url,
    // 上架审核-商品上架详情
    'POST /llback/Goods/WarehouseGoodsList': url,
    // 上架审核-审核操作
    'POST /llback/Goods/ExamineWarehouseGoods': url,

  };
}


export function getChannelLists(req, res) {
  res.send({
    list: [{
      id: '1',
      usercode: 'admin',
      purchase: '管理员',
      goodsid: '1',
      barcode: '2',
      goodsName: '3',
      slt: '4',
      platformId: '',
      platformType: 'B2B',
      pprice: '2',
      pNum: 3,
      supplierId: '53',
      suppliername: 'qq供货',
      profitPlatform: 0,
      profitAgent: 0,
      profitDealer: 0,
      profitOther1: 0,
      profitOther1Name: '0',
      profitOther2: 0,
      profitOther2Name: '0',
      profitOther3: 0,
      profitOther3Name: '0',
    }],
    pagination: {
      current: 1,
      total: 1,
      pageSize: 10,
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
