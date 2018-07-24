import { stringify } from 'qs';
import request from '../utils/request';


// 获取渠道管理 - 费用信息 - 列表
export async function getSalesStatisticsList(params) {
  return request(`/llback/Sales/GetSalesListByAgent`, {
    method: 'POST',
    body: params,
  });
}
