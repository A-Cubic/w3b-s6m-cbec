import { stringify } from 'qs';
import request from '../utils/request';

// 测试
export async function getDemo(params) {
  return request(`/llback/Ordera/GetCustomsStateb`, {
    method: 'POST',
    body: params,
  });
}
// 付款
export async function getPayOrder(params) {
  return request(`/llback/Order/PayOrder`, {
    method: 'POST',
    body: params,
  });
}

// 充值获取页面
export async function GetRetailMoney(params) {
  return request(`/llback/AccountFund/GetRetailMoney`, {
    method: 'POST',
    body: params,
  });
}

// 充值按钮
export async function getPayment(params) {
  return request(`/llback/AccountFund/RetailRecharge`, {
    method: 'POST',
    body: params,
  });
}
