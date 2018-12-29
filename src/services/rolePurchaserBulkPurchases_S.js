
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
 // return request(`/llback/Warehouse/getSubmissionData`,{
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
// 询价列表 - 删除
export async function deleteList(params) {
 // return request(`/llback/Warehouse/deleteList`,{
  return request(`/llback/Purchase/InquiryListDelete`,{
    method: 'POST',
    body: params,
  })
}
// 询价列表 - 查看
export async function getSeeData(params) {
  return request(`/llback/Warehouse/getSeeData`,{
 // return request(`/llback/Purchase/InquiryListDetailed`,{
    method: 'POST',
    body: params,
  })
}
// 询价列表 - 询价中   
export async function getlistInquiry(params) {
  //return request(`/llback/Warehouse/getlistInquiry`,{
  return request(`/llback/Purchase/InquiryListDetailed`,{
    method: 'POST',
    body: params,
  })
}
// 询价列表 - 报价中   llback/Purchase/OtherGoodsDetails
export async function getquotedPrice(params) {
  //return request(`/llback/Warehouse/getquotedPrice`,{
  return request(`/llback/Purchase/InquiryListDetailed`,{
    method: 'POST',
    body: params,
  })
}

//  询价列表 - 报价中-点击详情 
export async function getAllListdetails(params) {
  //return request(`/llback/Warehouse/getAllListdetails`, {
  return request(`/llback/Purchase/OtherGoodsDetails`, {
    method: 'POST',
    body: params,
  });
}
//  // 询价列表-已报价(二次) - 立即下单
export async function getPlaceAnOrder(params) {
  //return request(`/llback/Warehouse/getPlaceAnOrder`, {
   return request(`/llback/Purchase/OfferSub`, {
     method: 'POST',
     body: params,
   });
 }
//  // 询价列表-已报价
export async function getquotedPriceOver(params) {
  return request(`/llback/Warehouse/getquotedPriceOver`, {
  // return request(`/llback/Purchase/InquiryListDetailed`, {
     method: 'POST',
     body: params,
   });
 }
//  询价列表 - 已报价-点击详情 
export async function completedDetails(params) {
  //return request(`/llback/Warehouse/completedDetails`, {
   return request(`/llback/Purchase/GoodsDetails`, {
     method: 'POST',
     body: params,
   });
 }


 //  询价列表 - 已报价-删除
export async function getQuotedPriceDel(params) {
  return request(`/llback/Warehouse/getQuotedPriceDel`, {
  // return request(`/llback/Purchase/InquiryGoodsDelete`, {
     method: 'POST',
     body: params,
   });
 }
// 询价列表-已报价 - 提交
 export async function getOffer(params) {
  //return request(`/llback/Warehouse/getOffer`, {
   return request(`/llback/Purchase/OfferSub`, {
     method: 'POST',
     body: params,
   });
 }

// 询价列表-已报价 - 取消
export async function getCancel(params) {
 //return request(`/llback/Warehouse/getCancel`, {
   return request(`/llback/Purchase/OfferCancel`, {
     method: 'POST',
     body: params,
   });
 }

// 询价列表-已报价 - 改变采购数量
export async function getChangeNum(params) {
  return request(`/llback/Warehouse/getChangeNum`, {
   // return request(`/llback/Purchase/GoodsDetailsDetermine`, {
      method: 'POST',
      body: params,
    });
  }


// -------- 采购列表 --------------
export async function getPurchaseListData(params) {
  //return request(`/llback/Warehouse/getPurchaseListData`,{
 return request(`/llback/Purchase/PurchaseList`,{
   method: 'POST',
   body: params,
 })
}


//  采购列表 - 查看   询价列表/
export async function getpurchaseOrder(params) {
 // return request(`/llback/Purchase/PurchaseDetails`,{
  return request(`/llback/Purchase/PurchaseDetails`, {
    method: 'POST',
    body: params,
  });
}


//  询价列表/采购列表 - 点击详情 


export async function getClickDetails(params) {
  //return request(`/llback/Warehouse/getClickDetails`, {
  return request(`/llback/Purchase/OtherGoodsDetails`, {
    method: 'POST',
    body: params,
  });
}

//  采购列表- 分页 
export async function getpurchasepaging(params) {
  //return request(`/llback/Warehouse/getClickDetails`, {
// return request(`/llback/Purchase/getpurchasepaging`, {
  return request(`/llback/Purchase/OtherInquiryPagesn`, {
    method: 'POST',
    body: params,
  });
}