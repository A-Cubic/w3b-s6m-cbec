import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(({distributionManagement,  loading }) => ({
  distributionManagement,
  // loading: loading.effects['distributionManagement/getSalesStatisticsListS'],
}))

@Form.create()
export default class DistributorsMgt extends Component {
  render() {
    return (
      <div>
        <Card>
          <section style={{textAlign :'center',margin:100}}>
            <div>
              <img style={{width:200,height:200,margin:15}} src="http://ecc-product.oss-cn-beijing.aliyuncs.com/static/mediaPlatform.jpeg" alt=""/>
            </div>
            <div style={{fontSize:18}}>欢迎关注流连优选公众号</div>
            <div style={{fontSize:18}}>有任何问题或疑问，请在公众号里留言。</div>
          </section>
        </Card>
      </div>
    );
  }
}

