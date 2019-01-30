import { stringify } from 'qs';
import request from '../utils/request';
//---------------------------------------------报表管理-----------------------------------------
//-----------------销售日报表 页----------
//销售日报表 - 列表查询
export async function salesDayReport(params) {
  return request(`/llback/Warehouse/salesDayReport`,{
    method: 'POST',
    body: params,
  })
}
