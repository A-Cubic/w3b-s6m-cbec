// const orderManagement = 'http://console.llwell.net/';
export default function publicDictionaryMock(url) {
  return {
    // 获取代理合作方
    'POST /llback/Balance/GetPartner': url,
    // 获取平台渠道
    'POST /llback/Distributor/GetPlatform': url,
    // 获取销售商（渠道商）
    'POST /llback/Sales/GetPurchase': url,
    // 获取供应商
    'POST /llback/Goods/GetSupplier': url,
    // 获取分销商
    'POST /llback/Sales/GetDistribution': url,
    // 获取品牌
    'POST /llback/Goods/GetBrand': url,
    // 获取仓库
    'POST /llback/Goods/GetWarehouse': url,
    // 获取快递
    'POST /llback/Order/GetExpress': url,
    // 发货管理-选择商品-获取仓库
    'POST /llback/Goods/getGoodsWareHouse': bb,

    // 发货管理-我要发货-采购商
   // 'POST /llback/Goods/getPurchaserArr': getPlatform,
    // 'POST /llback/Warehouse/DeliveryPurchasersList':'http://192.168.191.1:54195/',
    'POST /llback/Warehouse/DeliveryPurchasersList':'http://192.168.0.127:54195/',
    
  };
}
export function getPlatform(req, res) {
  res.send([
    {
      platformId: '0',
      platformType: '合作方一',
    },
    {
      platformId: '1',
      platformType: '合作方二',
    },
    {
      platformId: '2',
      platformType: 'cgs',
    },
  ]);
}
export function bb(req, res) {
  res.send([
    "大连仓D",
    "大连仓H",
    "日本直邮仓",
    "日本直邮仓D",
    "旭景仓",
    "测试库",
    "重庆保税",
    "重庆保税仓D",
    "韩国仓2",
    "韩国直邮仓D",
    "香港仓",
    "香港仓D"
  
  ]);
}