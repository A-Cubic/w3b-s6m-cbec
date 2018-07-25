import { stringify } from 'qs';
import request from '../utils/request';


// 获取渠道管理 - 费用信息 - 列表
export async function getSalesStatisticsList(params) {
  return request(`/llback/Sales/GetSalesListByAgent`, {
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
// 获取分销商类型
export async function getDistributorsData(params) {
  return request(`/llback/Sales/GetDistribution`, {
    method: 'POST',
    body: params,
  });
}
