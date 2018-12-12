// const h = 'http://172.16.10.51:54195/'
export default function rolePurchaserBulkPurchasesMock() {
  return {
    // -------- 发起询价 --------------
    // 发起询价 -
    'POST /llback/Warehouse/a': goodsSales,


    // -------- 询价列表 --------------
    'POST /llback/Warehouse/getInquiryListData': getPayment,
    // -------- 采购列表 --------------
    'POST /llback/Warehouse/getPurchaseListData': getPayment,

    // 查看
    'POST /llback/Warehouse/childrenCheck': getPurchaseOrder,


  };
}



// 表单 分页 item
export function getPayment(req, res) {
  res.send({
    list: [{
      keyId: '1',
      date: '20180101~20180131',
      order: '215451245',
      goMoney: '2000.00',
      tuiMoney: '1000.00',
      elseMoney: '500.00',
      doMoney: '500.00',
      status: 0,
      detailsList: [{
        keyId: '1',
        a: '20171201~20171231',
        b: '215451244',
        c: '1231',
      }],
    }, {
      keyId: '2',
      date: '20171201~20171231',
      order: '215451244',
      goMoney: '2000.00',
      tuiMoney: '1000.00',
      elseMoney: '500.00',
      doMoney: '500.00',
      status: 1,
      detailsList: [{
        keyId: '2',
        a: '20171201~20171231',
        b: '215451244',
        c: '32546',
      }],
    }],
    pagination: {
      current: 1,
      total: 3,
      pageSize: 10,
    },
    item: {
      money: '50',
      waybillNo: 'ssada',
      settlementNumber: '20180101001',
      supplierName: '岂止科技（大连）有限公司',
      receiptAmount: '壹贰叁肆伍陆柒捌玖拾',
      settlementAccountPeriod: '2018.01.01~2018.01.31',
      contractNumber: 'QZKJ-0001',
      dateOfPrinting: '2018.01.01',
      printer: '胖球1',
    },
  });
}
export function contractInformation(req, res) {
  res.send({
    item: {
      contractCode: '123456789',
      cycle: '月结',
      model: '代销',
    },
    list: [
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809420800199_cp_1.jpg',
      },
      {
        imgUrl: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809438410106_cp_1.jpg',
      },
    ],
    pagination: null,
  });
}


export function goodsSales(req, res) {
  res.send({
    list: [
      {
        keyId: '1',
        goodsName: 'Dr.select Dr.Select 玻尿酸卸妆啫喱',
        slt: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/4580482175534_cp_2.jpg',
        barCode: '4580482175534',
        brand: 'Dr.select',
        skuUnitPrice: 148,
        quantity: 1,
        supplyPrice: 117,
        tradeTime: '2018/2/9 18:08:48',
        money: 148,
      },
      {
        keyId: '2',
        goodsName: 'Skinature 蒲公英净肤洁面乳',
        slt: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809099261666_cp_2.jpg',
        barCode: '8809099261666',
        brand: 'Skinature',
        skuUnitPrice: 88,
        quantity: 1,
        supplyPrice: 64,
        tradeTime: '2017/7/30 1:04:29',
        money: 88,
      },
      {
        keyId: '3',
        goodsName: 'vivekke 防晒喷雾',
        slt: 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/4582238542133_cp_2.jpg',
        barCode: '4582238542133',
        brand: 'DOSHISHA',
        skuUnitPrice: 148,
        quantity: 1,
        supplyPrice: 105,
        tradeTime: '2017/7/24 11:48:28',
        money: 148,
      },
    ],
    pagination: {
      current: 1,
      total: 3,
      pageSize: 10,
    },
  });
}

//下拉菜单
export function getPlatform(req, res) {
  res.send([
    {
      platformId: '0',
      platformType: '渠道1',
    },
    {
      platformId: '1',
      platformType: '渠道2',
    },
  ]);
}
// 修改保存成功
export function UpdateDistributor(req, res) {
  res.send({
    type: 1,
    mes: '修改成功',
  });
}

// 模拟采购单

export function getPurchaseOrder(req, res) {
  res.send({
    list: [{
      keyId: '1',
      goodsName:'',
      brand:'nike',
      order: '215451245',
      goodsName:'XX',
      goMoney: '2000.00',
    
    }, {
      keyId: '2',
      goodsName:'',
      brand:'adds',
      order: '315451245',
      goodsName:'JJ',
      goMoney: '3000.00',
    }],
    item: {
      name:'XXX',
      sex:'男',
      phone:'1355555555555',
      data:'2019.09.01',
      describe:'兰芝化妆品',
      goodsmoney:'2000',
      freight:'150',
      taxation:'200.00'

    },
  });
}