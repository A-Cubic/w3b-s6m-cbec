import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Radio ,InputNumber ,Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './rechargeDetailsConsumption.less';
import moment from 'moment';
import {getCurrentUrl, getUploadUrl} from '../../services/api'
import {getHeader, getToken} from "../../utils/Global";
const userId = getToken().userId;
import {message} from "antd/lib/index";


const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const QRCode = require('qrcode.react');


@connect(({roleRetaiBusManagement }) => ({
  roleRetaiBusManagement
}))
// --------  --------------
    // 零售 - 充值
@Form.create()
export default class rechargeDetailsConsumption extends Component {
  state={
    formValues:{},
    visible: false,
    visibleChildCheck:false,
    isimg:false,
  }

  //****/
  init(){
    this.props.dispatch({
      type:'roleRetaiBusManagement/GetRetailMoney',
      payload:{
        fundtype: "订单扣款"
      }
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
        type:'roleRetaiBusManagement/GetRetailMoney',
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
      type:'roleRetaiBusManagement/GetRetailMoney',
      payload: params,
    });
  }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }
 
  handlePopup (){
    this.props.dispatch({
      type:'roleRetaiBusManagement/getPopupR',
      
    });
  }
  handleQRCode (){
    this.props.dispatch({
      type:'roleRetaiBusManagement/getQROpenR',
      
    });
   // console.log('QR')
  }

  renderForm(){
    // const { roleOperationDistribution:{storesSales:{tableData:{item}}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { roleRetaiBusManagement:{rechargeDetails:{tableData}} } = this.props;

    //console.log('ffff',tableData)
    return (
      <div>
        <Form onSubmit={this.onSearch} layout="inline">
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="操作时间：">
                {getFieldDecorator('dateTime')(
                  <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="订单号：">
                {getFieldDecorator('orderId')(
                  <Input style={{ width: '100%' }} placeholder="可输入订单号进行查询" />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="支付单号：">
                {getFieldDecorator('fundId')(
                  <Input style={{ width: '100%' }} placeholder="可输入支付单号进行查询" />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="类别">
                {getFieldDecorator('fundtype')(
                  <Select
                    placeholder="请选择"
                    optionFilterProp="label"
                  >
                    <Option value="全部">全部</Option>
                    <Option value="充值">充值</Option>
                    <Option value="订单扣款">订单扣款</Option>
                  
                  </Select>
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
              共查询出符合条件的数据：{tableData.pagination.total}条，
            </div>
          </div>
        </Form>
      </div>
      
    );
  }

  render() {
    //const { roleOperationDistribution:{storesSales:{tableData:{list, pagination}}} } = this.props
    
    const { roleRetaiBusManagement:{rechargeDetails,rechargeDetails:{tableData:{img,list, pagination}}} } = this.props;
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
        title: '类别',
        dataIndex: 'fundtype',
        key: 'fundtype',
      } ,{
        title: '支付时间',
        dataIndex: 'paytime',
        key: 'paytime',
      }, {
        title: '支付单号',
        dataIndex: 'fundId',
        key: 'fundId',
      }, {
        title: '订单金额',
        dataIndex: 'fundprice',
        key: 'fundprice',
        render:val=>`¥${val}`
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
      </div>
    );
  }
}

