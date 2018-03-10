import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getMenuData } from './mock/menu';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
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
  'GET /api/users': [{
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
  }],
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

  'POST /llback/user/validate': 'http://api.llwell.net/',
  'POST /llback/user/menu': 'http://api.llwell.net/',
  'POST /llback/user/currentUser': 'http://api.llwell.net/',
  'POST /llback/user/message/list': 'http://api.llwell.net/',
  'POST /llback/user/message/empty': 'http://api.llwell.net/',
  'POST /llback/user/register/code': 'http://api.llwell.net/',
  'POST /llback/user/register/submit': 'http://api.llwell.net/',
  'POST /llback/user/register/upload': 'http://api.llwell.net/',
  'POST /llback/user/register/status': 'http://api.llwell.net/',
  'POST /llback/user/register/check': 'http://api.llwell.net/',
  'POST /llback/user/member/pagelist': 'http://api.llwell.net/',
  'POST /llback/user/member/info/list': 'http://api.llwell.net/',
  'POST /llback/user/member/info/details': 'http://api.llwell.net/',
  'POST /llback/user/member/update/status': 'http://api.llwell.net/',
  'POST /llback/purchase/operate/list': 'http://api.llwell.net/',
  'POST /llback/purchase/operate/goods': 'http://api.llwell.net/',
  'POST /llback/purchase/operate/info/details': 'http://api.llwell.net/',
  'POST /llback/purchase/operate/update/fee': 'http://api.llwell.net/',
  'POST /llback/purchase/operate/update/price': 'http://api.llwell.net/',
  'POST /llback/goods/supplier/offerinfo': 'http://api.llwell.net/',
  'POST /llback/purchase/operate/supply/list': 'http://api.llwell.net/',
  'POST /llback/purchase/operate/supply/flag': 'http://api.llwell.net/',
  'POST /llback/goods/purchasers/list': 'http://172.16.10.183:9999/',
  'POST /llback/goods/sendtype': 'http://api.llwell.net/',
  'POST /llback/purchase/add': 'http://172.16.10.183:9999/',
  'POST /llback/purchase/goods/add': 'http://172.16.10.183:9999/',
  'POST /llback/purchase/split': 'http://172.16.10.183:9999/',
};



export default noProxy ? {} : delay(proxy, 1000);
