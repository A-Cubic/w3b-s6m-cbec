// const orderManagement = 'http://192.168.0.127:54195/';
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
    // 获取采购商信息（运营发货单）
    'POST /llback/Warehouse/DeliveryPurchasersList': url,
    // 客商名称
    'POST /llback/Agreement/SelectUserName': url,
    // 调整事项
     'POST /llback/Balance/AdjustmentMatters': url,
    //'POST /llback/Balance/DD': DD,
    // 客商编码 客商名 客商类型 客商码
    'POST /llback/Balance/CustomersInformation': url,
    //'POST /llback/Balance/EE': EE,
  };
}
export function getPlatform(req, res) {
  res.send([
    {
      usercode: '0',
      getName: '合作方一',
    },
    {
      usercode: '1',
      getName: '合作方二',
    },
    {
      usercode: '2',
      getName: 'cgs',
    },
  ]);
}


export function bb(req, res) {
  res.send([
    '大连仓D',
    '大连仓H',
    '日本直邮仓',
    '日本直邮仓D',
    '旭景仓',
    '测试库',
    '重庆保税',
    '重庆保税仓D',
    '韩国仓2',
    '韩国直邮仓D',
    '香港仓',
    '香港仓D',

  ]);
}
