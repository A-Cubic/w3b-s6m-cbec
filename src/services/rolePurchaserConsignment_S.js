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


// -------- 数据统计 --------------
//数据统计-列表查询
export async function dataStatistics(params) {
  return request(`/llback/Sales/dataStatistics`,{
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
// 导入订单
export async function getUploadOrderbillDX(params) {
  return request(`/llback/Order/UploadOrderDX`, {
    method: 'POST',
    body: params,
  });
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
  return request(`/llback/Balance/GetPayment`,{
    method: 'POST',
    body: params,
  })
}
// 货款结算 - 查看结算明细 - 货款
export async function getSettlementDetailsData(params) {
  return request(`/llback/Balance/GetPaymentDetailed`,{
    method: 'POST',
    body: params,
  })
}
// 货款结算 - 查看结算明细 - 其他
export async function getSettlementDetailsElseData(params) {
  return request(`/llback/Balance/GetPaymentOtherDetailed`,{
    method: 'POST',
    body: params,
  })
}

export async function getChildModelPrintData(params) {
  return request(`/llback/Balance/GetPaymentPrinting`,{
    method: 'POST',
    body: params,
  })
}
