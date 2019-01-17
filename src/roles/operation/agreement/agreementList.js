import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './agreementList.less';
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
    // 合同 - 合同列表
@Form.create()
export default class agreementList extends Component {
  state={
    formValues:{},
    visible: false,
    visibleChildCheck:false,
  }

  //****/
  init(){
    this.props.dispatch({
      type:'roleOperationDistribution/getAgreementListData',
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
        type: 'roleOperationDistribution/getAgreementListData',
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
      type: 'roleOperationDistribution/getAgreementListData',
      payload: params,
    });
  }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }
  
  renderForm(){
    const { roleOperationDistribution:{agreementList:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    
    console.log('xxx',this.props)
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="客商编码：">
              {getFieldDecorator('select')(
                <Input style={{ width: '100%' }} placeholder="可输入客商编码进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="客商编码：">
              {getFieldDecorator('status',{
              })(
                <Select
                  placeholder="全部"
                  optionFilterProp="label"
                >
                  <Option value="1">大连XX公司</Option>
                  <Option value="2">青岛XX公司</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="合作模式：">
              {getFieldDecorator('status',{
              })(
                <Select
                  placeholder="全部"
                  optionFilterProp="label"
                >
                  <Option value="1">代销</Option>
                  <Option value="2">直营</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            
          </Col>
        </Row>

        
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
           <FormItem label="结算账期">
              {getFieldDecorator('status',{
              })(
                <Select
                  placeholder="全部"
                  optionFilterProp="label"
                >
                  <Option value="1">周结账</Option>
                  <Option value="2">半月结</Option>
                  <Option value="3">月结</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="合同状态">
              {getFieldDecorator('status',{
              })(
                <Select
                  placeholder="全部"
                  optionFilterProp="label"
                >
                  <Option value="1">履行中</Option>
                  <Option value="2">已到期</Option>
                  <Option value="3">即将到期</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="合同类型">
              {getFieldDecorator('status',{
              })(
                <Select
                  placeholder="全部"
                  optionFilterProp="label"
                >
                  <Option value="1">供货合同</Option>
                  <Option value="2">采购合同</Option>
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
            {/* <span>共查询出符合条件的数据：{tableData?tableData.pagination.total:0}条，</span> */}
          </div>
        </div>
        <div>
          <Button type="primary" style={{marginBottom:'10px'}}>创建合同</Button>
        </div>
      </Form>
      
    );
  }

  render() {
    const { roleOperationDistribution:{agreementList:{tableData:{list, pagination}}} } = this.props;
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
      title: '客商编码',
      dataIndex: 'purchasesnName',
      key: 'purchasesnName',
    }, {
      title: '客商名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '合同类型',
      dataIndex: 'barcode',
      key: 'barcode',
        render:val=>`¥${val}`
    },{
      title: '签订日期',
      dataIndex: 'model',
      key: 'model',

    },{
      title: '结算账期',
      dataIndex: 'country',
      key: 'country',
      render:val=>`¥${val}`
    },{
      title: '合作模式',
      dataIndex: 'brand',
      key: 'brand',
    },{
      title: '合同状态',
      dataIndex: 'pNum',
      key: 'pNum',
      render:val=>`¥${val}`
    },{
      title: '操作',
      dataIndex: 'rprice',
      key: 'rprice',
      render: (val,record) =>
        <div>
            {<a onClick={(e) => this.agreementListSee(e, record)}>查看</a>}
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
      </div>
    );
  }
  agreementListSee = (e, record)=>{
    // console.log('record',record)
    this.props.dispatch({
      type: 'roleOperationDistribution/agreementListSee',
      payload: {
       purchasesn:1,
        //barcode:record.barcode,
        //index:index
      },
    });
  }
  
}


