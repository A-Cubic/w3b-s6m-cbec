import { stringify } from 'qs';
import request from '../utils/request';


// 销售统计 - 代理- 列表
export async function getSalesStatisticsListA(params) {
  return request(`/llback/Sales/GetSalesListByAgent`, {
    method: 'POST',
    body: params,
  });
}
// 销售统计 - 供应商- 列表
export async function getSalesStatisticsListS(params) {
  return request(`/llback/Sales/GetSalesListBySupplier`, {
    method: 'POST',
    body: params,
  });
}
// 销售统计 - 运营- 列表
export async function getSalesStatisticsListO(params) {
  return request(`/llback/Sales/GetSalesListByOperator`, {
    method: 'POST',
    body: params,
  });
}
// // 获取销售商（渠道商）
// export async function getPurchaseData(params) {
//   return request(`/llback/Sales/GetPurchase`, {
//     method: 'POST',
//     body: params,
//   });
// }
// // 获取分销商类型
// export async function getDistributorsData(params) {
//   return request(`/llback/Sales/GetDistribution`, {
//     method: 'POST',
//     body: params,
//   });
// }
