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
const dateFormat = 'YYYY.MM.DD';
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


    if(Object.keys(this.props.match.params).length!=0){
        this.init()
    }else{

        console.log('这是menu 的 发货单 此处填写清空modal数据')
    }
  }
  init(){
    const {match,dispatch}=this.props;
    console.log('fs',JSON.parse(match.params.biography))
    //const b=JSON.parse(match.params.biography)}
    const getData = JSON.parse(match.params.biography)
    //console.log('getData',getData)
    if(getData.status == 7) {
      this.props.dispatch({
        type: 'rolePurchaserBulkPurchases/getSeeData',
        //payload: params,
        payload: {
          purchasesn:getData.purchasesn,
          status:getData.status
        },
      });
    }
  }
  //保存
  onPreservation=(e)=>{
    console.log('ttttt',this.props.rolePurchaserBulkPurchases)
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
          purchasesn:this.props.rolePurchaserBulkPurchases.initiateInquiry.pur!=''?this.props.rolePurchaserBulkPurchases.initiateInquiry.tableData.list[0].purchasesn:''
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
      this.props.dispatch(routerRedux.push('/bulkPurchases/inquiryList'))
     }else{
      message.error("保存失败");
     }
  }

  //下载运单模板
  downloadTemplate=()=>{
    window.location.href='http://ecc-product.oss-cn-beijing.aliyuncs.com/templet/InquiryGoods.xlsx'
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
      type: 'rolePurchaserBulkPurchases/getPaging',
      //payload: params,
       payload: {
         ...params,
         purchasesn:this.props.rolePurchaserBulkPurchases.initiateInquiry.pur
       },
    });
  }

  //删除
  handleDelCheck = (e, record, index)=>{
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
    const {rolePurchaserBulkPurchases:{initiateInquiry:{information,tableData:{list, pagination}}} } = this.props;
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
     // console.log('pur',this.props.rolePurchaserBulkPurchases.initiateInquiry.pur)
     // || this.props.rolePurchaserBulkPurchases.initiateInquiry
      if (this.props.rolePurchaserBulkPurchases.initiateInquiry.pur!==''  ) {
        message.success('提交成功');
        this.props.dispatch({
          // type: 'rolePurchaserBulkPurchases/getInquiryListData',
         type: 'rolePurchaserBulkPurchases/getSubmissionData',
           payload: {
             ...values,
            purchasesn:this.props.rolePurchaserBulkPurchases.initiateInquiry.pur==''?this.props.rolePurchaserBulkPurchases.initiateInquiry.tableData.list[0].purchasesn:this.props.rolePurchaserBulkPurchases.initiateInquiry.pur
           },
           callback: this.onSubmissionCallback
         });

      }else{
        message.error('请导入询价商品');

      }

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

     }
  }

  // 上传销售数据
  handleUploadChange=(info)=>{
   // console.log('fileTemp',info.file.response)
    if(info.file.status === 'done') {
      this.props.dispatch({
        type: 'rolePurchaserBulkPurchases/uploadOrderbill',
        payload: {
          purchasesn:'',
           fileTemp: info.file.response.fileName[0]
          //fileTemp:info.file.name
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
    const {rolePurchaserBulkPurchases:{initiateInquiry:{information,pur,tableData:{item,list, pagination}}} } = this.props;
   console.log('111111', item)
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
    //console.log('sex',parseInt(item.sex ))
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
                  //initialValue:'1'
                  initialValue:item.sendType==''?'1':item.sendType,
                  rules: [{ required: true, message: '请输入提供地点' }],
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
                initialValue: item.contacts,
                rules: [{ required: true, message: '请输入姓名' }],
              })(
                <Input placeholder="请输入姓名"/>
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>

            {getFieldDecorator('sex',{
                // initialValue:parseInt(item.sex )
                initialValue:item.sex==undefined?0:parseInt(item.sex )
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
                initialValue: item.tel,
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
            {/* <FormItem label="采购截止日期："> */}
            <FormItem label='截止日期：'>
              {getFieldDecorator('deliveryTime', {
                 initialValue: item.deliveryTime==''?null:moment(item.deliveryTime, 'YYYY.MM.DD'),
                 rules: [{ required: true, message: '请输入截止日期'}],
              })(
               // <DatePicker  style={{ width: '100%' }}  onChange={this.onTest} format={dateFormat}/>
                <DatePicker style={{ width: '100%' }}  placeholder="" />
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
                initialValue: item.remark,
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


