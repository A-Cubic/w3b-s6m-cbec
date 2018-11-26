import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './paymentSettlement.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
import {getToken} from "../../../utils/Global";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserConsignment }) => ({
  rolePurchaserConsignment
}))

@Form.create()
// 代销-统计-货款结算-20181126
export default class paymentSettlement extends Component {
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
      const values = {
        ...fieldsValue,
      }

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
    // const { rolePurchaserConsignment:{paymentSettlement:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="">
              {getFieldDecorator('information')(
                <Input placeholder="可输入商品条码，商品名称，商品品牌进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span>共查询出符合条件的数据：0 </span>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    // console.log('1',this.props)
    const { rolePurchaserConsignment:{paymentSettlement:{tableData:{list, pagination}}} } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const columns = [
    {
        title: '',

        dataIndex: 'sameTime',
        key: 'sameTime',
        render:(text, record) =>(
          <div>
            <Card
              bordered={false}
            >
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>
                  <Row>
                    <Col span={12}><p style={{fontWeight:"bold"}}>账期：<em style={{color:"red",fontWeight:"normal",fontStyle:"normal"}}>2018.01.01~2018.01.31</em></p></Col>
                    <Col span={12}><p style={{textAlign:"right",color:"#737373 85%" }}>结算单20180101011</p></Col>
                  </Row>
                  <div className={styles.line}></div>
                  <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                    <Col md={6} sm={12}  xs={12}  >
                      <div className={styles.hot}>
                        <h1 style={{border:"5px solid #A7C8E3"}}>￥2000.00</h1>
                        <h2>采购货款</h2>
                      </div>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                      <div className={styles.hot}>
                        <h1 style={{border:"5px solid #000"}}>￥2000.00</h1>
                        <h2>采购货款</h2>
                      </div>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                      <div className={styles.hot}>
                        <h1 style={{border:"5px solid #C8C8C8"}}>￥2000.00</h1>
                        <h2>采购货款</h2>
                      </div>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                      <div className={styles.hot}>
                        <h1 style={{border:"5px solid #B4E3A7"}}>￥2000.00</h1>
                        <h2>采购货款</h2>
                      </div>
                    </Col>
                  </Row>
                  <div className={styles.line}></div>
                  <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                    <Col md={12}>
                      <span className={styles.settled}>待结算</span>
                      <span className={styles.settlement}>已结算</span>
                    </Col>
                    <Col md={12}>
                      <div style={{ float:"right" }}>
                        <Button  style={{ marginRight:7 }} type="primary" ghost>结算明细</Button>
                        <Button style={{ marginRight:7 }} type="primary" >打印</Button>
                        <span style={{ marginRight:7 }} className={styles.settled}>对账中…</span>
                      </div>
                    </Col>
                  </Row>


                </div>
              </div>
            </Card>
          </div>
        ),
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
                 rowKey={record => record.id}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
      </div>
    );
  }
}
