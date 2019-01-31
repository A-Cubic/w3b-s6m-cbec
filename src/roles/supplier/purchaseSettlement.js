import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs  } from 'antd';
import styles from './purchaseSettlement.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({roleSupplierBus }) => ({
  roleSupplierBus
}))

@Form.create()
// 供应商 - 货款结算
export default class purchaseSettlement extends Component {
  state={
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type:'roleSupplierBus/getPaymentSettlementData',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)

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
        type: 'roleSupplierBus/getPaymentSettlementData',
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
    });
    this.init();
  }
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'roleSupplierBus/getPaymentSettlementData',
      payload: params,
    });
  }
  renderForm(){
    // console.log(this.props)
    const { roleSupplierBus:{purchaseSettlement:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="单据日期">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="结算状态">
              {getFieldDecorator('status',{
              })(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="">全部</Option>
                  <Option value="1">待结算</Option>
                  <Option value="0">已结算</Option>

                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="结算单号">
              {getFieldDecorator('accountCode')(
                <Input placeholder="请输入结算单号" />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col md={12} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span>共查询出符合条件的数据：{tableData?tableData.list.length:0} </span>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    // console.log('1',this.props)
    const { roleSupplierBus:{purchaseSettlement:{tableData:{list, pagination}}} } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const columns = [
      {
        title: '',
        dataIndex: 'keyId',
        key: 'keyId',
        render:(val, record) =>{
          // console.log('record',record)
          return (
            <div>
              <Card
                bodyStyle={record.status==0?{background:'#fffbe6',boxShadow: '0 4px 12px 0 rgba(0,0,0,0.20)',borderRadius: 4}:{boxShadow: '0 4px 12px 0 rgba(0,0,0,0.20)',borderRadius: 4}}
                bordered={false}
              >
                <div className={styles.tableList}>
                  <div className={styles.tableListForm}>
                    <Row>
                      <Col span={12}><p style={{fontWeight:"bold"}}>账期：<em style={{color:"red",fontWeight:"normal",fontStyle:"normal"}}>{record.date}</em></p></Col>
                      <Col span={12}><p style={{textAlign:"right",color:"#737373 85%" }}><em style={{fontStyle:'normal',marginRight:'15px'}}>采购商：大连岂止科技</em> 结算单{record.accountCode}</p></Col>
                      
                    </Row>
                    <div className={styles.line}></div>
                    <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                      <Col md={6} sm={12}  xs={12}  >
                        <div className={styles.hot}>
                          <h1 style={{border:"5px solid #A7C8E3"}}>￥{record.purchasemoney}</h1>
                          <h2>采购货款</h2>
                        </div>
                      </Col>
                      <Col md={6} sm={12} xs={12}>
                        <div className={styles.hot}>
                          <h1 style={{border:"5px solid #000"}}>￥{record.refundmoney}</h1>
                          <h2>采退货款</h2>
                        </div>
                      </Col>
                      <Col md={6} sm={12} xs={12}>
                        <div className={styles.hot}>
                          <h1 style={{border:"5px solid #C8C8C8"}}>￥{record.othermoney}</h1>
                          <h2>其他费用</h2>
                        </div>
                      </Col>
                      <Col md={6} sm={12} xs={12}>
                        <div className={styles.hot}>
                          <h1 style={{border:"5px solid #B4E3A7"}}>￥{record.paymoney}</h1>
                          <h2>实际应付款</h2>
                        </div>
                      </Col>
                    </Row>
                    <div className={styles.line}></div>
                    <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                      <Col md={12}>
                        {record.status==1?
                          <span className={styles.settled}>待结算</span>:
                          <span className={styles.settlement}>已结算</span>
                        }
                      </Col>
                      <Col md={12}>
                        <div style={{ float:"right" }}>
                          <Button  style={{ marginRight:7 }} type="primary" ghost onClick={()=>this.handleChildDetailsModel(record)}>结算明细</Button>
                          {record.status==1?
                            // <Button style={{ marginRight:7 }} type="primary" onClick={()=>this.handleCompleteReconciliation(record)}>完成对账</Button>
                            //{record.flag ==2 ?<a onClick={()=>this.handleViewState(record)}>完成对账<br/></a>:<div>对账中</div>}
                            <Button style={{ marginRight:7 }} type="primary" >
                              {/* {record.flag ==2 ?<a onClick={()=>this.handleCompleteReconciliation(record)}>完成对账<br/></a>:<div>待付款</div>} */}
                              {record.flag ==1 ?<a onClick={()=>this.handleCompleteReconciliation(record)}>完成对账<br/></a>:<div>待付款</div>}
                            </Button>
                            :
                            <Button style={{ marginRight:7 }} type="primary" onClick={()=>this.handleChildPrintModel(record)}>预览打印</Button>
                          }
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </div>
          )},
      }
    ];
    return (
      <div className={styles.qa}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
        </Card>
        <Table dataSource={list}
               showHeader={false}
               rowClassName={styles.td}
               className={styles.rowClass}
          // scroll={{ x: 1500}}
               rowKey={record => record.keyId}
               columns={columns}
               pagination={paginationProps}
               onChange={this.handleTableChange}
          // loading={submitting}
        />
        <ChildDetails />
        <ChildPrint />
      </div>
    );
  }
  handleChildDetailsModel=(record)=>{
    // console.log(record)
    this.props.dispatch({
      type: 'roleSupplierBus/getSettlementDetailsData',
      payload: {accountCode:record.accountCode},
    });
  }
  //完成对账
  handleCompleteReconciliation=(record)=>{
    this.props.dispatch({
      type: 'roleSupplierBus/completeReconciliation',
      payload: {accountCode:record.accountCode},
    });
  }
  //打印弹窗
  handleChildPrintModel=(record)=>{
    this.props.dispatch({
      type: 'roleSupplierBus/childModelPrintData',
      payload: {accountCode:record.accountCode},
    });
  }
}


// 结算明细
@connect(({roleSupplierBus }) => ({
  roleSupplierBus
}))
class ChildDetails extends Component {
  handleCancel=()=>{
    this.props.dispatch({
      type:'roleSupplierBus/childDetailsModelVisibleR',
      payload:false
    })
  }
  handleTableChangeTab1=(pagination, filters, sorter)=>{

    const { roleSupplierBus:{purchaseSettlement:{childDetailsModelHelpId,childModelDetailsTableTab1Data}} } = this.props;
    const params = {
      ...pagination,
      accountCode:childDetailsModelHelpId
    };
    this.props.dispatch({
      type: 'roleSupplierBus/childModelDetailsTableTab1Data',
      payload: params,
    });
  }
  handleTableChangeTab2=(pagination, filters, sorter)=>{
    const { roleSupplierBus:{purchaseSettlement:{childDetailsModelHelpId,childModelDetailsTableTab2Data}} } = this.props;
    const params = {
      ...pagination,
      accountCode:childDetailsModelHelpId
    };
    this.props.dispatch({
      type: 'roleSupplierBus/childModelDetailsTableTab2Data',
      payload: params,
    });
  }
  render(){
    const { roleSupplierBus:{purchaseSettlement:{childDetailsModelVisible,childModelDetailsTableTab1Data,childModelDetailsTableTab2Data} }} = this.props;
    const paginationProps1 = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...childModelDetailsTableTab1Data.pagination,
    };
    const paginationProps2 = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...childModelDetailsTableTab2Data.pagination,
    };
    const columnsTab1 = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, 
      {
        title: '订单号',
        dataIndex: 'orderId',
        key: 'orderId',
        render: (val,record) => (
          <div>
            <span style={{display:'inline-block'}}>{record.orderId}</span>
            <span style={{display:'inline-block'}}>{record.orderType}</span>
          </div>
        )
      },
      {
        title: '商品（SKU）',
        dataIndex: 'goodsName',
        key: 'goodsName',
        render: (val,record) => (
          <div>
            <img src={ record.slt} alt="" width={80} style={{marginRight:8,}}/>
            <span style={{display:'inline-block',width:200}}>{val}</span>
          </div>
        )
      }, {
        title: '商品条码',
        dataIndex: 'barCode',
        key: 'barCode',
      }, 
      {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
      },{
        title: '供货价',
        dataIndex: 'purchasePrice',
        key: 'purchasePrice',
        render:val=>`¥${val}`,
      },{
        title: '销售单价',
        dataIndex: 'skuUnitPrice',
        key: 'skuUnitPrice',
        render:val=>`¥${val}`,
      },{
        title: '销售数量',
        dataIndex: 'quantity',
        key: 'quantity',
      },{
        title: '销售金额',
        dataIndex: 'money',
        key: 'money',
        render:val=>`¥${val}`,
      },{
        title: '销售日期',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
      }
    ];
    const columnsTab2 = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '调整年份',
        dataIndex: 'year',
        key: 'year',
      }, {
        title: '调整月份',
        dataIndex: 'month',
        key: 'month',
      },{
        title: '调整金额',
        dataIndex: 'price',
        key: 'price',
        render:val=>`¥${val}`,
      },{
        title: '调整项目',
        dataIndex: 'adjustName',
        key: 'adjustName',
      },{
        title: '调整事由',
        dataIndex: 'detail',
        key: 'detail',
      }
    ];

    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1200}}
          title="结算明细"
          visible={childDetailsModelVisible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Tabs type="card">
            <TabPane tab="货款" key="1">
              <Table dataSource={childModelDetailsTableTab1Data.list}
                // scroll={{ x: 1500}}
                     rowKey={record => record.keyId}
                     columns={columnsTab1}
                     pagination={paginationProps1}
                     onChange={this.handleTableChangeTab1}
                // loading={submitting}
              />
            </TabPane>
            <TabPane tab="其他" key="2">
              <Table dataSource={childModelDetailsTableTab2Data.list}
                // scroll={{ x: 1500}}
                     rowKey={record => record.keyId}
                     columns={columnsTab2}
                     pagination={paginationProps2}
                     onChange={this.handleTableChangeTab2}
                // loading={submitting}
              />
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

// 打印
@connect(({roleSupplierBus }) => ({
  roleSupplierBus
}))
class ChildPrint extends Component {
  handleCancel=()=>{
    this.props.dispatch({
      type:'roleSupplierBus/childPrintModelVisibleR',
      payload:false
    })
  }
  render(){
    const { roleSupplierBus:{purchaseSettlement:{childPrintModelVisible,childModelPrint} }} = this.props;
    const columnsPrinta = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '类别',
        dataIndex: 'type',
        key: 'type',
      }, {
        title: '说明',
        dataIndex: 'explain',
        key: 'explain',
      },{
        title: '金额',
        dataIndex: 'price',
        key: 'price',
        render:val=>`¥${val}`,
      }
    ];
    return (
      <div>
        <Modal
          width={ '765px' }
          // width={ '595px' }
          //style={{maxWidth:1200}}
          //title="结算明细"
          visible={childPrintModelVisible}
          //visible={true}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          closable={null}
        >
          <div id={'aaaa'}>
            <Row className={styles.hotTitle}>
              <Col span={24}>采购商品结算单</Col>
            </Row>
            <Row>
              <Col className={styles.hotInformation} span={12}>
                <b>结算单号：{childModelPrint.item.accountCode}</b>
                {/*<b>供应商名称：{childModelPrint.item.supplierName}</b>*/}
                <b>供应商名称：岂止科技（大连）有限公司</b>
                <b>收据金额(大写)：{childModelPrint.item.money}</b>
              </Col>
              <Col className={styles.hotInformation} span={12}>
                <b>结算账期：{childModelPrint.item.date}</b>
                <b>合同编号：{childModelPrint.item.contractCode}</b>
                <b>打印日期：{childModelPrint.item.today}</b>
              </Col>
            </Row>

            <Table className={styles.hotTable} dataSource={childModelPrint.list}
              // scroll={{ x: 1500}}
                   rowKey={record => record.keyId}
                   columns={columnsPrinta}
                   pagination={false}
              // pagination={paginationProps2}
              // onChange={this.handleTableChangeTab2}
              // loading={submitting}
            />
            <Row className={styles.Printer}>
              <Col span={24}>打印人：{childModelPrint.item.name}</Col>
            </Row>

          </div>
        </Modal>
      </div>
    )
  }
}
