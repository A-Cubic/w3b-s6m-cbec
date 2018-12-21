
import request from '../utils/request';
// -------- 发起询价 --------------






// 发起询价- 保存
export async function getPreservationData(params) {
  // return request(`/llback/Warehouse/getPreservationData`,{
  return request(`/llback/Purchase/InquiryPreservation`,{
    method: 'POST',
    body: params,
  })
}
// 发起询价- 提交
export async function getSubmissionData(params) {
  //return request(`/llback/Warehouse/getSubmissionData`,{
  return request(`/llback/Purchase/InquirySubmission`,{
    method: 'POST',
    body: params,
  })
}
// 发起询价- 分页
export async function getPagingData(params) {
   //return request(`/llback/Warehouse/getPagingData`,{
  return request(`/llback/Purchase/Goodspagination`,{
    method: 'POST',
    body: params,
  })
}

// 发起询价- 导入订单
export async function getUploadOrderbillDX(params) {
  //return request(`/llback/Warehouse/getUploadOrderbillDX`,{
  return request(`/llback/Purchase/OnLoadGoodsList`,{
    method: 'POST',
    body: params,
  });
}

// 发起询价- 删除
export async function deleteInterface(params) {
   //return request(`/llback/Warehouse/deleteInterface`,{
  return request(`/llback/Purchase/GoodsDelete`,{
    method: 'POST',
    body: params,
  });
}



// -------- 询价列表 --------------
export async function getInquiryListData(params) {
   return request(`/llback/Warehouse/getInquiryListData`,{
  //return request(`/llback/Purchase/InquiryList`,{
    method: 'POST',
    body: params,
  })
}

// 询价列表 - 查看
export async function getSeeData(params) {
  return request(`/llback/Warehouse/getSeeData`,{
  //return request(`/llback/Purchase/InquiryListDetailed`,{
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

// // 查看

// export async function childrenCheck(params) {
//   return request(`/llback/Warehouse/childrenCheck`, {
//     method: 'POST',
//     body: params,
//   });
// }
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