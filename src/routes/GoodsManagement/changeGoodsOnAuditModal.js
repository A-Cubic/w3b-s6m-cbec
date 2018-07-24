import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Modal,Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker } from 'antd';

import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;

@connect(({goodsManagement,  loading }) => ({
  goodsManagement,
  loading: loading.effects['goodsManagement/getGoodsOnAuditList'],
}))

@Form.create()
export default class ChangeGoodsOnAuditModal extends Component {
  state={
  }
  init(){
    // this.props.dispatch({
    //   type: 'goodsManagement/getGoodsOnAuditList',
    //   payload: {
    //     userId:userId,
    //   },
    // });
  }
  componentDidMount() {
    this.init();
  }
  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      ...pagination,
      userId:userId,
    };
    this.props.dispatch({
      type: 'goodsManagement/getGoodsOnAuditList',
      payload: params,
    });
  }



  handleCancel=()=>{
    this.props.parent.handleVisible(false,'changeVisible')
  }
  render() {

    // console.log('1',this.props)
    const { goodsManagement:{goodsOnAudit:{tableData}} } = this.props;


    const columns = [
      {
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode',
    }, {
      title: '商品名称（中文）',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '仓库名称',
      dataIndex: 'wname',
      key: 'wname',
    }, {
      title: '供货价',
      dataIndex: 'inprice',
      key: 'inprice',
    }, {
      title: '供货数量',
      dataIndex: 'goodsnum',
      key: 'goodsnum',
    }, {
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      render:val=>{
        return <div style={{color:'#1890FF '}}>{{val}}</div>
      }
      }
    ];
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1200}}
          // cancelText="关闭"
          // okText="提交"
          title="商品上架详情"

          visible={this.props.parent.visible}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <div>
              <span>供应商：</span>
              <Button style={{ marginLeft: 40 }} type="primary" onClick={this.downloadGoodsMes}>
                下载新上架的商品基础信息
              </Button>
              <Button style={{ marginLeft: 20 }} type="primary" onClick={this.downloadGoodsZip}>
                下载新上架的商品图片压缩包
              </Button>


            </div>
            <Table
              dataSource={[]}
              // rowKey={record => record.id}
              pagination={false}
              columns={columns}
            />

          </div>
        </Modal>
      </div>
    );
  }
}
