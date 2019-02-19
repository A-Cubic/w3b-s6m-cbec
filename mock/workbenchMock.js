// const orderManagement = 'http://console.llwell.net/';
export default function workbenMock(url) {
  return {
    // 工作台-供应商 旧
    'POST /llback/Dashboard/GetWorkBenchS': getChannelList,
    // 工作台-供应商 旧
    'POST /llback/Dashboard/GetWorkBenchO': url,

     // 工作台 - 供应商 - new
     'POST /llback/aaaa/getWorkbenchNewSupplierData': getWorkbenchNewSupplierData,
  };
}
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

export function getWorkbenchNewSupplierData(req, res) {
  res.send({
    a:'a',
    b:'b',
    arr1:[0,1,2,3],
    arr2:[4,5,6]
  });
}

export function getA(req, res) {
  res.send({
    overtime: '11',
    wait: '11',
    already: '1',
    take: '2129',
    done: '29',
    confirm: null,
    goodsNum100: '36',
    goodsNum20: '3',
    yesterdaySales: null,
    todaySales: null,
    weekSales: null,
    monthSales: null,
    bestSellingSupplier: null,
    bestSellingPlatform: [
      {
        x: '8809539460888\n韩国 LANEIGE/兰芝 雪纱防晒隔离霜 紫色 30ml（新包装）[1件装]',
        y: 402,
      },
      {
        x: '8809505JM1908\nJM solution 防晒喷雾[2件装]',
        y: 325,
      },
      {
        x: '8809539461007\n韩国 LANEIGE/兰芝 雪纱防晒隔离霜 绿色 30ml（新包装）[1件装]',
        y: 142,
      },
      {
        x: '8806390527767\n韩国Sulwhasoo雪花秀 玉容撕拉式面膜50ml[1件装]',
        y: 68,
      },
      {
        x: '8809378320695\npapa recipe/春雨 蜂蜜补水面膜[1件装]',
        y: 62,
      },
      {
        x: '8809495890132\nJAYJUN 樱花三部曲面膜 10片[1件装]',
        y: 48,
      },
      {
        x: '4901340206922\ncalpis 可尔必思浓缩470ml',
        y: 45,
      },
      {
        x: '8809505541924\nJM solution 防晒喷雾[1件装][1件装]',
        y: 42,
      },
      {
        x: '8809597410191\nPNY7‘S 星空面膜撕拉面膜[1件装]',
        y: 40,
      },
      {
        x: '8809323730470\nIt‘s skin/伊思 晶钻蜗牛洁面乳 150ml[1件装]',
        y: 30,
      },
    ],
    dashboardSales: [
      {
        id: 1,
        platformType: 'B2B',
        yesterdaySales: '0',
        todaySales: '0',
        weekSales: '0',
        monthSales: '0',
      },
      {
        id: 2,
        platformType: 'BBC',
        yesterdaySales: '0',
        todaySales: '0',
        weekSales: '0',
        monthSales: '0',
      },
      {
        id: 3,
        platformType: 'O2O',
        yesterdaySales: '0',
        todaySales: '0',
        weekSales: '0',
        monthSales: '0',
      },
      {
        id: 4,
        platformType: '总计',
        yesterdaySales: '0',
        todaySales: '0',
        weekSales: '0',
        monthSales: '0',
      },
    ],
    platformOrder: [
      {
        x: 'BBC',
        y: 5,
      },
    ],
  });
}
export function getChannelList(req, res) {
  res.send({
    overtime: '0',
    wait: '0',
    already: '0',
    take: '0',
    done: '0',
    confirm: '0',
    goodsNum100: '0',
    goodsNum20: '0',
    yesterdaySales: {
      x: '昨日销售额',
      y: 0.1,
    },
    todaySales: {
      x: '今日销售额',
      y: 0.1,
    },
    weekSales: {
      x: '本周销售额',
      y: 1,
    },
    monthSales: {
      x: '本月销售额',
      y: 1,
    },
    bestSellingSupplier: null,
    bestSellingPlatform: [
      {
        x: '8809539460888\n韩国 LANEIGE/兰芝 雪纱防晒隔离霜 紫色 30ml（新包装）[1件装]',
        y: 402,
      },
      {
        x: '8809505JM1908\nJM solution 防晒喷雾[2件装]',
        y: 325,
      },
      {
        x: '8809539461007\n韩国 LANEIGE/兰芝 雪纱防晒隔离霜 绿色 30ml（新包装）[1件装]',
        y: 142,
      },
      {
        x: '8806390527767\n韩国Sulwhasoo雪花秀 玉容撕拉式面膜50ml[1件装]',
        y: 68,
      },
      {
        x: '8809378320695\npapa recipe/春雨 蜂蜜补水面膜[1件装]',
        y: 62,
      },
      {
        x: '8809495890132\nJAYJUN 樱花三部曲面膜 10片[1件装]',
        y: 48,
      },
      {
        x: '4901340206922\ncalpis 可尔必思浓缩470ml',
        y: 45,
      },
      {
        x: '8809505541924\nJM solution 防晒喷雾[1件装][1件装]',
        y: 42,
      },
      {
        x: '8809597410191\nPNY7‘S 星空面膜撕拉面膜[1件装]',
        y: 40,
      },
      {
        x: '8809323730470\nIt‘s skin/伊思 晶钻蜗牛洁面乳 150ml[1件装]',
        y: 30,
      },
    ],
    dashboardSales: null,
    platformOrder: null,
  });
}
export function UpdateDistributor(req, res) {
  res.send({
    type: 1,
    mes: '修改成功',
  });
}
export function getorder(req, res) {
  res.send({
    id: '2884',
    status: '准备出库',
    merchantOrderId: 'SH20180317104341828329',
    tradeTime: '2018-03-17 10:43:41',
    waybillno: '',
    consigneeName: null,
    tradeAmount: '125',
    idNumber: null,
    consigneeMobile: null,
    addrProvince: null,
    addrCity: null,
    addrDistrict: null,
    addrDetail: null,
    orderGoods: [
      {
        id: '3247',
        slt: '',
        barCode: '4571395822073',
        skuUnitPrice: '125',
        totalPrice: '125',
        skuBillName: 'Fernanda 香气护肤乳(Lilly Crown)',
        quantity: '1',
        purchasePrice: '0',
      },
    ],
  });
}
export function SendOrder(req, res) {
  res.send({
    url: 'https://ant.design/components/select-cn/',
  });
}
export function getWaybill(req, res) {
  res.send({
    type: 1,
    mes: 'aaa',
  });
}

export function confirmDelivery(req, res) {
  res.send({
    type: 1,
    mes: '成功',
  });
}
export function shipmentOverseas(req, res) {
  res.send({
    type: 1,
    mes: '成功',
  });
}
