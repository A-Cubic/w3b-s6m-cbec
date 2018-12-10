import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs  } from 'antd';
import styles from './purchaseList.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
import {getToken} from "../../../utils/Global";
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserBulkPurchases }) => ({
  rolePurchaserBulkPurchases
}))

@Form.create()
// 代销 - 统计 - 货款结算 - 20181126
export default class initiateInquiry extends Component {
  state={
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type:'rolePurchaserConsignment/getPaymentSettlementData',
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
        type: 'rolePurchaserConsignment/getPaymentSettlementData',
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
      type: 'rolePurchaserConsignment/getPaymentSettlementData',
      payload: params,
    });
  }
  renderForm(){
    // console.log(this.props)
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="账期范围">
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
                  <Option value="0">待结算</Option>
                  <Option value="1">已结算</Option>

                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="结算单号">
              {getFieldDecorator('status')(
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
            {/*<span>共查询出符合条件的数据：{tableData?tableData.list.length:0} </span>*/}
          </div>
        </div>
      </Form>
    );
  }

  render() {

    // const paginationProps = {
    //   showSizeChanger: true,
    //   showQuickJumper: true,
    //   ...pagination,
    // };
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
                    <Col span={12}><p style={{textAlign:"right",color:"#737373 85%" }}>结算单{record.accountCode}</p></Col>
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
                      {record.status==0?
                        <span className={styles.settled}>待结算</span>:
                        <span className={styles.settlement}>已结算</span>
                      }
                    </Col>
                    <Col md={12}>
                      <div style={{ float:"right" }}>
                        <Button  style={{ marginRight:7 }} type="primary" ghost onClick={()=>this.handleChildDetailsModel(record)}>结算明细</Button>
                        {record.status==0?
                          <span style={{ marginRight:7 }} className={styles.settled}>对账中…</span>:
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
          <Table dataSource={[]}
                 showHeader={false}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.keyId}
                 columns={columns}
                 // pagination={paginationProps}
                 // onChange={this.handleTableChange}
                 // loading={submitting}
          />

      </div>
    );
  }

}


