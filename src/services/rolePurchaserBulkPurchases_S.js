
import request from '../utils/request';
// -------- 发起询价 --------------





// 发起询价-列表
export async function getInitiateInquiryData(params) {
  return request(`/llback/Warehouse/getInitiateInquiryData`,{
    method: 'POST',
    body: params,
  })
}
// 发起询价- 保存
export async function getPreservationData(params) {
  return request(`/llback/Warehouse/getPreservationData`,{
    method: 'POST',
    body: params,
  })
}
// 发起询价- 导入订单
export async function getUploadOrderbillDX(params) {
  return request(`/llback/Warehouse/getUploadOrderbillDX`,{
    method: 'POST',
    body: params,
  });
}



// -------- 询价列表 --------------
export async function getInquiryListData(params) {
  return request(`/llback/Warehouse/getInquiryListData`,{
    method: 'POST',
    body: params,
  })
}
// -------- 采购列表 --------------
export async function getPurchaseListData(params) {
  return request(`/llback/Warehouse/getPurchaseListData`,{
    method: 'POST',
    body: params,
  })
}

// 查看

export async function childrenCheck(params) {
  return request(`/llback/Warehouse/childrenCheck`, {
    method: 'POST',
    body: params,
  });
}
// -------- 询价列表/采购列表 - 查看列表详情 --------------
export async function getpurchaseOrder(params) {
  return request(`/llback/Warehouse/getpurchaseOrder`, {
    method: 'POST',
    body: params,
  });
}

// -------- 询价列表/采购列表 - 点击详情 --------------
export async function getdetailsCheck(params) {
  return request(`/llback/Warehouse/getdetailsCheck`, {
    method: 'POST',
    body: params,
  });
}