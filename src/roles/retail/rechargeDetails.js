import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { InputNumber ,Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './rechargeDetails.less';
import moment from 'moment';
import {getCurrentUrl, getUploadUrl} from '../../services/api'
import {getHeader, getToken} from "../../utils/Global";
const userId = getToken().userId;
import {message} from "antd/lib/index";


const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
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
    // this.props.dispatch({
    //   type:'roleOperationDistribution/storesSales',
    //   payload:{}
    // })
    this.props.dispatch({
      type:'roleRetaiBusManagement/GetRetailMoney',
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


  renderForm(){
    // const { roleOperationDistribution:{storesSales:{tableData:{item}}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { roleRetaiBusManagement:{rechargeDetails:{tableData}} } = this.props;

    //console.log('ffff',tableData)
    return (
      <div>
        <div style={{fontSize:'22px',marginBottom:'16px'}}>账户余额：<span style={{color:'red'}}>¥{tableData.item.fund}</span> </div>
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
            <Col md={8} sm={24}>
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
            </Col>
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
    
    const { roleRetaiBusManagement:{rechargeDetails:{tableData:{list, pagination}}} } = this.props;
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
      // ,{
      //   title: '操作',
      //   dataIndex: '',
      //   key: '',
      //   render: (val,record) =>
      //   <div>
      //       {<a onClick={(e) => this.handlestoresSalesClick(e, record)}>查看</a>}
      //   </div>
      // }
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
      </div>
    );
  }
   //查看
  // handlestoresSalesClick = (e, record)=>{
  //    //console.log('record',11)
  //   this.props.dispatch({
  //     type: 'roleOperationDistribution/storesSalesClickList',
  //     payload: {
  //       orderId:record.orderId,
  //       //barcode:record.barcode,
  //       //index:index
  //     },
  //   });
  // }
}


//查看弹窗
@connect(({roleOperationDistribution,roleRetaiBusManagement }) => ({
  roleOperationDistribution,roleRetaiBusManagement
}))
@Form.create()
class StoresSalesSee  extends Component {
  state={
    isimg:false,
  }






  handleCancel = () => {
    // this.props.dispatch({
    //   type:'roleOperationDistribution/storesSalesCloseR',
    //   payload:false
    // })

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
        if(_that.state.isimg==false){
          _that.props.dispatch({
            type:'roleRetaiBusManagement/getPayment',
            payload:{
              ...fieldsValue,
                  
            },
            callback: _that.callbackType,
          });
        } else {
          _that.props.dispatch({
            type:'roleRetaiBusManagement/getPopupColoseR',
          });
          _that.setState({
            isimg:false,
          })
        }
      }
    })
  }

  callbackType = (params) => {
    const msg = params.msg;
    if(params.type=='1'){
      this.setState({
        isimg:true,
      })
    } else {
      this.setState({
        isimg:true,
      })
    }
  } 





  render(){
    const { roleRetaiBusManagement:{rechargeDetails,rechargeDetails:{num,tableData,childDetailsModelVisible,img}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    // console.log('xxxxx',rechargeDetails)
    // console.log('77777',this.state.isimg)
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
                <div  style={{width:'270px',margin:'30px auto 0px auto',fontSize:'18px'}}>
                  <FormItem label="微信充值金额：">
                    {getFieldDecorator('totalPrice',{
                      // rules:[{
                      //   required:true,message:'充值金额最少100起',
                      // }]
                    })(
                      <InputNumber 
                        style={{width:'150px'}} 
                        className={styles.displayNo}
                        min={100} max={99999999999} 
                        // defaultValue={0} 
                        placeholder="请输入充值金额" 
                      />
                    )}
                  </FormItem>
                  <span style={{color:'red',fontSize:'12px',marginLeft:'100px',marginTop:'-10px'}}>充值金额最少100起</span>
                </div>
              </Col>
              <Col md={24} sm={24}>
              </Col>
              </Row>
          </Form>
          
          {this.state.isimg ==true?
            <div style={{textAlign:'center'}}>
              <img src={img} style={{width:'200px',display:'block',margin:'20px auto'}} />
              <span style={{textAlign:'center',margin:'20px auto',display:'block',fontSize:'18px',paddingTop:'15px'}}>扫码付款成功后,请刷新页面查看余额！</span>
            </div>:
            <span></span>
          }            



        </Modal>
      </div>
    )

    
    
   
    

  }

}


