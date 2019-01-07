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
export default class inTheInquiry extends Component {
  state={
    formValues:{}
  }
  componentDidMount() {
    const {match,dispatch}=this.props;
    //console.log('fs',JSON.parse(match.params.biography))
    //const b=JSON.parse(match.params.biography)}
    const getData = JSON.parse(match.params.biography)
    //console.log('getData',getData)
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getlistInquiry',
      //payload: params,
      payload: {
        purchasesn:getData.purchasesn,
        status:getData.status
      },
    });
  }

  handleTableChange=(pagination, filters, sorter)=>{

    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getlistInquiry',
      payload: {
        ...params,
        purchasesn:this.props.rolePurchaserBulkPurchases.listInquiry.tableData.list[0].purchasesn,
        status:this.props.rolePurchaserBulkPurchases.listInquiry.tableData.item.status
      },
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

    //console.log('xxxxxxxxxxxfs',this.props.rolePurchaserBulkPurchases.listInquiry.tableData)
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '询价商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      }, {
        title: '询价商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        //render:val=>`${val==1?'收货单':'退货单'}`
      }, {
        title: '询价数',
        dataIndex: 'total',
        key: 'total',
      }
    ];
    return (
      <div >
        <Card bordered={false}>
          <div className={styles.titleName}>采购单</div>
          <div className={styles.takeGoods}>
            <span></span>
            提货信息
          </div>
          <div className={styles.takeAdd}>
            <p>提货地点：{item.typeName}</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.takeGoods}>
            <span></span>
            采购商信息
          </div>
          <div className={styles.information}>
            <p>姓名：{item.contacts}</p>
            <p>联系电话：{item.tel}</p>
            <p>采购截止日期：{item.deliveryTime}</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.takeGoods}>
            <span></span>
            采购商品
          </div>
          <div className={styles.describe}>
            <p>询价单描述：<span>{item.remark}</span></p>
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
          商品金额：<span>{item.purchasePrice}</span>　运费：<span>￥{item.waybillfee}</span>　税费：<span>￥{item.tax}</span>
          </div>
        </Card>
      </div>
    );
  }
}
