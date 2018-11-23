import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './receivingConfirmation.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
import {getToken} from "../../../utils/Global";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserConsignment, }) => ({
  rolePurchaserConsignment,
}))

@Form.create()
//  采购 - 代销 - 收货确认 - 20181123
export default class receivingConfirmation extends Component {
  state={
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type:'rolePurchaserConsignment/getConfirmReceiptData',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
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
      this.props.dispatch({
        type: 'rolePurchaserConsignment/getConfirmReceiptData',
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
      type: 'rolePurchaserConsignment/getConfirmReceiptData',
      payload: params,
    });
  }
  renderForm(){
    const { rolePurchaserConsignment:{confirmReceipt:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单日期">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="单据类型">
              {getFieldDecorator('sendType',{
              })(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="">全部</Option>
                  <Option value="1">收货单</Option>
                  <Option value="2">退货单</Option>

                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status',{
              })(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="">全部</Option>
                  <Option value="0">待确认</Option>
                  <Option value="1">已确认</Option>
                  <Option value="2">待处理</Option>

                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
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
    const { rolePurchaserConsignment:{confirmReceipt:{tableData:{list, pagination}}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const columns = [
    {
      title: '序号',
      dataIndex: 'keyId',
      key: 'keyId',
    }, {
      title: '单据类型',
      dataIndex: 'sendType',
      key: 'sendType',
      render:val=>`${val==1?'收货单':'退货单'}`
    }, {
      title: '发货数量',
      dataIndex: 'goodsTotal',
      key: 'goodsTotal',
    }, {
      title: '发货人',
      dataIndex: 'sendName',
      key: 'sendName',
    },{
      title: '发货人联系电话',
      dataIndex: 'sendTel',
      key: 'sendTel',
    },{
      title: '状态',
      dataIndex: 'status',
      render: (val) => {
        return(<div>
          {['待确认','已确认','待处理'][`${val}`]}
        </div>)
      }
      // render:val=>`${val==0?'待确认':'已确认'}`
    },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) =>
          <div>
            {
              record.sendType==1?
                // 收货单
                  record.status==0?
                    <a href="javascript:;" onClick={()=>this.handleChildReceiptModel(record)}>确认收货</a>:
                    <a href="javascript:;" onClick={()=>this.handleChildReceiptModel(record)}>查看</a>
                :
                // 退货单
                record.status==2?
                  <a href="javascript:;" onClick={()=>this.handleChildReceiptModel(record)}>填写运单号</a>:
                  <a href="javascript:;" onClick={()=>this.handleChildReceiptModel(record)}>查看</a>
            }
          </div>
      }
    ];
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
        {/*</Card>*/}
        {/*<Card className={styles.mT10}>*/}
          <Table dataSource={list}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.keyId}
                 columns={columns}
                 rowClassName={record => record.status==0||record.status==2?styles.columnsBgColor:''}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
        <ReceiptModel />
      </div>
    );
  }
  handleChildReceiptModel(record){
    let type;
    if(record.sendType==1){
      switch (record.status){
        case '0':
          type=0; //待确认收货
          console.log(type)
          break;
        case '1':
          type=1; //已确认收货
          console.log(type)
          break;
        default:
          console.log(1)
          break;
      }
    } else if(record.sendType==2){
      switch (record.status){
        case '0':
          type=2; //待确认退货
          console.log(type)
          break;
        case '1':
          type=3; //已确认退货
          console.log(type)
          break;
        case '2':
          type=4; //待处理（待填写运单号）
          console.log(type)
          break;
        default:
          console.log(2)
          break;
      }
    }
    const params ={
      visible:true,
      sendid:record.sendid,
      status:record.status,
      sendType:record.sendType,
      type:type
    }
    // console.log('1111',record)
    // console.log('1111',status)
    this.props.dispatch({
      type:'rolePurchaserConsignment/childModel',
      payload:params
      //   {
      //   visible:true,
      //   status:record.status,
      //   sendType:record.sendType
      // }
    })
  }

}

@connect(({rolePurchaserConsignment, }) => ({
  rolePurchaserConsignment,
}))
@Form.create()
class ReceiptModel extends Component {
  handleConfirm =()=>{
    const { rolePurchaserConsignment:{confirmReceipt:{childModelHelpData:{sendid}}} } = this.props;
    this.props.dispatch({
      type: 'rolePurchaserConsignment/childModelSubmit',
      payload: {
        sendid:sendid
      },
      callback:()=>{}
    });
  }
  handleOK = (e)=>{
    const { rolePurchaserConsignment:{confirmReceipt:{childModelHelpData:{sendid}}} } = this.props;

    // console.log('this.props',this.props)
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('填写运单号',fieldsValue)
      if (err) return;
      const values = {
        ...fieldsValue,
      }
      this.props.dispatch({
        type: 'rolePurchaserConsignment/childModelSubmit',
        payload: {
          ...values,
          sendid:sendid
        },
        callback:()=>{this.props.form.resetFields()}
      });
    });
  }
  handleCancel=()=>{
    // console.log('1111',this)
    this.props.dispatch({
      type:'rolePurchaserConsignment/childReceiptModelVisibleR',
      payload:false
    })
  }
  handleTableChange=(pagination, filters, sorter)=>{
    const { rolePurchaserConsignment:{confirmReceipt:{childModelHelpData:{sendid}}} } = this.props;
    const params = {
      ...pagination,
      sendid:sendid
    };
    this.props.dispatch({
      type: 'rolePurchaserConsignment/getChildModelTableData',
      payload: params,
    });
  }
  renderFooter(){
    const { rolePurchaserConsignment:{confirmReceipt:{childModelHelpData,childModelTableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    switch (childModelHelpData.type){
      case 0:
        return (
          <div>
            <div style={{float:'right',fontSize:18}} >
              <span>合计：</span><span style={{color:'red'}}>¥{childModelTableData.item.money}</span>
              <Button style={{ marginLeft: 8 }} type="primary" key="2" onClick={()=>this.handleConfirm()}>确认收货</Button>
              {/*<Button style={{ marginLeft: 8 }} key="3" onClick={this.handleCancel}>关闭</Button>*/}
            </div>
          </div>
        )
        break;
      case 1:
        return(
          <div>
            <div style={{float:'right',fontSize:18}} >
              <span>合计：</span><span style={{color:'red'}}>¥ {childModelTableData.item.money}</span>
              <Button style={{ marginLeft: 8 }} key="2" onClick={this.handleCancel}>关闭</Button>
            </div>
          </div>
        )
        break;
      case 2:
        return(
          <div>
            <div style={{float:'left',fontSize:16}}>
              运单号：{childModelTableData.item.waybillNo}
            </div>
            <div style={{float:'right',fontSize:18}} >
              <span>合计：</span><span style={{color:'red'}}>¥ {childModelTableData.item.money}</span>
              <Button style={{ marginLeft: 8 }} key="2" onClick={this.handleCancel}>关闭</Button>
            </div>
          </div>
        )
        break;
      case 3:
        return(
          <div>
            <div style={{float:'left',fontSize:16}}>
              运单号：{childModelTableData.item.waybillNo}
            </div>
            <div style={{float:'right',fontSize:18}} >
              <span>合计：</span><span style={{color:'red'}}>¥ {childModelTableData.item.money}</span>
              <Button style={{ marginLeft: 8 }} key="2" onClick={this.handleCancel}>关闭</Button>
            </div>
          </div>
        )
        break;
      case 4:
        return(
          <div>
            <div style={{float:'left',fontSize:16}}>
              <Form layout="inline">
                <FormItem label="">
                  {getFieldDecorator('waybillNo')(
                    <Input placeholder="请填写运单号" />
                  )}
                </FormItem>
              </Form>
            </div>
            <div style={{float:'right',fontSize:18}} >
              <span>合计：</span><span style={{color:'red'}}>¥ {childModelTableData.item.money}</span>
              <Button style={{ marginLeft: 8 }} type="primary" key="2" onClick={this.handleOK}>提交</Button>
            </div>
          </div>
        )
        break;
      default:
        console.log(1)
        break;
    }

  }
  render(){
    const { rolePurchaserConsignment:{confirmReceipt:{childReceiptModelVisible,childModelHelpData,childModelTableData:{list,pagination}}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
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
        dataIndex: 'barcode',
        key: 'barcode',
      }, {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
      },{
        title: '供货价',
        dataIndex: 'supplyPrice',
        key: 'supplyPrice',
        render:val=>`¥${val}`,
      },{
        title: '供货数量',
        dataIndex: 'goodsNum',
        key: 'goodsNum',
      },{
        title: '总金额',
        dataIndex: 'goodsTotal',
        key: 'goodsTotal',
        render:val=>`¥${val}`,
      }
    ];
    return (
      <div>
        <Modal
          maskClosable={false}
          width={ '100%' }
          style={{maxWidth:1200}}
          title={childModelHelpData.sendType==1?'收货详情':'退货详情'}
          visible={childReceiptModelVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div>
            <div>
              <Table dataSource={list}
                // scroll={{ x: 1500}}
                     rowKey={record => record.keyId}
                     columns={columns}
                     pagination={paginationProps}
                     onChange={this.handleTableChange}
                // loading={submitting}
              />
            </div>

            <footer style={{overflow:'hidden'}}>
              <Divider />
              {this.renderFooter()}
            </footer>

          </div>
        </Modal>
      </div>
    );
  }
}
