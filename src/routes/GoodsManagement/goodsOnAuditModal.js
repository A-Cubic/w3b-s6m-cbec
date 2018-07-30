import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Modal,Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker } from 'antd';

import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
@connect(({goodsManagement,  loading }) => ({
  goodsManagement,
  loading: loading.effects['goodsManagement/getGoodsOnAuditList'],
}))

@Form.create()
export class ChangeGoodsOnAuditModal extends Component {
  state={
    changeSelect:false,
    auditFailureVisible:false,
    total:'',
    auditFailureNum:'',
    selectedId: []
  }
  init(){
    // this.setState({
    //
    // })
    // this.props.dispatch({
    //   type: 'goodsManagement/getGoodsOnAuditList',
    //   payload: {
    //     userId:userId,
    //   },
    // });
  }
  componentDidMount() {
    const { goodsManagement:{goodsOnAudit:{selectedId}}} = this.props;
    // console.log(selectedId)
    this.setState({
      selectedId: selectedId
    })
  }
  handleAuditFailureVisible = (flag) => {
    this.setState({
      auditFailureVisible:!!flag,
    },()=>{
      // console.log('2222',this.state.auditFailureVisible)
    });
  }
  handleCancel=()=>{
    this.props.parent.handleVisible(false,'changeVisible');
    this.handleClear();
  }
  handleOk=()=>{
    const { goodsManagement:{goodsOnAudit:{goodsDetails,selectedId}}} = this.props;
    const getTotalLength = goodsDetails.warehouseGoodsList.length
    const getselectedIdLength = this.state.selectedId.length;
    this.setState({
      auditFailureNum:getTotalLength-getselectedIdLength
    },()=>{
      // console.log(goodsDetails.warehouseGoodsList)
      // console.log(this.state.selectedId)
      // console.log(this.state.auditFailureNum)
    })

    if(getTotalLength == getselectedIdLength||!this.state.changeSelect){
      const that = this;
      // console.log(this);
      this.props.dispatch({
        type:'goodsManagement/onAudit',
        payload:{
          logId:goodsDetails.logId,
          logGoodsId:this.state.selectedId
        },
        callback:function () {
          that.props.parent.handleVisible(false,'changeVisible');
          that.handleClear();
          // that.props.parent.init();
          that.props.dispatch({
            type: 'goodsManagement/getGoodsOnAuditList',
            payload: {
              userId:userId,
            },
          });
        }
      })
      // console.log('已经全部选择')


    }else{
      // console.log('弹出审核失败原因')
      this.props.parent.handleVisible(false,'changeVisible');
      this.handleAuditFailureVisible(true);
    }
  }
  handleClear=()=>{
    this.setState({
      changeSelect:false,
      selectedId:[]
    })
  }
  downloadGoodsMes=(url)=>{
    if(url){
      window.location.href=url;
    }

  }
  downloadGoodsZip=(url)=>{
    if(url) {
      window.location.href = url;
    }
  }
  render() {

    // console.log('1',this.props)
    const { goodsManagement:{goodsOnAudit:{goodsDetails}}} = this.props;
    const {auditFailureVisible} = this.state;
    const columns = [
      {
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode',
    }, {
      title: '商品名称（中文）',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '仓库名称',
      dataIndex: 'wname',
      key: 'wname',
    }, {
      title: '供货价',
      dataIndex: 'inprice',
      key: 'inprice',
      render:val=>val?'¥'+val:'--'
    }, {
      title: '供货数量',
      dataIndex: 'goodsnum',
      key: 'goodsnum',
    }, {
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      render:val=>{
        return <div style={{color:'#1890FF '}}>{val}</div>
      }
      }
    ];

    const rowSelection = {

      selectedRowKeys:this.state.selectedId,
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({
          selectedId:selectedRowKeys,
          changeSelect:true
        },()=>{
          // console.log(this.state.selectedId)
        })
        },

      getCheckboxProps: record => ({
        defaultChecked:true,
        disabled: false, // Column configuration not to be checked
        name: record.name,
      }),
    };
    const auditFailureParent ={
      auditFailureVisible:auditFailureVisible,
      auditFailureNum:this.state.auditFailureNum,
      handleAuditFailureVisible:this.handleAuditFailureVisible,
      logGoodsId:this.state.selectedId,
      handleClear:this.handleClear
    }
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1200,maxHeight:900}}
          // cancelText="关闭"
          // okText="提交"
          title="商品上架审核"

          visible={this.props.parent.visible}
          onCancel={this.handleCancel}
          footer={[
            <span key={1} style={{float:'left',marginLeft:18}}>提示：请选择审核通过的上架商品</span>,

            <Button key={2} onClick={this.handleCancel}>关闭</Button>,
            <Button key={3} onClick={this.handleOk} type="primary">审核通过</Button>
          ]}
        >
          <div>
            <div>
              <span>供应商：{goodsDetails.username}</span>
              <Button style={{ marginLeft: 50 }} type="primary" onClick={this.downloadGoodsMes(goodsDetails.goodsUrl)}>
                下载新上架的商品基础信息
              </Button>
              <Button style={{ marginLeft: 20 }} type="primary" onClick={this.downloadGoodsZip(goodsDetails.goodsImgUrl)}>
                下载新上架的商品图片压缩包
              </Button>

            </div>
            <Table
              dataSource={goodsDetails.warehouseGoodsList}
              rowSelection={rowSelection}

              rowKey={record => record.id}
              pagination={false}
              columns={columns}
            />
          </div>

        </Modal>
        <AuditFailure

          parent={auditFailureParent}
        />
      </div>
    );
  }
}

@connect(({goodsManagement,  loading }) => ({
  goodsManagement,
  loading: loading.effects['goodsManagement/getGoodsOnAuditList'],
}))
@Form.create()

class AuditFailure extends React.Component {

  handleOk = (e) => {
    const { goodsManagement:{goodsOnAudit:{goodsDetails}}} = this.props;
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, fieldsValue)=>{
      // console.log('fieldsValue',fieldsValue)
      if(!err){
        // console.log('提交失败原因')
        this.props.dispatch({
          type:'goodsManagement/onAudit',
          payload:{
            ...fieldsValue,
            logId:goodsDetails.logId,
            logGoodsId:this.props.parent.logGoodsId
          },
          callback:function () {
            that.props.parent.handleAuditFailureVisible(false);
            that.props.form.resetFields();
            that.props.parent.handleClear();
            that.props.dispatch({
              type: 'goodsManagement/getGoodsOnAuditList',
              payload: {
                userId:userId,
              },
            });
          }
        })
      }
    })
  }

  handleCancel = (e) => {
    this.props.parent.handleAuditFailureVisible(false)
    this.props.form.resetFields();
    this.props.parent.handleClear();
  }

  render() {
    const { goodsManagement:{goodsOnAudit:{goodsDetails}}} = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:600}}
          title="审核失败原因"
          visible={this.props.parent.auditFailureVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="1" onClick={this.handleCancel}>关闭</Button>,
            <Button key="3" type="primary" onClick={this.handleOk}>确定</Button>
          ]}
        >
          <div >
            <Form onSubmit={this.handleOk} layout="inline" style={{width:'100%'}}>
              <p style={{marginLeft:10,fontSize:16}}>您有 {this.props.parent.auditFailureNum} 款产品未通过审核，请输入审核失败的原因</p>
                <FormItem
                  {...formItemLayout}
                  style={{width:'100%'}}
                  label=""
                >
                  <Row type="flex" justify="space-around" gutter={8}>
                    <Col span={23} >
                    {getFieldDecorator('logText', {
                      rules: [{ required: true, message: '请输入审核失败原因' }],
                    })(
                      <TextArea style={{width:'100%'}} placeholder="请输入审核失败原因" autosize={{ minRows: 5, maxRows: 6 }} />
                    )}
                    </Col>
                  </Row>
                </FormItem>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}








@connect(({goodsManagement,  loading }) => ({
  goodsManagement,
  loading: loading.effects['goodsManagement/getGoodsOnAuditList'],
}))
// 查看详情
@Form.create()
export class CheckGoodsOnAuditModal extends Component {
  handleCancel=()=>{
    this.props.parent.handleVisible(false,'checkVisible')
  }
  downloadGoodsMes=(url)=>{
    if(url) {
      window.location.href = url;
    }
  }
  downloadGoodsZip=(url)=>{
    if(url) {
      window.location.href = url;
    }
  }
  render() {
    // console.log('1',this.props)
    const { goodsManagement:{goodsOnAudit:{goodsDetails} }} = this.props;
    const columns = [
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
      }, {
        title: '商品名称（中文）',
        dataIndex: 'goodsName',
        key: 'goodsName',
      }, {
        title: '仓库名称',
        dataIndex: 'wname',
        key: 'wname',
      }, {
        title: '供货价',
        dataIndex: 'inprice',
        key: 'inprice',
        render:val=>val?'¥'+val:'--'
      }, {
        title: '供货数量',
        dataIndex: 'goodsnum',
        key: 'goodsnum',
      }, {
        title: '审核状态',
        dataIndex: 'status',
        key: 'status',
        render:val=>{
          return <div style={{color:'#1890FF '}}>{val}</div>
        }
      }
    ];
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1200}}
          // cancelText="关闭"
          // okText="提交"
          title="商品上架详情"

          visible={this.props.parent.visible}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <div>
              <span>供应商：{goodsDetails.username}</span>
              <Button style={{ marginLeft: 50 }} type="primary" onClick={this.downloadGoodsMes(goodsDetails.goodsUrl)}>
                下载新上架的商品基础信息
              </Button>
              <Button style={{ marginLeft: 20 }} type="primary" onClick={this.downloadGoodsZip(goodsDetails.goodsImgUrl)}>
                下载新上架的商品图片压缩包
              </Button>
            </div>
            <Table
              dataSource={goodsDetails.warehouseGoodsList}
              rowKey={record => record.id}
              pagination={false}
              columns={columns}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
