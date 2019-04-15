import { stringify } from 'qs';
import request from '../utils/request';
//---------------------------------------------报表管理-----------------------------------------
//-----------------销售日报表 页----------
//销售日报表 - 列表查询
export async function salesDayReport(params) {
  return request(`/llback/Warehouse/salesDayReport`,{
    method: 'POST',
    body: params,
  })
}
//-----------------------------平台-财务角色-结算管理-----------------------------
//供货结算 -获取数据
export async function getsupplySettlementDate(params) {
  return request(`/llback/Balance/SupplySettlement`,{
    method: 'POST',
    body: params,
  })
}
//供货结算 -确认付款
export async function getSupplySettlementSubmit(params) {
  return request(`/llback/Balance/SupplySettlementSubmit`,{
    method: 'POST',
    body: params,
  })
}
//供货结算 -结算明细
export async function getSupplySettlementDetails(params) {
  return request(`/llback/Balance/SupplySettlementDetails`,{
    method: 'POST',
    body: params,
  })
}

//采购结算 -获取数据
export async function getNewPurchaseSettlementDate(params) {
  return request(`/llback/Balance/NewPurchaseSettlement`,{
    method: 'POST',
    body: params,
  })
}