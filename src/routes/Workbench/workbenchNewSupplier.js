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
    this.props.dispatch({
      type: 'workbench/getWorkbenchNewSupplierData',
      payload:{}
    });
  }


  render() {
    const {workbench:{workbenchNewSupplier:{getData:{company,lastTime,batchSupply,bussness,distribution,goods,substitute}}}}= this.props;
   
    return (
      <div >
        <Row gutter={24} style={{background:'#fff',padding:'27px 0',marginBottom:'24px'}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div style={{margin:'0px',padding:'0px',width:'100%'}}>
              <p style={{fontSize:'20px'}}>您好！欢迎来到流连优选</p>
              <p>公司名称：{company}  |   最后登录：{lastTime}</p>
            </div>
          </Col>
        </Row>
        <Row gutter={24} style={{background:'#fff',padding:'24px 0 10px',marginBottom:'2px'}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div style={{margin:'0px',padding:'0px',width:'100%'}}>
              <p style={{fontSize:'16px',color:'#000',fontWeight:'bold',textIndent:'15px'}}>销售数据</p>
            </div>
          </Col>
        </Row>
        <Row className={styles.nav} gutter={24} style={{background:'#fff',padding:'24px 0 20px',marginBottom:'24px'} }>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <div style={{textAlign:'center',fontSize:'14px',marginBottom:'20px'}}><Icon style={{fontSize:'16px'}} type="copy" /><span style={{paddingLeft:'6px'}}>批量供货</span></div>
            <div style={{textAlign:'center',background:'#f0f2f5',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',}}>客单价  0</div>
            <div style={{textAlign:'center',width:'80%',margin:'0 auto',padding:'6px 0',fontSize:'14px',marginBottom:'5px',overflow:'hidden'}}>
              <div style={{float:'left',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>今日成交额 </div>
                <div style={{color:'#1890ff'}}>{batchSupply.todayOrderPrice}</div>
              </div>
              <div style={{float:'right',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>昨日成交额    </div>
                <div style={{color:'#1890ff'}}>{batchSupply.yestOrderPrice}</div>
              </div>
            </div>
            <div style={{textAlign:'center',width:'80%',margin:'0 auto',padding:'6px 0',fontSize:'14px',marginBottom:'5px',overflow:'hidden'}}>
              <div style={{float:'left',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>今日订单数   </div>
                <div style={{color:'#1890ff'}}>{batchSupply.todayOrder}</div>
              </div>
              <div style={{float:'right',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>昨日订单数    </div>
                <div style={{color:'#1890ff'}}>{batchSupply.yestOrder}</div>
              </div>
            </div>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <div style={{textAlign:'center',fontSize:'14px',marginBottom:'20px'}}><Icon style={{fontSize:'16px',}} type="interation" /><span style={{paddingLeft:'6px'}}>一件代发</span></div>
            <div style={{textAlign:'center',background:'#f0f2f5',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',}}>客单价   <span style={{color:'#1890ff'}}>{substitute.avgOrderPrice}</span></div>
            <div style={{textAlign:'center',width:'80%',margin:'0 auto',padding:'6px 0',fontSize:'14px',marginBottom:'5px',overflow:'hidden'}}>
              <div style={{float:'left',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>今日成交额    </div>
                <div style={{color:'#1890ff'}}>{substitute.todayOrderPrice}</div>
              </div>
              <div style={{float:'right',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>昨日成交额    </div>
                <div style={{color:'#1890ff'}}>{substitute.yestOrderPrice}</div>
              </div>
            </div>
            <div style={{textAlign:'center',width:'80%',margin:'0 auto',padding:'6px 0',fontSize:'14px',marginBottom:'5px',overflow:'hidden'}}>
              <div style={{float:'left',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>今日订单数   </div>
                <div style={{color:'#1890ff'}}>{substitute.todayOrder}</div>
              </div>
              <div style={{float:'right',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>昨日订单数    </div>
                <div style={{color:'#1890ff'}}>{substitute.yestOrder}</div>
              </div>
            </div>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <div style={{textAlign:'center',fontSize:'14px',marginBottom:'20px'}}><Icon style={{fontSize:'16px'}} type="shop" /><span style={{paddingLeft:'6px'}}>铺货</span></div>
            <div style={{textAlign:'center',background:'#f0f2f5',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',}}>客单价   <span style={{color:'#1890ff'}}>{distribution.avgOrderPrice}</span></div>
            <div style={{textAlign:'center',width:'80%',margin:'0 auto',padding:'6px 0',fontSize:'14px',marginBottom:'5px',overflow:'hidden'}}>
              <div style={{float:'left',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>今日成交额    </div>
                <div style={{color:'#1890ff'}}>{distribution.todayOrderPrice}</div>
              </div>
              <div style={{float:'right',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>昨日成交额    </div>
                <div style={{color:'#1890ff'}}>{distribution.yestOrderPrice}</div>
              </div>
            </div>
            <div style={{textAlign:'center',width:'80%',margin:'0 auto',padding:'6px 0',fontSize:'14px',marginBottom:'5px',overflow:'hidden'}}>
              <div style={{float:'left',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>今日订单数    </div>
                <div style={{color:'#1890ff'}}>{distribution.todayOrder}</div>
              </div>
              <div style={{float:'right',width:'45%',overflow:'hidden',background:'#f0f2f5',height:'46px',padding:'3px 0'}}>
                <div>昨日订单数    </div>
                <div style={{color:'#1890ff'}}>{distribution.yestOrder}</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={24} style={{background:'#fff',padding:'24px 0 10px',marginBottom:'2px'}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div style={{margin:'0px',padding:'0px',width:'100%'}}>
              <p style={{fontSize:'16px',color:'#000',fontWeight:'bold',textIndent:'15px'}}>商品提示</p>
            </div>
          </Col>
        </Row>
        <Row className={styles.nav} gutter={24} style={{background:'#fff',padding:'24px 0 20px',marginBottom:'24px'} }>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <div style={{textAlign:'center',border:'1px solid #1890FF',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',borderRadius:'6px'}}>出售中的商品  <span style={{color:'red'}}>({goods.salsingGoods})</span></div>
          </Col>   
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <div style={{textAlign:'center',border:'1px solid #1890FF',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',borderRadius:'6px'}}>已销售过的商品 <span style={{color:'red'}}>({goods.salsedGoods})</span></div>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <div style={{textAlign:'center',border:'1px solid #1890FF',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',borderRadius:'6px'}}>从未销售过的商品  <span style={{color:'red'}}>({goods.otherGoods})</span></div>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <div style={{textAlign:'center',border:'1px solid #1890FF',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',borderRadius:'6px'}}>库存预警商品  <span style={{color:'red'}}>({goods.warningGoods})</span></div>
          </Col>
        </Row>
        <Row gutter={24} style={{background:'#fff',padding:'24px 0 10px',marginBottom:'2px'}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div style={{margin:'0px',padding:'0px',width:'100%'}}>
              <p style={{fontSize:'16px',color:'#000',fontWeight:'bold',textIndent:'15px'}}>交易提示</p>
            </div>
          </Col>
        </Row>
        <Row className={styles.nav} gutter={24} style={{background:'#fff',padding:'24px 0 20px',marginBottom:'24px'} }>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <div style={{textAlign:'center',border:'1px solid #1890FF',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',borderRadius:'6px'}}>待报价订单  <span style={{color:'red'}}>({bussness.offerOrders})</span></div>
          </Col>   
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <div style={{textAlign:'center',border:'1px solid #1890FF',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',borderRadius:'6px'}}>待发货订单  <span style={{color:'red'}}>({bussness.deliveryOreders})</span></div>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <div style={{textAlign:'center',border:'1px solid #1890FF',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',borderRadius:'6px'}}>待处理退货订单  <span style={{color:'red'}}>({bussness.pendingReturnOrders})</span></div>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <div style={{textAlign:'center',border:'1px solid #1890FF',width:'80%',margin:'0 auto',padding:'6px 0',marginBottom:'14px',borderRadius:'6px'}}>已退货待我签收订单  <span style={{color:'red'}}>({bussness.returnedOrders})</span></div>
          </Col>
        </Row>


      </div>
    );
  }
}
