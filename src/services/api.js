import { stringify } from 'qs';
import request from '../utils/request';

// const apiUrl = process.env.NODE_ENV === 'development' ? '' : 'http://api.llwell.net';
const apiUrl = process.env.NODE_ENV === 'development' ? '' : 'http://console.llwell.net';
const uploadUrl = process.env.NODE_ENV === 'development' ? 'http://console.llwell.net' : '';


export function getUploadUrl() {
  return `${uploadUrl}/llback/Upload/Temp`;
}

export function getCurrentUrl(oriUrl) {
  return `${apiUrl}${oriUrl}`;
}
export async function queryProjectNotice() {
  return request('/api/project/notice');
}
export async function queryActivities() {
  return request('/api/activities');
}
export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
export async function queryTags() {
  return request('/api/tags');
}
export async function queryBasicProfile() {
  return request('/api/profile/basic');
}
export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}
export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}
export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function getNotices() {
  return request(`${apiUrl}/llback/user/message/list`, {
    method: 'POST',
  });
}
export async function getMenu() {
  return request(`${apiUrl}/llback/user/menu`, {
    method: 'POST',
  });
}
export async function realAccountLogin(params) {
  return request(`${apiUrl}/llback/user/validate`, {
    method: 'POST',
    body: params,
  });
}
///////////////////////////////////////////////////////////////////////////////// 注册 部分 /////////////////////////////////////////////////////////////////////////
export async function realRegisterCode(params) {
  return request(`${apiUrl}/llback/user/register/code`, {
    method: 'POST',
    body: params,
  });
}
export async function realRenameCode(params) {
  return request(`${apiUrl}/llback/user/register/renamecode`, {
    method: 'POST',
    body: params,
  });
}
export async function realRegisterSubmit(params) {
  return request(`${apiUrl}/llback/user/register/submit`, {
    method: 'POST',
    body: params,
  });
}
export async function realChangenameSubmit(params) {
  return request(`/llback/user/register/renameNew`,{
    method: 'POST',
    body: params,
  })
}
export async function realRenameSubmit(params) {
  return request(`${apiUrl}/llback/user/register/rename`, {
    method: 'POST',
    body: params,
  });
}
export async function realRegisterUpload(params) {
  return request(`${apiUrl}/llback/user/register/upload`, {
    method: 'POST',
    body: params,
  });
}
export async function realRegisterStatus() {
  return request(`${apiUrl}/llback/user/register/status`, {
    method: 'POST',
  });
}
export async function realRegisterCheck(params) {
    return request(`${apiUrl}/llback/user/register/check`, {
      method: 'POST',
      body: params,
    });
}
export async function getRegisterCheckUsers(params) {
  return request(`${apiUrl}/llback/user/member/pagelist`, {
    method: 'POST',
    body: params,
  });
}
///////////////////////////////////////////////////////////////////////////////// member 部分 /////////////////////////////////////////////////////////////////////////
export async function getMemberInfoList(params) {
  return request(`${apiUrl}/llback/user/member/info/list`, {
    method: 'POST',
    body: params,
  });
}
export async function updateUserStatus(params) {
  return request(`${apiUrl}/llback/user/member/update/status`, {
    method: 'POST',
    body: params,
  });
}
export async function getMemberInfoDetails(params) {
  return request(`${apiUrl}/llback/user/member/info/details`, {
    method: 'POST',
    body: params,
  });
}
///////////////////////////////////////////////////////////////////////////////// 采购单 部分  start/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////// 总接口 /////////////////////////////////////////////////////////////////////////
export async function listChat(params) {
  return request(`${apiUrl}/llback/purchase/chat/list`, {
    method: 'POST',
    body: params,
  });
}

export async function sendChat(params) {
  return request(`${apiUrl}/llback/purchase/chat/send`, {
    method: 'POST',
    body: params,
  });
}
export async function updateStage(params) {
  return request(`${apiUrl}/llback/purchase/update/stage`, {
    method: 'POST',
    body: params,
  });
}

///////////////////////////////////////////////////////////////////////////////// 客服 /////////////////////////////////////////////////////////////////////////
export async function getPurOrderListOfOperate(params) {
  return request(`${apiUrl}/llback/purchase/operate/list`, {
    method: 'POST',
    body: params,
  });
}
export async function getPurGoodsListOfOperate(params) {
  return request(`${apiUrl}/llback/purchase/operate/goods`, {
    method: 'POST',
    body: params,
  });
}
export async function getPurInfoDetailsOfOperate(params) {
  return request(`${apiUrl}/llback/purchase/operate/info/details`, {
    method: 'POST',
    body: params,
  });
}
export async function updateFeeOfOperate(params) {
  return request(`${apiUrl}/llback/purchase/operate/update/fee`, {
    method: 'POST',
    body: params,
  });
}
export async function updatePriceOfOperate(params) {
  return request(`${apiUrl}/llback/purchase/operate/update/price`, {
    method: 'POST',
    body: params,
  });
}
export async function supplyListOfOperate(params) {
  return request(`${apiUrl}/llback/purchase/operate/supply/list`, {
    method: 'POST',
    body: params,
  });
}
export async function updateSupplyFlagOfOperate(params) {
  return request(`${apiUrl}/llback/purchase/operate/supply/flag`, {
    method: 'POST',
    body: params,
  });
}

///////////////////////////////////////////////////////////////////////////////// 采购商 /////////////////////////////////////////////////////////////////////////
export async function getPurOrderListOfPurchasers(params) {
  return request(`${apiUrl}/llback/purchase/purchasers/list`, {
    method: 'POST',
    body: params,
  });
}
export async function getPurInfoDetailsOfPurchasers(params) {
  return request(`${apiUrl}/llback/purchase/purchasers/info/details`, {
    method: 'POST',
    body: params,
  });
}
export async function updatePriceOfPurchasers(params) {
  return request(`${apiUrl}/llback/purchase/purchasers/update/price`, {
    method: 'POST',
    body: params,
  });
}
export async function getPurGoodsListOfPurchasers(params) {
  return request(`${apiUrl}/llback/purchase/purchasers/goods`, {
    method: 'POST',
    body: params,
  });
}
export async function goodsList(params) {
  return request(`${apiUrl}/llback/goods/purchasers/list`, {
    method: 'POST',
    body: params,
  });
}
export async function goodsListOfSupplier(params) {
  return request(`${apiUrl}/llback/goods/supplier/list`, {
    method: 'POST',
    body: params,
  });
}
export async function savePurOrder(params) {
  return request(`${apiUrl}/llback/purchase/add`, {
    method: 'POST',
    body: params,
  });
}
export async function addPurGoods(params) {
  return request(`${apiUrl}/llback/purchase/goods/add`, {
    method: 'POST',
    body: params,
  });
}
export async function getSendType(params) {
  return request(`${apiUrl}/llback/goods/sendtype`, {
    method: 'POST',
    body: params,
  });
}


export async function splitPurGoods(params) {
  return request(`${apiUrl}/llback/purchase/split `, {
    method: 'POST',
    body: params,
  });
}
export async function addPurNewGoods(params) {
  return request(`${apiUrl}/llback/purchase/goods/addnew`, {
    method: 'POST',
    body: params,
  });
}
export async function delPurGoods(params) {
  return request(`${apiUrl}/llback/purchase/goods/del`, {
    method: 'POST',
    body: params,
  });
}
///////////////////////////////////////////////////////////////////////////////// 供应商 /////////////////////////////////////////////////////////////////////////
export async function getPurOrderListOfSupplier(params) {
  return request(`${apiUrl}/llback/purchase/supplier/list`, {
    method: 'POST',
    body: params,
  });
}
export async function getPurInfoDetailsOfSupplier(params) {
  return request(`${apiUrl}/llback/purchase/supplier/info/details`, {
    method: 'POST',
    body: params,
  });
}
export async function getPurGoodsListOfSupplier(params) {
  return request(`${apiUrl}/llback/purchase/supplier/inquiry`, {
    method: 'POST',
    body: params,
  });
}
export async function updatePriceOfSupplier(params) {
  return request(`${apiUrl}/llback/purchase/supplier/update/price`, {
    method: 'POST',
    body: params.listGoods,
  });
}

///////////////////////////////////////////////////////////////////////////////// 采购单 部分  end/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////// 商品报价 部分 begin /////////////////////////////////////////////////////////////////////////
export async function getOfferOfSupplier(params) {
  return request(`${apiUrl}/llback/goods/supplier/offerinfo`, {
    method: 'POST',
    body: params,
  });
}

export async function updateOfferflagOfSupplier(params) {
  return request(`${apiUrl}/llback/goods/supplier/updateofferflag`, {
    method: 'POST',
    body: params,
  });
}
export async function offerbyid(params) {
  return request(`${apiUrl}/llback/goods/supplier/offerbyid`, {
    method: 'POST',
    body: params,
  });
}

export async function updatePurchaseStatus(params) {
  return request(`${apiUrl}/llback/purchase/update`, {
    method: 'POST',
    body: params,
  });
}
export async function updateOfferOfSupplier(params) {
  return request(`${apiUrl}/llback/goods/supplier/updateoffer`, {
    method: 'POST',
    body: params,
  });
}
export async function insertOfferOfSupplier(params) {
  return request(`${apiUrl}/llback/goods/supplier/offer`, {
    method: 'POST',
    body: params,
  });
}
///////////////////////////////////////////////////////////////////////////////// 商品报价 部分  end/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////// 商品 部分  begin/////////////////////////////////////////////////////////////////////////
// export async function getBrandData(params) {
//   return request(`/llback/Goods/GetBrand`, {
//     method: 'POST',
//     body: params,
//   });
// }
// export async function getWareHouseData(params) {
//
//   return request(`/llback/Goods/GetWarehouse`, {
//     method: 'POST',
//     body: params,
//   });
// }
// export async function getGoodsList(params) {
//   return request(`/llback/Goods/GetGoodsList`, {
//     method: 'POST',
//     body: params,
//   });
// }
// export async function getgoodsDetail(params) {
//   return request(`/llback/Goods/GetGoods`, {
//     method: 'POST',
//     body: params,
//   });
// }
export async function downloadStoreTempUrl(params) {
  return request(`/llback/Goods/downloadStoreTempUrl`, {
    method: 'POST',
    body: params,
  });
}

export async function downloadGoodsTempUrl(params) {
  return request(`/llback/Goods/downloadGoodsTempUrl`, {
    method: 'POST',
    body: params,
  });
}
export async function downloadPicZipUrl(params) {
  return request(`/llback/Goods/downloadPicZipUrl`, {
    method: 'POST',
    body: params,
  });
}
//仓库列表
export async function getWarehouseList(params) {
  return request(`/llback/Goods/GetWarehouseList`, {
    method: 'POST',
    body: params,
  });
}
// // 仓库 供应商下拉
// export async function getSupplier(params) {
//   return request(`/llback/Goods/GetSupplier`, {
//     method: 'POST',
//     body: params,
//   });
// }
//仓库 新增编辑保存
export async function getUpdateWarehouse(params) {
  return request(`/llback/Goods/UpdateWarehouse`, {
    method: 'POST',
    body: params,
  });
}
//仓库 删除
export async function getDeleteWarehouse(params) {
  return request(`/llback/Goods/DeleteWarehouse`, {
    method: 'POST',
    body: params,
  });
}

//商品入库
export async function getGoodsPutaway(params) {
  return request(`/llback/Goods/UploadList`, {
    method: 'POST',
    body: params,
  });
}
//查看详情时更新状态
export async function getCheckStepStatus(params) {
  return request(`/llback/Goods/GetUploadStatus`, {
    method: 'POST',
    body: params,
  });
}
//上传step1
export async function getStep1Upload(params) {
  return request(`/llback/Goods/UploadWarehouseGoods`, {
    method: 'POST',
    body: params,
  });
}
//第二步step2 补充信息
export async function getStep2supplement(params) {
  return request(`/llback/Goods/GetUploadStatusOne`, {
    method: 'POST',
    body: params,
  });
}
//第三步step3 补充信息
export async function getStep3supplement(params) {
  return request(`/llback/Goods/GetUploadStatusTwo`, {
    method: 'POST',
    body: params,
  });
}
//第四步step4 成功
export async function getStep4TrueSupplement(params) {
  return request(`/llback/Goods/GetUploadStatusThree`, {
    method: 'POST',
    body: params,
  });
}
//第四步step4 失败
export async function getStep4FalseSupplement(params) {
  return request(`/llback/Goods/GetUploadStatusFour`, {
    method: 'POST',
    body: params,
  });
}
//上传step2
export async function getStep2Upload(params) {
  return request(`/llback/Goods/UploadGoods`, {
    method: 'POST',
    body: params,
  });
}

//==以上为新 以下为旧商品
export async function getGoodsListOfOperate(params) {
  return request(`${apiUrl}/llback/goods/operate/list`, {
    method: 'POST',
    body: params,
  });
}
export async function getGoodsNum(params) {
  return request(`${apiUrl}/llback/goods/goodsnum`, {
    method: 'POST',
    body: params,
  });
}
export async function getGoodsNumByBarcode(params) {
  return request(`${apiUrl}/llback/goods/numbybarcode`, {
    method: 'POST',
    body: params,
  });
}
export async function getSellNum(params) {
  return request(`${apiUrl}/llback/goods/getsellnum`, {
    method: 'POST',
    body: params,
  });
}
export async function updateGoodsNum(params) {
  return request(`${apiUrl}/llback/goods/updategoodsnum`, {
    method: 'POST',
    body: params,
  });
}
export async function updateGoodsOfOperate(params) {
  return request(`${apiUrl}/llback/goods/operate/update`, {
    method: 'POST',
    body: params,
  });
}
export async function getGoodsById(params) {
  return request(`${apiUrl}/llback/goods/operate/goodsbyid`, {
    method: 'POST',
    body: params,
  });
}


///////////////////////////////////////////////////////////////////////////////// 商品 部分  end/////////////////////////////////////////////////////////////////////////

export async function getOrderListOfSupplier(params) {
  return request(`${apiUrl}/llback/order/list`, {
    method: 'POST',
    body: params,
  });
}
export async function getOrderListOfPurchasers(params) {
  return request(`${apiUrl}/llback/order/list`, {
    method: 'POST',
    body: params,
  });
}
export async function getOrderListOfWareHouse(params) {
  return request(`${apiUrl}/llback/order/listofwarehouse`, {
    method: 'POST',
    body: params,
  });
}
export async function getOrderGoodsByOrderId(params) {
  return request(`${apiUrl}/llback/order/goods`, {
    method: 'POST',
    body: params,
  });
}
export async function getAccount(params) {
  return request(`${apiUrl}/llback/order/account`, {
    method: 'POST',
    body: params,
  });
}

///////////////////////////////////////////////////////////////////////////////// 代购  部分/////////////////////////////////////////////////////////////////////////

export async function getTicketList(params) {
  return request(`/llback/Ticket/TicketList`, {
    method: 'POST',
    body: params,
  });
}
export async function getTicketForCode(params) {
  return request(`/llback/Ticket/Ticket`, {
    method: 'POST',
    body: params,
  });
}
export async function updateTicketStatus(params) {
  return request(`/llback/Ticket/UpdateStatus`, {
    method: 'POST',
    body: params,
  });
}

///////////////////////////////////////////////////////////////////////////////// O2O  部分/////////////////////////////////////////////////////////////////////////
//待处理订单
export async function getO2OList(params) {
  return request('/llback/O2O/O2OOrderList', {
    method: 'POST',
    body: params,
  });
}
//查看订单详情
export async function getO2OCheck(params) {
  return request('/llback/O2O/O2OOrder', {
    method: 'POST',
    body: params,
  });
}

//导入上传
export async function importUpload(params) {
  return request(`/llback/O2O/UploadOrder`, {
    method: 'POST',
    body: params,
  });
}
