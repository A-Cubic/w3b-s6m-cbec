import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs,Radio   } from 'antd';
import styles from './initiateInquiry.less';
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
@connect(({rolePurchaserBulkPurchases }) => ({
  rolePurchaserBulkPurchases
}))

@Form.create()
// 批量采购 - 发起询价 - 20181214
export default class initiateInquiry extends Component {
  state={
    formValues:{},
    delList:[]
  }

  componentDidMount() {
    //this.init();
    const {match,dispatch}=this.props;
    //console.log('fs',JSON.parse(match.params.biography))
    //const b=JSON.parse(match.params.biography)}
    
    const getData = JSON.parse(match.params.biography)
    //console.log('getData',getData)

    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getSeeData',
      //payload: params,
      payload: {
        purchasesn:getData.purchasesn,
        status:getData.status
      },
    });

  }
  //保存
  onPreservation=(e)=>{
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
        callback:this.onPreservationCallback
      });
    });
  }
  onPreservationCallback = (params) => {
    //console.log('xxxxparams',params.type)
    if(params.type==="1"){
      message.success("保存成功");
      this.handleFormReset()
      this.props.form.resetFields();
      this.setState({
        formValues: {},
      });
     }else{
      message.error("保存失败");
     }
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
    //this.init();
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
      type: 'rolePurchaserBulkPurchases/getPagingData',
      //payload: params,
       payload: {
         ...params,
         purchasesn:this.props.rolePurchaserBulkPurchases.initiateInquiry.pur
       },
    });
  }
  
  //删除
  handleDelCheck = (e, record, index)=>{
   // console.log(record.order)
    // const {rolePurchaserBulkPurchases:{initiateInquiry:{information,tableData:{list, pagination}}} } = this.props;
    // const _this = this;
    // console.log('fs',list)
    // const dataSource = [...list];
    // console.log('aafs',list[index].keyId)
    // this.setState({ dataSource: dataSource.filter(item => item.keyId != list[index].keyId) });
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/deleteInterface',
      payload: {
        purchasesn:record.purchasesn,
        barcode:record.barcode,
        index:index
      },
    });
  }

  //提交
  handleOnSubmission = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)
      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        //'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };
      this.setState({
        formValues: values,
      });
      this.props.dispatch({
       // type: 'rolePurchaserBulkPurchases/getInquiryListData',
      type: 'rolePurchaserBulkPurchases/getSubmissionData',
        payload: {
          ...values,
        },
        callback: this.onSubmissionCallback
      });
    });
  }
  onSubmissionCallback = (params) => {
    //console.log('params',params.type)
    if(params.type==="1"){
      this.handleFormReset()
      this.props.form.resetFields();
      this.props.rolePurchaserBulkPurchases.initiateInquiry.tableData.list.remove
      this.setState({
        formValues: {},
      });
      
     }else{
     }
  }

  // 上传销售数据
  handleUploadChange=(info)=>{
    if(info.file.status === 'done') {
      this.props.dispatch({
        type: 'rolePurchaserBulkPurchases/uploadOrderbill',
        payload: {
          purchasesn:'',
          // fileTemp: info.file.responseresponse.fileName[0]
          fileTemp:info.file.name
        },
        callback: this.onUploadCallback
      });
    }
  }
  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.item.type==="0"){
      
     message.error(params.item.msg);
    }else{
      message.success("上传成功",5);
    }
    //this.init();
  }

  renderForm(){
    const RadioGroup = Radio.Group;
    const { getFieldDecorator } = this.props.form;
    const {rolePurchaserBulkPurchases:{initiateInquiry:{information,pur,tableData:{list, pagination}}} } = this.props;
    //console.log('props', this.props)
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
      }, {
        title: '询价商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      }, {
        title: '询价商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
      }, {
        title: '询价数量',
        dataIndex: 'total',
        key: 'total',
      }, {
        title: '操作',
        dataIndex: 'goMoney',
        key: 'goMoney',
        render: (text, record, index) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleDelCheck(e, record, index)}>删除</a><br/>
            </Fragment>
          )
        }
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
      <Form onSubmit={this.onPreservation} layout="inline">
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
                  initialValue:'1'
                })(
                  <Select
                      placeholder="日本提货"
                    >
                    <Option value="1">日本提货</Option>
                    <Option value="2">韩国提货</Option>
                    <Option value="3">香港提货</Option>
                    <Option value="6">国内提货</Option>
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
                initialValue: initiateInquiry.contacts,
                rules: [{ required: true, message: '请输入姓名' }],
              })(
                <Input placeholder="请输入姓名"/>
              )}
            </FormItem>            
          </Col>   
          <Col md={7} sm={24}>
      
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
        <div style={{marginBottom:'20px'}}>
          <Button style={{ marginLeft: 8 }} type="primary" onClick={this.downloadTemplate}>
            <Icon type="download" />下载询价模板
          </Button>
          <Upload  {...props}>
            <Button style={{ marginLeft: 8 }}>
              <Icon type="cloud-upload-o" /> 导入询价商品
            </Button>
          </Upload>          
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
        <Row style={{marginTop:'15px', marginBottom:'5px'}}>
          <Col md={9} sm={24}></Col>      
          <Col md={6} sm={24}>
            <Button style={{ marginLeft: 48 }} htmlType="submit">保存</Button>
            <Button style={{ marginLeft: 48, marginLeft:"20px"}}type="primary" onClick={this.handleOnSubmission} >提交</Button>
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


