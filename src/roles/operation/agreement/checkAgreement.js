import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './checkAgreement.less';
import moment from 'moment';
import {getCurrentUrl, getUploadUrl} from '../../../services/api'
import {getHeader, getToken} from "../../../utils/Global";
const userId = getToken().userId;
import {message} from "antd/lib/index";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({roleOperationDistribution }) => ({
  roleOperationDistribution,
}))
// --------  --------------
    // 合同 - 查看合同
@Form.create()
export default class checkAgreement extends Component {
  state={
    formValues:{},
    visible: false,
    visibleChildCheck:false,
  }

  //****/
  init(){
    this.props.dispatch({
      type:'roleOperationDistribution/getCheckAgreementData',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  
  
  

 
  
 
  render() {
    const { roleOperationDistribution:{checkAgreement:{tableData:{list, item}}} } = this.props;
   
    
    
    return (
      <div>
        <Card bordered={false}>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <div className={styles.titleName}></div>
            <div className={styles.takeGoods}>
              <span></span>
              查看合同
            </div>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginTop:'15px',marginBottom:'15px'}}>
            <Col md={4} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'196px',marginRight:'25px'}}>客商编码：</span>124891823
            </Col>
            <Col md={4} sm={24}> </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'15px'}}>
            <Col md={4} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'196px',marginRight:'25px'}}>客商名称：</span>{item.cycle}
            </Col>
            <Col md={4} sm={24}> </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'15px'}}>
            <Col md={4} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'196px',marginRight:'25px'}}>签订日期：</span>{item.cycle}
            </Col>
            <Col md={4} sm={24}> </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'15px'}}>
            <Col md={4} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'196px',marginRight:'25px'}}>结算账期：</span>{item.cycle}
            </Col>
            <Col md={4} sm={24}> </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'15px'}}>
            <Col md={4} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'196px',marginRight:'25px'}}>合作模式：</span>{item.cycle}
            </Col>
            <Col md={4} sm={24}> </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'15px'}}>
            <Col md={4} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'196px',marginRight:'25px'}}>合作期限：</span>2018.09.01~2019.09.01 9.09.01
            </Col>
            <Col md={4} sm={24}> </Col>
          </Row>
        </Card>
      </div>
    );
  }
  
}


