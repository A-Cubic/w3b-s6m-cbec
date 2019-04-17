import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs,Radio } from 'antd';
import styles from './purchaseSettlement.less';
import moment from 'moment';
import {getCurrentUrl, getUploadUrl} from '../../services/api'
import {getHeader, getToken} from "../../utils/Global";
const userId = getToken().userId;
import {message} from "antd/lib/index";
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({roleFinanceManagement }) => ({
  roleFinanceManagement,
}))
// --------  --------------
    // 平台-财务角色-结算管理-供货结算-采购结算
@Form.create()
export default class purchaseSettlement extends Component {
  state={
    formValues:{},
    visible: false,
    visibleChildCheck:false,
    sortedInfo:null,
    //value: '待结算',
  }

  //****/
  init(){
    this.props.dispatch({
      type:'roleFinanceManagement/getNewPurchaseSettlementDate',
      payload:{

      }
    })
  }
  componentDidMount() {
    this.init();
  }
  //查询
  onSearch=(e)=>{
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,type3,item,list,pagination}}} } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
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
  
      if(type1=='分销' || type1=='铺货'){
        this.props.dispatch({
          type:'roleFinanceManagement/getNewPurchaseSettlementDate',
          payload:{
            model:type1,
            status:type2,
            ...values,
          }
        })
      } else {
        this.props.dispatch({
          type:'roleFinanceManagement/getNewPurchaseSettlementType3Date',
          payload:{
            model:type1,
            status:type3,
            ...values,
          }
        })
      }
    });
  }
  handleFormReset =()=>{
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,type3,item,list,pagination}}} } = this.props;
    this.props.form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo: null,
    });
  
    if(type1=='分销' || type1=='铺货'){
      this.props.dispatch({
        type:'roleFinanceManagement/getNewPurchaseSettlementDate',
        payload:{
          model:type1,
          status:type2,
        }
      })
    } else {
      this.props.dispatch({
        type:'roleFinanceManagement/getNewPurchaseSettlementType3Date',
        payload:{
          model:type1,
          status:type3,
        }
      })
    }

  }
  //翻页
  handleTableChange=(pagination, filters, sorter)=>{
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,type3,item,list}}} } = this.props;
    const params = {
      ...pagination,
      ...this.state.formValues,
      model:type1,
      status:type2,
    };
    if(type1 == '代理'){
      this.props.dispatch({
        type:'roleFinanceManagement/getNewPurchaseSettlementDate',
        payload:{
          model:type1,
          status:type3,
          ...pagination,
          ...this.state.formValues,
        }
      })
    } else {
        this.props.dispatch({
          type:'roleFinanceManagement/getNewPurchaseSettlementDate',
          payload: params,
        });
    }

  }
  renderForm(){
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,item,list,pagination}}} } = this.props;
    //console.log('7777',purchaseSettlement)
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="结算单号：">
              {getFieldDecorator('accountCode')(
                <Input style={{ width: '100%' }} placeholder="请输入结算单编号进行查询" />
              )}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <FormItem label="供货商名称">
              {getFieldDecorator('userCode')(
                <Input style={{ width: '100%' }} placeholder="请输入供货商名称进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
       
      </Form>
    );
  }
  render() {
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,type3,item,list,pagination}}} } = this.props;
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
          return (
            <div>
              <Card
                // bordered={false}
              >
                <div className={styles.tableList}>
                  <div className={styles.tableListForm}>
                    <Row>
                      <Col span={12}><p style={{fontWeight:"bold"}}>账期：<em style={{color:"red",fontWeight:"normal",fontStyle:"normal"}}>{record.date}</em></p></Col>
                      {/* <Col span={12}><p style={{textAlign:"right",color:"#737373 85%" }}><em style={{fontStyle:'normal',marginRight:'15px'}}>采购商：大连岂止科技</em> 结算单{record.accountCode}</p></Col> */}
                      <Col span={12}><p style={{textAlign:"right",color:"#737373 85%" }}>{record.company}</p></Col>
                    </Row>
                    <div className={styles.line}></div>
                    <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                      <Col md={6} sm={12}  xs={12}  >
                        <div className={styles.hot}>
                          <h1 style={{border:"5px solid #888"}}>采</h1>
                          <h2>￥{record.purchasemoney}</h2>
                        </div>
                      </Col>
                      <Col md={6} sm={12} xs={12}>
                        <div className={styles.hot}>
                          <h1 style={{border:"5px solid #888"}}>退</h1>
                          <h2>￥{record.refundmoney}</h2>
                        </div>
                      </Col>
                      <Col md={6} sm={12} xs={12}>
                        <div className={styles.hot}>
                          <h1 style={{border:"5px solid #888"}}>其</h1>
                          <h2>￥{record.othermoney}</h2>
                        </div>
                      </Col>
                      <Col md={6} sm={12} xs={12}>
                        <div className={styles.hot}>
                          <h1 style={{border:"5px solid #A7C8E3"}}><span style={{color:'#1890ff'}}>付</span></h1>
                          <h2>￥{record.paymoney}</h2>
                        </div>
                      </Col>
                    </Row>
                    <div className={styles.line}></div>
                    <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                      <Col md={12}>
                        结算单号：{record.accountCode}
                      </Col>
                      <Col md={12}>
                        <div style={{ float:"right" }}>
                          {( ()=>{
                            if(type2 == '待对账'){
                              return(
                                <div>
                                  <Button style={{ marginRight:7 }} onClick={this.handleSettlementDetails.bind(this,record)} >
                                    结算明细
                                  </Button>
                                  {/* {
                                    type3 == '已结算'?'':<Button style={{ marginRight:7 }} onClick={this.handleSettlementDetails.bind(this,record)} >
                                    结算明细
                                  </Button>
                                  } */}
                                  {
                                  type3 == '已结算'?'':<Button  type="primary" style={{ marginRight:7 }} onClick={()=>this.handleConfirmThePayment(record)} >
                                    {type1=='代理'?'确认付款':'完成对账'}
                                  </Button>
                                  }
                                </div>
                              )
                            } else if(type2 == '待收款'){
                              return(
                                <div>
                                  <Button style={{ marginRight:7 }} onClick={this.handleSettlementDetails.bind(this,record)} >
                                    结算明细
                                  </Button>
                                  <Button  type="primary" style={{ marginRight:7 }} onClick={()=>this.handleConfirmThePayment(record)} >
                                    确认收款
                                  </Button>
                                </div>
                              )
                            } else {
                              return(
                                <div>
                                  <Button style={{ marginRight:7 }} onClick={this.handleSettlementDetails.bind(this,record)} >
                                    结算明细
                                  </Button>
                                </div>
                              )
                            }
                              }
                          )()}
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
      <div>
        <Card bordered={false}>
          <Tabs defaultActiveKey={type1} onChange={this.callback.bind(this)} type="line">
              <TabPane tab="分销" key="分销">
              </TabPane>
              <TabPane tab="代理" key="代理">
              </TabPane>
              <TabPane tab="铺货" key="铺货">
              </TabPane> 
          </Tabs>
          
            {( ()=>{
                switch(type1){
                    case "分销":return (
                     <Radio.Group defaultValue={type2}  onChange={this.onChange} value={type2}>
                        <Radio.Button className={styles.all_title} style={{borderRadius:'5px'}} value='待对账'>待对账({item.reconciliationing})</Radio.Button>
                        <Radio.Button className={styles.all_title} style={{borderRadius:'5px'}} value="待收款">待收款({item.receivabling})</Radio.Button>
                        <Radio.Button className={styles.all_title} style={{borderRadius:'5px'}} value="已结算">已结算</Radio.Button>
                      </Radio.Group>
                     
                    )
                    
                    break;
                    case "代理":return (
                      <Radio.Group defaultValue={type1}  onChange={this.onChangeType3.bind(this)} value={type3}>
                        <Radio.Button className={styles.all_title} style={{borderRadius:'5px'}} value='待结算'>待结算({item.settling})</Radio.Button>
                        <Radio.Button className={styles.all_title} style={{borderRadius:'5px'}} value="已结算">已结算</Radio.Button>
                      </Radio.Group>
                    ) 
                    break;
                    case "铺货":return (
                     <Radio.Group defaultValue={type1}  onChange={this.onChange} value={type2}>
                        <Radio.Button className={styles.all_title} style={{borderRadius:'5px'}} value='待对账'>待对账({item.reconciliationing})</Radio.Button>
                        <Radio.Button className={styles.all_title} style={{borderRadius:'5px'}} value="待收款">待收款({item.receivabling})</Radio.Button>
                        <Radio.Button className={styles.all_title} style={{borderRadius:'5px'}} value="已结算">已结算</Radio.Button>
                        </Radio.Group>
                    )
                    break;
                    default:return null;
                }
            })()}

          
          <Divider dashed />
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>

          <Table dataSource={list}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.keyId}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
                 showHeader={false}
          />
        </Card>
      </div>
    );
  }
  //确认付款 完成对账
  handleConfirmThePayment(record){
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,item,list,pagination}}} } = this.props;
    this.props.dispatch({
      type:'roleFinanceManagement/getNewPurchaseSettlementSubmitDate',
      payload:{
        accountCode:record.accountCode,
        model:type1,
        status:record.status,
      },
      callback: this.callbackType,
    })
  }
  callbackType = (params) => {
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,item,list,pagination}}} } = this.props;
    if(params.type==1){
      this.props.dispatch({
        type:'roleFinanceManagement/getNewPurchaseSettlementDate',
        payload:{
          model:type1
        }
      })
    }
  } 
  //结算明细 
  handleSettlementDetails(record){
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,item,list,pagination}}} } = this.props;
    this.props.dispatch({
      type:'roleFinanceManagement/getNewPurchaseSettlementDetails',
      payload:{
        accountCode:record.accountCode,
        model:type1=='分销'?'3':(type1=='代理'?'4':'5')
      },
    })

  }


  //分销-代理-铺货

  callback(key) {
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,type3,item,list,pagination}}} } = this.props;
    this.props.dispatch({
      type:'roleFinanceManagement/getNewPurchaseSettlementDate',
      payload:{
        model:key,
        //status:type2, 
      }
    })
    
    this.props.form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo: null,
    });
  }

  //
  onChange = (e) => {
    //console.log('e.target.value',e.target.value)
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,item,list,pagination}}} } = this.props;
    this.props.dispatch({
      type:'roleFinanceManagement/getNewPurchaseSettlementDate',
      payload:{
        model:type1,
        status:e.target.value
      }
    })
    this.props.form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo: null,
    });
  }

  onChangeType3 = (e) => {
    //console.log('e.target.value',e.target.value)
    const { roleFinanceManagement:{purchaseSettlement,purchaseSettlement:{tableData:{type1,type2,type3,item,list,pagination}}} } = this.props;
    this.props.dispatch({
      type:'roleFinanceManagement/getNewPurchaseSettlementType3Date',
      payload:{
        model:type1,
        status:e.target.value
      }
    })
    this.props.form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo: null,
    });
  }


}


