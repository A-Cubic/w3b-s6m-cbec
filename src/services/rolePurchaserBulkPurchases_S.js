
import request from '../utils/request';
// -------- 发起询价 --------------

// 发起询价-列表
export async function getInitiateInquiryData(params) {
  return request(`/llback/Warehouse/a`,{
    method: 'POST',
    body: params,
  })
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
