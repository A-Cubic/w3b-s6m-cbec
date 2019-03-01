import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker,Radio } from 'antd';
import SupplierOrderCheckModal from './supplierOrderCheckModal';
import styles from './supplierOrder.less';
import moment from 'moment';
import {getHeader, getToken} from "../../utils/Global";
import { getUploadUrl } from "../../services/api"
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(({orderManagement, publicDictionary, loading }) => ({
  orderManagement,publicDictionary,
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
    valueWhole:'全部',
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
    this.init();
  }
  //列表
  onSearch=(e)=>{
    e.preventDefault();
    const {orderManagement:{supplierOrder:{tableData}}}=this.props
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)
      // console.log('valuesdadadada',fieldsValue['date'])
     // console.log('val',this.state.valueWhole)
      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue!==undefined ? {
        ...fieldsValue,
        'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      }:{
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'orderManagement/supplierOrderTable',
        payload: {
          userId:userId,
          ...values,
          ...tableData.pagination,
          platformId:this.state.valueWhole
        },
      });
    });


  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.init();
    this.setState ({
      valueWhole:'全部'
    })
  }
  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      ...this.state.formValues,
      ...pagination,
      userId:userId,
      platformId:this.state.valueWhole
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
    const { orderManagement:{supplierOrder:{tableData},expressArr} } = this.props;
    this.handleVisible(true,'childDelivery');
    //快递选择
    this.props.dispatch({
      type:'publicDictionary/getExpress',
      payload:{}
    })
    //发货传参
    //console.log('record22',record)
    this.props.dispatch({
      type:'orderManagement/getgoodsData',
      payload:{
        merchantOrderId:record.merchantOrderId
      }
    })
  }

  onChangeAll = (e) => {
    const that = this
    //console.log('radio checked', e.target.value);
    this.setState({
      valueWhole: e.target.value,
    });
   // console.log('valueWhole',e.target.value)
    this.props.dispatch({
      type:'orderManagement/getgoodsData',
      payload:{
        platformId:e.target.value
      }
    })
    
  }

  renderAdvancedForm(){
    const { publicDictionary:{purchaseArr,channelTypeArr,supplierArr,wareHouseArr,expressArr} }= this.props;
    const { orderManagement:{supplierOrder:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{marginBottom:'0px',height:'36px'}}>
          <Col md={24} sm={24}>
            <FormItem label="">
              {getFieldDecorator('platformId')(
                <div>
                <Radio.Group defaultValue={'全部'} defaultValue={this.state.valueWhole}  onChange={this.onChangeAll} value={this.state.valueWhole}>
                  <Radio.Button onClick={this.handleAll} className={styles.all_title} style={{borderRadius:'5px'}} value={'全部'}>全部</Radio.Button>
                  <Radio.Button onClick={this.handleBatch} className={styles.all_title} style={{borderRadius:'5px'}} value="待发货">待发货({})</Radio.Button>
                  <Radio.Button onClick={this.handleOnePiece} className={styles.all_title} style={{borderRadius:'5px'}} value="已发货">已发货</Radio.Button>
                  
                </Radio.Group>
              </div>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            
            {/*  旧项目 去掉
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
                  <Option value="1">新订单</Option>
                  <Option value="2">等待发货</Option>
                  <Option value="3">已发货</Option>
                  <Option value="4">等待签收</Option>
                  <Option value="5">已完成</Option>
                  <Option value="6">待处理</Option>
                  <Option value="-1">已关闭</Option>
                </Select>
              )}
            </FormItem> */}
            <FormItem label="下单日期">
              {getFieldDecorator('date')(
                <RangePicker  style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} onChange={this.onChangeaa}/>
              )}
            </FormItem>

          </Col>
          <Col md={8} sm={24}>
            <FormItem label="发货日期">
              {getFieldDecorator('datea')(
                <RangePicker  style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} onChange={this.onChangeaa}/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            {/* <FormItem label="运单编号">
              {getFieldDecorator('waybillno')(
                <Input placeholder="请输入运单编号" />
              )}
            </FormItem> */}
            <FormItem label="订单编号">
              {getFieldDecorator('orderId')(
                <Input placeholder="请输入订单编号" />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <span style={{ float: 'left',marginBottom:'0px' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>    
          </Col>
          <Col md={8} sm={24}>
                
          </Col>
          <Col md={8} sm={24}>
           
          </Col>
        </Row>
        
        <Divider dashed />
        {/* <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span> 共查询出符合条件的数据：{tableData?tableData.pagination.total:0}， </span>
            <span>总订单额：¥{tableData.item?tableData.item.totalTradeAmount :0} </span>
          </div>
        </div> */}
      </Form>
    );
  }
  onChangeaa(){
    console.log('~~~~~~~~here')
  }
  render() {
    const { publicDictionary:{purchaseArr,channelTypeArr,supplierArr,wareHouseArr,expressArr} }= this.props;
    const { orderManagement:{supplierOrder:{tableData}} } = this.props;
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
      title: '订单额',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
    }, {
      title: '所在仓库',
      dataIndex: 'warehouseName',
      key: 'warehouseName',
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
          <div className={styles.tableListForm}>
            {this.renderAdvancedForm()}
          </div>
          <div >
            <Select style={{ width: 180 }}
                    placeholder="请选择仓库"
                    onChange={this.onSelectChangeWarehouse}>
              {wareHouseArr.map(val => <Option key={val.wid} value={val.wid} label={val.wname}>{val.wname}</Option>)}
            </Select>
            <Button style={{ marginLeft: 8 }} onClick={this.downloadToSendOrder}>
              <Icon type="cloud-download-o" />导出需发货的订单
            </Button>
          
            <Upload {...props} >
              <Button style={{ marginLeft: 8 }}>
                <Icon type="cloud-upload-o" /> 导入运单信息
              </Button>
            </Upload>


          </div>
          
          <div>
            <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16,marginTop:25}}>
              <div style={{ float: 'right' }}>
                <span> 共查询出符合条件的数据：{tableData?tableData.pagination.total:0}， </span>
                <span>总订单额：¥{tableData.item?tableData.item.totalTradeAmount :0} </span>
              </div>
            </div>
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
        <SupplierOrderCheckModal
          parent = {parent}
        />
        <ChildrenDelivery
          parent = {ChildrenDeliveryParent}
        />
      </div>
    );
  }
}

@connect(({orderManagement,publicDictionary,  loading }) => ({
  orderManagement,publicDictionary,
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
            ...fieldsValue,
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
    const { orderManagement:{supplierOrder:{fs}} } = this.props;
    // const {parent:{expressArr}} = this.props
   //console.log(fs)
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
                <div style={{paddingBottom:'15px', color:'#000',opacity:'.83', fontSize:'14px'}}>
                  <span style={{paddingLeft:'20px', paddingBottom:'15px'}}>收货人：</span>{fs.consigneeName}
                </div>
              </Col>
              <Col md={24} sm={24}>
                <div style={{paddingBottom:'15px', color:'#000',opacity:'.83', fontSize:'14px'}}>
                  <span style={{paddingLeft:'20px', paddingBottom:'15px'}}>收货人联系电话：</span>{fs.consigneeMobile}
                </div>
              </Col>
              <Col md={24} sm={24}>
                <div style={{paddingBottom:'25px', color:'#000',opacity:'.83', fontSize:'14px'}}>
                  <span style={{paddingLeft:'20px', paddingBottom:'15px'}}>收货人地址：</span>{fs.consigneeAdr}
                </div>
              </Col>
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
              {getFieldDecorator('expressId',{
                    rules:[{
                      required:true,message:'请填写快递公司',
                    }]
                  })(
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
              <Col md={24} sm={24}>
                <FormItem label="快递费：">
                  {getFieldDecorator('inputFreight',{
                    rules:[{
                      required:true,message:'请填写快递费：',
                    }]
                  })(
                    <Input placeholder="请输入" />
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
