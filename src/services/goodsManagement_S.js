import { stringify } from 'qs';
import request from '../utils/request';


// 上架审核-商品上架详情
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
