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
@connect(({goodsManagementNew,  loading }) => ({
  goodsManagementNew,
  loading: loading.effects['goodsManagementNew/getGoodsOnAuditList'],
}))

@Form.create()
export class ChangeGoodsOnAuditModalNew extends Component {

  handleChangeSelectedId(selectedRowKeys){
    this.props.dispatch({
      type: 'goodsManagementNew/changeSelectedId',
      payload: {
        selectedRow: selectedRowKeys,
      }
    });
  }

  handleChangeVisible(visibleValue, visibleType){
    this.props.dispatch({
      type: 'goodsManagementNew/changeVisible',
      payload: {
        visibleType: visibleType,
        visibleValue: visibleValue
      }
    });
  }
  handleCancel=()=>{
    this.handleChangeVisible(false,'changeVisible');
    this.handleClear();
  }
  handleOk=()=>{
    const { goodsManagementNew:{goodsOnAudit:{goodsDetails,selectedId}}} = this.props;
    const getTotalLength = goodsDetails.warehouseGoodsList.length
    const getselectedIdLength = selectedId.length;
    this.setState({
      auditFailureNum:getTotalLength-getselectedIdLength
    })

    if(getTotalLength == getselectedIdLength){
      this.props.dispatch({
        type:'goodsManagementNew/onAudit',
        payload:{
          userId: userId,
          logId: goodsDetails.logId,
          visibleType: 'changeVisible'
        },
        callback:function () {

        }
      })
    }else{
      this.handleChangeVisible(false, 'changeVisible');
      this.handleChangeVisible(true, 'auditFailureVisible');
    }


  }
  handleClear=()=>{
    this.handleChangeSelectedId([]);
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
    const { goodsManagementNew:{goodsOnAudit:{goodsDetails, visible, selectedId}}} = this.props;
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
      selectedRowKeys:selectedId,
      onChange: (selectedRowKeys) => {
        this.handleChangeSelectedId(selectedRowKeys);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
        getCheckboxProps: record => ({
          defaultChecked:true,
        }),
  }
    ;
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1200,maxHeight:900}}
          // cancelText="关闭"
          // okText="提交"
          title="商品上架审核"

          visible={visible.changeVisible}
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
        <AuditFailureNew
        />
      </div>
    );
  }
}

@connect(({goodsManagementNew,  loading }) => ({
  goodsManagementNew,
  loading: loading.effects['goodsManagementNew/getGoodsOnAuditList'],
}))
@Form.create()

class AuditFailureNew extends React.Component {

  handleOk = (e) => {
    const { goodsManagementNew:{goodsOnAudit:{goodsDetails}}} = this.props;

    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, fieldsValue)=>{
      if(!err){
        this.props.dispatch({
          type:'goodsManagementNew/onAudit',
          payload:{
            userId:userId,
            visibleType: 'auditFailureVisible',
            ...fieldsValue,
            logId:goodsDetails.logId,
          },
          callback:function () {
            that.props.form.resetFields();
          }
        })
      }
    })
  }

  handleCancel = (e) => {
    this.props.dispatch({
      type: 'goodsManagementNew/changeVisible',
      payload: {
        visibleType: 'auditFailureVisible',
        visibleValue: false
      }
    });
    this.props.form.resetFields();
    this.props.parent.handleClear();
  }

  render() {
    const { goodsManagementNew:{goodsOnAudit:{goodsDetails, visible, selectedId}}} = this.props;
    const getTotalLength = goodsDetails.warehouseGoodsList.length
    const getselectedIdLength = selectedId.length;
    const auditFailureNum = getTotalLength - getselectedIdLength;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:600}}
          title="审核失败原因"
          visible={visible.auditFailureVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="1" onClick={this.handleCancel}>关闭</Button>,
            <Button key="3" type="primary" onClick={this.handleOk}>确定</Button>
          ]}
        >
          <div >
            <Form onSubmit={this.handleOk} layout="inline" style={{width:'100%'}}>
              <p style={{marginLeft:10,fontSize:16}}>您有 {auditFailureNum} 款产品未通过审核，请输入审核失败的原因</p>
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








@connect(({goodsManagementNew,  loading }) => ({
  goodsManagementNew,
  loading: loading.effects['goodsManagementNew/getGoodsOnAuditList'],
}))
// 查看详情
@Form.create()
export class CheckGoodsOnAuditModalNew extends Component {
  handleCancel=()=>{
    this.props.dispatch({
      type: 'goodsManagementNew/changeVisible',
      payload: {
        visibleType: 'checkVisible',
        visibleValue: false
      }
    });
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
    const { goodsManagementNew:{goodsOnAudit:{goodsDetails, visible} }} = this.props;

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

          visible={visible.checkVisible}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <div>
              <span>供应商：{goodsDetails.username}</span>
              <Button style={{ marginLeft: 50 }} type="primary" onClick={()=>this.downloadGoodsMes(goodsDetails.goodsUrl)}>
                下载新上架的商品基础信息
              </Button>
              <Button style={{ marginLeft: 20 }} type="primary" onClick={()=>this.downloadGoodsZip(goodsDetails.goodsImgUrl)}>
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
