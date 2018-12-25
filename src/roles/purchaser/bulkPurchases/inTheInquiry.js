import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs  } from 'antd';
import styles from './listDetails.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
import {getToken} from "../../../utils/Global";
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserBulkPurchases }) => ({
  rolePurchaserBulkPurchases
}))

@Form.create()
// 采购商 - 询价列表 - 询价中
export default class listInquiry extends Component {
  state={
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type:'rolePurchaserBulkPurchases/getlistInquiry',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }


  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getlistInquiry',
      payload: params,
    });
  }


  render() {
    const { rolePurchaserBulkPurchases:{listInquiry:{tableData:{item,list, pagination}}} } = this.props;
    //const { rolePurchaserConsignment:{confirmReceipt:{tableData:{list, pagination}}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    console.log('xxxxxxxxxxxfs',this.props.rolePurchaserBulkPurchases.listInquiry.tableData)
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '采购商品名称',
        dataIndex: 'purchasesn',
        key: 'purchasesn',
      }, {
        title: '采购商品条码',
        dataIndex: 'order',
        key: 'order',
        //render:val=>`${val==1?'收货单':'退货单'}`
      }, {
        title: '采购单价',
        dataIndex: 'goMoney',
        key: 'goMoney',
      }, {
        title: '总金额',
        dataIndex: 'tuiMoney',
        key: 'tuiMoney',
      },{
        title: '操作',
        dataIndex: 'elseMoney',
        key: 'elseMoney',
        render: (val,record) =>
          <div>
            <a href="javascript:;" onClick={()=>this.handleDetailsCheck(record)}>2详情</a><br/>
          </div>
      }
    ];
    return (
      <div >
        <Card bordered={false} >
        
          <div className={styles.titleName}>采购单</div>
          <div className={styles.takeGoods}>
            <span></span>
            提货信息
          </div>
          <div className={styles.takeAdd}>
            <p>提货地点：</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.takeGoods}>
            <span></span>
            采购商信息
          </div>
          <div className={styles.information}>
            <p>姓名：</p>
            <p>联系电话：</p>
            <p>采购截止日期：</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.takeGoods}>
            <span></span>
            采购商品
          </div>
          <div className={styles.describe}>
            <p>询价单描述：<span></span></p>
          </div>
          <Table dataSource={list}

                 rowKey={record => record.keyId}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}

          />
          <div className={styles.line}></div>
          <div className={styles.takeGoods}>
            <span></span>
            费用计算
          </div>
          <div className={styles.money}>
          商品金额：<span></span>　运费：<span>￥200.00</span>　税费：<span>￥200.00</span>
          </div>
          <PurchaseOrder />
        </Card>
      </div>
    );
  }
  handleDetailsCheck = (record) => {
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getClickDetails',
      payload: {}
    })
  }
}

@connect(({rolePurchaserBulkPurchases }) => ({
  rolePurchaserBulkPurchases
}))
class PurchaseOrder extends Component {
  
  handleCancel = () => {
    console.log('del')
    this.props.dispatch({
      type:'rolePurchaserBulkPurchases/getdetailsCheckDelR',
      payload:false
    })
  }


  render(){
    
    const {rolePurchaserBulkPurchases:{detailsList:{show,tableData:{list,pagination}}}} = this.props
    //console.log('22ok',this.props)

    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '询价单号',
        dataIndex: 'order',
        key: 'order',
      }, {
        title: '询价单标题',
        dataIndex: 'date',
        key: 'date',
        
      }, {
        title: '状态',
        dataIndex: 'goodsTotal',
        key: 'goodsTotal',
      }, {
        title: '操作',
        dataIndex: 'sendTime',
        key: 'sendTime',
      
      }
    ];



    return(
      <div>
        <Modal
          visible= {show}
          onCancel={this.handleCancel}
          width={1000}
        >
          <Card>

              {/* <div>11111</div> */}
              <Table dataSource={list}
                // scroll={{ x: 1500}}
                columns={columns}
                onChange={this.handleTableChange}
                // loading={submitting}
                rowKey={record => record.keyId}
              />

          </Card>
         

        </Modal>
      </div>
    )
  }

}