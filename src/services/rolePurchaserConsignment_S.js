import { stringify } from 'qs';
import request from '../utils/request';
// -------- 收货确认 --------------
// 收货确认-列表
export async function getConfirmReceiptData(params) {
  return request(`/llback/Warehouse/CollectGoods`,{
    method: 'POST',
    body: params,
  })
}
// 操作内商品详情列表
export async function getChildModelTableData(params) {
  return request(`/llback/Warehouse/CollectGoodsList`,{
    method: 'POST',
    body: params,
  })
}
// 操作内 收货确认/提交运单号
export async function childModelSubmit(params) {
  return request(`/llback/Warehouse/ConfirmGoods`, {
    method: 'POST',
    body: params,
  })
}


// -------- 商品销售 --------------
//商品销售-列表查询
export async function goodsSales(params) {
  return request(`/llback/Sales/GetGoods`,{
    method: 'POST',
    body: params,
  })
}


// -------- 合同信息 --------------
//代销-财务-合同信息-20181121
export async function contractInformation(params) {
  return request(`/llback/Agreement/ContractInformation`,{
    method: 'POST',
    body: params,
  })
}


// -------- 货款结算 --------------
// 货款结算 - 列表
export async function getPaymentSettlementData(params) {
  return request(`/llback/Sales/getPaymentSettlement`,{
    method: 'POST',
    body: params,
  })
}
// 货款结算 - 查看结算明细 - 货款
export async function getSettlementDetailsData(params) {
  return request(`/llback/Sales/getSettlementDetailsData`,{
    method: 'POST',
    body: params,
  })
}
// 货款结算 - 查看结算明细 - 其他
export async function getSettlementDetailsElseData(params) {
  return request(`/llback/Sales/getSettlementDetailsElseData`,{
    method: 'POST',
    body: params,
  })
}
