import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './incomeA.less';
import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(({settlementManagement,publicDictionary,  loading }) => ({
  settlementManagement,publicDictionary
  // loading: loading.effects['salesStatistics/getSalesStatisticsListO'],
}))
@Form.create()

//我的收益 - 代理20181029

export default class incomeA extends Component {
  state={
    keyOneFormValues:{},
    keyTwoFormValues:{},
    modalFormValues:{},
    settlementOrderVisible:false
  }
  init(){
    this.props.dispatch({
      type: 'publicDictionary/getPartner',
      payload: {},
    });
    this.props.dispatch({
      type: 'settlementManagement/getIncomeAInformationData',
      payload: {},
    });
    this.props.dispatch({
      type: 'settlementManagement/getIncomeAForecastData',
      payload: {},
    });
  }
  componentDidMount() {
    this.init();
  }

  //列表 tab1
  onSearchTabKeyOne=(e)=>{
    e.preventDefault();
    const {settlementManagement:{incomeAgencyData:{forecastData}}}=this.props
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)
      if (err) return;
      let values;
      values ={
        ...fieldsValue,
      }
      this.setState({
        keyOneFormValues: values,
      });
      this.props.dispatch({
        type: 'settlementManagement/getIncomeAForecastData',
        payload: {
          ...values,
          ...forecastData.pagination
        },
      });
    });
  }
  handleFormResetKeyOne =()=>{
    this.setState({
      keyOneFormValues: {},
    });
    this.props.form.resetFields();
    this.init();
  }
  handleTableChangeKeyOne=(pagination, filtersArg, sorter)=>{
    const params = {
      ...this.state.keyOneFormValues,
      ...pagination,
    };

    this.props.dispatch({
      type: 'settlementManagement/getIncomeAForecastData',
      payload: params,
    });
  }

  //列表 tab2
  onSearchTabKeyTwo=(e)=>{
    e.preventDefault();
    const {settlementManagement:{incomeAgencyData:{settlementData}}}=this.props
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)
      if (err) return;
      const rangeValue = fieldsValue['BalanceDate'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        'BalanceDate': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };

      this.setState({
        keyTwoFormValues: values,
      });
      this.props.dispatch({
        type: 'settlementManagement/getIncomeASettlementData',
        payload: {
          ...values,
          ...settlementData.pagination
        },
      });
    });
  }
  handleFormResetKeyTwo =()=>{
    this.setState({
      keyTwoFormValues: {},
    });
    this.props.form.resetFields();
    this.tabTwoInit();
  }
  handleTableChangeKeyTwo=(pagination, filtersArg, sorter)=>{
    const params = {
      ...this.state.keyTwoFormValues,
      ...pagination,
    };

    this.props.dispatch({
      type: 'settlementManagement/getIncomeASettlementData',
      payload: params,
    });
  }
  onChangeTabs=(key)=>{
    // console.log(key)
    if(key==1){
      this.props.dispatch({
        type: 'settlementManagement/getIncomeAForecastData',
        payload: {},
      });
    }else if(key==2){
      this.tabTwoInit()
    }
  }
  tabTwoInit=()=>{
    this.props.dispatch({
      type: 'settlementManagement/getIncomeASettlementData',
      payload: {},
    });
  }
  renderBasicInfo(){
    const {settlementManagement:{incomeAgencyData:{informationData}}}=this.props;
    return (
      <div style={{margin:'0 100px 0px',fontSize:16}}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            当前预估收益（元）：<span style={{color: '#ff8282'}}>¥{informationData.totalEstimate}</span>
          </Col>
          <Col md={8} sm={24}>
            在途收益（元）：<span style={{color: '#ff8282'}}>¥{informationData.totalUnpaid}</span>
          </Col>
          <Col md={8} sm={24}>
            累积结算收益（元）：<span style={{color: '#ff8282'}}>¥{informationData.totalProfit}</span>
          </Col>
        </Row>
      </div>
    )
  }
  renderTabKeyOne(){
    const { getFieldDecorator } = this.props.form;
    const { settlementManagement:{incomeAgencyData:{forecastData} }} = this.props;
    const { publicDictionary:{partnerArr}} = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...forecastData.pagination,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '订单编号',
        dataIndex: 'merchantOrderId',
        key: 'merchantOrderId',
      }, {
        title: '发货时间',
        dataIndex: 'waybillTime',
        key: 'waybillTime',
      }, {
        title: '合作方',
        dataIndex: 'distribution',
        key: 'distribution',
      },{
        title: '订单金额',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        render:val=>`¥${val}`
      },{
        title: '收益',
        dataIndex: 'profit',
        key: 'profit',
        render:val=>`¥${val}`
      }
    ];
    return (
      <div>
      <Form onSubmit={this.onSearchTabKeyOne} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单编号：">
              {getFieldDecorator('merchantOrderId')(
                <Input placeholder="请输入订单编号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem
              label="合作方"
            >
              {getFieldDecorator('purchaseCode')(
                <Select
                  placeholder="请选择合作方"
                >
                  {/*<option key={1} value={1}>aa</option>*/}
                  {partnerArr.map(val => <Option key={val.purchaseCode} value={val.purchaseCode} label={val.purchaseName}>{val.purchaseName}</Option>)}

                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormResetKeyOne}>重置</Button>
          </Col>
        </Row>

        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span>订单总数：{forecastData.item?forecastData.pagination.total:0}， </span>
            <span>订单总额（元）：¥{forecastData.item?forecastData.item.totalSales:0}， </span>
            <span>收益总额（元）：¥{forecastData.item?forecastData.item.totalProfit:0} </span>
          </div>
        </div>
      </Form>
        <Table
          dataSource={forecastData.list}
          rowKey={record => record.id}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChangeKeyOne}
          // loading={submitting}
        />
      </div>
    );
  }
  renderTabKeyTwo(){
    const { getFieldDecorator } = this.props.form;
    const { settlementManagement:{incomeAgencyData:{settlementData}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...settlementData.pagination,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      },{
        title: '结算日期',
        dataIndex: 'createTime',
        key: 'createTime',
      }, {
        title: '结算金额（元）',
        dataIndex: 'price',
        key: 'price',
        render:val=>`¥${val}`
      }, {
        title: '结算状态',
        dataIndex: 'status',
        key: 'status',
        render:val=>{val==0?'在途':'已打款'}
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) =>
          <div>
            <a href="javascript:;" onClick={()=>this.handleChildrenCheckOrder(record)}>订单详情</a><br/>
          </div>
      }
    ];
    return (
      <div>
        <Form onSubmit={this.onSearchTabKeyTwo} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="结算日期">
                {getFieldDecorator('BalanceDate')(
                  <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem
                label="结算状态"
              >
                {getFieldDecorator('accountStatus')(
                  <Select
                    placeholder="请选择结算状态"
                  >
                    <option key={0} value={0}>在途</option>
                    <option key={1} value={1}>已打款</option>
                    {/*{channelTypeArr.map(val => <Option key={val.platformId} value={val.platformId} label={val.platformType}>{val.platformType}</Option>)}*/}

                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormResetKeyTwo}>重置</Button>
            </Col>
          </Row>

          <Divider dashed />
          <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
            <div style={{ float: 'right' }}>
              <span>总单数：{settlementData?settlementData.pagination.total:0}</span>
            </div>
          </div>
        </Form>
        <Table
          dataSource={settlementData.list}
          rowKey={record => record.id}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChangeKeyTwo}
          // loading={submitting}
        />
      </div>

    );
  }
  handleChildrenCheckOrder=(record)=>{
    // console.log(record)
    this.props.dispatch({
      type: 'settlementManagement/getIncomeASettlementOrderData',
      payload: {record},
    });
    this.showModal(true)
  }
  render() {
    console.log('sdada',this.props)
    const { getFieldDecorator } = this.props.form;
    const { settlementManagement:{incomeAgencyData:{settlementOrderData} }} = this.props;
    const { publicDictionary:{partnerArr}} = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...settlementOrderData.pagination,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '订单编号',
        dataIndex: 'merchantOrderId',
        key: 'merchantOrderId',
      }, {
        title: '发货时间',
        dataIndex: 'waybillTime',
        key: 'waybillTime',
      }, {
        title: '合作方',
        dataIndex: 'distribution',
        key: 'distribution',
      },{
        title: '订单金额',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        render:val=>`¥${val}`
      },{
        title: '收益',
        dataIndex: 'profit',
        key: 'profit',
        render:val=>`¥${val}`
      }
    ];
    return (
      <div>
        <Card
          className={styles.mT10}
          bodyStyle={{ padding: '35px 0' }}
        >
          <div>
            {this.renderBasicInfo()}
          </div>
        </Card>
        <Card
          className={styles.mT10}
          bodyStyle={{ padding: '24px 32px 24px' }}
        >
          <div className={styles.cardContainer}>
            <Tabs type="card" onChange={this.onChangeTabs}>
              <TabPane tab="预估收益" key="1">
                <div className={styles.tableListForm}>
                  {this.renderTabKeyOne()}
                </div>
              </TabPane>
              <TabPane tab="已结算收益" key="2">
                <div className={styles.tableListForm}>
                  {this.renderTabKeyTwo()}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Card>
        <Modal
          width={ '100%' }
          style={{maxWidth:1200}}
          title="详情"
          visible={this.state.settlementOrderVisible}
          onCancel={()=>{
            this.showModal(false)
          }}
          footer={null}
        >
          <div className={styles.tableListForm}>
            <Form onSubmit={this.onSearchModal} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="订单编号：">
                    {getFieldDecorator('merchantOrderId')(
                      <Input placeholder="请输入订单编号" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem
                    label="合作方"
                  >
                    {getFieldDecorator('purchaseCode')(
                      <Select
                        placeholder="请选择合作方"
                      >
                        {/*<option key={1} value={1}>aa</option>*/}
                        {partnerArr.map(val => <Option key={val.purchaseCode} value={val.purchaseCode} label={val.purchaseName}>{val.purchaseName}</Option>)}

                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <Button type="primary" htmlType="submit">查询</Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleFormResetModal}>重置</Button>
                </Col>
              </Row>
            </Form>
            <Table
              dataSource={settlementOrderData.list}
              rowKey={record => record.id}
              columns={columns}
              pagination={paginationProps}
              onChange={this.handleTableChangeModal}
              // loading={submitting}
            />
          </div>
        </Modal>
      </div>
    );
  }
  //列表 Modal
  onSearchModal=(e)=>{
    e.preventDefault();
    const {settlementManagement:{incomeAgencyData:{settlementOrderData}}}=this.props
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)
      if (err) return;
      let values;
      values ={
        ...fieldsValue,
      }
      this.setState({
        modalFormValues: values,
      });
      this.props.dispatch({
        type: 'settlementManagement/getIncomeASettlementOrderData',
        payload: {
          ...values,
          ...settlementOrderData.pagination
        },
      });
    });
  }
  handleFormResetModal =()=>{
    this.setState({
      modalFormValues: {},
    });
    this.props.form.resetFields();
  }
  handleTableChangeModal=(pagination, filtersArg, sorter)=>{
    const params = {
      ...this.state.modalFormValues,
      ...pagination,
    };

    this.props.dispatch({
      type: 'settlementManagement/getIncomeASettlementOrderData',
      payload: params,
    });
  }
  showModal = (flag) => {
    this.setState({
      settlementOrderVisible: !!flag,
    });
    this.handleFormResetModal();
  }
  // handleCancel = (e) => {
  //   // console.log(e);
  //   this.setState({
  //     settlementOrderVisible: false,
  //   });
  // }
}


