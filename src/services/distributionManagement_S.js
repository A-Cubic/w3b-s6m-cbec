import { stringify } from 'qs';
import request from '../utils/request';


// 分销管理 - 分销商管理 - 列表
export async function getDistributorTable(params) {
  return request(`/llback/Agent/getDistributorList`, {
    method: 'POST',
    body: params,
  });
}
