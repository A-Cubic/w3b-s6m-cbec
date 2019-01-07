import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs  } from 'antd';
import styles from './inquiryList.less';
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
// 采购商 - 采购列表 - 20181224
export default class purchaseList extends Component {
  state={
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type:'rolePurchaserBulkPurchases/getPurchaseListData',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values111',fieldsValue)
      console.log('this.props',this.props.rolePurchaserBulkPurchases.inquiryList.tableData.pagination)
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
        type: 'rolePurchaserBulkPurchases/getPurchaseListData',
        payload: {
          ...values,
          current:this.props.rolePurchaserBulkPurchases.purchaseList.tableData.pagination.current,
          pageSize:this.props.rolePurchaserBulkPurchases.purchaseList.tableData.pagination.pageSize
        },
      });
    });

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
    console.log('params',params)
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getPurchaseListData',
      //payload: params,
      payload: {
        ...params,
      },
    });
  }
  renderForm(){
    //console.log(this.props.rolePurchaserBulkPurchases.inquiryList.tableData)
    const { rolePurchaserBulkPurchases:{purchaseList:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;


    //console.log('询价~~~',this.props)
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="单据日期：">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
          
          <Col md={12} sm={24}>
            <FormItem label="采购单号：">
              {getFieldDecorator('select')(
                <Input placeholder="请输入采购单号进行搜索" />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col md={12} sm={24}>
            <FormItem label="结算状态">
              {getFieldDecorator('status',{
              })(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  {/* <Option value="">全部</Option> */}
                  <Option value="1">待完成</Option>
                  <Option value="2">已完成</Option>
                  <Option value="9">已关闭</Option>
                 
                  
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
            <Button style={{ marginLeft:26 }} type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            {/*<span>共查询出符合条件的数据：{tableData?tableData.list.length:0} </span>*/}
          </div>
        </div>
      </Form>
    );
  }

  render() {

    const { rolePurchaserBulkPurchases:{purchaseList:{tableData:{list, pagination}}} } = this.props;   
    //const { rolePurchaserConsignment:{confirmReceipt:{tableData:{list, pagination}}} } = this.props;
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
        title: '采购单号',
        dataIndex: 'purchasesn',
        key: 'purchasesn',
      }, {
        title: '采购日期',
        dataIndex: 'purchaseTime',
        key: 'purchaseTime',
      },{
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        //render:val=>`${val==1?'收货单':'退货单'}`
      }, ,{
        title: '金额',
        dataIndex: 'money',
        key: 'money',
        //render:val=>`${val==1?'收货单':'退货单'}`
      },{
        title: '状态',
        dataIndex: 'stage',
        render: (val) => {
          return(<div>
            {['','待完成','已完成','','','','','','','已关闭',][`${val}`]}
          </div>)
        }
      }, {
        title: '操作',
        dataIndex: 'sendTime',
        key: 'sendTime',
        render: (val,record) =>
          <div>
            <a href="javascript:;" onClick={()=>this.handleViewState(record)} >查看</a><br/>
          </div>
      }
    ];

    
    return (
      <div className={styles.qa}>
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
                 //rowClassName={record => record.status==0||record.status==2?styles.columnsBgColor:''}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
          {/* <PurchaseOrder /> */}
        </Card>  
      </div>
    );
  }

  handleViewState(record){
  //dispatch(routerRedux.push('/goods/step-form/confirm/' + params.id));
  //this.props.dispatch(routerRedux.push('/goods/step-form/confirm/'+params.id));
    const data = {purchasesn:record.purchasesn,stage:record.stage}
    this.props.dispatch(routerRedux.push('/bulkPurchases/listDetails/' + JSON.stringify(data)  ));
    //console.log(record) 
    //JSON.parse JSON.stringify
    let type;
    switch (record.stage){
    
      case '1':
          type=1; //待完成
          console.log(type)
          break;
        case '2':
          type=2; //已完成
          console.log(type)
          break;
        case '9':
          type=9; //已关闭
          console.log(type)
          break;
       
        default:
          console.log(1)
          break;
    }
    //console.log(record)
    
   
  }



}

