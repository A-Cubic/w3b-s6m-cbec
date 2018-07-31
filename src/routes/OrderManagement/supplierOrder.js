import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import ModalSupplierOrderCheck from './ModalSupplierOrderCheck';
import styles from './supplierOrder.less';
import moment from 'moment';
import {getHeader, getToken} from "../../utils/Global";
import { getUploadUrl } from "../../services/api"
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(({orderManagement,  loading }) => ({
  orderManagement,
  loading: loading.effects['orderManagement/supplierOrderTable'],
}))

@Form.create()
export default class supplierOrder extends Component {
  state={
    fileList:[],
    visibleChildCheck:false,
    visibleChildDelivery:false,
    orderId:'',
    visible: false,
    formValues:{},
    warehouseId:'',
  }
  init(){
    this.props.dispatch({
      type: 'orderManagement/getWareHouse',
      payload: {
        userId:userId,
      },
    });
    this.props.dispatch({
      type: 'orderManagement/supplierOrderTable',
      payload: {
        userId:userId,
        status:"全部"
      },
    });
  }
  componentDidMount() {
    this.init();
  }
  //按钮层
  onSelectChangeWarehouse=(val)=>{
    this.setState({
      warehouseId:val
    },()=>{
      // console.log(this.state.warehouseId)
    })
  }
  downloadToSendOrder=()=>{
    if(this.state.warehouseId!==''){
      this.props.dispatch({
        type:'orderManagement/downloadToSendOrder',
        payload:{
          userId:userId,
          wid:this.state.warehouseId
        }
      })
    }else{
      message.error('请选择仓库')
    }
  }
  //下载运单模板
  downloadTemplate=()=>{
    window.location.href='http://ecc-product.oss-cn-beijing.aliyuncs.com/templet/Waybill.xlsx'
  }
  // 导入
  handleUploadChange=(info)=>{
    if(info.file.status === 'done') {
      this.props.dispatch({
        type: 'orderManagement/uploadWaybill',
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
    if(params.type==="0"){
      message.error(msg);
    }else {
      message.success("上传成功");
    }
  }
  //列表
  onSearch=(e)=>{
    e.preventDefault();
    const {orderManagement:{supplierOrder:{tableData}}}=this.props
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)

      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        'date': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'orderManagement/supplierOrderTable',
        payload: {
          userId:userId,
          ...values,
          ...tableData.pagination
        },
      });
    });


  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.init();
  }
  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      ...this.state.formValues,
      ...pagination,
      userId:userId
    };

    this.props.dispatch({
      type: 'orderManagement/supplierOrderTable',
      payload: params,
    });
  }


  handleVisible = (flag,who) => {
    if(who=='childCheck'){
      this.setState({
        visibleChildCheck:!!flag,
      });
    }else if(who=='childDelivery'){
      this.setState({
        visibleChildDelivery:!!flag,
      });
    }
  }
  handleChildrenCheck =(record)=>{
    this.props.dispatch({
      type: 'orderManagement/supplierOrderChildCheck',
      payload: {
        orderId:record.merchantOrderId,
      },
    });
    setTimeout(()=>{
      this.handleVisible(true,'childCheck');
    },0)
  }
  handleChildrenDelivery=(record)=>{
    this.setState({
      orderId:record.merchantOrderId
    })
    const { orderManagement:{supplierOrder:{tableData},wareHouseData,expressArr} } = this.props;
    this.handleVisible(true,'childDelivery');
    //快递选择
    this.props.dispatch({
      type:'orderManagement/getExpress',
      payload:{}
    })
  }
  renderAdvancedForm(){
    const { orderManagement:{supplierOrder:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单状态">
              {getFieldDecorator('status',{
                initialValue:'全部'
              })(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="全部">全部</Option>
                  <Option value="待付款">待付款</Option>
                  <Option value="待发货">待发货</Option>
                  <Option value="已发货">已发货</Option>
                  <Option value="已完成">已完成</Option>
                  <Option value="已关闭">已关闭</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单编号">
              {getFieldDecorator('orderId')(
                <Input placeholder="请输入订单编号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="运单编号">
              {getFieldDecorator('waybillno')(
                <Input placeholder="请输入运单编号" />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="时段">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
          </Col>
          <Col md={8} sm={24}>
            <span style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </span>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <span style={{ float: 'right' }}>
            共查询出符合条件的数据：{tableData?tableData.pagination.total:0}
            {/*<Button  style={{marginLeft:18}}>*/}
              {/*<Icon type="cloud-download-o" />导出数据*/}
            {/*</Button>*/}
          </span>
        </div>
      </Form>
    );
  }
  render() {
    const { orderManagement:{supplierOrder:{tableData},wareHouseData,expressArr} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...tableData.pagination,
    }
    const columns = [
      {
      title: '订单日期',
      dataIndex: 'tradeTime',
      key: 'tradeTime',
    }, {
      title: '订单编号',
      dataIndex: 'merchantOrderId',
      key: 'merchantOrderId',
    }, {
      title: '订单总额',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
    }, {
      title: '运单编号',
      dataIndex: 'waybillno',
      key: 'waybillno',
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
    },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) =>
          <div>
            <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
            {record.ifSend=='1'?
            <a href="javascript:;" onClick={()=>this.handleChildrenDelivery(record)}>发货</a>:''}
          </div>
      }
    ];
    const {visibleChildCheck,visibleChildDelivery} = this.state;
    const parent  = {
      visible:visibleChildCheck,
      handleVisible : this.handleVisible,
    };
    const ChildrenDeliveryParent  = {
      visible:visibleChildDelivery,
      handleVisible : this.handleVisible,
      expressArr:expressArr,
      dispatch:this.props.dispatch,
      orderId:this.state.orderId
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
          <div >
            <Select style={{ width: 180 }}
                    placeholder="请选择仓库"
                    onChange={this.onSelectChangeWarehouse}>
              {wareHouseData.map(val => <Option key={val.wid} value={val.wid} label={val.wname}>{val.wname}</Option>)}
            </Select>
            <Button style={{ marginLeft: 8 }} onClick={this.downloadToSendOrder}>
              <Icon type="cloud-download-o" />导出需发货的订单
            </Button>
            <Button style={{ marginLeft: 8 }} type="primary" onClick={this.downloadTemplate}>
              <Icon type="download" />下载运单模板
            </Button>
            <Upload {...props} >
              <Button style={{ marginLeft: 8 }}>
                <Icon type="cloud-upload-o" /> 导入运单信息
              </Button>
            </Upload>


          </div>
          <Divider dashed />
          <div className={styles.tableListForm}>
            {this.renderAdvancedForm()}
          </div>
          <Table
            dataSource={tableData.list}
                 rowKey={record => record.id}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
        <ModalSupplierOrderCheck
          parent = {parent}
        />
        <ChildrenDelivery
          parent = {ChildrenDeliveryParent}
        />
      </div>
    );
  }
}

@connect(({orderManagement,  loading }) => ({
  orderManagement,
  loading: loading.effects['orderManagement/supplierOrderTable'],
}))
@Form.create()
class ChildrenDelivery extends React.Component {

  handleOk = (e) => {
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, fieldsValue)=>{
      if(!err){
        this.props.parent.dispatch({
          type:'orderManagement/confirmDelivery',
          payload:{
            userId:userId,
            orderId:this.props.parent.orderId
          },
          callback:function () {
            that.props.parent.handleVisible(false,'childDelivery')
            that.props.form.resetFields();
            that.props.dispatch({
              type: 'orderManagement/supplierOrderTable',
              payload: {
                userId:userId,
                status:"全部"
              },
            });
          }
        })
      }
    })
  }
  handleOverseas =(e)=>{
    e.preventDefault();
    const that = this;
    this.props.parent.dispatch({
      type:'orderManagement/shipmentOverseas',
      payload:{
        userId:userId,
        orderId:this.props.parent.orderId
      },
      callback:function () {
        that.props.parent.handleVisible(false,'childDelivery')
        that.props.form.resetFields();
        that.props.dispatch({
          type: 'orderManagement/supplierOrderTable',
          payload: {
            userId:userId,
            status:"全部"
          },
        });
      }
    })
  }
  handleCancel = (e) => {
    this.props.parent.handleVisible(false,'childDelivery')
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const {parent:{expressArr}} = this.props
    // console.log(this.props)
    return (
      <div>
        <Modal
          title="发货"
          visible={this.props.parent.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="1" onClick={this.handleCancel}>关闭</Button>,
            <Button key="2" type="primary" onClick={this.handleOverseas}>海外出货</Button>,
            <Button key="3" type="primary" onClick={this.handleOk}>确定</Button>
          ]}
        >
        <div className={styles.tableListForm}>
          <Form onSubmit={this.handleOk} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={24} sm={24}>
                <FormItem label="运单号">
                  {getFieldDecorator('waybillno',{
                    rules:[{
                      required:true,message:'请填写运单号',
                    }]
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
              <Col md={24} sm={24}>
            <FormItem label="快递公司">
              {getFieldDecorator('expressId')(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  {/*<Option value="重庆仓库">重庆仓库</Option>*/}
                  {/*<Option value="香港仓库">香港仓库</Option>*/}
                  {/*<Option value="青岛仓库">青岛仓库</Option>*/}
                  {this.props.parent.expressArr.map(val => <Option key={val.expressId} value={val.expressId} label={val.expressName}>{val.expressName}</Option>)}
                </Select>
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
