import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getMenuData } from './mock/menu';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

import orderManagementMock from './mock/orderManagementMock'
// 是否禁用代理

const noProxy = process.env.NO_PROXY === 'true';
const service_url =  'http://api.llwell.net/';// http://api.llwell.net/  http://localhost:9999/
const service_url2 =  'http://console.llwell.net/';// http://console.llwell.net/  http://localhost:51184/
// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  ...orderManagementMock(service_url2),
  // ...
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.setHeader('code', '0');
      res.setHeader('msg', 'success');
      res.send({
        status: true,
        type,
        currentAuthority: 'admin',
        token: { token: 'admin1234', userId: 'admin' },
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.setHeader('code', '0');
      res.setHeader('msg', 'success');
      res.send({
        status: true,
        type,
        currentAuthority: 'user',
        token: { token: 'user1234', userId: 'user' },
      });
      return;
    }
    res.setHeader('code', '0');
    res.setHeader('msg', 'wrong');
    res.send({
      status: false,
      type,
      currentAuthority: 'guest',
      token: { token: 'user1234', userId: 'user' },
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  //----------------------------------------------------------


  'POST /llback/user/validate': service_url,
  'POST /llback/user/menu': service_url,
  'POST /llback/user/currentUser': service_url,
  'POST /llback/user/message/list': service_url,
  'POST /llback/user/message/empty': service_url,
  'POST /llback/user/register/code': service_url,
  'POST /llback/user/register/renamecode': service_url,
  'POST /llback/user/register/rename': service_url,
  'POST /llback/user/register/submit': service_url,
  'POST /llback/user/register/upload': service_url,
  'POST /llback/user/register/status': service_url,
  'POST /llback/user/register/check': service_url,
  'POST /llback/user/member/pagelist': service_url,
  'POST /llback/user/member/info/list': service_url,
  'POST /llback/user/member/info/details': service_url,
  'POST /llback/user/member/update/status': service_url,
  'POST /llback/purchase/add': service_url,
  'POST /llback/purchase/goods/add': service_url,
  'POST /llback/purchase/goods/addnew': service_url,
  'POST /llback/purchase/goods/del': service_url,
  'POST /llback/purchase/split': service_url,
  'POST /llback/purchase/chat/list': service_url,
  'POST /llback/purchase/chat/send': service_url,
  'POST /llback/purchase/update': service_url,
  'POST /llback/purchase/operate/list': service_url,
  'POST /llback/purchase/operate/goods': service_url,
  'POST /llback/purchase/operate/info/details': service_url,
  'POST /llback/purchase/operate/update/fee': service_url,
  'POST /llback/purchase/operate/update/price': service_url,
  'POST /llback/purchase/operate/supply/list': service_url,
  'POST /llback/purchase/operate/supply/flag': service_url,
  'POST /llback/purchase/purchasers/list': service_url,
  'POST /llback/purchase/purchasers/info/details': service_url,
  'POST /llback/purchase/purchasers/goods': service_url,
  'POST /llback/purchase/purchasers/update/price': service_url,
  'POST /llback/purchase/update/stage': service_url,
  'POST /llback/purchase/supplier/list': service_url,
  'POST /llback/purchase/supplier/info/details': service_url,
  'POST /llback/purchase/supplier/inquiry': service_url,
  'POST /llback/purchase/supplier/update/price': service_url,
  'POST /llback/goods/supplier/offerinfo': service_url,
  'POST /llback/goods/purchasers/list': service_url,
  'POST /llback/goods/sendtype': service_url,
  'POST /llback/goods/supplier/updateoffer': service_url,
  'POST /llback/goods/supplier/updateofferflag': service_url,
  'POST /llback/goods/supplier/offerbyid': service_url,
  'POST /llback/goods/supplier/list': service_url,
  'POST /llback/goods/supplier/offer': service_url,
  'POST /llback/Goods/GetGoodsList': service_url2,
  'POST /llback/Goods/GetBrand': service_url2,
  'POST /llback/Goods/GetWareHouse': service_url2,
  'POST /llback/Goods/GetGoods': service_url2,
  'POST /llback/Goods/GetWarehouseList': service_url2,
  //新增仓库
  'POST /llback/Goods/UpdateWarehouse': service_url2,
  //删除仓库
  'POST /llback/Goods/DeleteWarehouse': service_url2,

  'POST /llback/Goods/downloadStoreTempUrl': {
    url:'https://github.com/llwell/API-SERVER/issues/11'
  },
  'POST /llback/Goods/downloadGoodsTempUrl': {
    url:'https://github.com/llwell/API-SERVER/issues/11'
  },
  'POST /llback/Goods/downloadPicZipUrl': {
    url:'https://github.com/llwell/API-SERVER/issues/11'
  },
  'POST /llback/Goods/UploadList': service_url2,
  //查看详情时更新状态
  'POST /llback/Goods/GetUploadStatus': service_url2,
  //商品入库 查询补充信息 step2
  'POST /llback/Goods/GetUploadStatusOne': service_url2,
  //商品入库 等待审核 step3
  'POST /llback/Goods/GetUploadStatusTwo': service_url2,
  //商品入库 审核成功 step4
  'POST /llback/Goods/GetUploadStatusThree': service_url2,
  //商品入库 部分审核成功部分审核失败 step4
  'POST /llback/Goods/GetUploadStatusFour': service_url2,
  'POST /llback/Goods/UploadWarehouseGoods': service_url2,
  //step2 提交审核上传
  'POST /llback/Goods/UploadGoods': service_url2,
  // 'POST /llback/goods/operate/list': service_url,

  // 'POST /llback/Goods/GetGoodsList': {
  //   list:[{
  //     id: "412",
  //     brand: "品牌1",
  //     goodsName: "Platinum Label 化妆水 1000ml",
  //     barcode: "4549549770754",
  //     slt: "http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/4549549770754_cp_1.jpg",
  //     source: "日本",
  //     wname: "青岛仓库",
  //     goodsnum: "959",
  //     flag: "1",
  //     week: 0,
  //     month: 0,
  //     status: "0"
  //   }],pagination:{
  //     current: 1,
  //     total: 0,
  //     pageSize: 10
  //   }
  //   },
  // 'POST /llback/Goods/GetBrand': [{brand:'BBLab'},{brand:'ANELLO'}],
  // 'POST /llback/Goods/GetWareHouse': [{wid:'3',wcode:"CQ",wname: "重庆仓库"},{wid:'6',wcode:"XG",wname: "香港仓库"}],


  'POST /llback/goods/operate/update': service_url,
  'POST /llback/goods/operate/goodsbyid': service_url,
  'POST /llback/goods/goodsnum': service_url,
  'POST /llback/goods/numbybarcode': service_url,
  'POST /llback/goods/updategoodsnum': service_url,
  'POST /llback/goods/getsellnum': service_url,
  'POST /llback/order/list': service_url,
  'POST /llback/order/listofwarehouse': service_url,
  'POST /llback/order/goods': service_url,
  'POST /llback/order/account': service_url,
  'POST /llback/Ticket/TicketList': service_url2,
  'POST /llback/Ticket/Ticket': service_url2,
  'POST /llback/Ticket/UpdateStatus': service_url2,

  //O2O
  'POST /llback/O2O/O2OOrderList': service_url2,
  'POST /llback/O2O/O2OOrder': service_url2,
  'POST /llback/O2O/UploadOrder': 'http://192.168.0.109:51186/',
};



export default noProxy ? {} : delay(proxy, 1000);
