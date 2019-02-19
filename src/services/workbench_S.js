import { stringify } from 'qs';
import request from '../utils/request';


// 工作台-供应商
export async function getWorkbenchDataS(params) {
  return request(`/llback/Dashboard/GetWorkBenchS`, {
    method: 'POST',
    body: params,
  });
}
// 工作台-运营商
export async function getWorkbenchDataO(params) {
  return request(`/llback/Dashboard/GetWorkBenchO`, {
    method: 'POST',
    body: params,
  });
}

// 工作台 - 供应商 - new
export async function getWorkbenchNewSupplierData(params) {
  return request(`/llback/aaaa/getWorkbenchNewSupplierData`, {
    method: 'POST',
    body: params,
  });
}
