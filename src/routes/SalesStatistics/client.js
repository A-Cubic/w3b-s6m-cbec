import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './client.less';
import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(({salesStatistics,  loading }) => ({
  salesStatistics,
  loading: loading.effects['salesStatistics/getSalesStatisticsListA'],
}))

@Form.create()
export default class client extends Component {
  state={
    formValues:{},
  }
  init(){
    this.props.dispatch({
      type: 'salesStatistics/getClient',
      payload: {},
    });
  }
  componentDidMount() {
    this.init();
  }

  //列表
  onSearch=(e)=>{
    e.preventDefault();
    const {salesStatistics:{salesStatisticsAll:{tableData}}}=this.props
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)
      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        'date': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };
      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'salesStatistics/getSalesStatisticsListA',
        payload: {
          ...values,
          ...tableData.pagination
        },
      });
    });
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
      type: 'salesStatistics/getSalesStatisticsListA',
      payload: params,
    });
  }


  renderAdvancedForm(){
    const { salesStatistics:{salesStatisticsAll:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="商品条码：">
              {getFieldDecorator('barcode')(
                <Input placeholder="请输入商品条码" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span>共查询出符合条件的数据：{tableData?tableData.pagination.total:0} </span>
          </div>
        </div>
      </Form>
    );
  }
  render() {
    const { salesStatistics:{salesStatisticsAll:{tableData}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...tableData.pagination,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },{
        title: '入驻日期',
        dataIndex: 'goodsName',
        key: 'goodsName',
      }, {
        title: '客户名称',
        dataIndex: 'brand',
        key: 'brand',
      }, {
        title: '提点方式',
        dataIndex: 'category',
        key: 'category',
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
      </div>
    );
  }
}


