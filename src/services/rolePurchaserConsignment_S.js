import { stringify } from 'qs';
import request from '../utils/request';

// 收货确认
export async function getConfirmReceiptData(params) {
  return request(`/llback/Sales/getConfirmReceiptData`,{
    method: 'POST',
    body: params,
  })
}
