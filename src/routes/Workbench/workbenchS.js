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
    const today = {x:'今日销售额',y:100}
    const week = {x:'本周销售额',y:100}
    const month = {x:'本月销售额',y:100}
    const yesterdaySales = [
      {
        x: '昨日销售额',
        y: 4544,
      },
    ];
    const todaySales = [
      {
        x: '1',
        y: 0,
      },
      {...today}
    ];
    const weekSales = [
      {
        x: '1',
        y: 0,
      },
      {
        x: '2',
        y: 0,
      },
      {...week}
    ];
    const monthSales = [
      {
        x: '1',
        y: 0,
      },{
        x: '2',
        y: 0,
      },{
        x: '3',
        y: 0,
      },
      {...month}
    ];

    const salesData = [{x:'商品条码：4520060581005,Skinature 胶原蛋白第二肌肤面膜 150ML',y:180},{x:'商品2',y:80},{x:'商品3',y:70},{x:'商品4',y:60},{x:'商品5',y:50},
      {x:'商品6',y:100},{x:'商品7',y:80},{x:'商品8',y:70},{x:'商品9',y:60},{x:'商品10',y:50},]

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
                <Col xl={10} lg={24} md={24} sm={24} xs={24} >待确认报价 (<span style={{color:'#00a0e9'}}> 2 </span>)</Col>
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
          title="销售概况"
          style={{ marginTop: 24 }}
        >
            <Row gutter={24}>
              <Col xl={6} lg={6} md={12} sm={24} xs={24}>
                <Pie
                  subTitle="昨日销售额"
                  total={yuan(yesterdaySales.reduce((pre, now) => now.y + pre, 0))}
                  data={yesterdaySales}
                  height={248}
                  lineWidth={4}
                />
              </Col>
              <Col xl={6} lg={6} md={12} sm={24} xs={24}>
                <Pie
                  subTitle="今日销售额"
                  total={yuan(todaySales.reduce((pre, now) => now.y + pre, 0))}
                  data={todaySales}
                  height={248}
                  lineWidth={4}
                />
              </Col>
              <Col xl={6} lg={6} md={12} sm={24} xs={24}>
                <Pie
                  subTitle="本周销售额"
                  total={yuan(weekSales.reduce((pre, now) => now.y + pre, 0))}
                  data={weekSales}
                  height={248}
                  lineWidth={4}
                />
              </Col>
              <Col xl={6} lg={6} md={12} sm={24} xs={24}>
                <Pie
                  subTitle="本月销售额"
                  total={yuan(monthSales.reduce((pre, now) => now.y + pre, 0))}
                  data={monthSales}
                  height={248}
                  lineWidth={4}
                />
              </Col>
            </Row>

        </Card>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              // loading={loading}
              bordered={false}
              title="最畅销十款已供商品"
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
        </Row>


      </div>
    );
  }
}
