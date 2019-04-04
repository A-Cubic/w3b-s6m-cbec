import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './distributorsMgt.less';
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
  state={
    formValues:{},
  }
  init(){
    this.props.dispatch({
      type: 'distributionManagement/agentQRCode',
      payload: {},
    });
  }
  componentDidMount() {
    this.init();
  }


  render() {
    const { distributionManagement:{agentQRCode} } = this.props;

    return (
      <div>
        <Card className={styles.mT10}>
          <section style={{textAlign :'center',margin:100}}>
            <div style={{fontSize:18}}>流连优选旗舰店</div>
            <div>
              <img style={{width:200,height:200,margin:15}} src={agentQRCode} alt=""/>
            </div>
            <div style={{fontSize:18}}>扫码二维码转至本店</div>
          </section>
        </Card>
      </div>
    );
  }
}

