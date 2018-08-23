// const orderManagement = 'http://console.llwell.net/';
export default function publicDictionaryMock(url) {
  return {
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
  };
}
