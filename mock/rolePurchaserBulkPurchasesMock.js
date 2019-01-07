// const h = 'http://172.16.10.51:54195/'
export default function rolePurchaserBulkPurchasesMock(url) {
  return {
    // -------- 发起询价 --------------

    // 发起询价 - 保存
    'POST /llback/Purchase/InquiryPreservation': url,

    // 发起询价 - 提交
    'POST /llback/Purchase/InquirySubmission': url,


    //  发起询价- 导入订单
    'POST /llback/Purchase/OnLoadGoodsList': url,


    //  发起询价- 删除
    'POST /llback/Purchase/GoodsDelete': url,


    //  发起询价- 分页 - 改
    'POST /llback/Purchase/Goodspagination': url,


    // -------- 询价列表 --------------
    'POST /llback/Purchase/InquiryList': url,


    //  询价列表- 删除
    'POST /llback/Purchase/InquiryListDelete': url,


    // 询价列表 - 查看
    // 询价列表 - 询价中
    // 询价列表 - 报价中
    // 询价列表 - 已报价
    'POST /llback/Purchase/InquiryListDetailed': url,


    // 询价列表 -报价中-详情
    // 询价列表/采购列表-点击详情
    'POST /llback/Purchase/OtherGoodsDetails': url,


    // 询价列表 - 已报价 - 点击详情
    'POST /llback/Purchase/GoodsDetails': url,


    //  已报价- 删除
    'POST /llback/Purchase/InquiryGoodsDelete': url,

    // 询价列表-已报价 - 提交
    // 询价列表-已报价(二次) - 立即下单
    'POST /llback/Purchase/OfferSub': url,

    // 询价列表-已报价 - 取消
    'POST /llback/Purchase/OfferCancel': url,


    // 询价列表-已报价 - 改变采购数量
    'POST /llback/Purchase/GoodsDetermine': url,


    // 询价列表-已报价 - 详情改变采购数量
    'POST /llback/Purchase/GoodsDetailsDetermine': url,


    // 询价列表-已报价 - 分页
    //  采购列表 - 分页
    'POST /llback/Purchase/OtherInquiryPagesn': url,


    // -------- 采购列表 --------------
    'POST /llback/Purchase/PurchaseList': url,


    // 采购列表 - 查看  询价列表
    'POST /llback/Purchase/PurchaseDetails': url,


  };
}


// - ------- 采购列表 --------------
export function getPurchaseListData(req, res) {
  res.send({
    item: {
      sendType: '日本提货',
      typeName: '韩国提货',
      status: '1',
      contacts: '张',
      sex: '1',
      tel: '13681313111',
      deliveryTime: '2018.10.11',
      remark: 'asda大',
      tax: '0.00',
      waybillfee: '0.00',
      purchasePrice: '0.00',
    },
    list: [
      {
        keyId: '2',
        purchasesn: '2018121313045636',
        goodsName: '兰芝精华液',
        barcode: '11111c',
        brand: '',
        total: '10',
        maxAvailableNum: '140',
        minAvailableNum: '10',
        supplyPrice: '16.67',
        purchaseNum: '60',
        totalPrice: '1000',
        supplierNumType: '1',
      },
      {
        keyId: '3',
        purchasesn: '2018121313045637',
        goodsName: '2兰芝精华液',
        barcode: '21111',
        brand: '2',
        total: '20',
        maxAvailableNum: '2140',
        minAvailableNum: '210',
        supplyPrice: '216.67',
        purchaseNum: '260',
        totalPrice: '2000',
        supplierNumType: '2',
      },
      {
        keyId: '4',
        purchasesn: '32018121313045639',
        goodsName: '32兰芝精华液',
        barcode: '321111',
        brand: '32',
        total: '320',
        maxAvailableNum: '32140',
        minAvailableNum: '3210',
        supplyPrice: '3216.67',
        purchaseNum: '3260',
        totalPrice: '32000',
        supplierNumType: '3',
      },
    ],
    pagination: {
      current: 1,
      total: 1,
      pageSize: 10,
    },
  });
}


//   -------- 询价列表 --------------
export function listOfEnquiries(req, res) {
  res.send({
    item: {
      msg: null,
      type: '1',
    },
    list: [
      {
        keyId: '11',
        purchasesn: '1018121316055337',
        createtime: '2018.12.17',
        remark: 'asda大',
        status: '1',
        purchaseTime: '2018.12.21',
        num: '60',
        money: '1,000.00',
        stage: '1',

      },
      {
        keyId: '12',
        purchasesn: '2018121316055338',
        createtime: '2018.12.17',
        remark: '2asda大',
        status: '2',
        purchaseTime: '2018.12.21',
        num: '60',
        money: '1,000.00',
        stage: '2',

      },
      {
        keyId: '3',
        purchasesn: '2018121316055339',
        createtime: '2018.12.17',
        remark: '2asda大',
        status: '3',
        purchaseTime: '2018.12.21',
        num: '60',
        money: '1,000.00',
        stage: '9',

      },
      {
        keyId: '4',
        purchasesn: '2018121316055340',
        createtime: '2018.12.17',
        remark: '2asda大',
        status: '4',
        purchaseTime: '2018.12.21',
        num: '60',
        money: '1,000.00',
        stage: '4',

      },
      {
        keyId: '5',
        purchasesn: '2018121316055341',
        createtime: '2018.12.17',
        remark: '2asda大',
        status: '5',
        purchaseTime: '2018.12.21',
        num: '60',
        money: '1,000.00',
        stage: '5',

      },
      {
        keyId: '6',
        purchasesn: '2018121316055342',
        createtime: '2018.12.17',
        remark: '2asda大',
        status: '6',
        purchaseTime: '2018.12.21',
        num: '60',
        money: '1,000.00',
        stage: '6',

      },
      {
        keyId: '7',
        purchasesn: '2018121316055343',
        createtime: '2018.12.17',
        remark: '2asda大',
        status: '7',
        purchaseTime: '2018.12.21',
        num: '60',
        money: '1,000.00',
        stage: '7',

      },
    ],
    pagination: {
      current: 1,
      total: 1,
      pageSize: 10,
    },
  });
}

// 改变数量

export function onNum(req, res) {
  res.send({
    purchasesn: '2018121313045638',
    barcode: 'bb',
    supplyPrice: '157.33',
    purchaseNum: '60',
    totalPrice: '70',
    allPrice: '1700 ',
  });
}


// 查看接口
export function see(req, res) {
  res.send({
    msg: null,
    type: '1',
    purchasesn: '2018121313045638',
    barcode: 'bb',
    supplyPrice: '157.33',
    purchaseNum: '60',
    totalPrice: '70',
    allPrice: '170',
    item: {
      msg: null,
      typeName: '韩国提货',
      type: '2',
      sendType: '日本提货',
      status: '1',
      contacts: '张',
      sex: '1',
      tel: '13681313111',
      deliveryTime: '2018.10.11',
      remark: 'asda大',
      tax: '10.00',
      waybillfee: '20.00',
      purchasePrice: '30.00',

    },
    list: [
      {
        keyId: '1',
        purchasesn: '2018121313045637',
        goodsName: '兰芝精华液',
        barcode: 'aa',
        brand: '',
        total: '10',
        maxAvailableNum: '980',
        minAvailableNum: '70',
        supplyPrice: '16.67',
        purchaseNum: '0',
        totalPrice: '1000',
        supplierNumType: '2',

      },
      {
        keyId: '2',
        purchasesn: '2018121313045638',
        goodsName: '兰芝精华液',
        barcode: 'bb',
        brand: '',
        total: '10',
        maxAvailableNum: '200',
        minAvailableNum: '20',
        supplyPrice: '16.67',
        purchaseNum: '0',
        totalPrice: '2000',
        supplierNumType: '1',
      },
    ],
    pagination: {
      current: 1,
      total: 1,
      pageSize: 10,
    },
  });
}


export function del(req, res) {
  res.send({
    msg: null,
    type: '1',
    list: [
      {
        keyId: '1',
        purchasesn: '20181213130456387',
        goodsName: '兰芝精华液',
        barcode: '11111a',
        brand: '',
        total: '100',
      },
      {
        keyId: '2',
        purchasesn: '2018121313045638',
        goodsName: '2兰芝精华液',
        barcode: '211111b',
        brand: '2',
        total: '200',
      },
    ],
    pagination: {
      current: 1,
      total: 1,
      pageSize: 10,
    },
  });
}
// 改变数量
export function num(req, res) {
  res.send({
    msg: null,
    type: '1',
    purchasesn: '2018121313045638',
    barcode: '11111b',
    supplyPrice: '157.33',
    purchaseNum: '60',
    totalPrice: '9440',
    allPrice: '9440',

    item: {
      msg: null,
      typeName: '国内提货',
      type: '2',
      sendType: '日本提货',
      status: '1',
      contacts: '张',
      sex: '2',
      tel: '13681313111',
      deliveryTime: '2018.10.11',
      remark: 'asda大',
      tax: '10.00',
      waybillfee: '20.00',
      purchasePrice: '1130.00',

    },
    list: [
      {
        keyId: '1',
        purchasesn: '2018121313045637',
        goodsName: '兰芝精华液',
        barcode: 'aa',
        brand: '',
        total: '10',
        maxAvailableNum: '980',
        minAvailableNum: '70',
        supplyPrice: '2.67',
        purchaseNum: '80',
        totalPrice: '2000',
        supplierNumType: '2',

      },
      {
        keyId: '2',
        purchasesn: '2018121313045638',
        goodsName: '兰芝精华液',
        barcode: 'bb',
        brand: '',
        total: '10',
        maxAvailableNum: '980',
        minAvailableNum: '70',
        supplyPrice: '16.67',
        purchaseNum: '60',
        totalPrice: '4000',
        supplierNumType: '1',
      },
    ],
    pagination: {
      current: 1,
      total: 1,
      pageSize: 10,
    },
  });
}

// 表单 分页 item
export function getPayment(req, res) {
  res.send({
    item: null,
    supplierName: '1',
    list: [
      {
        keyId: '2',
        purchasesn: '2018121313045635',
        goodsName: '2兰芝精华液',
        barcode: '211111',
        brand: '2',
        total: '200',
      },

    ],
    pagination: {
      current: 2,
      total: 2,
      pageSize: 1,
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
    item: {
      msg: '成功',
      type: '1',
    },
    list: [
      {
        keyId: '1',
        purchasesn: '2018121313045638',
        goodsName: '兰芝精华液',
        barcode: '11111b',
        brand: '',
        total: '100',
      },
      {
        keyId: '2',
        purchasesn: '2018121313045638',
        goodsName: '2兰芝精华液',
        barcode: '21111',
        brand: '2',
        total: '2100',
      },
      {
        keyId: '3',
        purchasesn: '3018121313045638',
        goodsName: '3兰芝精华液',
        barcode: '31111',
        brand: '3',
        total: '3100',
      },
    ],
    pagination: {
      current: 1,
      total: 3,
      pageSize: 10,
    },
  });
}

// 下拉菜单
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
    tableData: [{
      keyId: '1',
      id: '314',
      supplyId: 'GH1',
      minOfferNum: '0',
      maxOfferNum: '100',
      offerPrice: '10',
      demand: '500',
      purchaseAmount: '5000',

    }, {
      keyId: '2',
      id: '3214',
      supplyId: '2GH1',
      minOfferNum: '20',
      maxOfferNum: '2100',
      offerPrice: '210',
      demand: '2500',
      purchaseAmount: '25000',
    }],
  });
}
