import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Modal,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './manualTransfer.less';
import moment from 'moment';
import {getToken} from "../../../utils/Global";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const userId = getToken().userId;
const { TextArea } = Input;
@connect(({roleOperationDistribution }) => ({
  roleOperationDistribution,
}))

@Form.create()
export default class manualTransfer extends Component {
  state={
    visible: false,
    formValues:{}
  }
  // 初始加载
  init(){
    this.props.dispatch({
      type: 'roleOperationDistribution/getManualTransferData',
      payload: {
        userId:userId
      },
    });
  }
  // 查询
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
        type: 'roleOperationDistribution/getManualTransferData',
        payload: {
          ...values,
        },
      });
    });

  }
  // 换页
  handleTableChange=(pagination)=>{
    const params = {
      ...pagination,
    };

    this.props.dispatch({
      type: 'roleOperationDistribution/getManualTransferData',
      payload: params
    });
  }
  // 删除
  handleDelete=(record)=>{
    // console.log(record)
    //  删除逻辑
  }
  // 新建手动调账单
  addAdjustmentOrder=()=>{
    this.props.dispatch({
      type: 'roleOperationDistribution/changeVisibleR',
      payload:true
    })
  }
  componentDidMount() {
    this.init();
  }
  renderForm(){
    const {roleOperationDistribution:{manualTransfer:{tableData:{ list, pagination }}}}  = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="调整日期：">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <Button style={{ marginLeft:26 }} type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <Button  type="primary" ghost onClick={this.addAdjustmentOrder}>新建调整单</Button>

          <div style={{ float: 'right' }}>
            <span>共查询出符合条件的数据：{list.length?list.length:0} </span>
          </div>
        </div>
      </Form>
    );
  }
  render() {
    const {roleOperationDistribution:{manualTransfer:{tableData:{ list, pagination }}}}  = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '调整年份',
        dataIndex: 'year',
        key: 'year',
        render:val=>val?val:'--'
      }, {
        title: '调整月份',
        dataIndex: 'month',
        key: 'month',
        render:val=>val?val:'--'
      }, {
        title: '调整金额',
        dataIndex: 'money',
        key: 'money',
        render:val=>val?val + '元':'--'
      }, {
        title: '调整项目',
        dataIndex: 'pro',
        key: 'pro',
        render:val=>val?val:''
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleDelete(record)}>删除</a><br/>
            </Fragment>
          )
        }
      }
    ];

    return (
      <div>
        <Card className={styles.mT10}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
          <Table
            dataSource={list}
            rowKey={record => record.keyId}
            columns={columns}
            pagination={paginationProps}
            onChange={this.handleTableChange}
            // loading={submitting}
          />
        </Card>
        <ChildModelCreatOrder />
      </div>
    );
  }
}


// 创建手动调账单
@connect(({roleOperationDistribution }) => ({
  roleOperationDistribution,
}))
@Form.create()
class ChildModelCreatOrder extends React.Component {
  handleOk = (e) => {
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('fieldsValue',fieldsValue)
      if (!err) {
        this.props.dispatch({
          type: 'roleOperationDistribution/saveCreatOrder',
          payload: {
            ...fieldsValue,
          },
          callback:function () {
            that.props.form.resetFields();
          }
        })
      }
    })
  }

  handleCancel = (e) => {
    this.props.dispatch({
      type: 'roleOperationDistribution/changeVisibleR',
      payload:false
    })
    this.props.form.resetFields();
  }

  render() {
    // console.log(this.props)
    const {getFieldDecorator} = this.props.form;
    const {roleOperationDistribution: {manualTransfer: {childModelCreatOrder,childCreatOrderModelVisible}}} = this.props;
    return (
      <div>
        <Modal
          width={'100%'}
          style={{maxWidth: 1000}}
          title="手动调账"
          visible={childCreatOrderModelVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="1" onClick={this.handleCancel}>关闭</Button>,
            <Button key="3" type="primary" onClick={this.handleOk}>保存</Button>
          ]}
        >
          <div className={styles.tableListForm}>
            <Form onSubmit={this.handleOk} layout="inline">
              <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                <Col md={12} sm={24}>
                  <FormItem label="调整日期：">
                    {getFieldDecorator('date', {
                      rules:[{
                        required:true,message:'请输入调整日期',
                      }]
                    })(
                      <MonthPicker style={{ width: '100%' }}  placeholder="" />
                    )}
                  </FormItem>
                </Col>
                <Col md={12} sm={24}>
                  <FormItem label="调整金额" >
                    {getFieldDecorator('m', {
                      rules:[{
                        required:true,message:'请输入调整金额',
                      }]
                    })(
                      <Input placeholder=""/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                <Col md={12} sm={24}>
                  <FormItem label="调整事项" >
                    {getFieldDecorator('t', {
                      rules:[{
                        required:true,message:'请输入调整事项',
                      }]
                    })(
                      <Input placeholder=""/>
                    )}
                  </FormItem>
                </Col>
                <Col md={12} sm={24}>
                  <FormItem label="调整客商" >
                    {getFieldDecorator('k', {
                      rules:[{
                        required:true,message:'请输入调整客商',
                      }]
                    })(
                      <Input placeholder=""/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                <Col md={12} sm={24}>
                  <FormItem label="商客编码" >
                    {getFieldDecorator('c', {
                      rules:[{
                        required:true,message:'请输入商客编码',
                      }]
                    })(
                      <Input placeholder=""/>
                    )}
                  </FormItem>
                </Col>
                <Col md={12} sm={24}>
                  <FormItem label="商客名称" >
                    {getFieldDecorator('n', {
                      rules:[{
                        required:true,message:'请输入商客名称',
                      }]
                    })(
                      <Input placeholder=""/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                <Col md={24} sm={48}>
                  <FormItem label="调整事由" >
                    {getFieldDecorator('y', {
                      rules:[{
                        required:true,message:'请输入调整事由',
                      }]
                    })(
                      <TextArea rows={3} />
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
