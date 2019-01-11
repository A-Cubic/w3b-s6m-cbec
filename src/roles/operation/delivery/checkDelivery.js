import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs,Radio ,InputNumber,AutoComplete,Cascader

} from 'antd';
import styles from './deliveryForm.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
//import {getToken} from "../../../utils/Global";
import {message} from "antd/lib/index";
import {getUploadUrl} from '../../../services/api'
import {getHeader, getToken} from "../../../utils/Global";
const userId = getToken().userId;

const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;


const confirm = Modal.confirm;

function destroyAll() {
  Modal.destroyAll();
}



@connect(({roleOperationDistribution,publicDictionary }) => ({
  roleOperationDistribution,publicDictionary
}))

@Form.create()
// 发货管理 - 发货单表单
export default class deliveryForm extends Component {
  state={
    formValues:{},
   // delList:[],
  // dataSource: [],
    data: [],
    value: undefined,
    valueGoodsNum:'',
    valueSafeNum:'',
  }

  componentDidMount() {
    this.init() 
  }

  init(){
    this.props.dispatch({
      type:'roleOperationDistribution/getShipmentListViewData',
      payload:{

      }
    })
  }


  //分页
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    //console.log('分页',params,pagination, filters, sorter)
    this.props.dispatch({
      //type: 'rolePurchaserBulkPurchases/getInquiryListData',
      //type: 'rolePurchaserBulkPurchases/getPagingData',
      type: 'roleOperationDistribution/getPagingShipmentListView',
      //payload: params,
       payload: {
         ...params,
         id:this.props.roleOperationDistribution.shipmentListView.tableData.list[0].id
       },
    });
  }



  renderForm(){
  const { roleOperationDistribution:{shipmentListView:{tableData:{list, pagination,item}}} } = this.props;
  
  console.log('xxx',this.props.roleOperationDistribution.shipmentListView)

  const { getFieldDecorator } = this.props.form;
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    ...pagination,
  };
  //下拉数据
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      }, {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
      }, {
        title: '原产地',
        dataIndex: 'country',
        key: 'country',
      }, {
        title: '生产商',
        dataIndex: 'brand',
        key: 'brand',
      }, , {
        title: '规格',
        dataIndex: 'string',
        key: 'string',
      }, {
        title: '零售价',
        dataIndex: 'rprice',
        key: 'rprice',
      }, {
        title: '供货价',
        dataIndex: 'pprice',
        key: 'pprice',
      }, {
        title: '当前库存数',
        dataIndex: 'pNum',
        key: 'pNum',
      }, {
        title: '发货数量',
        dataIndex: 'goodsNum',
        key: 'goodsNum',
      }, {
        title: '安全库存',
        dataIndex: 'safeNum',
        key: 'safeNum',
      }
    ];
    const props = {
      action: getUploadUrl(),
      headers: getHeader(),
      showUploadList: false,
      // listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange,
      multiple: false,
      // customRequest:this.upload,
    };
    //console.log('sex',parseInt(item.sex ))
    return (
      <Form onSubmit={this.onPreservation} layout="inline">
        <div className={styles.titleName}>发货单</div>
        <div className={styles.takeGoods}>
          <span></span>
          发货人信息
        </div>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={4} sm={24}></Col>
          <Col md={8} sm={24}>

            <FormItem label="发货人：  ">
              <span>{item.sendName}</span>
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="发货人电话：  ">
              <span>{item.sendTel}</span>
            </FormItem>      
          </Col>
          <Col md={4} sm={24}></Col>
        </Row>
        <div className={styles.line} style={{marginBottom:25}}></div>
        <div className={styles.takeGoods}>
          <span></span>
          快递信息
        </div>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
        <Col md={4} sm={24}></Col>
          <Col md={8} sm={24}>
            <FormItem label="快递公司：  ">
              <span>{item.express}</span>
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="运单号：">
              <span>{item.waybillNo}</span>
            </FormItem>      
          </Col>
          <Col md={4} sm={24}></Col>
            
        </Row>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
          
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>
        <div className={styles.line} style={{marginBottom:25}}></div>
        <div className={styles.takeGoods}>
          <span></span>
          采购商信息
        </div>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={3} sm={24}></Col>
          <Col md={6} sm={24}>
            <FormItem label="采购商：">
              <span>{item.getName}</span>
            </FormItem>      
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="联系人：">
             <span>{item.contact}</span>
            </FormItem>         
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="联系人电话：">
              <span>{item.getTel}</span>
            </FormItem>  
          </Col>
          <Col md={3} sm={24}></Col>
        </Row>
        <div className={styles.line} style={{marginBottom:25}}></div>
        <div className={styles.takeGoods}>
          <span></span>
          发货商品
          <div style={{marginBottom:'35px'}}></div>
        </div>
        <div style={{marginBottom:'20px'}}>
     
        </div>
        <Table dataSource={list}
                // showHeader={false}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.keyId}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
          <p onClick={this.showConfirm}>
            {/* Confirm 777*/}
          </p>
        <Row style={{marginTop:'15px', marginBottom:'5px'}}>
          <Col md={9} sm={24}></Col>
          <Col md={6} sm={24}>
           
          </Col>
          <Col md={9} sm={24}></Col>
        </Row>
      </Form>
    );
  }

  render() {
    return (
      <div className={styles.qa}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
        </Card>
      </div>
    );
  }

}


