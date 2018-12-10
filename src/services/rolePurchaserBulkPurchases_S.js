
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

// -------- 采购列表 --------------

