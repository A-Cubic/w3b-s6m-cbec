import request from '../utils/request';
// 获取代理合作方
export async function getPartnerData(params) {
  return request(`/llback/Balance/GetPartner`, {
    method: 'POST',
    body: params,
  });
}
// 获取平台渠道类型
export async function getChannelTypeData(params) {
  return request(`/llback/Distributor/GetPlatform`, {
    method: 'POST',
    body: params,
  });
}
// 获取销售商（渠道商）
export async function getPurchaseData(params) {
  return request(`/llback/Sales/GetPurchase`, {
    method: 'POST',
    body: params,
  });
}
// 仓库 供应商下拉
export async function getSupplier(params) {
  return request(`/llback/Goods/GetSupplier`, {
    method: 'POST',
    body: params,
  });
}
// 获取分销商类型
export async function getDistributorsData(params) {
  return request(`/llback/Sales/GetDistribution`, {
    method: 'POST',
    body: params,
  });
}
// 获取品牌
export async function getBrandData(params) {
  return request(`/llback/Goods/GetBrand`, {
    method: 'POST',
    body: params,
  });
}
// 获取仓库
export async function getWareHouseData(params) {
  return request(`/llback/Goods/GetWarehouse`, {
    method: 'POST',
    body: params,
  });
}


// 获取采购商
export async function getPurchaserArr(params) {
 //return request(`/llback/Goods/getPurchaserArr`, {
  return request(`/llback/Warehouse/DeliveryPurchasersList`, {
    method: 'POST',
    body: params,
  });
}


// 获取快递
export async function getExpressData(params) {
  return request(`/llback/Order/GetExpress`, {
    method: 'POST',
    body: params,
  });
}
// 客商名称
export async function merchantName(params) {
  return request(`/llback/Agreement/SelectUserName`, {
    method: 'POST',
    body: params,
  });
}
// 调整事项
export async function getAdjustmentMatters(params) {
  return request(`/llback/Balance/AdjustmentMatters`, {
    method: 'POST',
    body: params,
  });
}

// 客商编码 客商名 客商类型 客商码
export async function getTypesOfMerchants(params) {
  return request(`/llback/Balance/CustomersInformation`, {
    method: 'POST',
    body: params,
  });
}
