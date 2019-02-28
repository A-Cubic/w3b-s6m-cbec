import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker,Radio  } from 'antd';
import styles from './SalesStatisticsS.less';
import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;


@connect(({salesStatistics,  loading }) => ({
  salesStatistics,
  loading: loading.effects['salesStatistics/getSalesStatisticsListS'],
}))

@Form.create()
export default class SalesStatisticsS extends Component {
  state={
    sortedInfo:null,
    formValues:{},
    value: 1,
  }
  init(){
    this.props.dispatch({
      type: 'salesStatistics/getSalesStatisticsListS',
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
        sortedInfo: null,
      });
      this.props.dispatch({
        type: 'salesStatistics/getSalesStatisticsListS',
        payload: {
          ...values,
          // ...tableData.pagination
        },
      });
    });
  
  }
  handleFormReset =(e)=>{
    const that = this
    this.props.form.resetFields();
    this.init();
    this.setState({
      formValues: {},
      value: 1,
      sortedInfo: null,
    });

  }


  handleTableChange=(pagination, filtersArg, sorter,e)=>{
    const sorterConditions = ['ascend','descend']
    const { salesStatistics:{salesStatisticsAll:{tableData:{item}}} } = this.props;
    //console.log('tableData',item.platformId)
    let sorters={}
    if (sorter.field) {
      sorters = {
        [sorter.field]: sorterConditions.findIndex(i => i==sorter.order)
      }
    }
    this.setState({
      sortedInfo: sorter,
    });
    this.props.dispatch({
      type: 'salesStatistics/getSalesStatisticsListS',
      payload: {
        ...this.state.formValues,
        ...this.state.values,
        ...sorters,
        ...pagination,
        platformId:this.state.value
      },
    });
    
  }

  onChange = (e) => {
    const that = this
    //console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      sortedInfo:null,
    });
    //this.onSearch(e)
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
        type: 'salesStatistics/getSalesStatisticsListS',
        payload: {
          ...values,
          platformId:e.target.value,
          ...tableData.pagination
        },
      });
    });
  }

  renderAdvancedForm(){
    
    const { salesStatistics:{salesStatisticsAll:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{marginBottom:'0px',height:'36px'}}>
          <Col md={24} sm={24}>
            <FormItem label="">
              {getFieldDecorator('platformId')(
                <div>
                <Radio.Group defaultValue={1} defaultValue={this.state.value}  onChange={this.onChange} value={this.state.value}>
                  <Radio.Button onClick={this.handleAll} className={styles.all_title} style={{borderRadius:'5px'}} value={1}>全部</Radio.Button>
                  <Radio.Button onClick={this.handleBatch} className={styles.all_title} style={{borderRadius:'5px'}} value="批量供货">批量供货</Radio.Button>
                  <Radio.Button onClick={this.handleOnePiece} className={styles.all_title} style={{borderRadius:'5px'}} value="一件代发">一件代发</Radio.Button>
                  <Radio.Button onClick={this.handleDistribution} className={styles.all_title} style={{borderRadius:'5px'}} value="铺货">铺货</Radio.Button>
                </Radio.Group>
              </div>
              )}
            </FormItem>
          </Col>
        </Row>
        <Divider dashed />
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="销售日期">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
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
          <Col md={8} sm={24}>
            <FormItem label="商品条码：">
              {getFieldDecorator('barcode')(
                <Input placeholder="请输入商品条码" />
              )}
            </FormItem>    
          </Col>

        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="商品名称：">
              {getFieldDecorator('goodsName')(
                <Input placeholder="请输入商品名称" />
              )}
            </FormItem>
               
          </Col>
          <Col md={8} sm={24}>
            <span style={{ float: 'left' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
          <Col md={8} sm={24}>
            
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span>共查询出符合条件的数据：{tableData?tableData.pagination.total:0}， </span>
            <span>总销量：{tableData?tableData.item.salesNumTotal:0}， </span>
            <span>总销售额：¥{tableData?tableData.item.salesPriceTotal:0}</span>
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
    const { salesStatistics:{salesStatisticsAll:{tableData:{item}}} } = this.props;
   //console.log('tableData',item.platformId)
    let { sortedInfo } = this.state;
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
        title: '销售日期',
        dataIndex: 'salseTime',
        key: 'salseTime',
      },{
        title: '销售类型',
        dataIndex: 'platformType',
        key: 'platformType',
      },{
        title: '仓库',
        dataIndex: 'wname',
        key: 'wname',
      }, {
        title: '商品类别',
        dataIndex: 'category',
        key: 'category',
      }, {
        title: '商品品牌',
        dataIndex: 'brand',
        key: 'brand',
      },{
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        // render: (val,record) => (
        //   <div>
        //     <span>{val}</span>
        //     <img src={ record.slt} alt="" style={{marginLeft:8,width:'80px'}}/>
        //   </div>
        // )
      },{
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      },{
        title: '销售单价',
        dataIndex: 'supplyPrice',
        key: 'supplyPrice',
        width:110,
        // sorter: (a, b) => a.salesPrice - b.salesPrice,
        render:val=>`¥${val}`,
        sorter:true,
        sortOrder:sortedInfo?sortedInfo.columnKey === 'supplyPrice' && sortedInfo.order:false
      },{
        title: '销售数量',
        dataIndex: 'salesNum',
        key: 'salesNum',
        width:110,
        //sorter: (a, b) => a.salesNum - b.salesNum,
        sorter:true,
        sortOrder:sortedInfo?sortedInfo.columnKey === 'salesNum' && sortedInfo.order:false
      },{
        title: '销售金额',
        dataIndex: 'salesPrice',
        key: 'salesPrice',
        width:110,
        //sorter: (a, b) => a.salesPrice - b.salesPrice,
        render:val=>`¥${val}`,
        sorter:true,
        sortOrder:sortedInfo?sortedInfo.columnKey === 'salesPrice' && sortedInfo.order:false
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


