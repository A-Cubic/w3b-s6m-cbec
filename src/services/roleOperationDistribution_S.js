import { stringify } from 'qs';
import request from '../utils/request';

//---------------------------------------------库存管理部分-----------------------------------------
//-----------------库存 - 平台库存 页-----------
//平台库存 - 列表查询
export async function platformStock(params) {
  return request(`/llback/Sales/platformStock`,{
    method: 'POST',
    body: params,
  })
}
//平台库存 - 上传销售数据
export async function getUploadOrderbillDX(params) {
  return request(`/llback/delivery/UploadOrderDXttt`, {
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
  return request(`/llback/delivery/getSubmission`, {
    method: 'POST',
    body: params,
  });
}


 //发货列表 - 删除
 export async function getdeleteDeliveryList(params) {
  return request(`/llback/delivery/getdeleteDeliveryList`, {
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
    return request(`/llback/delivery/getSeeData`, {
      method: 'POST',
      body: params,
    });
  }

  //发货管理-发货列表 - 查看页面 - 分页
  export async function getPagingShipmentListView(params) {
    return request(`/llback/delivery/getPagingShipmentListView`, {
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


//---------------------------------------------合同管理部分-----------------------------------------
//-----------------合同列表 页----------

//-----------------创建合同 页----------

//-----------------查看合同 页----------

//---------------------------------------------财务管理部分-----------------------------------------
//------------------采购结算 页---------
// 采购结算 - 列表
export async function getPaymentSettlementData(params) {
  return request(`/llback/Balance/AA`,{
    method: 'POST',
    body: params,
  })
}
// 采购结算 - 查看结算明细 - 货款
export async function getSettlementDetailsData(params) {
  return request(`/llback/Balance/BB`,{
    method: 'POST',
    body: params,
  })
}
// 采购结算 - 查看结算明细 - 其他
export async function getSettlementDetailsElseData(params) {
  return request(`/llback/Balance/CC`,{
    method: 'POST',
    body: params,
  })
}
// 采购结算 - 打印
export async function getChildModelPrintData(params) {
  return request(`/llback/Balance/DD`,{
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



