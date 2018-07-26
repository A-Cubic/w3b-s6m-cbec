import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {Row,Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,} from 'antd';
import numeral from 'numeral';
import {ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,} from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './workbenchO.less';

@connect(({ workbench, loading }) => ({
  workbench,
  // loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  state = {

  };

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'chart/fetch',
    // });
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'chart/clear',
    // });
  }

  orderList=()=>{
    this.props.dispatch(routerRedux.push('/orderManagement/operatorOrder'));
  }
  goodsList=()=>{
    this.props.dispatch(routerRedux.push('/goods/info/list'));
  }
  render() {

    const todaySales = [
      {
        x: 'BBC分销',
        y: 20,
      },{
        x: '一件代发',
        y: 50,
      },{
        x: 'O2O',
        y: 30,
      },{
        x: 'B2B',
        y: 30,
      },
    ];

    const salesData = [{x:'商品条码：4520060581005,Skinature 胶原蛋白第二肌肤面膜 150ML',y:180},{x:'商品2',y:80},{x:'商品3',y:70},{x:'商品4',y:60},{x:'商品5',y:50},
      {x:'商品6',y:100},{x:'商品7',y:80},{x:'商品8',y:70},{x:'商品9',y:60},{x:'商品10',y:50},]
    const data = [{
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: 2,
      name: 'Joe Black',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: 3,
      name: 'Jim Green',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];
    const columns = [
      {
      title: '平台渠道',
      dataIndex: 'name',
      key: 'name',
        render:(val,record)=>{return <span className={record.id==data.length?styles.red:''}>{val}</span>}
    }, {
      title: '昨日销售额',
      dataIndex: 'age',
      key: 'age',
        render:(val,record)=>{return <span className={record.id==data.length?styles.red:''}>{val}</span>}

      }, {
      title: '今日销售额',
      dataIndex: 'address',
      key: 'address',
        render:(val,record)=>{return <span className={record.id==data.length?styles.red:''}>{val}</span>}

      }, {
      title: '本月销售额',
      dataIndex: 'aa',
      key: 'aa',
        render:(val,record)=>{return <span className={record.id==data.length?styles.red:''}>{val}</span>}

      }, {
      title: '本周销售额',
      dataIndex: 'bb',
      key: 'bb',
        render:(val,record)=>{return <span className={record.id==data.length?styles.red:''}>{val}</span>}

      }, {
      title: '本月销售额',
      dataIndex: 'cc',
      key: 'cc',
        render:(val,record)=>{return <span className={record.id==data.length?styles.red:styles.green}>{val}</span>}
      }
    ]
    return (
      <div>
        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              // loading={loading}
              bordered={false}
              title="订单概况"
              bodyStyle={{textAlign:'center',fontSize:16}}
              onClick={this.orderList}

            >
              <Row type="flex" justify="center" style={{marginBottom:20}}>
                <Col xl={7} lg={12} md={24} sm={24} xs={24} >发货超时 (<span style={{color:'#00a0e9'}}> 2 </span>)</Col>
                <Col xl={7} lg={12} md={24} sm={24} xs={24} >待发货 (<span style={{color:'#00a0e9'}}> 2 </span>)</Col>
                {/*<Col span={7} ></Col>*/}
              </Row>
              <Row type="flex" justify="center">
                <Col xl={7} lg={12} md={24} sm={24} xs={24} >已发货 (<span style={{color:'#00a0e9'}}> 2 </span>)</Col>
                <Col xl={7} lg={12} md={24} sm={24} xs={24} >待收货 (<span style={{color:'#00a0e9'}}> 2 </span>)</Col>
                <Col xl={7} lg={12} md={24} sm={24} xs={24} >已完成 (<span style={{color:'#00a0e9'}}> 2 </span>)</Col>
              </Row>
            </Card>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              // loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="商品概况"
              bodyStyle={{textAlign:'center',fontSize:16}}
              onClick={this.goodsList}
            >
              <Row type="flex" justify="center" style={{marginBottom:20}}>
                {/*<Col xl={10} lg={24} md={24} sm={24} xs={24} >待确认报价 (<span style={{color:'#00a0e9'}}> 2 </span>)</Col>*/}
                <Col xl={10} lg={24} md={24} sm={24} xs={24} >库存小于100的商品 (<span style={{color:'#00a0e9'}}> 2 </span>)</Col>

              </Row>
              <Row type="flex" justify="center">
                <Col xl={10} lg={24} md={24} sm={24} xs={24} >库存小于20的商品 (<span style={{color:'#00a0e9'}}> 2 </span>)</Col>
                {/*<Col span={6} ></Col>*/}
              </Row>
            </Card>
          </Col>
        </Row>

        <Card
          // loading={loading}
          bordered={false}
          // title="销售概况"
          style={{ marginTop: 24 }}
        >
          <Table
            columns={columns}
            pagination={false}
            dataSource={data}
          />

        </Card>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              // loading={loading}
              bordered={false}
              title="最畅销十款平台商品"
              style={{ marginTop: 24 }}
            >
              <Bar
                padding={[5,50]}
                height={200}
                // title="销售额趋势"
                data={salesData}
                autoLabel={true}
              />

            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              // loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="各平台渠道订单数分布图"
              style={{ marginTop: 24 }}
            >
              <Pie
                hasLegend
                subTitle=""
                // total={yuan(todaySales.reduce((pre, now) => now.y + pre, 0))}
                data={todaySales}
                height={200}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>


      </div>
    );
  }
}
