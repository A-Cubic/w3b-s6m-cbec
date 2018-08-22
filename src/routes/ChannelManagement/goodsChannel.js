import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './goodsChannel.less';
import moment from 'moment';
import {getHeader, getToken} from "../../utils/Global";
import {getUploadUrl} from "../../services/api";
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
@connect(({channelManagement,publicDictionary,  loading }) => ({
  channelManagement,publicDictionary,
  loading: loading.effects['channelManagement/getGoodsChannelTable'],
}))

@Form.create()
export default class costChannel extends Component {
  state={
    visible:false,
    formValues:{},
  }
  init(){
    this.props.dispatch({
      type: 'channelManagement/getGoodsChannelTable',
      payload: {
        // purchase:userId
      },
    });
  }
  componentDidMount() {
    this.init();
  }

  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      // purchase:userId,
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
      type: 'publicDictionary/getSupplier',
      payload: {
        userId:userId
      },
    });
    this.props.dispatch({
      type: 'channelManagement/editGoodsChannel',
      payload: {...record},
    });
    setTimeout(()=>{
      this.handleVisible(true);
    },0)
  }
  handleUploadChange=(info)=>{
    if(info.file.status === 'done') {
      this.props.dispatch({
        type: 'channelManagement/uploadOrderbill',
        payload: {
          userId:userId,
          fileTemp: info.file.response.fileName[0]
        },
        callback: this.onUploadCallback,

      });
    }
  }
  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.type==="1"){
      message.success("上传成功");
      this.init();
    }else{
      message.error(msg);
    }
  }
  downloadGoodsTemp=()=>{
    window.location.href='http://ecc-product.oss-cn-beijing.aliyuncs.com/templet/DistributorGoods.xlsx'
  }
  render() {
    const { publicDictionary:{purchaseArr,channelTypeArr,supplierArr} }= this.props;

    const { channelManagement:{goodsChannel:{tableData}} } = this.props;
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
        width: 200,
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
      supplierArr: supplierArr,
    };
    const props = {
      action: getUploadUrl(),
      headers: getHeader(),
      showUploadList: false,
      // listType: 'picture',
      // data:{
      //   userId:userId
      // },
      // accept:'image/*',
      onChange: this.handleUploadChange,
      multiple: false,
      // customRequest:this.upload,
    };
    return (
      <div>
        <Card className={styles.mT10}>
          <Button type="primary" ghost onClick={this.downloadGoodsTemp}>下载商品渠道模板</Button>
          {/*<Button style={{marginLeft:8}} type="primary" ghost onClick={this.onStartUpload}>上传商品渠道信息</Button>*/}

          <Upload {...props} >
            <Button style={{ marginLeft: 8 }}>
              <Icon type="cloud-upload-o" /> 上传商品渠道信息
            </Button>
          </Upload>

          <Table
            scroll={{ x: 1300 }}
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

@connect(({ channelManagement,publicDictionary, loading }) => ({
  channelManagement,publicDictionary,
  // loading: loading.effects['goods/'],
}))
@Form.create()

class ChildEdit extends React.Component {

  handleOk = (e) => {
    const {channelManagement:{goodsChannel:{childEdit},channelTypeArr}} = this.props
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, fieldsValue)=>{
      // console.log('fieldsValue',fieldsValue)
      if(!err){
        this.props.dispatch({
          type:'channelManagement/saveGoodsChannel',
          payload:{
            ...fieldsValue,
            userId:userId,
            id:childEdit.id
          },
          callback:function () {
            that.props.parent.handleVisible(false)
            that.props.form.resetFields();
            that.props.dispatch({
              type: 'channelManagement/getGoodsChannelTable',
              payload: {},
            });
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
    const { publicDictionary:{purchaseArr,channelTypeArr,supplierArr} }= this.props;
    const {channelManagement:{goodsChannel:{childEdit}}} = this.props;
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1000}}
          title="商品渠道信息"
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
                <Col span={23} >
                  <FormItem
                    {...formItemLayout}
                    label="商品名称"
                  >
                    <div>{childEdit.goodsName}</div>
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="商品条码"
                  >
                      <div>{childEdit.barcode}</div>
                  </FormItem>
                </Col>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="采购类型"
                  >
                    <div>{childEdit.platformType}</div>
                  </FormItem>
                </Col>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="采购商"
                  >
                      <div>{childEdit.purchase}</div>
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="采购单价（¥）"
                  >
                    {getFieldDecorator('pprice', {
                      initialValue: childEdit.pprice,
                      rules: [{ required: true, message: '请输入采购单价' }],
                    })(
                      <Input placeholder="请输入采购单价"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="采购数量（SKU）"
                  >
                    {getFieldDecorator('pNum', {
                      initialValue: childEdit.pNum,
                      rules: [{ required: true, message: '请输入采购数量' }],
                    })(
                      <Input placeholder="请输入采购数量"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="默认供应商"
                  >
                    {getFieldDecorator('supplierId',{
                      initialValue: childEdit.supplierId,
                      rules: [{ required: true, message: '请选择默认供应商' }],
                    })(
                      <Select
                        placeholder="请选择默认供应商"
                        // onChange={this.handleSelectChange}
                      >
                        {supplierArr.map(val => <Option key={val.supplierId} value={val.supplierId} label={val.supplier}>{val.supplier}</Option>)}

                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="利润分成-平台（%）"
                  >
                    {getFieldDecorator('profitPlatform', {
                      initialValue: childEdit.profitPlatform,
                      rules: [{ required: true, message: '请输入' }],
                    })(
                      <Input placeholder="请输入"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="利润分成-代理（%）"
                  >
                    {getFieldDecorator('profitAgent', {
                      initialValue: childEdit.profitAgent,
                    })(
                      <Input placeholder="请输入"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="利润分成-分销商（%）"
                  >
                    {getFieldDecorator('profitDealer',{
                      initialValue: childEdit.profitDealer,
                    })(
                      <Input placeholder="请输入"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="利润分成-其他1（%）"
                  >
                    {getFieldDecorator('profitOther1', {
                      initialValue: childEdit.profitOther1,
                    })(
                      <Input placeholder="请输入"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="利润分成-其他2（%）"
                  >
                    {getFieldDecorator('profitOther2', {
                      initialValue: childEdit.profitOther2,
                    })(
                      <Input placeholder="请输入"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="利润分成-其他3（%）"
                  >
                    {getFieldDecorator('profitOther3',{
                      initialValue: childEdit.profitOther3,
                    })(
                      <Input placeholder="请输入"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="利润分成-其他1"
                  >
                    {getFieldDecorator('profitOther1Name', {
                      initialValue: childEdit.profitOther1Name,
                    })(
                      <Input placeholder="请输入"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="利润分成-其他2"
                  >
                    {getFieldDecorator('profitOther2Name', {
                      initialValue: childEdit.profitOther2Name,
                    })(
                      <Input placeholder="请输入"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={7} >
                  <FormItem
                    {...formItemLayout}
                    label="利润分成-其他3"
                  >
                    {getFieldDecorator('profitOther3Name',{
                      initialValue: childEdit.profitOther3Name,
                    })(
                      <Input placeholder="请输入"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}
