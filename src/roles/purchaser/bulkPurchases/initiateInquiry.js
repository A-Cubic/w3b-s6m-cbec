import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs,Radio   } from 'antd';
import styles from './initiateInquiry.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
//import {getToken} from "../../../utils/Global";

import {getUploadUrl} from '../../../services/api'
import {getHeader, getToken} from "../../../utils/Global";
const userId = getToken().userId;

const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserBulkPurchases }) => ({
  rolePurchaserBulkPurchases
}))

@Form.create()
// 代销 - 统计 - 发起询价 - 20181214
export default class initiateInquiry extends Component {
  state={
    formValues:{},
    value: 1,
    
  }
  init(){
    this.props.dispatch({
      type:'rolePurchaserBulkPurchases/getInitiateInquiryData',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)

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
        // type: 'rolePurchaserBulkPurchases/getInquiryListData',
       type: 'rolePurchaserBulkPurchases/getPreservationData',
        payload: {
          ...values,
        },
      });
    });

  }
  //下载运单模板
  downloadTemplate=()=>{
    window.location.href='http://ecc-product.oss-cn-beijing.aliyuncs.com/templet/Waybill.xlsx'
  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.setState({
      formValues: {},
    });
    this.init();
  }
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getInquiryListData',
      payload: params,
    });
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  // 上传销售数据
  handleUploadChange=(info)=>{
    if(info.file.status === 'done') {
      this.props.dispatch({
        type: 'rolePurchaserBulkPurchases/uploadOrderbill',
        payload: {
          userId:userId,
          fileTemp: info.file.response.fileName[0]
        },
        callback: this.onUploadCallback,
      });
    }
  }
  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      message.error(msg,8);
    }else{
      message.success("上传成功",5);
    }
    this.init();
  }


  renderForm(){
    // console.log(this.props)
    const RadioGroup = Radio.Group;
    const { getFieldDecorator } = this.props.form;
    //const {rolePurchaserBulkPurchases:{initiateInquiry}} = this.props

    const {rolePurchaserBulkPurchases:{initiateInquiry:{information,tableData:{list, pagination}}} } = this.props;
    
    //const {rolePurchaserBulkPurchases:{initiateInquiry:{preservation} } = this.props;

    
    
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    console.log('询价',this.props)
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '询价商品名称',
        dataIndex: 'order',
        key: 'order',
      }, {
        title: '询价商品条码',
        dataIndex: 'date',
        key: 'date',
        //render:val=>`${val==1?'收货单':'退货单'}`
      }, {
        title: '询价数量',
        dataIndex: 'goodsTotal',
        key: 'goodsTotal',
      }, {
        title: '操作',
        dataIndex: 'sendTime',
        key: 'sendTime',
       
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
      <Form onSubmit={this.onSearch} layout="inline">
        <div className={styles.titleName}>询价单</div>
        <div className={styles.takeGoods}>
          <span></span>
          提货信息
        </div>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
           <FormItem label="提货地点：">

              {getFieldDecorator('sendType',{
                  initialValue:'0'
                })(
                  <Select
                      placeholder="日本提货"
                      // onChange={this.handleSelectChange}
                      //defaultValue="0"
                    >
                    <Option value="0">日本提货</Option>
                    <Option value="1">韩国提货</Option>
                    <Option value="2">香港提货</Option>
                    <Option value="3">国内提货</Option>
                    </Select>
                )}   
          
            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>
        <div className={styles.line} style={{marginBottom:25}}></div>
        <div className={styles.takeGoods}>
          <span></span>
          采购商信息
        </div>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col> 
          <Col md={10} sm={24}>
            <FormItem label="姓名：  ">
              {getFieldDecorator('contacts', {
                initialValue: information.contacts,
                rules: [{ required: true, message: '请输入姓名' }],
              })(
                <Input placeholder="请输入姓名"/>
              )}
            </FormItem>            
          </Col>   
          <Col md={7} sm={24}>
         
            {/* <RadioGroup onChange={this.onChange} value={this.state.value} className={styles.sex}>
              <Radio value={1}>男士</Radio>
              <Radio value={2}>女士</Radio>
            </RadioGroup> */}
                
            {getFieldDecorator('sex',{
                initialValue:information.sex
              })(
                <RadioGroup  onChange={this.onChange}   className={styles.sex} >
                  <Radio  value={0}>男士</Radio>
                  <Radio value={1}>女士</Radio>
                </RadioGroup>
              )}     



          </Col>                
        </Row>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col> 
          <Col md={10} sm={24}>
            <FormItem label="联系电话:">
              {getFieldDecorator('tel', {
                initialValue: information.tel,
                rules: [{ required: true, message: '请输入联系电话' }],
              })(
                <Input placeholder="请输入联系电话"/>
              )}
            </FormItem>         
          </Col>   
          <Col md={7} sm={24}></Col>                
        </Row>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col> 
          <Col md={10} sm={24}>
            <FormItem label="采购截止日期：">
              {getFieldDecorator('deliveryTime', {
                initialValue: information.deliveryTime,
                 rules: [{ required: true, message: '请输入采购截止日期' }],
              })(
                <DatePicker  style={{ width: '100%' }} onChange={this.onTest}/>
                //<DatePicker style={{ width: '100%' }}  placeholder="" />
              )}
            </FormItem>      
          </Col>   
          <Col md={7} sm={24}></Col>                
        </Row>
        <div className={styles.line} style={{marginBottom:25}}></div>
        <div className={styles.takeGoods}>
          <span></span>
          采购商信息
        </div>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col> 
          <Col md={10} sm={24}>
            <FormItem label="询价单描述：:">
              {getFieldDecorator('remark', {
                initialValue: information.remark,
                rules: [{ required: true, message: '请输入询价单描述' }],
              })(
                <Input placeholder="请输入询价单描述"/>
              )}
            </FormItem>         
          </Col>   
          <Col md={7} sm={24}></Col>                
        </Row>           


        
        <Button style={{ marginLeft: 8 }} type="primary" onClick={this.downloadTemplate}>
          <Icon type="download" />下载询价模板
        </Button>
        <Upload  {...props}>
          <Button style={{ marginLeft: 8 }}>
            <Icon type="cloud-upload-o" /> 导入询价商品
          </Button>
        </Upload>

        <Table dataSource={list}
                // showHeader={false}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.keyId}
                 columns={columns}
                 pagination={paginationProps}
               //  onChange={this.handleTableChange}
                 // loading={submitting}
          />
        <Row>
          <Col md={12} sm={24}>
            <Button style={{ marginLeft: 8 }} htmlType="submit">保存</Button>
            <Button type="primary" onClick={this.handleFormReset} >提交</Button>
          </Col>
        </Row>  
      </Form>
    );
  }
  onTest(date, dateString){
    console.log('sdsdsds', date);
    console.log('sssssssssss', dateString);
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


