import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './storesSales.less';
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
    // 门店库存 - 门店销售
@Form.create()
export default class storesSales extends Component {
  state={
    formValues:{},
    visible: false,
    visibleChildCheck:false,
  }

  //****/
  init(){
    this.props.dispatch({
      type:'roleOperationDistribution/storesSales',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'roleOperationDistribution/storesSales',
        payload: {
          ...values,
        },
      });
    });
  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo: null,
    });
    this.init();
  }
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'roleOperationDistribution/storesSales',
      payload: params,
    });
  }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }
 

  renderForm(){
    const { roleOperationDistribution:{storesSales:{tableData:{item}}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    
    //console.log('xxx',this.props)
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={9} sm={24}>
            <FormItem label="单据日期：">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>
          </Col>
          <Col md={9} sm={24}>
            <FormItem label="采购商：">
              {getFieldDecorator('purchaseName')(
                <Input style={{ width: '100%' }} placeholder="可输入采购商名称进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span>零售价：<em style={{color:'orange',fontStyle:'normal'}}>{item.rprice}</em>  平台采购价：<em style={{color:'orange',fontStyle:'normal'}}>{item.inprice}</em>  平台供货价：<em style={{color:'orange',fontStyle:'normal'}}>{item.pprice} </em>服务费：<em style={{color:'orange',fontStyle:'normal'}}>{item.platformPrice}</em></span>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    const { roleOperationDistribution:{storesSales:{tableData:{list, pagination}}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      },{
        title: '订单号',
        dataIndex: 'orderId',
        key: 'orderId',
      } ,{
        title: '销售日期',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
      }, {
        title: '采购商',
        dataIndex: 'purchaseName',
        key: 'purchaseName',
      }, {
        title: '零售价',
        dataIndex: 'rprice',
        key: 'rprice',
          render:val=>`¥${val}`
      },{
        title: '平台采购价（元）',
        dataIndex: 'inprice',
        key: 'inprice',

      },{
        title: '平台供货价（元）',
        dataIndex: 'pprice',
        key: 'pprice',
        render:val=>`¥${val}`
      },{
        title: '服务费（元）',
        dataIndex: 'platformPrice',
        key: 'platformPrice',
      },{
        title: '操作',
        dataIndex: '',
        key: '',
        render: (val,record) =>
        <div>
            {<a onClick={(e) => this.handlestoresSalesClick(e, record)}>查看</a>}
        </div>
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
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
          <Table dataSource={list}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.keyId}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
        <StoresSalesSee />
      </div>
    );
  }
   //查看
   handlestoresSalesClick = (e, record)=>{
     //console.log('record',11)
    this.props.dispatch({
      type: 'roleOperationDistribution/storesSalesClickList',
      payload: {
        orderId:record.orderId,
        //barcode:record.barcode,
        //index:index
      },
    });
  }
}


//查看弹窗
@connect(({roleOperationDistribution }) => ({
  roleOperationDistribution,
}))
class StoresSalesSee  extends Component {

  handleCancel = () => {
    this.props.dispatch({
      type:'roleOperationDistribution/storesSalesCloseR',
      payload:false
    })
  }
  handleOk = () => {
    this.props.dispatch({
      type:'roleOperationDistribution/storesSalesCloseR',
      payload:false
    })
  }

  //翻页
  handleTableChange=(pagination, filters, sorter)=>{
   // const { roleOperationDistribution:{storesSales:{childDetailsModelVisible,storesSalesDetails:{item,list,pagination}}} } = this.props;
    const orderId = this.props.roleOperationDistribution.storesSales.storesSalesDetails.item
    console.log('qqq',this.props.roleOperationDistribution.storesSales.storesSalesDetails)
    const params = {
      ...pagination,
      
    };
    this.props.dispatch({
      type: 'roleOperationDistribution/storesSalesClickList',
      payload: {
        ...params,
        orderId:orderId
      }
    });
  }
  render(){
    
    const { roleOperationDistribution:{storesSales:{childDetailsModelVisible,storesSalesDetails:{item,list,pagination}}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
     console.log('777', this.props.roleOperationDistribution.storesSales.storesSalesDetails.item)
  
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '销售时间',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
      }, {
        title: '供货商',
        dataIndex: 'supplierName',
        key: 'supplierName',
        
      },  {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      }, {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
      }, {
        title: '规格',
        dataIndex: 'model',
        key: 'model',
      }, {
        title: '原产地',
        dataIndex: 'country',
        key: 'country',
      }, {
        title: '生产商',
        dataIndex: 'brand',
        key: 'brand',
      }, {
        title: '销售数量',
        dataIndex: 'num',
        key: 'num',
      }, {
        title: '零售价',
        dataIndex: 'rprice',
        key: 'rprice',
      }, {
        title: '平台采购价',
        dataIndex: 'inprice',
        key: 'inprice',
      }, {
        title: '平台供货价',
        dataIndex: 'pprice',
        key: 'pprice',
      }, {
        title: '服务费',
        dataIndex: 'platformPrice',
        key: 'platformPrice',
      }
    ];

    return(
      <div>
        <Modal
          visible= {childDetailsModelVisible}
          onCancel={this.handleCancel}
          width={'80%'}
          onOk={this.handleOk}
        >
         <Table dataSource={list}
            columns={columns}
            rowKey={record => record.keyId}
            pagination={paginationProps}
            onChange={this.handleTableChange}
          />

        </Modal>
      </div>
    )

    
    
   
    

  }

}


