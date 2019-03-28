import { stringify } from 'qs';
import request from '../utils/request';


//商品管理-商品上架 -弹窗
export async function getUploadviewData(params) {
    return request(`/llback/Goods/SelectOnloadGoodsList`,{
        method: 'POST',
        body: params,
    })
}

//-----------------------------商品管理-----------------------------
//供应商 - 报价管理 - 商品报价列表
export async function getQuotationListData(params) {
    return request(`/llback/Purchase/OfferOrderList`,{
        method: 'POST',
        body: params,
    })
}

//供应商 - 报价管理 - 商品报价列表-详情页
export async function getcommodityGeneralPageData(params) {
    return request(`/llback/Purchase/OfferOrderDetails`,{
        method: 'POST',
        body: params,
    })
}

//供应商 - 报价管理 - 商品报价列表-待报价-上传文件
export async function uploadOrderbill(params) {
    return request(`/llback/Purchase/UploadOfferOrder`,{
        method: 'POST',
        body: params,
    })
}
//供应商 - 报价管理 - 商品报价列表-待报价-提交
export async function getUploadOfferOrderSubmitData(params) {
    return request(`/llback/Purchase/UploadOfferOrderSubmit`,{
        method: 'POST',
        body: params,
    })
}

//待去人-提交
export async function getWaitingSubmit(params) {
    return request(`/llback/Purchase/WaitingSubmit`,{
        method: 'POST',
        body: params,
    })
}

//-----------------------------商品管理-----------------------------
// 铺货-一件发货获取接口
export async function getSelectSupplyGoodsListData(params) {
    return request(`/llback/Goods/SelectSupplyGoodsList`,{
        method: 'POST',
        body: params,
    })
}