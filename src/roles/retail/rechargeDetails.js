import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Radio ,InputNumber ,Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './rechargeDetails.less';
import moment from 'moment';
import {getCurrentUrl, getUploadUrl} from '../../services/api'
import {getHeader, getToken} from "../../utils/Global";
const userId = getToken().userId;
import {message} from "antd/lib/index";


const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const QRCode = require('qrcode.react');


@connect(({roleRetaiBusManagement }) => ({
  roleRetaiBusManagement
}))
// --------  --------------
    // 零售 - 充值
@Form.create()
export default class rechargeDetails extends Component {
  state={
    formValues:{},
    visible: false,
    visibleChildCheck:false,
    isimg:false,
  }

  //****/
  init(){
    this.props.dispatch({
      type:'roleRetaiBusManagement/GetRetailMoney',
      payload:{
        fundtype: "充值"
      }
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
        type:'roleRetaiBusManagement/GetRetailMoney',
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
      sortedInfo: null,
    });
    this.init();
  }
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type:'roleRetaiBusManagement/GetRetailMoney',
      payload: params,
    });
  }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }
 
  handlePopup (){
    this.props.dispatch({
      type:'roleRetaiBusManagement/getPopupR',
      
    });
  }
  handleQRCode (){
    this.props.dispatch({
      type:'roleRetaiBusManagement/getQROpenR',
      
    });
   // console.log('QR')
  }

  renderForm(){
    // const { roleOperationDistribution:{storesSales:{tableData:{item}}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { roleRetaiBusManagement:{rechargeDetails:{tableData}} } = this.props;

    //console.log('ffff',tableData)
    return (
      <div>
        <div style={{fontSize:'22px',marginBottom:'16px'}}>
          账户余额：
          <span style={{color:'red'}}>¥{tableData.item.fund}</span> 
        </div>
        <Button type="primary" onClick={this.handlePopup.bind(this)}>充值</Button>
        <Divider dashed />
        <Form onSubmit={this.onSearch} layout="inline">
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="操作时间：">
                {getFieldDecorator('dateTime')(
                  <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="订单号：">
                {getFieldDecorator('orderId')(
                  <Input style={{ width: '100%' }} placeholder="可输入订单号进行查询" />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="支付单号：">
                {getFieldDecorator('fundId')(
                  <Input style={{ width: '100%' }} placeholder="可输入支付单号进行查询" />
                )}
              </FormItem>
            </Col>
            {/* <Col md={8} sm={24}>
              <FormItem label="类别">
                {getFieldDecorator('fundtype')(
                  <Select
                    placeholder="请选择"
                    optionFilterProp="label"
                  >
                    <Option value="全部">全部</Option>
                    <Option value="充值">充值</Option>
                    <Option value="订单扣款">订单扣款</Option>
                  
                  </Select>
                )}
              </FormItem>
            </Col> */}
            <Col md={6} sm={24}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </Col>
          </Row>
          <Divider dashed />
          <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
            <div style={{ float: 'right' }}>
              共查询出符合条件的数据：{tableData.pagination.total}条，
            </div>
          </div>
        </Form>
      </div>
      
    );
  }

  render() {
    //const { roleOperationDistribution:{storesSales:{tableData:{list, pagination}}} } = this.props
    
    const { roleRetaiBusManagement:{rechargeDetails,rechargeDetails:{tableData:{img,list, pagination}}} } = this.props;
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
      },{
        title: '类别',
        dataIndex: 'fundtype',
        key: 'fundtype',
      } ,{
        title: '支付时间',
        dataIndex: 'paytime',
        key: 'paytime',
      }, {
        title: '支付单号',
        dataIndex: 'fundId',
        key: 'fundId',
      }, {
        title: '订单金额',
        dataIndex: 'fundprice',
        key: 'fundprice',
        render:val=>`¥${val}`
      }
    ];

    const props = {
      action: getUploadUrl(),
      headers: getHeader(),
      showUploadList: false,
      // listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange,
      multiple: false,
      // customRequest:this.upload,
    };
    //接收二维码
   // console.log('77777',rechargeDetails)
    //const code =  <QRCode value='img' />,

    return (
      <div>
        <Card bordered={false}>
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
          />
        </Card>
        <StoresSalesSee />
        {/* <QrCode /> */}
        <StoresSalesSeeCode />
      </div>
    );
  }
}


//充值弹窗
@connect(({roleOperationDistribution,roleRetaiBusManagement }) => ({
  roleOperationDistribution,roleRetaiBusManagement
}))
@Form.create()
class StoresSalesSee  extends Component {
  state={
    isSocket:''
  }

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type:'roleRetaiBusManagement/getPopupColoseR',
      
    });
    this.setState({
      isimg:false,
    })
  }
  handleOk = (e) => {
    const _that = this
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue)=>{
      if(!err){
          _that.props.dispatch({
            type:'roleRetaiBusManagement/getPayment',
            payload:{
              ...fieldsValue,
                  
            },
            callback: _that.callbackType,
          });

      }
    })
  }

  callbackType = (params) => {
    
    const { roleRetaiBusManagement:{rechargeDetails,rechargeDetails:{foundId,num,tableData,childDetailsModelVisible,img}} } = this.props;
    const msg = params.msg;
   
   // console.log('foundId',foundId)

    if(params.type=='1'){
      const _that = this
      
      this.props.dispatch({
        type:'roleRetaiBusManagement/getQROpenR',
        payload:{ 
        },
      });
      this.props.dispatch({
        type:'roleRetaiBusManagement/getPopupColoseR',
      });
    
      //var ws = new WebSocket('ws://192.168.191.1:54195/zf');
      // var ws = new WebSocket('ws://console.llwell.net/zf');
      var ws = new WebSocket('ws://console.llwell.net/llback/zf');
      ws.onopen = function(evt) { 
        ws.send("getPayState,fundId:"+foundId);
        setTimeout(()=>{
          ws.close();
        },20000)

      };
      
      ws.onmessage = function(evt) {
        _that.setState({
          isSocket:JSON.parse(evt.data).type
        })
        if( JSON.parse(evt.data).type == '1'){
          _that.props.dispatch({
            type:'roleRetaiBusManagement/getQRColoseR',
            
          });
          _that.props.dispatch({
            type:'roleRetaiBusManagement/GetRetailMoney',
            payload:{}
          })
          message.success('充值成功');
          ws.close();
          
        } else {
          //message.error(JSON.parse(evt.data).msg);
        }
        
        _that.props.form.resetFields();
      };
      
      ws.onclose = function(evt) {
        if(_that.state.isSocket=='0'){
          message.success('扫码付款成功后请手动刷新页面，查看充值金额！')
        }
        ws.close();
      };  
      
      
    } else {
    
    }
  } 

  render(){
    const { roleRetaiBusManagement:{rechargeDetails,rechargeDetails:{num,tableData,childDetailsModelVisible,img}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Modal
          visible= {childDetailsModelVisible}
          onCancel={this.handleCancel}
          width={'35%'}
          onOk={this.handleOk}
          style={{padding:'20px'}}
        >
          <Form onSubmit={this.handleOk} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={24} sm={24} >
                <div  style={{width:'280px',margin:'30px auto 0px auto',fontSize:'18px'}}>
                  <FormItem label="充值金额：">
                    {getFieldDecorator('totalPrice',{
                      rules:[{
                        required:true,message:'充值金额最少100起',
                      }]
                    })(
                      <InputNumber 
                        style={{width:'150px'}} 
                        className={styles.displayNo}
                        min={100} max={99999999} 
                        // defaultValue={0} 
                        placeholder="请输入充值金额" 
                      />
                    )}
                  </FormItem>
                  <span style={{color:'red',fontSize:'12px',marginLeft:'100px',marginTop:'-10px'}}>充值金额最少100起</span>
                </div>
              </Col>
              <Col md={24} sm={24}>
                <RadioGroup value='1' style={{display:'flex',width:'100%',justifyContent:'center',marginTop:'30px'}} >
                  <Radio value='1' style={{}}>
                    <img style={{width:'25px'}} src="http://llwell-b2b.oss-cn-beijing.aliyuncs.com/image/wxzf.png"></img>
                    <span style={{marginLeft:'10px'}}>微信支付</span>
                  </Radio>
                  <Radio value='2' style={{}} disabled>
                    <img style={{width:'60px'}} src="http://llwell-b2b.oss-cn-beijing.aliyuncs.com/image/zfbzf.png"></img>
                    <span style={{marginLeft:'10px'}}></span>
                  </Radio>
                  
                </RadioGroup>         
              </Col>
              </Row>
          </Form>
        </Modal>
      </div>
    )
  }
}


//二维码弹窗
@connect(({roleOperationDistribution,roleRetaiBusManagement }) => ({
  roleOperationDistribution,roleRetaiBusManagement
}))
@Form.create()
class StoresSalesSeeCode  extends Component {
  state={
    isimg:false,
  }

  handleQRCancel = () => {
    this.props.dispatch({
      type:'roleRetaiBusManagement/getQRColoseR',
    });
  }
  handleQROk = (e) => {
    this.props.dispatch({
      type:'roleRetaiBusManagement/getQRColoseR',
    });
  }
  render(){
    const { roleRetaiBusManagement:{rechargeDetails,rechargeDetails:{qRCode,num,tableData,childDetailsModelVisible,img}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Modal
          visible= {qRCode}
          onCancel={this.handleQRCancel}
          width={'35%'}
          // onOk={this.handleQROk}
          style={{padding:'20px'}}
          footer= {null}
        >
          <div>
            <QRCode value={img} style={{margin:'20px auto 0 auto',display:'block',border:'1px solid #ccc'}} /> 
            <span style={{textAlign:'center',margin:'20px auto',display:'block',fontSize:'18px',paddingTop:'15px'}}>
              请扫码充值！
            </span>
          </div>
        </Modal>
      </div>
    )
  }
}