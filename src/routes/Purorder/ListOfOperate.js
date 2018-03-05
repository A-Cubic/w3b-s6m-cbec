import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from '../../utils/utils.less'
import styles1 from '../List/TableList.less';
import moment from 'moment';

const { RangePicker, MonthPicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const flagMap = ['error','default', 'processing','processing', 'processing', 'success'];
const flag = ['取消','普通','处理中','询价结束','等待确认','完成'];
const status = ['关闭', '询价', '待付款', '备货中', '已出港', '已入港', '完成', '','','暂存'];
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  }
};

const columns = [
  {
    title: '采购单号',
    dataIndex: 'purchasesn',
    key: 'purchasesn',
  }, {
    title: '采购单阶段',
    dataIndex: 'stage',
    key: 'stage',
    render(val) {
      return <span>{status[val]}</span>
    },
  }, {
    title: '询价状态',
    dataIndex: 'status',
    key: 'status',
    render(val) {
      return <Badge status={flagMap[val]} text={flag[val]} />;
    },
  },{
    title: '主要商品名称',
    dataIndex: 'goodsnames',
    key: 'goodsnames',
  },{
    title: '取货方式',
    dataIndex: 'sendtypename',
    key: 'sendtypename',
  },{
    title: '目的地',
    dataIndex: 'address',
    key: 'address',
  },{
    title: '纳期',
    dataIndex: 'deliverytime',
    key: 'deliverytime',
  },{
    title: '币种',
    dataIndex: 'currency',
    key: 'currency',
  },{
    title: '建立时间',
    dataIndex: 'createtime',
    key: 'createtime',
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },{
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },{
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render: (text, record) => (
      <Fragment>
        <Link to={`/trade/order-o/info/${record.purchasesn}`}>处理</Link>
      </Fragment>
    ),
  }];

@connect(({ purchaseOperate, loading }) => ({
  purchaseOperate,
  submitting: loading.effects['purchaseOperate/list'],
}))

@Form.create()

export default class ListOfOperate extends Component {
  state = {
    formValues: {},
    pagination: {
      current: 1,
      total: 10,
      pageSize: 10,
    },
    expandForm: false,
  }

  componentDidMount() {
    const { formValues, pagination } = this.state;

    this.props.dispatch({
      type: 'purchaseOperate/list',
      payload: {
        ...formValues,
        ...pagination,
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      // ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'purchaseOperate/list',
      payload: params,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, submitting, dispatch } = this.props;
    const { pagination } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'purchaseOperate/list',
        payload: {
          ...values,
          ...pagination,
        },
      });
    });

  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    const { pagination } = this.state;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'purchaseOperate/list',
      payload: {
        ...pagination,
      },
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem  {...formItemLayout} label="采购单号">
              {getFieldDecorator('purchasesn')(
                <Input placeholder="请输入采购单号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="采购商账号">
              {getFieldDecorator('userCode')(
                <Input placeholder="请输入采购商账号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submit}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="采购单号">
              {getFieldDecorator('purchasesn')(
                <Input placeholder="请输入采购单号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="采购账号">
              {getFieldDecorator('userCode')(
                <Input placeholder="请输入采购商账号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="采购阶段">
              {getFieldDecorator('stage',{initialValue: ""})(
                <Select placeholder='请选择采购单阶段'>
                  <Option value={""}>全部</Option>
                  <Option value={0}>关闭</Option>
                  <Option value={1}>询价</Option>
                  <Option value={2}>待付款</Option>
                  <Option value={3}>备货中</Option>
                  <Option value={4}>已出港</Option>
                  <Option value={5}>已入港</Option>
                  <Option value={6}>完成</Option>
                  <Option value={9}>暂存</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="询价状态">
              {getFieldDecorator('status',{initialValue: ""})(
                <Select placeholder='请选择询价状态'>
                  <Option value={""}>全部</Option>
                  <Option value={0}>取消</Option>
                  <Option value={1}>普通</Option>
                  <Option value={2}>处理中</Option>
                  <Option value={3}>询价结束</Option>
                  <Option value={4}>等待确认</Option>
                  <Option value={5}>意向完成</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="取货方式">
              {getFieldDecorator('sendtype',{initialValue: ""})(
                <Select placeholder='请选择取货方式'>
                  <Option value={""}>全部</Option>
                  <Option value={1}>香港自提</Option>
                  <Option value={2}>海外自提</Option>
                  <Option value={3}>保税备货</Option>
                  <Option value={4}>一般贸易</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label ='开始时间'>
              {getFieldDecorator('times')(
                <RangePicker
                  format="YYYY-MM-DD"
                  dateRender={(current) => {
                    const style = {};
                    if (current.date() === 1) {
                      style.border = '1px solid #1890ff';
                      style.borderRadius = '50%';
                    }
                    return (
                      <div className="ant-calendar-date" style={style}>
                        {current.date()}
                      </div>
                    );
                  }}
                />
              ) }
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { purchaseOperate: { list, pagination }, submitting }  = this.props;

    return(
      <div>
        <Card>
          <div className={styles1.tableList}>
            <div className={styles1.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
        </Card>
        <Card className={styles.mT10}>
          <Table dataSource={list}
                 columns={columns}
                 pagination={pagination}
                 rowKey={record => record.id}
                 onChange={this.handleStandardTableChange}
                 loading={submitting}/>
        </Card>
      </div>
    )

  }
}
