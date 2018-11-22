import { stringify } from 'qs';
import request from '../utils/request';

// 收货确认
export async function getConfirmReceiptData(params) {
  return request(`/llback/Sales/getConfirmReceiptData`,{
    method: 'POST',
    body: params,
  })
}
//商品销售-列表查询
export async function goodsSales(params) {
  return request(`/llback/Sales/goodsSalesx`,{
    method: 'POST',
    body: params,
  })
}
