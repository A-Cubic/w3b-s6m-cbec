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
  
  handleClickImg=(a)=>{
    this.props.dispatch({
      type:'roleOperationDistribution/getCheckAgreementData',
      payload:{
        src:a,
        visible:true
      }
    })
  }
  

 
  
 
  render() {
    const { roleOperationDistribution:{checkAgreement:{tableData:{list, item}}} } = this.props;
   
    console.log('777',this.props)
    
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
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginTop:'25px',marginBottom:'15px'}}>
            <Col md={8} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'70px',marginRight:'25px'}}>客商编码：</span>124891823
            </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'15px'}}>
            <Col md={8} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'70px',marginRight:'25px'}}>客商名称：</span>{item.cycle}
            </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'15px'}}>
            <Col md={8} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'70px',marginRight:'25px'}}>签订日期：</span>{item.cycle}
            </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'15px'}}>
            <Col md={8} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'70px',marginRight:'25px'}}>结算账期：</span>{item.cycle}
            </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'15px'}}>
            <Col md={8} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'70px',marginRight:'25px'}}>合作模式：</span>{item.cycle}
            </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'35px'}}>
            <Col md={8} sm={24}></Col>
            <Col md={16} sm={24} style={{fontSize:'16px'}}>
              <span style={{marginLeft:'70px',marginRight:'25px'}}>合作期限：</span>2018.09.01~2019.09.01 9.09.01
            </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <div className={styles.line}></div>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <div className={styles.titleName}></div>
            <div className={styles.takeGoods}>
              <span></span>
              扣点方式
            </div>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginBottom:'15px',marginTop:'20px'}}>
            
            <Row style={{marginTop:'15px', marginBottom:'5px',textAlign:'center'}}>
              <span style={{fontSize:'16px'}}>平台：3% + 供货中介：1% + 采购中介：1%</span>
            </Row>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}  style={{marginBottom:'25px',}}>
            <div className={styles.titleName}></div>
            <div className={styles.takeGoods}>
              <span></span>
              附件
            </div>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <ul className={styles.hot}>
              {
                list!=''?
                  list.map((i,index) => {
                    return(
                      <li key={index}><img src={i.imgUrl} onClick={()=>this.handleClickImg(i.imgUrl)}/></li>
                    )
                  }):
                  <div style={{textAlign:'center',fontSize:15}}>
                    <Divider dashed />
                    暂时没有合同相关数据
                  </div>
                }
            </ul>
          </Row>
        </Card>
        <ShowImg />
      </div>
    );
  }
  
}

@connect(({roleOperationDistribution }) => ({
  roleOperationDistribution,
}))
class ShowImg extends Component {
  handleCancel = (e) => {
    this.props.dispatch({
      type:'roleOperationDistribution/getCheckAgreementData',
      payload:{
        visible:false
      }
    })
  }
  render() {
    const { roleOperationDistribution:{checkAgreement:{tableData:{src,visible,list, item}}} } = this.props;
   
    console.log('fs',this.props.rolePurchaserConsignment)
    return(
    <div>
      <Modal
          title="合同详情"
          width={850}
          cancelText="关闭"
          footer={[
            <Button key="back" onClick={this.handleCancel}>关闭</Button>
          ]}
          visible={visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div> 
            {/* <img className={styles.bigImg} src={src}></img> */}
            <img src = 'http://ecc-product.oss-cn-beijing.aliyuncs.com/goodsuploads/8809420800199_cp_1.jpg'></img>
          </div>
        </Modal>
    </div>
    )
  }
}


