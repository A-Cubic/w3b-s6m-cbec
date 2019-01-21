import { stringify } from 'qs';
import request from '../utils/request';

//---------------------------------------------库存管理部分-----------------------------------------
//-----------------库存 - 平台库存 页-----------
//平台库存 - 列表查询
export async function platformStock(params) {
  //return request(`/llback/Sales/platformStock`,{
  return request(`/llback/Warehouse/PlatformInventory`,{
    method: 'POST',
    body: params,
  })
}
//平台库存 - 上传销售数据
export async function getUploadOrderbillDX(params) {
  // return request(`/llback/delivery/UploadOrderDXttt`, {
  return request(`/llback/Warehouse/OnloadWarehousingGoods`, {
    method: 'POST',
    body: params,
  });
}
//平台库存 - 删除
export async function deleteList(params) {
  return request(`/llback/Sales/deleteList`, {
    method: 'POST',
    body: params,
  });
}

//-----------------库存 - 门店库存 页-----------
// //获取列表
export async function storesStock(params) {
  // return request(`/llback/Sales/deleteList`, {
  return request(`/llback/Warehouse/StoreInventory`, {
    method: 'POST',
    body: params,
  });
}

//---------------------------------------------发货管理部分-----------------------------------------
//-----------------发货单表单 页---------------

//-----------------我要发货---------------
 //我要发货- 导入询价商品
export async function deliverGoodsuploadOrderbill(params) {
 //  return request(`/llback/delivery/deliverGoodsuploadOrderbill`, {
  return request(`/llback/Warehouse/OperationDeliveryImport`, {
    method: 'POST',
    body: params,
  });
}
 //我要发货- 删除
export async function deleteGoodsList(params) {
  // return request(`/llback/delivery/deleteGoodsList`, {
  return request(`/llback/Warehouse/DeliverGoodsDelete`, {
    method: 'POST',
    body: params,
  });
}

 //我要发货- 分页
 export async function getPaging(params) {
   //return request(`/llback/delivery/getPaging`, {
   return request(`/llback/Warehouse/DeliverGoodsList`, {
    method: 'POST',
    body: params,
  });
}


 //我要发货- 提交
 export async function getDeliverGoods(params) {
  // return request(`/llback/delivery/getDeliverGoods`, {
  return request(`/llback/Warehouse/DeliverOrderSubmission`, {
    method: 'POST',
    body: params,
  });
}
 //我要发货- 保存
 export async function getDeliverGoodsSave(params) {
  // return request(`/llback/delivery/getDeliverGoodsSave`, {
  return request(`/llback/Warehouse/DeliverOrderConserve`, {
    method: 'POST',
    body: params,
  });
}
 //我要发货- 改变数量
 export async function getChangeNum(params) {
  // return request(`/llback/delivery/getChangeNum`, {
  return request(`/llback/Warehouse/DeliverGoodsNum`, {
    method: 'POST',
    body: params,
  });
}

 ////我要发货- 选择发货商品 跳页接口
 export async function getchooseShipment(params) {
  //return request(`/llback/delivery/getchooseShipment`, {
  return request(`/llback/Warehouse/ChooseDeliverGoods`, {
   method: 'POST',
   body: params,
 });
}
 ////我要发货- 选择发货商品 勾选
 export async function getChecklist(params) {
 // return request(`/llback/delivery/getChecklist`, {
  return request(`/llback/Warehouse/ChooseGoods`, {
   method: 'POST',
   body: params,
 });
}


//-----------------发货管理-选择发货商品 --------------
//发货管理-选择发货商品 - 获取数据
export async function getChooseShipmentData(params) {
  // return request(`/llback/delivery/getChooseShipmentData`, {
  return request(`/llback/Warehouse/ChooseDeliverGoods`, {
    method: 'POST',
    body: params,
  });
}
export async function getChooseShipmentQueryData(params) {
  // return request(`/llback/delivery/getChooseShipmentData`, {
  return request(`/llback/Warehouse/ChooseDeliverGoods`, {
    method: 'POST',
    body: params,
  });
}

//-----------------发货管理- 发货列表 --------------

 // 发货列表-获取data列表 翻页，查询等
export async function getDeliveryListData(params) {
 // return request(`/llback/delivery/getDeliveryListData`, {
  return request(`/llback/Warehouse/DeliverOrderList`, {
    method: 'POST',
    body: params,
  });
}


 // 发货列表-提交
 export async function getSubmission(params) {
  // return request(`/llback/delivery/getSubmission`, {
  return request(`/llback/Warehouse/DeliverOrderDetails`, {
    method: 'POST',
    body: params,
  });
}


 //发货列表 - 删除
 export async function getdeleteDeliveryList(params) {
  // return request(`/llback/delivery/getdeleteDeliveryList`, {
  return request(`/llback/Warehouse/DeliverOrderListDelete`, {
    method: 'POST',
    body: params,
  });
}


  //-----------------发货管理-发货列表 - 查看页面 --------------
  //发货管理-发货列表 - 查看页面 - 获取数据
  export async function getShipmentListViewData(params) {
    return request(`/llback/delivery/getShipmentListViewData`, {
      method: 'POST',
      body: params,
    });
  }

  //发货管理-发货列表 - 点击查看
  export async function getSeeData(params) {
    // return request(`/llback/delivery/getSeeData`, {
    return request(`/llback/Warehouse/DeliverOrderDetails`, {
      method: 'POST',
      body: params,
    });
  }

  //发货管理-发货列表 - 查看页面 - 分页
  export async function getPagingShipmentListView(params) {
    // return request(`/llback/delivery/getPagingShipmentListView`, {
    return request(`/llback/Warehouse/DeliverOrderList`, {
      method: 'POST',
      body: params,
    });
  }



   //发货管理-发货列表 - 撤回
   export async function getWithdraw(params) {
    // return request(`/llback/delivery/getWithdraw`, {
    return request(`/llback/Warehouse/DeliverOrderListWithdraw`, {
      method: 'POST',
      body: params,
    });
  }

//-----------------选择商品返回发货单（带参） 页--

//-----------------发货列表 页----------------

//-----------------发货列表- 查看发货单 页------

//---------------------------------------------销售管理部分-----------------------------------------
//-----------------门店销售//（查看弹窗） 页-----
// //获取列表
export async function storesSales(params) {
   //return request(`/llback/Sales/storesSales`, {
  return request(`/llback/Sales/ShopSalseOrders`, {
    method: 'POST',
    body: params,
  });
}
// 查看 弹窗
export async function storesSalesClickList(params) {
 // return request(`/llback/Sales/storesSalesClickList`, {
 return request(`/llback/Sales/ShopSalseOrdersDetails`, {
   method: 'POST',
   body: params,
 });
}



//---------------------------------------------合同管理部分-----------------------------------------
//-----------------合同列表 页----------
// //获取列表
export async function getAgreementListData(params) {
return request(`/llback/Agreement/ContractList`, {
 // return request(`/llback/Sales/getAgreementListData`, {
   method: 'POST',
   body: params,
 });
}
// 查看跳页
export async function agreementListSee(params) {
 return request(`/llback/Agreement/ContractDetails`, {
  //return request(`/llback/Sales/getAgreementListData`, {
   method: 'POST',
   body: params,
 });
}

//-----------------创建合同 页----------
export async function getcreateAgreementData(params) {
//return request(`/llback/Sales/getCheckAgreementData`, {
  return request(`/llback/Agreement/getcreateAgreementData`, {
    method: 'POST',
    body: params,
  });
}


//-----------------查看合同 页----------
export async function getCheckAgreementData(params) {
//return request(`/llback/Sales/getCheckAgreementData`, {
  return request(`/llback/Agreement/ContractDetails`, {
   method: 'POST',
   body: params,
 });
}
export async function getImg(params) {
  //return request(`/llback/Sales/getCheckAgreementData`, {
    return request(`/llback/Agreement/getImg`, {
     method: 'POST',
     body: params,
   });
  }
//---------------------------------------------财务管理部分-----------------------------------------
//------------------采购结算 页---------
// 采购结算 - 列表
export async function getPaymentSettlementData(params) {
  // return request(`/llback/Balance/AA`,{
  return request(`/llback/Balance/PurchasePayment`,{
    method: 'POST',
    body: params,
  })
}
// 采购结算 - 查看结算明细 - 货款
export async function getSettlementDetailsData(params) {
 // return request(`/llback/Balance/BB`,{
  return request(`/llback/Balance/GetPaymentDetailed`,{
    method: 'POST',
    body: params,
  })
}
// 采购结算 - 查看结算明细 - 其他
export async function getSettlementDetailsElseData(params) {
  // return request(`/llback/Balance/CC`,{
  return request(`/llback/Balance/GetPaymentOtherDetailed`,{  
    method: 'POST',
    body: params,
  })
}
// 采购结算 - 打印
export async function getChildModelPrintData(params) {
 // return request(`/llback/Balance/DD`,{
  return request(`/llback/Balance/PurchasePayment`,{
    method: 'POST',
    body: params,
  })
}
// 采购结算 - 完成对账
export async function changeStatusCompleteReconciliation(params) {
  return request(`/llback/Balance/EE`,{
    method: 'POST',
    body: params,
  })
}


//------------------手动调账（查看） 页---

// 手动调账 - 列表
export async function getManualTransferData(params) {
  return request(`/llback/Balance/getManualTransferData`,{
    method: 'POST',
    body: params,
  })
}// 手动调账 - 保存 手动调账单
export async function saveCreatOrder(params) {
  return request(`/llback/Balance/saveCreatOrder`,{
    method: 'POST',
    body: params,
  })
}

