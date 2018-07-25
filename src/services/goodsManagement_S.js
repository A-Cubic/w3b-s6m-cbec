import { stringify } from 'qs';
import request from '../utils/request';


// 获取渠道管理 - 费用信息 - 列表
export async function getGoodsDetails(params) {
  return request(`/llback/Goods/WarehouseGoodsList`, {
    method: 'POST',
    body: params,
  });
}
// 上架审核-审核操作
export async function onAudit(params) {
  return request(`/llback/Goods/ExamineWarehouseGoods`, {
    method: 'POST',
    body: params,
  });
}
