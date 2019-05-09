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

// 退款
export async function getReGoodsApply(params) {
  return request(`/llback/Order/ReGoodsApply`, {
    method: 'POST',
    body: params,
  });
}

// 填写运单号
export async function getReGoodsFundId(params) {
  return request(`/llback/Order/ReGoodsFundId`, {
    method: 'POST',
    body: params,
  });
}

// 快递获取
export async function getReGoodsFundIdMessage(params) {
  return request(`/llback/Order/ReGoodsFundIdMessage`, {
    method: 'POST',
    body: params,
  });
}