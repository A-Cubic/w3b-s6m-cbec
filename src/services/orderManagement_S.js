import { stringify } from 'qs';
import request from '../utils/request';

// 供应商 订单管理
export async function getSupplierOrderTable(params) {
  return request(`/llback/Order/GetOrderList`, {
    method: 'POST',
    body: params,
  });
}
