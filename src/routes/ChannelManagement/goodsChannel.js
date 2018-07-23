import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './goodsChannel.less';
import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};
@connect(({channelManagement,  loading }) => ({
  channelManagement,
  loading: loading.effects['channelManagement/getGoodsChannelTable'],
}))

@Form.create()
export default class costChannel extends Component {
  state={
    visible:true,
    formValues:{},
  }
  init(){
    this.props.dispatch({
      type: 'channelManagement/getGoodsChannelTable',
      payload: {
        purchase:userId
      },
    });
  }
  componentDidMount() {
    this.init();
  }




  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      purchase:userId,
      ...pagination,
    };

    this.props.dispatch({
      type: 'channelManagement/getGoodsChannelTable',
      payload: params,
    });
  }


  handleVisible = (flag) => {
    this.setState({
      visible:!!flag,
    });
  }
  handleChildEdit =(record)=>{
    this.props.dispatch({
      type: 'channelManagement/getChannelType',
      payload: {},
    });
    this.props.dispatch({
      type: 'channelManagement/editCostChannel',
      payload: {...record},
    });
    setTimeout(()=>{
      this.handleVisible(true);
    },0)
  }

  render() {
    const { channelManagement:{goodsChannel:{tableData},channelTypeArr} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...tableData.pagination,
    }
    const columns = [
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        fixed: 'left',
        width: 100,
      }, {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
        fixed: 'left',
        width: 90,
      // }, {
      //   title: '商品图片',
      //   dataIndex: 'slt',
      //   key: 'slt',
      //   render: (val) => (
      //     <img src={ val} alt="" width={80} style={{float:'left',marginRight:8}}/>
      //   )
      }, {
        title: '采购类型',
        dataIndex: 'platformType',
        key: 'platformType',
        fixed: 'left',
        width: 90,
      }, {
        title: '采购商',
        dataIndex: 'purchase',
        key: 'purchase',
        fixed: 'left',
        width: 90,
      }, {
        title: '采购单价',
        dataIndex: 'pprice',
        key: 'pprice',
        width: 90,
        render:val=>val?'¥'+val:''
      }, {
        title: '采购数量',
        dataIndex: 'pNum',
        key: 'pNum',
        width: 90,
      }, {
        title: '默认供应商',
        dataIndex: 'suppliername',
        key: 'suppliername',
        width: 90,
      }, {
        title: '利润分成百分比（平台）',
        dataIndex: 'profitPlatform',
        key: 'profitPlatform',
        width: 90,
        render:val=>val+'%'
      }, {
        title: '利润分成百分比（代理）',
        dataIndex: 'profitAgent',
        key: 'profitAgent',
        width: 90,
        render:val=>val+'%'
      }, {
        title: '利润分成百分比(分销商)',
        dataIndex: 'profitDealer',
        key: 'profitDealer',
        width: 90,
        render:val=>val+'%'
      }, {
        title: '利润分成百分比(其他1)',
        dataIndex: 'profitOther1',
        key: 'profitOther1',
        width: 90,
        render:val=>val+'%'
      }, {
        title: '利润分成百分比(其他2)',
        dataIndex: 'profitOther2',
        key: 'profitOther2',
        width: 90,
        render:val=>val+'%'
      }, {
        title: '利润分成百分比(其他3)',
        dataIndex: 'profitOther3',
        key: 'profitOther3',
        width: 90,
        render:val=>val+'%'
      }, {
        title: '其他1',
        dataIndex: 'profitOther1Name',
        key: 'profitOther1Name',
        width: 90,
      }, {
        title: '其他2',
        dataIndex: 'profitOther2Name',
        key: 'profitOther2Name',
        render:val=>val?val:'',
        width: 90,
      }, {
        title: '其他3',
        dataIndex: 'profitOther3Name',
        key: 'profitOther3Name',
        render:val=>val?val:'',
        width: 90,
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        fixed: 'right',
        width: 90,
        render: (val,record) =>
          <div>
            <a href="javascript:;" onClick={()=>this.handleChildEdit(record)}>编辑</a><br/>
          </div>
      }
    ];
    const {visible} = this.state;

    const Parent  = {
      visible:visible,
      handleVisible : this.handleVisible,
      channelTypeArr:channelTypeArr,
    };

    return (
      <div>
        <Card className={styles.mT10}>
          <Button type="primary" ghost onClick={this.downloadStoreTemp}>下载商品渠道模板</Button>
          <Button style={{marginLeft:8}} type="primary" ghost onClick={this.onStartUpload}>上传商品渠道信息</Button>
          <Table
            scroll={{ x: 1600 }}
            dataSource={tableData.list}
            rowKey={record => record.id}
            columns={columns}
            pagination={paginationProps}
            onChange={this.handleTableChange}
            // loading={submitting}
          />
        </Card>
        <ChildEdit
          parent = {Parent}
        />
      </div>
    );
  }
}

@connect(({ channelManagement, loading }) => ({
  channelManagement,
  // loading: loading.effects['goods/'],
}))
@Form.create()

class ChildEdit extends React.Component {

  handleOk = (e) => {
    const {channelManagement:{costChannel:{childEdit},channelTypeArr}} = this.props
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, fieldsValue)=>{
      console.log('fieldsValue',fieldsValue)
      if(!err){
        this.props.dispatch({
          type:'channelManagement/saveCostChannel',
          payload:{
            ...fieldsValue,
            userId:userId,
            id:childEdit.id
          },
          callback:function () {
            that.props.parent.handleVisible(false)
            that.props.form.resetFields();
          }
        })
      }
    })
  }

  handleCancel = (e) => {
    this.props.parent.handleVisible(false,'childDelivery')
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {channelManagement:{costChannel:{childEdit},channelTypeArr}} = this.props
    // console.log(this.props)
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1000}}
          title="发货"
          visible={this.props.parent.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="1" onClick={this.handleCancel}>关闭</Button>,
            <Button key="3" type="primary" onClick={this.handleOk}>确定</Button>
          ]}
        >
          <div className={styles.tableListForm}>
            <Form onSubmit={this.handleOk} layout="inline">
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="商品条码"
                  >
                    {getFieldDecorator('aaa', {
                      initialValue: childEdit.username,
                      rules: [{ required: true, message: '请输入渠道商' }],
                    })(
                      <div>aaaa</div>
                    )}
                  </FormItem>
                </Col>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="商品名称"
                  >
                    {getFieldDecorator('VVV',{
                      initialValue: childEdit.platformType,
                      rules: [{ required: true, message: '请选择渠道商类型' }],
                    })(
                      <div>BBBB</div>
                    )}
                  </FormItem>
                </Col>

              </Row>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="渠道商"
                  >
                    {getFieldDecorator('username', {
                      initialValue: childEdit.username,
                      rules: [{ required: true, message: '请输入渠道商' }],
                    })(
                      <Input placeholder="请输入渠道商"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="渠道商类型"
                  >
                    {getFieldDecorator('platformType',{
                      initialValue: childEdit.platformType,
                      rules: [{ required: true, message: '请选择渠道商类型' }],
                    })(
                      <Select
                        placeholder="请选择渠道商"
                        // onChange={this.handleSelectChange}
                      >
                        {channelTypeArr.map(val => <Option key={val.platformId} value={val.platformId} label={val.platformType}>{val.platformType}</Option>)}

                      </Select>
                    )}
                  </FormItem>
                </Col>

              </Row>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="渠道商价格类型"
                  >
                    {getFieldDecorator('priceType', {
                      initialValue: ['','按订单售价计算','按供货价计算'][childEdit.priceType],
                      rules: [{ required: true, message: '请选择渠道商价格类型' }],
                    })(
                      <Select
                        placeholder="请选择渠道商价格类型"
                        // onChange={this.handleSelectChange}
                      >
                        <Option value="1">按订单售价计算</Option>
                        <Option value="2">按供货价计算</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="提点类型"
                  >
                    {getFieldDecorator('platformCostType',{
                      initialValue: ['','进价基础计算','售价基础计算'][childEdit.platformCostType],
                      rules: [{ required: true, message: '请选择提点类型' }],
                    })(
                      <Select
                        placeholder="请选择提点类型"
                        // onChange={this.handleSelectChange}
                      >
                        <Option value="1">进价基础计算</Option>
                        <Option value="2">售价基础计算</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="平台提点（%）"
                  >
                    {getFieldDecorator('platformCost', {
                      initialValue: childEdit.platformCost,
                      rules: [{ required: true, message: '请输入平台提点（%）' }],
                    })(
                      <Input placeholder="请输入平台提点（%）"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={11} >

                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}
