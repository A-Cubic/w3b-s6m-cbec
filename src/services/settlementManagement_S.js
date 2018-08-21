import { stringify } from 'qs';
import request from '../utils/request';

// 结算管理 - 运营- 列表
export async function getSettlementListO(params) {
  return request(`/llback/Settlement/SettlementO`, {
    method: 'POST',
    body: params,
  });
}
// 结算管理 - 供应商- 列表
export async function getSettlementListS(params) {
  return request(`/llback/Settlement/SettlementS`, {
    method: 'POST',
    body: params,
  });
}

// 结算管理 - 代理- 列表
export async function getSettlementListA(params) {
  return request(`/llback/Settlement/SettlementA`, {
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
