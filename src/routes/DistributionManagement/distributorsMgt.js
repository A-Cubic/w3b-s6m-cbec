import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './distributorsMgt.less';
import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(({distributionManagement,  loading }) => ({
  distributionManagement,
  // loading: loading.effects['distributionManagement/getSalesStatisticsListS'],
}))

@Form.create()
export default class DistributorsMgt extends Component {
  state={
    formValues:{},
  }
  init(){
    this.props.dispatch({
      type: 'distributionManagement/getDistributorTable',
      payload: {},
    });
  }
  componentDidMount() {
    this.init();
  }

  //列表
  onSearch=(e)=>{
    e.preventDefault();
    // const {salesStatistics:{salesStatisticsAll:{tableData}}}=this.props
    // this.props.form.validateFields((err, fieldsValue) => {
    //   // console.log('values',fieldsValue)
    //   if (err) return;
    //   const rangeValue = fieldsValue['date'];
    //   const values = rangeValue==undefined ? {
    //     ...fieldsValue,
    //   }:{
    //     ...fieldsValue,
    //     'date': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
    //   };
    //   this.setState({
    //     formValues: values,
    //   });
    //   this.props.dispatch({
    //     type: 'salesStatistics/getSalesStatisticsListS',
    //     payload: {
    //       ...values,
    //       ...tableData.pagination
    //     },
    //   });
    // });
  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.init();
  }
  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      ...this.state.formValues,
      ...pagination,
    };

    this.props.dispatch({
      type: 'salesStatistics/getSalesStatisticsListS',
      payload: params,
    });
  }

  mgtDistributors=(flag)=>{
    this.handleChangeVisible(true)
  }
  handleChangeVisible(visibleValue){
    this.props.dispatch({
      type: 'distributionManagement/changeVisibleR',
      payload: {
        visibleValue: visibleValue
      }
    });
  }
  handleChildrenCheck=()=>{

  }
  renderAdvancedForm(){
    // const { salesStatistics:{salesStatisticsAll:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Button onClick={this.mgtDistributors}>添加分销商</Button>
        <Divider dashed />
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="center">
          <Col md={10} sm={24}>
            <FormItem label="分销商：">
              {getFieldDecorator('brand')(
                <Input placeholder="请输入分销商名称/公司名称/联系电话/微信昵称" />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <span style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </span>
          </Col>
        </Row>
        <Divider dashed />
      </Form>
    );
  }
  render() {
    console.log(this.props)

    const { distributionManagement:{distributorsMgtData:{tableData}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...tableData.pagination,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '分销商',
        dataIndex: 'distribution',
        key: 'distribution',
      }, {
        title: '公司名称',
        dataIndex: '',
        key: '',
      }, {
        title: '联系电话',
        dataIndex: '',
        key: '',
      }, {
        title: '微信昵称',
        dataIndex: '',
        key: '',
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) =>
          <div>
            <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>编辑</a><br/>
          </div>
      }
    ];
    return (
      <div>
        <Card className={styles.mT10}>
          <div className={styles.tableListForm}>
            {this.renderAdvancedForm()}
          </div>
          <Table
            dataSource={tableData.list}
            rowKey={record => record.id}
            columns={columns}
            pagination={paginationProps}
            onChange={this.handleTableChange}
            // loading={submitting}
          />
        </Card>
        <Distributors />
      </div>
    );
  }
}

@connect(({distributionManagement,  loading }) => ({
  distributionManagement,
  // loading: loading.effects['orderManagement/supplierOrderTable'],
}))
@Form.create()
class Distributors extends React.Component {
  handleOk=(e)=>{
    const {distributionManagement:{distributorsMgtData:{childCheckS}}}=this.props;
    const _this = this;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)
      if (err) return;
      const values = {
        ...fieldsValue,
      }
      this.setState({
        formValues: values,
      });
      // console.log('ssss',this.props)
      this.props.dispatch({
        type: 'distributionManagement/update',
        payload: {
          ...values,
          id:childCheckS.id
        }
      });
    });


  }
  handleCancel = (e) => {
    this.props.dispatch({
      type: 'distributionManagement/changeVisibleR',
      payload: {
        visibleValue: false
      }
    });
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {distributionManagement:{distributorsMgtData:{visible}}} = this.props
    // console.log(this.props)
    return (
      <div>
        <Modal
          title="分销商"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="1" onClick={this.handleCancel}>关闭</Button>,
            <Button key="2" type="primary" onClick={this.handleOk}>确定</Button>
          ]}
        >
          <div className={styles.tableListForm}>
            <Form onSubmit={this.handleOk} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={24} sm={24}>
                  <FormItem label="分销商">
                    {getFieldDecorator('a',{
                      rules:[{
                        required:true,message:'请输入名称',
                      }]
                    })(
                      <Input placeholder="请输入名称" />
                    )}
                  </FormItem>
                </Col>
                <Col md={24} sm={24}>
                  <FormItem label="公司名称">
                    {getFieldDecorator('b',{
                      rules:[{
                        required:true,message:'请输入公司名称',
                      }]
                    })(
                      <Input placeholder="请输入公司名称" />
                    )}
                  </FormItem>
                </Col>
                <Col md={24} sm={24}>
                  <FormItem label="联系电话">
                    {getFieldDecorator('c',{
                      rules:[{
                        required:true,message:'请输入联系电话',
                      }]
                    })(
                      <Input placeholder="请输入联系电话" />
                    )}
                  </FormItem>
                </Col>
                <Col md={24} sm={24}>
                  <FormItem label="微信昵称">
                    {getFieldDecorator('d',{
                      rules:[{
                        required:true,message:'请输入微信昵称',
                      }]
                    })(
                      <Input placeholder="请输入微信昵称" />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

