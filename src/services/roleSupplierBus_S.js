import { stringify } from 'qs';
import request from '../utils/request';


//商品管理-商品上架 -弹窗
export async function getUploadviewData(params) {
    return request(`/llback/Goods/SelectOnloadGoodsList`,{
        method: 'POST',
        body: params,
    })
}


