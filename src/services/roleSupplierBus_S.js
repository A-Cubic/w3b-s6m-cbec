import { stringify } from 'qs';
import request from '../utils/request';


//产品上架 弹窗
export async function getUploadviewData(params) {
    return request(`/llback/Goods/SelectOnloadGoodsList`,{
        method: 'POST',
        body: params,
    })
}