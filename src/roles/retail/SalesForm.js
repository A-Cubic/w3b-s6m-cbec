import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Mention ,Radio,InputNumber,message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import ChannelOrderCheckModal from './channelOrderCheckModal';
import styles from './SalesForm.less';
import moment from 'moment';
import {getHeader, getToken} from "../../utils/Global";
import { getUploadUrl } from "../../services/api"
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const { toString, toContentState } = Mention;
@connect(({orderManagement,publicDictionary,roleRetaiBusManagement,  loading }) => ({
  orderManagement,publicDictionary,roleRetaiBusManagement,
  loading: loading.effects['orderManagement/supplierOrderTable'],
}))

@Form.create()
export default class SalesForm extends Component {
  state={
    fileList:[],
    visibleChildCheck:false,
    visibleChildDelivery:false,
    orderId:'',
    visible: false,
    formValues:{},
    warehouseId:'',
    num:''
  }
  init(){
    this.props.dispatch({
      type: 'publicDictionary/getWareHouse',
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
          wid:this.state.warehouseId
        }
      })
    }
  }
  downloadTemplate=()=>{
    window.location.href='http://llwell-b2b.oss-cn-beijing.aliyuncs.com/templet/order.xlsx'
  }
  // 导入
  handleUploadChange=(info)=>{
    if(info.file.status === 'done') {
      this.props.dispatch({
        type: 'orderManagement/uploadOrderbill',
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
    this.init();
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
        'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
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
  exportWaybill=(e)=>{
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
        'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'orderManagement/exportWaybill',
        payload: {
          userId:userId,
          ...values,
          ...tableData.pagination
        },
      });
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
  //申请退款
  handlereFund = (record) => {
    const { orderManagement:{supplierOrder:{tableData}} } = this.props;
    this.props.dispatch({
      type: 'roleRetaiBusManagement/handleOpenRefundR',
      payload: {
        num:record.merchantOrderId
      },
    });
    this.props.dispatch({
      type:'roleRetaiBusManagement/handleNumR',
      payload: {
        num:record.merchantOrderId,
        amountOfMoney:record.tradeAmount,
        totalSum:tableData.item.accountBalance
      }
    });
  
  }



  //付款新接口
  handlePayment = (record) => {
    const { orderManagement:{supplierOrder:{tableData}} } = this.props;
    this.props.dispatch({
      type:'roleRetaiBusManagement/handleFormPopupR',
      
    });

    this.props.dispatch({
      type:'roleRetaiBusManagement/handleNumR',
      payload: {
        num:record.merchantOrderId,
        amountOfMoney:record.tradeAmount,
        totalSum:tableData.item.accountBalance
      }
    });

    // this.setState({
    //   num:record.merchantOrderId
    // })

  }

  callbackType = (params) => {
    if(params.type==1){
     // console.log('go')
      this.init()
    }
  } 


  handleChildrenDelivery=(record)=>{
    this.setState({
      orderId:record.merchantOrderId
    })
    const { orderManagement:{supplierOrder:{tableData}} } = this.props;
    this.handleVisible(true,'childDelivery');
    //快递选择
    this.props.dispatch({
      type:'publicDictionary/getExpress',
      payload:{}
    })
  }
  //弹窗
  handlePopup (){
    //console.log(7777)
    this.props.dispatch({
      type:'roleRetaiBusManagement/handleFormPopupR',
      
    });
  }

  //填写运单点击
  handleWaybill = (record) => {
    //console.log(777)
    this.props.dispatch({
      type:'roleRetaiBusManagement/handleOpenWaybillR',
      
    });
    this.props.dispatch({
      type:'publicDictionary/getExpress',
      payload:{}
    })
    
    this.props.dispatch({
      type:'roleRetaiBusManagement/handleNumR',
      payload: {
        num:record.merchantOrderId,
        
      }
    });

    //快递获取
    this.props.dispatch({
      type:'roleRetaiBusManagement/getReGoodsFundIdMessage',
      payload: {
        parentOrderId:record.merchantOrderId,
        
      }
    });

  }




  renderAdvancedForm(){
    //const { roleRetaiBusManagement:{SalesForm} } = this.props;

    const { orderManagement:{supplierOrder:{tableData,num}} } = this.props;
  // console.log('num',num)
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
                  <Option value="0">未支付</Option>
                  {/* <Option value="1">新订单</Option> */}
                  <Option value="1">已付款</Option>
                  <Option value="2">等待发货</Option>
                  <Option value="3">已发货</Option>
                  <Option value="4">等待签收</Option>
                  <Option value="5">已完成</Option>
                  {/* <Option value="6">待处理</Option> */}
                  <Option value="6">申请退款</Option>
                  <Option value="7">同意退货</Option>
                  <Option value="-1">已关闭</Option>
                  {/*<Option value="待付款">待付款</Option>*/}
                  {/*<Option value="待发货">待发货</Option>*/}
                  {/*<Option value="已发货">已发货</Option>*/}
                  {/*<Option value="已完成">已完成</Option>*/}
                  {/*<Option value="已关闭">已关闭</Option>*/}
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
          <Col md={16} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <Button  style={{marginLeft:8}} onClick={this.exportWaybill}>
              <Icon type="cloud-download-o" />导出运单信息
            </Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            {/* <span onClick={this.handlePopup.bind(this)}>弹窗</span> */}
            <span style={{color:'red',fontSize:'18px'}}>账号余额：¥{tableData.item?tableData.item.accountBalance :0}</span>
          </div>
        </div>
      </Form>
    );
  }
  render() {
    
    const { publicDictionary:{purchaseArr,channelTypeArr,supplierArr,wareHouseArr,expressArr} }= this.props;
    const { orderManagement:{supplierOrder:{tableData}} } = this.props;
    //console.log('8888',tableData.item.accountBalance)
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...tableData.pagination,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
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
        {
          // return(
          //   <div>
          //     <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
          //     {record.status=='未支付'?<a  href="javascript:;" onClick={()=>this.handlePayment(record)}>付款</a>:<span></span>}
          //   </div>
          // )
          switch (record.status) {
            case '未支付':
              return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
                {record.status=='未支付'?<a  href="javascript:;" onClick={()=>this.handlePayment(record)}>付款</a>:<span></span>}
                
              </div>
              )
              break;
              case '已关闭':
              return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
                {/* <a href="javascript:;" onClick={()=>this.handlereFund(record)}>申请退款</a><br/> */}
              </div>
              )
              break;
              case '已付款':
              return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
                <a href="javascript:;" onClick={()=>this.handlereFund(record)}>申请退款</a><br/>
              </div>
              )
              break;
              case '等待发货':
              return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
                <a href="javascript:;" onClick={()=>this.handlereFund(record)}>申请退款</a><br/>
              </div>
              )
              break;
              case '已发货':
              return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
                <a href="javascript:;" onClick={()=>this.handlereFund(record)}>申请退款</a><br/>
              </div>
              )
              break;
              case '等待签收':
              return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
                <a href="javascript:;" onClick={()=>this.handlereFund(record)}>申请退款</a><br/>
              </div>
              )
              break;  
              case '已完成':
              return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
                <a href="javascript:;" onClick={()=>this.handlereFund(record)}>申请退款</a><br/>                
              </div>
              )
              break;  
              case '申请退货':
              return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
                
              </div>
              )
              break;    
              case '同意退货':
              return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
                <a href="javascript:;" onClick={()=>this.handleWaybill(record)}>填写运单</a><br/>
              </div>
              )
              break;    
              case '同意退款':
              return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
                
              </div>
              )
              break;  
            default:
              break;
          }
        }

          // <div>
          //   <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/>
          //   {record.status=='未支付'?<a  href="javascript:;" onClick={()=>this.handlePayment(record)}>付款</a>:<span></span>}
          // </div>
          
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
          <div style={{display: 'inline-flex'}}>

            <Button style={{ marginLeft: 8 }} type="primary" onClick={this.downloadTemplate}>
              <Icon type="download" />下载订单模板
            </Button>
            <Upload {...props} >
              <Button style={{ marginLeft: 8 }}>
                <Icon type="cloud-upload-o" /> 导入订单信息
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
        <ChannelOrderCheckModal
          parent = {parent}
        />
        <StoresSalesSee />
        <Refund />
        <CompleteReturn 
          parent = {ChildrenDeliveryParent}
        />
      </div>
    );
  }
}


//付款弹窗
@connect(({orderManagement,roleOperationDistribution,roleRetaiBusManagement }) => ({
  orderManagement,roleOperationDistribution,roleRetaiBusManagement
}))
@Form.create()
class StoresSalesSee  extends Component {

  handleCancel = () => {
    // this.props.dispatch({
    //   type:'roleOperationDistribution/storesSalesCloseR',
    //   payload:false
    // })

    //this.props.form.resetFields();
    this.props.dispatch({
      type:'roleRetaiBusManagement/getPopupFormColoseR',
      
    });
    
  }
  handleOk = (e) => {
  
    const { roleRetaiBusManagement:{SalesForm:{num}} } = this.props;
   
    this.props.dispatch({
      type: 'roleRetaiBusManagement/getPayOrder',
      payload: {
        parentOrderId:num,
      },
      callback: this.callbackType,
    });
    this.props.dispatch({
      type:'roleRetaiBusManagement/getPopupFormColoseR',
      
    });
  }

  callbackType = (params) => {
    if(params.type==1){
      //this.init()
      this.props.dispatch({
        type: 'publicDictionary/getWareHouse',
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
  } 
  render(){
    const { roleRetaiBusManagement:{SalesForm,SalesForm:{totalSum,amountOfMoney,num,childDetailsModelVisible,img}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    //console.log('ffff',num)
    return(
      <div>
        <Modal
          visible= {childDetailsModelVisible}
          onCancel={this.handleCancel}
          width={'55%'}
          onOk={this.handleOk}
          style={{padding:'20px'}}
        >
          <div style={{marginTop:'20px',display:'flex',justifyContent:'center',fontSize:'18px'}}>
            <span>账户金额：<span style={{color:'red'}}>¥{totalSum}</span></span>
            <span style={{margin:'0 20px'}}>付款金额：<span style={{color:'red'}}>¥{amountOfMoney}</span></span>
            <span>账户余额：<span style={{color:'red'}}>¥{totalSum - amountOfMoney}</span></span>
          </div>
          <div style={{textAlign:'center',clear:'both',margin:'25px 0 25px 0',fontSize:'20px'}}>请确认付款</div>        
        </Modal>
      </div>
    )
  }
}

//退款弹窗
@connect(({orderManagement,roleOperationDistribution,roleRetaiBusManagement }) => ({
  orderManagement,roleOperationDistribution,roleRetaiBusManagement
}))
@Form.create()
class Refund  extends Component {

  handleCancelRefund = () => {
    // this.props.dispatch({
    //   type:'roleOperationDistribution/storesSalesCloseR',
    //   payload:false
    // })

    this.props.form.resetFields();
    this.props.dispatch({
      type:'roleRetaiBusManagement/handleCloseRefundR',
      
    });
    
  }
  //
  handleOkRefund = (e) => {
    const { roleRetaiBusManagement:{SalesForm,SalesForm:{totalSum,amountOfMoney,num,refund,img}} } = this.props;
    const _that = this
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue)=>{
      if(!err){
          _that.props.dispatch({
            type:'roleRetaiBusManagement/getReGoodsApply',
            payload:{
              ...fieldsValue,
              parentOrderId:num    
            },
            callback: _that.callbackTypea,
          });
      }
    })

  }

  callbackTypea = (params) => {
    if(params.type==1){
      //this.init()
      this.props.dispatch({
        type: 'publicDictionary/getWareHouse',
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
      this.props.dispatch({
        type: 'roleRetaiBusManagement/handleCloseRefundR',
        payload: {
        },
      });
      this.props.form.resetFields();
    }
  } 
  render(){
    const { roleRetaiBusManagement:{SalesForm,SalesForm:{totalSum,amountOfMoney,num,refund,img}} } = this.props;
    //const { orderManagement:{supplierOrder:{tableData,num}} } = this.props;
    //console.log('refund',refund) className={styles.tableListForm}
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Modal
          visible= {refund}
          onCancel={this.handleCancelRefund}
          width={'35%'}
          onOk={this.handleOkRefund}
          style={{padding:'20px'}}
        >
          {/* <div style={{marginTop:'20px',display:'flex',justifyContent:'center',fontSize:'18px'}}> */}
          <div className={styles.tableListForm}>
            <Form onSubmit={this.handleOk} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={24} sm={24} >
                  <div  style={{width:'100%',margin:'30px auto 0px auto',fontSize:'18px'}}>
                    <FormItem label="退货原因：">
                      {getFieldDecorator('refundRemark',{
                        rules:[{
                          required:true,message:'输入退款原因',
                        }]
                      })(
                    
                        <TextArea 
                          rows={4} 
                          // style={{width:'100%'}}
                        />


                      )}
                    </FormItem>
                
                  </div>
                </Col>
              </Row>
            </Form>
          </div>        
        </Modal>
      </div>
    )
  }
}



// 填写运单
@connect(({orderManagement,publicDictionary,  loading,roleRetaiBusManagement }) => ({
  orderManagement,publicDictionary,roleRetaiBusManagement,
  loading: loading.effects['orderManagement/supplierOrderTable'],
}))
@Form.create()
class CompleteReturn extends React.Component {

  handleOk = (e) => {
   // const { orderManagement:{supplierOrder:{completeReturn,orderId}} } = this.props;
    const { roleRetaiBusManagement:{SalesForm:{waybill,num}} } = this.props;
    //console.log('orderId',orderId)
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, fieldsValue)=>{
      if(!err){
        this.props.parent.dispatch({
          type:'roleRetaiBusManagement/getReGoodsFundId',
          payload:{
            ...fieldsValue,
            parentOrderId:num
          },
          callback: this.callbackType,
        })
      }
    })
  }

  callbackType = (params) => {
    if(params.type==1){
      //this.init()
    
      this.props.dispatch({
        type:'roleRetaiBusManagement/handleColoseWaybillR',
      });
      this.props.dispatch({
        type: 'orderManagement/supplierOrderTable',
        payload: {
          //userId:userId,
          status:"全部"
        },
      });
      this.props.form.resetFields();
    }
  } 

  handleCancel = (e) => {
    // this.props.parent.handleVisible(false,'childDelivery')
    this.props.dispatch({
      type:'roleRetaiBusManagement/handleColoseWaybillR',
      payload:{
        // id:record.merchantOrderId
      }
    })

    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { orderManagement:{supplierOrder:{completeReturn,orderId}} } = this.props;
    const { roleRetaiBusManagement:{SalesForm:{waybill,num,reGoodsFundIdMessage}} } = this.props;
    //console.log('reGoodsFundIdMessage.refundId',reGoodsFundIdMessage.refundId)
    return (
      <div>
        <Modal
          title="填写运单"
          visible={waybill}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="1" onClick={this.handleCancel}>关闭</Button>,
            <Button key="3" type="primary" onClick={this.handleOk}>确定</Button>
          ]}
        >
        <div className={styles.tableListForm}>
          <Form onSubmit={this.handleOk} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={24} sm={24}>
                <FormItem label="运单号">
                  {getFieldDecorator('refundId',{
                    initialValue:reGoodsFundIdMessage.type==0?'':reGoodsFundIdMessage.refundId,
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
                {getFieldDecorator('refundExpressId',{
                  initialValue:reGoodsFundIdMessage.type==0?'':reGoodsFundIdMessage.expressName,
                  rules: [{ required: true, message: '请选择快递：' }],
                  })(
                    <Select
                    placeholder="请选择"
                    optionFilterProp="label"
                    // onChange={this.onSelectChange}
                  >
                    {this.props.parent.expressArr.map(val => <Option key={val.expressId} value={val.expressName} label={val.expressName}>{val.expressName}</Option>)}
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

