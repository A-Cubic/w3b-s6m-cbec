import { stringify } from 'qs';
import request from '../utils/request';

// // 快递获取
// export async function getExpressData(params) {
//   return request(`/llback/Order/GetExpress`, {
//     method: 'POST',
//     body: params,
//   });
// }
// 新增 发货接口
export async function getgoodsData(params) {
  return request(`/llback/Order/GetConsigneeMsg`, {
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

// 导入订单
export async function getUploadOrderbill(params) {
  return request(`/llback/Order/UploadOrder`, {
    method: 'POST',
    body: params,
  });
}
//分销商 - 上传订单
export async function getUploadDistributorsOrderbill(params) {
  return request(`/llback/Order/UploadOrderOfDistribution`, {
    method: 'POST',
    body: params,
  });
}
// 导入运单
export async function getUploadWaybill(params) {
  return request(`/llback/Order/UploadWaybill`, {
    method: 'POST',
    body: params,
  });
}
// 导出运单
export async function getExportWaybill(params) {
  return request(`/llback/Order/ExportWaybill`, {
    method: 'POST',
    body: params,
  });
}
// 导出订单
export async function getExportOrders(params) {
  return request(`/llback/Order/ExportSelectOrder`, {
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
// 分销商 - 扫码支付
export async function getCode(params) {
  return request(`/llback/Order/GetOrderPageQRCode`, {
    method: 'POST',
    body: params,
  });
}
// 运营 - 增加获取海关清关状态数据
export async function getCustoms(params) {
  return request(`/llback/Order/GetCustomsState`, {
    method: 'POST',
    body: params,
  });
}
