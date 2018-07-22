import { stringify } from 'qs';
import request from '../utils/request';

// 获取渠道商类型
export async function getChannelTypeData(params) {
  return request(`/llback/Distributor/GetPlatform`, {
    method: 'POST',
    body: params,
  });
}
// 获取渠道管理 - 费用信息
export async function getChannelTable(params) {
  return request(`/llback/Distributor/DistributorList`, {
    method: 'POST',
    body: params,
  });
}
// 渠道管理 - 费用信息 -编辑
export async function editCostChannel(params) {
  return request(`/llback/Distributor/DistributorList`, {
    method: 'POST',
    body: params,
  });
}
// 渠道管理 - 费用信息 -编辑保存
export async function saveCostChannel(params) {
  return request(`/llback/Distributor/UpdateDistributor`, {
    method: 'POST',
    body: params,
  });
}

