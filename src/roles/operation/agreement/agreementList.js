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
@connect(({roleOperationDistribution,publicDictionary }) => ({
  roleOperationDistribution,publicDictionary
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
    this.props.dispatch({
      type: 'publicDictionary/nameOfMerchant',
      payload: {
        userId:userId,
      },
    });
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
   // const { publicDictionary:{nameOfMerchant} } = this.props;
    console.log('xxx',this.props)
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="客商编码：">
              {getFieldDecorator('customersCode')(
                <Input style={{ width: '100%' }} placeholder="可输入客商编码进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="客商名称：">
              {getFieldDecorator('userName',{
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
                  <Option value="1">直营</Option>
                  <Option value="2">代销</Option>
                  <Option value="3">一件代发</Option>
                  <Option value="4">bbc</Option>
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
              {getFieldDecorator('cycle',{
              })(
                <Select
                  placeholder="全部"
                  optionFilterProp="label"
                >
                  <Option value="1">实时</Option>
                  <Option value="2">日结</Option>
                  <Option value="3">周结</Option>
                  <Option value="4">半月结</Option>
                  <Option value="5">月结</Option>
                  <Option value="6">季结</Option>
                  <Option value="7">半年结</Option>
                  <Option value="8">年结</Option>
                  <Option value="9">其他</Option>
                 
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
                  <Option value="2">即将到期</Option>
                  <Option value="3">已到期</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="合同类型">
              {getFieldDecorator('contractType',{
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
      dataIndex: 'customersCode',
      key: 'customersCode',
    }, {
      title: '客商名称',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '合同类型',
      dataIndex: 'contractType',
      key: 'contractType',
      render: (val) => {
        return(<div>
          {['','供货合同','采购合同'][`${val}`]}
        </div>)
      }
    },{
      title: '签订日期',
      dataIndex: 'createTime',
      key: 'createTime',
    },{
      title: '结算账期',
      dataIndex: 'cycle',
      key: 'cycle',
      render: (val) => {
        return(<div>
          {['','实时','日结','周结','半月结','月结','季结','半年结','年结','其他'][`${val}`]}
        </div>)
         }
    },{
      title: '合作模式',
      dataIndex: 'model',
      key: 'model',
      render: (val) => {
        return(<div>
          {['','直营','代销','一件代发','bbc'][`${val}`]}
        </div>)
      }
    },{
      title: '合同状态',
      dataIndex: 'status',
      key: 'status',
      render: (val) => {
        return(<div>
          {['','履行中','即将到期','已到期'][`${val}`]}
        </div>)
      }
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
     console.log('record',record.contractCode)
    this.props.dispatch({
      type: 'roleOperationDistribution/getCheckAgreementData',
      payload: {
        contractCode:record.contractCode,
        //barcode:record.barcode,
        //index:index
      },
    });
    this.props.dispatch(routerRedux.push('/agreement/checkAgreement'  ))
  }
  
}


