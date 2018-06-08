import { stringify } from 'qs';
import request from '../utils/request';

const apiUrl = process.env.NODE_ENV === 'development' ? '' : 'http://api.llwell.net';

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
  console.log(params.listGoods);
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
  return request(`$/llback/Ticket/UpdateStatus`, {
    method: 'POST',
    body: params,
  });
}
