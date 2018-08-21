import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './settlementMgtD.less';
import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(({settlementManagement,  loading }) => ({
  settlementManagement,
  // loading: loading.effects['salesStatistics/getSalesStatisticsListO'],
}))
@Form.create()

//结算管理 - 分销

export default class settlementMgtD extends Component {
  state={
    formValues:{},
  }
  init(){
    this.props.dispatch({
      type: 'settlementManagement/getSettlementListD',
      payload: {},
    });
  }
  componentDidMount() {
    this.init();
  }

  //列表
  onSearch=(e)=>{
    e.preventDefault();
    const {settlementManagement:{settlementAll:{tableData}}}=this.props
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)
      if (err) return;
      let rangeValue1 = fieldsValue['orderDate'];
      let rangeValue2 = fieldsValue['balanceDate'];
      let values;

      rangeValue1 = rangeValue1==''?undefined:rangeValue1;
      rangeValue2 = rangeValue2==''?undefined:rangeValue2;

        if(rangeValue1!== undefined&&rangeValue1!== '' && rangeValue2!==undefined&&rangeValue1!== ''){
           values ={
            ...fieldsValue,
            'orderDate': [rangeValue1[0].format('YYYY-MM-DD'), rangeValue1[1].format('YYYY-MM-DD')],
            'balanceDate': [rangeValue2[0].format('YYYY-MM-DD'), rangeValue2[1].format('YYYY-MM-DD')],
           }
        } else if(rangeValue1!==undefined && rangeValue2==undefined){
          values ={
            ...fieldsValue,
            'orderDate': [rangeValue1[0].format('YYYY-MM-DD'), rangeValue1[1].format('YYYY-MM-DD')],
          }
        } else if(rangeValue1==undefined && rangeValue2 !==undefined){
          values ={
            ...fieldsValue,
            'balanceDate': [rangeValue2[0].format('YYYY-MM-DD'), rangeValue2[1].format('YYYY-MM-DD')],
          }
        } else{
          values ={
            ...fieldsValue,
          }
        }

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'settlementManagement/getSettlementListD',
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
      type: 'settlementManagement/getSettlementListD',
      payload: params,
    });
  }

  renderAdvancedForm(){
    const { settlementManagement:{settlementAll:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单号：">
              {getFieldDecorator('merchantOrderId')(
                <Input placeholder="请输入订单号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单日期">
              {getFieldDecorator('orderDate')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="结算日期">
              {getFieldDecorator('balanceDate')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
          </Col>
          <Col md={8} sm={24}>
          </Col>
          <Col md={8} sm={24}>
            <span style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </span>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span>总计算单数：{tableData.item?tableData.pagination.total:0}， </span>
            <span>订单总销售额：¥{tableData.item?tableData.item.totalSales:0}， </span>
            <span>总结算额：¥{tableData.item?tableData.item.totalPurchase:0} </span>
          </div>
        </div>
      </Form>
    );
  }
  render() {
    // console.log(this.props)
    const { settlementManagement:{settlementAll:{tableData}} } = this.props;
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
        title: '订单号',
        dataIndex: 'merchantOrderId',
        key: 'merchantOrderId',
      }, {
        title: '订单时间',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
      }, {
        title: '订单销售额',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        render:val=>`¥${val}`
      }, {
        title: '结算时间',
        dataIndex: 'waybillTime',
        key: 'waybillTime',
      }, {
        title: '结算金额',
        dataIndex: 'purchase',
        key: 'purchase',
        render:val=>`¥${val}`
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


