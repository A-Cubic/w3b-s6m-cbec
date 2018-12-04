import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './contractInformation.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
import {getToken} from "../../../utils/Global";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserConsignment, loading }) => ({
  rolePurchaserConsignment,
  //loading: loading.effects['goodsManagement/getGoodsAboutData'],
}))
// -------- 合同信息 --------------
    // 代销-财务-合同信息-20181121
@Form.create()
export default class contractInformation extends Component {
  init(){
    this.props.dispatch({
      type:'rolePurchaserConsignment/contractInformation',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  handleClickImg=(a)=>{
    this.props.dispatch({
      type:'rolePurchaserConsignment/sendChildHelpData',
      payload:{
        src:a,
        visible:true
      }
    })
  }
  render() {
    //console.log('qssssa',this.props)
    const {rolePurchaserConsignment:{contractInformation:{getData:{item,list}}}}= this.props
    return(
      <div>
        <Card>
          <div className={styles.header}>
            <Row>
              <Col span={2}><Icon type="exclamation-circle" className={styles.header_Icon} /></Col>
              <Col span={22}>
                  <p className={styles.header_p}>操作提示</p>
                  <h1 className={styles.header_h1}>按账单结算周期生成账单进行结算，比如1个月，则账单是（2017-01-01至2017-01-31）</h1>
              </Col>
            </Row>
          </div>
          <div className={styles.line}></div>
          <div className={styles.content}>
            <Row>
              <Col span={8}>合同编号：<em>{item.contractCode}</em></Col>
              <Col span={8}>账单结算周期：<em>{item.cycle}</em></Col>
              <Col span={8}>合作模式：<em>{item.model}</em></Col>
            </Row>
          </div>
          <ul className={styles.hot}>
            {
              list==[]?
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
        </Card>
        <ShowImg />
      </div>
    )
  }
}


@connect(({rolePurchaserConsignment }) => ({
  rolePurchaserConsignment,
}))
class ShowImg extends Component {
  handleCancel = (e) => {
    this.props.dispatch({
      type:'rolePurchaserConsignment/sendChildHelpData',
      payload:{
        visible:false
      }
    })
  }
  render() {
    const {rolePurchaserConsignment:{contractInformation:{childHelpData:{src,visible}}}}= this.props
    return(
    <div>
      <Modal
          title="合同详情"
          width={650}
          cancelText="关闭"
          footer={[
            <Button key="back" onClick={this.handleCancel}>关闭</Button>
          ]}
          visible={visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <img className={styles.bigImg} src={src}></img>
          </div>
        </Modal>
    </div>
    )
  }
}
