import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs,Radio   } from 'antd';
import styles from './initiateInquiry.less';
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
// 代销 - 统计 - 货款结算 - 20181126
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
        type: 'rolePurchaserBulkPurchases/getInquiryListData',
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
  renderForm(){
    // console.log(this.props)
    const RadioGroup = Radio.Group;
    const { getFieldDecorator } = this.props.form;
    const {rolePurchaserBulkPurchases:{initiateInquiry}} = this.props


    //console.log('询价',this.props)
    const { rolePurchaserBulkPurchases:{initiateInquiry:{tableData:{list, pagination}}} } = this.props;   
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
              {getFieldDecorator('platformCostType',{
                    //initialValue: childEdit.platformCostType,
                    rules: [{ required: true, }],
                  })(
                    <Select
                      placeholder="日本提货"
                      // onChange={this.handleSelectChange}
                      //defaultValue="0"
                    >
                    <Option value="0">日本提货</Option>
                    <Option value="1">韩国提货</Option>
                    <Option value="3">香港提货</Option>
                    <Option value="4">国内提货</Option>
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
              {getFieldDecorator('platformCost', {
                //initialValue: childEdit.platformCost,
                rules: [{ required: true, message: '请输入姓名' }],
              })(
                <Input placeholder="请输入姓名"/>
              )}
            </FormItem>            
          </Col>   
          <Col md={7} sm={24}>
         
            <RadioGroup onChange={this.onChange} value={this.state.value} className={styles.sex}>
              <Radio value={1}>男士</Radio>
              <Radio value={2}>女士</Radio>
            </RadioGroup>
          
          </Col>                
        </Row>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col> 
          <Col md={10} sm={24}>
            <FormItem label="联系电话:">
              {getFieldDecorator('platformCost', {
                //initialValue: childEdit.platformCost,
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
            <FormItem label="账期范围">
              {getFieldDecorator('date', {
                //initialValue: childEdit.platformCost,
                rules: [{ required: true, message: '请输入联系电话' }],
              })(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
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
              {getFieldDecorator('platformCost', {
                //initialValue: childEdit.platformCost,
                rules: [{ required: true, message: '请输入询价单描述' }],
              })(
                <Input placeholder="请输入询价单描述"/>
              )}
            </FormItem>         
          </Col>   
          <Col md={7} sm={24}></Col>                
        </Row>           


        
        <Button style={{ marginLeft: 8 }} type="primary" onClick={this.downloadTemplate}>
          <Icon type="download" />下载运单模板
        </Button>
        <Upload >
          <Button style={{ marginLeft: 8 }}>
            <Icon type="cloud-upload-o" /> 导入运单信息
          </Button>
        </Upload>

        <Table dataSource={list}
                // showHeader={false}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.keyId}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        <Row>
          <Col md={12} sm={24}>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>保存</Button>
            <Button type="primary" htmlType="submit">提交</Button>
          </Col>
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


