import { stringify } from 'qs';
import request from '../utils/request';

// 快递获取
export async function getExpressData(params) {
  return request(`/llback/Order/GetExpress`, {
    method: 'POST',
    body: params,
  });
}
// 供应商 订单管理
export async function getSupplierOrderTable(params) {
  return request(`/llback/Order/GetOrderList`, {
    method: 'POST',
    body: params,
  });
}
// 供应商 订单管理-查看
export async function getSupplierOrderChildCheck(params) {
  return request(`/llback/Order/GetOrder`, {
    method: 'POST',
    body: params,
  });
}
// 供应商 导出需发货的订单
export async function getDownloadToSendOrder(params) {
  return request(`/llback/Order/ExportOrder`, {
    method: 'POST',
    body: params,
  });
}
// 供应商 导入运单
export async function getUploadWaybill(params) {
  return request(`/llback/Order/UploadWaybill`, {
    method: 'POST',
    body: params,
  });
}
// 确认发货
export async function confirmDelivery(params) {
  return request(`/llback/Order/SingleWaybill`, {
    method: 'POST',
    body: params,
  });
}
// 海外已出货
export async function shipmentOverseas(params) {
  return request(`/llback/Order/Overseas`, {
    method: 'POST',
    body: params,
  });
}
