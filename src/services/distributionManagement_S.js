import { stringify } from 'qs';
import request from '../utils/request';


// 分销管理 - 分销商管理 - 列表
export async function getDistributorTable(params) {
  return request(`/llback/Agent/GetDistributionList`, {
    method: 'POST',
    body: params,
  });
}

// 分销管理 - 分销商管理 - 保存、编辑分销商
export async function getUpdateDistributor(params) {
  return request(`/llback/Agent/UpdateDistribution`, {
    method: 'POST',
    body: params,
  });
}
// 分销管理 - 推广二维码
export async function getAgentQRCode(params) {
  return request(`/llback/Agent/GetAgentQRCode`, {
    method: 'POST',
    body: params,
  });
}
