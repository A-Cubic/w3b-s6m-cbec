import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './incomeStore.less';
import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
@connect(({settlementManagement,  loading }) => ({
  settlementManagement,
  // loading: loading.effects['salesStatistics/getSalesStatisticsListO'],
}))
@Form.create()

//我的收益 - 门店20181029

export default class incomeStore extends Component {
  state={
    keyOneFormValues:{},
    keyTwoFormValues:{},
    modalFormValues:{},
    settlementOrderVisible:false
  }
  init(){
    this.props.dispatch({
      type: 'settlementManagement/getIncomeStoreInformationData',
      payload: {},
    });
    this.props.dispatch({
      type: 'settlementManagement/getIncomeStoreUnSettlementData',
      payload: {},
    });
  }
  componentDidMount() {
    this.init();
  }

  //列表 tab1
  onSearchTabKeyOne=(e)=>{
    e.preventDefault();
    const {settlementManagement:{incomeStoreData:{unSettlementData}}}=this.props
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
        type: 'settlementManagement/getIncomeStoreUnSettlementData',
        payload: {
          ...values,
          ...unSettlementData.pagination
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
      type: 'settlementManagement/getIncomeStoreUnSettlementData',
      payload: params,
    });
  }

  //列表 tab2
  onSearchTabKeyTwo=(e)=>{
    e.preventDefault();
    const {settlementManagement:{incomeStoreData:{settlementData}}}=this.props
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
        type: 'settlementManagement/getIncomeStoreSettlementData',
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
      type: 'settlementManagement/getIncomeStoreSettlementData',
      payload: params,
    });
  }
  onChangeTabs=(key)=>{
    // console.log(key)
    if(key==1){
      this.props.dispatch({
        type: 'settlementManagement/getIncomeStoreUnSettlementData',
        payload: {},
      });
    }else if(key==2){
      this.tabTwoInit()
    }
  }
  tabTwoInit=()=>{
    this.props.dispatch({
      type: 'settlementManagement/getIncomeStoreSettlementData',
      payload: {},
    });
  }
  renderBasicInfo(){
    const {settlementManagement:{incomeStoreData:{informationData}}}=this.props;
    return (
      <div style={{margin:'0 100px 0px',fontSize:16}}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            待结算收益（元）：<span className={styles.colorRed} >¥{informationData.totalEstimate}</span>
          </Col>
          <Col md={8} sm={24}>
            累积结算收益（元）：<span className={styles.colorRed}>¥{informationData.totalProfit}</span>
          </Col>
        </Row>
      </div>
    )
  }
  renderTabKeyOne(){
    const { getFieldDecorator } = this.props.form;
    const { settlementManagement:{incomeStoreData:{unSettlementData} }} = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...unSettlementData.pagination,
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
        title: '订单金额',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        render:val=>`¥${val}`
      },{
        title: '收益',
        dataIndex: 'profit',
        key: 'profit',
        render:val=>`¥${val}`
      },{
        title: '支付类型',
        dataIndex: 'payType',
        key: 'payType',
        render:val=>`${val==1?'线上支付':'线下支付'}`
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
                label="支付类型"
              >
                {getFieldDecorator('payType')(
                  <Select
                    placeholder="请选择支付类型"
                  >
                    <Option key={1} value={1}>线上支付</Option>
                    <Option key={2} value={2}>线下支付</Option>
                    {/*{channelTypeArr.map(val => <Option key={val.platformId} value={val.platformId} label={val.platformType}>{val.platformType}</Option>)}*/}

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
              订单总数：<span className={styles.colorRed}>{unSettlementData.item?unSettlementData.pagination.total:0}</span>，
              订单总额（元）：<span className={styles.colorRed}>¥{unSettlementData.item?unSettlementData.item.totalSales:0}</span>，
              收益总额（元）：<span className={styles.colorRed}>¥{unSettlementData.item?unSettlementData.item.totalProfit:0} </span>
            </div>
          </div>
        </Form>
        <Table
          dataSource={unSettlementData.list}
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
    const { settlementManagement:{incomeStoreData:{settlementData}} } = this.props;
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
            <Col md={10} sm={24}>
              <FormItem label="结算日期">
                {getFieldDecorator('BalanceDate')(
                  <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
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
              总条数：<span className={styles.colorRed}>{settlementData?settlementData.pagination.total:0}</span> ,
              结算总额：<span className={styles.colorRed}>¥{settlementData.item?settlementData.item.totalProfit:0}</span>
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
      type: 'settlementManagement/getIncomeStoreSettlementOrderData',
      payload: {accountCode:record.accountCode},
    });
    this.showModal(true)
  }
  render() {
    // console.log(this.props.form)
    const { getFieldDecorator } = this.props.form;
    const { settlementManagement:{incomeStoreData:{settlementOrderData} }} = this.props;
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
        title: '订单金额',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        render:val=>`¥${val}`
      },{
        title: '收益',
        dataIndex: 'profit',
        key: 'profit',
        render:val=>`¥${val}`
      },{
        title: '支付类型',
        dataIndex: 'payType',
        key: 'payType',
        render:val=>`${val==1?'线上支付':'线下支付'}`
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
              <TabPane tab="待结算收益" key="1">
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
                    label="支付类型"
                  >
                    {getFieldDecorator('payType')(
                      <Select
                        placeholder="请选择支付类型"
                      >
                        <Option key={1} value={1}>线上支付</Option>
                        <Option key={2} value={2}>线下支付</Option>
                        {/*{channelTypeArr.map(val => <Option key={val.platformId} value={val.platformId} label={val.platformType}>{val.platformType}</Option>)}*/}

                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <Button type="primary" htmlType="submit">查询</Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleFormResetModal}>重置</Button>
                </Col>
              </Row>
              {/*<Row gutter={{ md: 8, lg: 24, xl: 48 }}>*/}
                {/*<Col md={8} sm={24}></Col>*/}
                {/*<Col md={8} sm={24}></Col>*/}
                {/*<Col md={8} sm={24}>*/}
              {/*<span style={{ float: 'right', marginBottom: 24 }}>*/}
                {/*<Button type="primary" htmlType="submit">查询</Button>*/}
                {/*<Button style={{ marginLeft: 8 }} onClick={this.handleFormResetModal}>重置</Button>*/}
              {/*</span>*/}
                {/*</Col>*/}
              {/*</Row>*/}
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
    const {settlementManagement:{incomeStoreData:{settlementOrderData}}}=this.props
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
        type: 'settlementManagement/getIncomeStoreSettlementOrderData',
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
    this.props.dispatch({
      type: 'settlementManagement/getIncomeStoreSettlementOrderData',
      payload: {},
    });
  }
  handleTableChangeModal=(pagination, filtersArg, sorter)=>{
    const params = {
      ...this.state.modalFormValues,
      ...pagination,
    };

    this.props.dispatch({
      type: 'settlementManagement/getIncomeStoreSettlementOrderData',
      payload: params,
    });
  }
  showModal = (flag) => {
    this.setState({
      settlementOrderVisible: !!flag,
    });
    this.handleFormResetModal();
  }
}


