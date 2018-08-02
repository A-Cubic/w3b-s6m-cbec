import { stringify } from 'qs';
import request from '../utils/request';
// 商品管理 - 商品查看 - 运营/供应商/代理
export async function getGoodsList(params) {
  return request(`/llback/Goods/GetGoodsList`, {
    method: 'POST',
    body: params,
  });
}
// 商品管理 - 商品查看详情 - 供应商
export async function getGoodsDetailsS(params) {
  return request(`/llback/Goods/GetGoods`, {
    method: 'POST',
    body: params,
  });
}
// 商品管理 - 商品查看详情 - 运营
export async function getGoodsDetailsO(params) {
  return request(`/llback/Goods/GetGoodsForOperator`, {
    method: 'POST',
    body: params,
  });
}
// 商品管理 - 商品查看详情 - 运营 - 默认选中供应商
export async function getDefaultRadios(params) {
  return request(`/llback/Goods/UpdateGoodsSelect`, {
    method: 'POST',
    body: params,
  });
}
// 商品管理 - 商品查看详情 - 代理（同供应商）
export async function getGoodsDetailsA(params) {
  return request(`/llback/Goods/GetGoods`, {
    method: 'POST',
    body: params,
  });
}

// 上架审核-商品上架详情
export async function getGoodsDetails(params) {
  return request(`/llback/Goods/WarehouseGoodsList`, {
    method: 'POST',
    body: params,
  });
}
// 上架审核-审核操作
export async function onAudit(params) {
  return request(`/llback/Goods/ExamineWarehouseGoods`, {
    method: 'POST',
    body: params,
  });
}
