import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './SalesStatisticsS.less';
import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(({salesStatistics,publicDictionary,  loading }) => ({
  salesStatistics,publicDictionary,
  loading: loading.effects['salesStatistics/getSalesStatisticsListA'],
}))

@Form.create()
export default class SalesStatisticsS extends Component {
  state={
    formValues:{},
  }
  init(){
    this.props.dispatch({
      type: 'publicDictionary/getDistributors',
      payload: {},
    });
    this.props.dispatch({
      type: 'salesStatistics/getSalesStatisticsListA',
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
    const { publicDictionary:{channelTypeArr,purchaseArr,distributorsArr} } = this.props;
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
            <FormItem label="商品名称：">
              {getFieldDecorator('goodsName')(
                <Input placeholder="请输入商品名称" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="商品品牌：">
              {getFieldDecorator('brand')(
                <Input placeholder="请输入商品品牌" />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24} >
            <FormItem
              label="分销商"
            >
              {getFieldDecorator('distributionCode')(
                <Select
                  placeholder="请选择分销商"
                  // onChange={this.handleSelectChange}
                >
                  {distributorsArr.map(val => <Option key={val.distributionCode} value={val.distributionCode} label={val.distributionName}>{val.distributionName}</Option>)}

                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="销售日期">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>
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
            <span>共查询出符合条件的数据：{tableData?tableData.pagination.total:0}， </span>
            <span>总销量：{tableData?tableData.item.salesNumTotal:0}， </span>
            <span>总销售额：¥{tableData?tableData.item.salesPriceTotal:0}， </span>
            <span>总佣金：¥{tableData?tableData.item.brokerageTotal:0}</span>
            {/*<Button  style={{marginLeft:18}}>*/}
            {/*<Icon type="cloud-download-o" />导出数据*/}
            {/*</Button>*/}
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
      }, {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: (val,record) => (
          <div>
            <span>{val}</span>
            <img src={ record.slt} alt="" width={80} style={{marginLeft:8}}/>
          </div>
        )
      }, {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      }, {
        title: '商品品牌',
        dataIndex: 'brand',
        key: 'brand',
      }, {
        title: '商品类别',
        dataIndex: 'category',
        key: 'category',
      }, {
        title: '销量',
        dataIndex: 'salesNum',
        key: 'salesNum',
        width:100,
      }, {
        title: '销售额',
        dataIndex: 'salesPrice',
        key: 'salesPrice',
        width:100,
      }, {
        title: '佣金',
        dataIndex: 'brokerage',
        key: 'brokerage',
        width:100,
      }, {
        title: '分销商',
        dataIndex: 'distribution',
        key: 'distribution',
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


