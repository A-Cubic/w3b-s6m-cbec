// const h = 'http://172.16.10.51:54195/'
export default function rolePurchaserBulkPurchasesMock(url) {
  return {
    // -------- 发起询价 --------------
    
    // 发起询价 - 保存
    //'POST /llback/Warehouse/getPreservationData': getPayment,
    'POST /llback/Purchase/InquiryPreservation': 'http://192.168.191.1:54195/',

    // 发起询价 - 提交
    'POST /llback/Warehouse/getSubmissionData': getPayment,
    //'POST /llback/Purchase/InquirySubmission': 'http://192.168.191.1:54195/',



    //  发起询价- 导入订单
     //'POST /llback/Warehouse/getUploadOrderbillDX': goodsSales,
     'POST /llback/Purchase/OnLoadGoodsList': 'http://192.168.191.1:54195/',



    //'POST /llback/Warehouse/getUploadOrderbillDX': goodsSales,

    //  发起询价- 删除
    //'POST /llback/Warehouse/deleteInterface': del,
    'POST /llback/Purchase/GoodsDelete': 'http://192.168.191.1:54195/',


    //  发起询价- 分页
   // 'POST /llback/Warehouse/getPagingData': getPayment,
   'POST /llback/Purchase/Goodspagination': 'http://192.168.191.1:54195/',

    // -------- 询价列表 --------------
   'POST /llback/Warehouse/getInquiryListData': listOfEnquiries,
    //'POST /llback/Purchase/InquiryList': 'http://192.168.191.1:54195/',


    //询价列表 - 查看
    'POST /llback/Warehouse/getSeeData': see,  
   //'POST /llback/Purchase/InquiryListDetailed': 'http://192.168.191.1:54195/',

    // -------- 采购列表 --------------
    'POST /llback/Warehouse/getPurchaseListData': getPayment,

    // 查看
   // 'POST /llback/Warehouse/getpurchaseOrder': getPayment,
    
   'POST /llback/Warehouse/getClickDetails': getPurchaseOrder,










    // -------- 询价列表/采购列表 - 查看列表详情 --------------
    'POST /llback/Warehouse/getpurchaseOrder': getPurchaseOrder,

    // -------- 询价列表/采购列表 - 点击详情 --------------
    'POST /llback/Warehouse/getdetailsCheck': getPayment,
  };
}
//   -------- 询价列表 --------------
export function listOfEnquiries(req, res) {
  res.send({
    item: {
      msg: null,
      type: "1",
    },
    list: [
        {
          keyId: "1",
          purchasesn: "1018121316055337",
          createtime: "2018.12.17",
          remark: "asda大",
          status: "1"
        },
        {
          keyId: "2",
          purchasesn: "2018121316055337",
          createtime: "2018.12.17",
          remark: "2asda大",
          status: "7"
        }
    ],
    pagination: {
        current: 1,
        total: 1,
        pageSize: 10
    }
  })
}
// 查看接口
export function see(req, res) {
  res.send({
    item: {
      msg: null,
      type: "1",
      sendType: "日本提货",
      status:"1",
      contacts: "张",
      sex: "1",
      tel: "13681313111",
      deliveryTime: "2018.10.11",
      remark: "asda大",
      tax: "0.00",
      waybillfee: "0.00",
      purchasePrice: "0.00"
    },
    list: [
        {
          keyId: "1",
          purchasesn: "2018121313045638",
          goodsName: "兰芝精华液",
          barcode: "11111",
          brand: "1111",
          total: "100"
        },
        {
          keyId: "2",
          purchasesn: "2018121313045638",
          goodsName: "2兰芝精华液",
          barcode: "21111",
          brand: "2222",
          total: "2100"
        }
    ],
    pagination: {
        current: 1,
        total: 1,
        pageSize: 10
    }
  })
}


export function del(req, res) {
  res.send({
    item: {
      msg: null,
      type: "1"
    },
    list: [
        {
          keyId: "1",
          purchasesn: "2018121313045638",
          goodsName: "兰芝精华液",
          barcode: "11111",
          brand: "",
          total: "100"
        },
        {
          keyId: "2",
          purchasesn: "2018121313045638",
          goodsName: "2兰芝精华液",
          barcode: "211111",
          brand: "2",
          total: "200"
        }
    ],
    pagination: {
        current: 1,
        total: 1,
        pageSize: 10
    }
  })
}


// 表单 分页 item
export function getPayment(req, res) {
  res.send({
    item: null,
    supplierName:'1',
    list: [
      {
        keyId: "2",
        purchasesn: "2018121313045638",
        goodsName: "2兰芝精华液",
        barcode: "211111",
        brand: "2",
        total: "200"
      }
          
    ],
    pagination: {
        current: 2,
        total: 2,
        pageSize: 1
    }
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
    item:{
      msg: "成功",
      type: "1"
    },
    list: [
      {
        keyId: "1",
        purchasesn: "2018121313045638",
        goodsName: "兰芝精华液",
        barcode: "11111",
        brand: "",
        total: "100"
      },
      {
        keyId: "2",
        purchasesn: "2018121313045638",
        goodsName: "2兰芝精华液",
        barcode: "21111",
        brand: "2",
        total: "2100"
      },
      {
        keyId: "3",
        purchasesn: "3018121313045638",
        goodsName: "3兰芝精华液",
        barcode: "31111",
        brand: "3",
        total: "3100"
      }
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
    list: [{
      keyId: '1',
      brand: 'nike',
      order: '215451245',
      goodsName: 'XX',
      goMoney: '2000.00',

    }, {
      keyId: '2',
      brand: 'adds',
      order: '315451245',
      goodsName: 'JJ',
      goMoney: '3000.00',
    }],
    item: {
      name: 'XXX',
      sex: '男',
      phone: '1355555555555',
      data: '2019.09.01',
      describe: '兰芝化妆品',
      goodsmoney: '2000',
      freight: '150',
      taxation: '200.00',

    },
  });
}
