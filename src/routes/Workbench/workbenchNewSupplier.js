import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {Row,Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,} from 'antd';
import numeral from 'numeral';
import {ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,} from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './workbenchS.less';

@connect(({ workbench, loading }) => ({
  workbench,
  // loading: loading.effects['chart/fetch'],
}))

export default class workbenchNewSupplier extends Component {
  state = {

  };

  componentDidMount() {
    this.init(); 
  }
  init(){
    console.log('zhelishi init')
    this.props.dispatch({
      type: 'workbench/getWorkbenchNewSupplierData',
      payload:{}
    });
  }


  render() {
   // const {workbenchNewSupplier:{} = this.props;
    const { workbenchNewSupplier } = this.props;
    console.log(777,this.props)
    return (
      <div >
        <Row gutter={24} style={{background:'#fff',padding:'27px 0'}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div style={{margin:'0px',padding:'0px',width:'100%'}}>
              <p style={{fontSize:'20px'}}>您好！欢迎来到流连优选</p>
              <p>公司名称：红雨荷贸易有限公司    |   最后登录：2019-02-14 13:39:27</p>
            </div>
            
          </Col>
        </Row>




       


      </div>
    );
  }
}
