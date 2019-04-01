import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message} from 'antd';
import {InputNumber, Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs,  } from 'antd';
import styles from './commodityGeneralPage.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getHeader,getToken} from "../../utils/Global";
import { spawn } from 'child_process';
import {getUploadUrl} from '../../services/api'
//import {getHeader, getToken} from "../../../utils/Global";

const userId = getToken().userId;
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({roleSupplierBus }) => ({
  roleSupplierBus
}))

@Form.create()
// 供应商 - 报价管理 - 商品报价
export default class commodityGeneralPage extends Component {
  state={
  }
  init(){
    const {match,dispatch}=this.props;
    const getData = JSON.parse(match.params.id)
    this.props.dispatch({
      type:'roleSupplierBus/getcommodityGeneralPageData',
      payload:{
        purchasesn:getData.purchasesn,
        offerstatus:getData.status
      }
    })
    
  }
  componentDidMount() {
    this.init();
  }

  //待报价获取链接-询价
  handleToBeQuoted(){
    const that = this
    const {roleSupplierBus:{commodityGeneralPage,commodityGeneralPage:{tableData}} } = that.props;
    //a表示在线样式
    const a ='https://view.officeapps.live.com/op/view.aspx?src='
    //b 表示后台返回的链接
    const b = tableData.goodslisturl
    const c = a + b
   
    window.open(c,'_blank')
    //window.location.href=c
   // window.open=c
  }
  //待报价获取链接-报价
  handleToBeQuotedOffer(){
    const that = this
    const {roleSupplierBus:{commodityGeneralPage,commodityGeneralPage:{tableData}} } = that.props;
    //a表示在线样式
    const a ='https://view.officeapps.live.com/op/view.aspx?src='
    //b 表示后台返回的链接
    const b = tableData.offerlisturl
    const c = a + b
  
    window.open(c,'_blank')
    //window.location.href=c
   // window.open=c
  }

  //待报价上传文件
  handleToBeQuotedUpload=(info)=>{
    //console.log('info',info.file.name)
    const {match,dispatch}=this.props;
    const getData = JSON.parse(match.params.id)
    if(info.file.status === 'done') {
      this.props.dispatch({
        type: 'roleSupplierBus/uploadOrderbill',
        payload: {
          purchasesn:getData.purchasesn,
          file: info.file.response.fileName[0]
          //file:info.file.name
        },
        callback: this.onUploadCallback,
      });
      
    }
  }
  //待报价上传文件-回调
  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      message.error(msg,8);
    }else{
      message.success("上传成功",5);
    }
   // this.init();
  }

   //待报价-提交接口
  handleToBeQuotedOnSubmission=() => {
    const {match,dispatch}=this.props;
    const getData = JSON.parse(match.params.id)
    this.props.dispatch({
      type:'roleSupplierBus/getUploadOfferOrderSubmitData',
      payload:{
        purchasesn:getData.purchasesn,
      }
    })
  }
  //待确认-提交
  onPreservation=(e)=>{
    
    const {roleSupplierBus:{commodityGeneralPage,commodityGeneralPage:{tableData}} } = this.props;
    const {match,dispatch}=this.props;
    const getData = JSON.parse(match.params.id)
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
        type: 'roleSupplierBus/getWaitingSubmit',
          payload: {
            ...values,
            purchasesn:getData.purchasesn,
          },
          callback:this.onPreservationCallback
      });


     // this.props.dispatch(routerRedux.push('/delivery/deliveryList/'  ))
    });
  }





   //待报价-取消
  handleToBeQuotedCancel=() => {
    this.props.dispatch(routerRedux.push('/quotationManagement/quotationList'));
  }

  //下半部分根据字段判断显示
  lowerhalf = () => {
    //const {match,dispatch}=this.props;
    const {match,dispatch,roleSupplierBus:{commodityGeneralPage,commodityGeneralPage:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    const offerstatus = JSON.parse(match.params.id)
    const statustype =offerstatus.status
    const that = this
    
    const props = {
      action: getUploadUrl(),
      headers: getHeader(),
      showUploadList: false,
      // listType: 'picture',
      // accept:'image/*',
      onChange: this.handleToBeQuotedUpload,
      multiple: false,
      // customRequest:this.upload,
    };

    switch(statustype){
      case '待报价':
        return (
          <div>
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
              <Col md={9} sm={24}></Col>
              <Col md={12} sm={24}>  
                {/* <span style={{fontSize:'16px'}}>下载询价商品：</span><a target="_blank" onClick={()=>this.handleToBeQuoted()}  >商品询价单.xls</a> */}
                <span style={{fontSize:'16px'}}>下载询价商品：</span>
                <a href={tableData.goodslisturl}>商品询价单.xls</a>
              </Col>
            </Row>
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
              <Col md={9} sm={24}></Col>
              <Col md={12} sm={24}>  
                <Upload  {...props}>
                  <div >
                    <span style={{fontSize:'16px'}}>上传报价单：</span><span style={{cursor:'pointer'}}><Icon type="upload" style={{color:'#1890ff',fontSize:'18px',margin:'0 6px'}} />上传文件</span>
                  </div>
                </Upload>
              </Col>
            </Row>
            <Row style={{marginTop:'35px', marginBottom:'5px',textAlign:'center',padding:'20px 0'}}>
              <Button style={{ marginLeft: 20}} type="primary" onClick={this.handleToBeQuotedOnSubmission} >提交</Button>
              <Button style={{ marginLeft: 48 }} htmlType="submit" onClick={this.handleToBeQuotedCancel}>取消</Button>
            </Row>
          </div>
        )
        break;
      case '已报价':
        return (
          <div>
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
              <Col md={9} sm={24}></Col>
              <Col md={12} sm={24}>  
              <span style={{fontSize:'16px'}}>询价单：</span><a target="_blank" onClick={()=>this.handleToBeQuoted()}  >文档.docx</a>
              </Col>
            </Row>
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
              <Col md={9} sm={24}></Col>
              <Col md={12} sm={24}>  
              <span style={{fontSize:'16px'}}>报价单：</span><a target="_blank" onClick={()=>this.handleToBeQuotedOffer()}  >文档.docx</a>
              </Col>
            </Row>
            <Row style={{marginTop:'35px', marginBottom:'5px',textAlign:'center',padding:'20px 0'}}>
              <Button style={{  }} type="primary"  onClick={this.handleToBeQuotedCancel}>关闭</Button>
            </Row>
          </div>
        )
        break;
      case '待确认':
        return (
          <div>
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
              <Col md={9} sm={24}></Col>
              <Col md={12} sm={24}>  
                <span style={{fontSize:'16px'}}>询价单：</span><a target="_blank" onClick={()=>this.handleToBeQuoted()}  >商品询价单.xls</a>
              </Col>
            </Row>
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
              <Col md={9} sm={24}></Col>
              <Col md={12} sm={24}>  
                <span style={{fontSize:'16px'}}>报价单：</span><a target="_blank" onClick={()=>this.handleToBeQuotedOffer()} >商品询价单.xls</a>
              </Col>
            </Row>
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
        
              <Form onSubmit={this.onPreservation} layout="inline">
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px',fontSize:'16px',marginBottom:'20px'}}>费用报价：</Col>
                </Row>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px'}}>
                    <FormItem label="运费：" style={{marginBottom:'20px'}}>
                        {getFieldDecorator('waybillfee', {
                          initialValue: tableData.waybillfee,
                          rules: [{ required: true, message: '请输入运费' }],
                        })(
                          tableData.status==1?<InputNumber placeholder="请输入运费"/>:<InputNumber disabled={true} placeholder="请输入运费"/>
                        )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px'}}>
                    <FormItem label="税费：" style={{marginBottom:'20px'}}>
                      {getFieldDecorator('tax', {
                        initialValue: tableData.tax,
                        rules: [{ required: true, message: '请输入税费' }],
                      })(
                        tableData.status==1?<InputNumber placeholder="请输入税费"/>:<InputNumber  disabled={true} placeholder="请输入税费"/>
                      )}
                    </FormItem>        
                  </Col>
                </Row>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px'}}>
                    <FormItem label="其　它："style={{marginBottom:'20px'}}>
                      {getFieldDecorator('otherprice', {
                        initialValue: tableData.otherprice,
                        //rules: [{ required: true, message: '请输入其它费用' }],
                      })(
                        tableData.status==1?<InputNumber placeholder="请输入税费"/>:<InputNumber disabled={true} placeholder="请输入税费"/>
                      )}
                    </FormItem>      
                  </Col>
                </Row>
    
              </Form>
            </Row>
            <Row style={{marginTop:'35px', marginBottom:'5px',textAlign:'center',padding:'20px 0'}}>
              <Button style={{ marginLeft: 20}} type="primary" onClick={this.onPreservation} >提交</Button>
              <Button style={{ marginLeft: 48 }} htmlType="submit" onClick={this.handleToBeQuotedCancel}>取消</Button>
            </Row>
          </div>
        )
        break;
      case '已成交':
        return (
          <div>
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
              <Col md={9} sm={24}></Col>
              <Col md={12} sm={24}>  
                <span style={{fontSize:'16px'}}>询价单：</span><a target="_blank" onClick={()=>this.handleToBeQuoted()}  >商品询价单.xls</a>
              </Col>
            </Row>
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
              <Col md={9} sm={24}></Col>
              <Col md={12} sm={24}>  
                <span style={{fontSize:'16px'}}>报价单：</span><a target="_blank" onClick={()=>this.handleToBeQuotedOffer()} >商品询价单.xls</a>
              </Col>
            </Row>
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
        
              <Form onSubmit={this.onPreservation} layout="inline">
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px',fontSize:'16px',marginBottom:'20px'}}>费用报价：</Col>
                </Row>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px'}}>
                    <FormItem label="运费：" style={{marginBottom:'20px'}}>
                        {getFieldDecorator('waybillfee', {
                          initialValue: tableData.waybillfee,
                          rules: [{ required: true, message: '请输入运费' }],
                        })(
                          tableData.status==1?<InputNumber placeholder="请输入运费"/>:<InputNumber disabled={true} placeholder="请输入运费"/>
                        )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px'}}>
                    <FormItem label="税费：" style={{marginBottom:'20px'}}>
                      {getFieldDecorator('tax', {
                        initialValue: tableData.tax,
                        rules: [{ required: true, message: '请输入税费' }],
                      })(
                        tableData.status==1?<InputNumber placeholder="请输入税费"/>:<InputNumber  disabled={true} placeholder="请输入税费"/>
                      )}
                    </FormItem>        
                  </Col>
                </Row>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px'}}>
                    <FormItem label="其　它："style={{marginBottom:'20px'}}>
                      {getFieldDecorator('otherprice', {
                        initialValue: tableData.otherprice,
                        //rules: [{ required: true, message: '请输入其它费用' }],
                      })(
                        tableData.status==1?<InputNumber placeholder="请输入税费"/>:<InputNumber disabled={true} placeholder="请输入税费"/>
                      )}
                    </FormItem>      
                  </Col>
                </Row>
    
              </Form>
            </Row>
            <Row style={{marginTop:'35px', marginBottom:'5px',textAlign:'center',padding:'20px 0'}}>
              <Button style={{ }} htmlType="submit"  type="primary" onClick={this.handleToBeQuotedCancel}>关闭</Button>
            </Row>
          </div>
        )
        break;
      case '已关闭':
        return (
          <div>
            {
              tableData.goodslisturl!=''?
              <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
                <Col md={9} sm={24}></Col>
                <Col md={12} sm={24}>  
                  <span style={{fontSize:'16px'}}>询价单：</span><a target="_blank" onClick={()=>this.handleToBeQuoted()}  >商品询价单.xls</a>
                </Col>
              </Row>:
              <span></span>
            }
            
            {
               tableData.offerlisturl!=''?
               <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
                <Col md={9} sm={24}></Col>
                <Col md={12} sm={24}>  
                  <span style={{fontSize:'16px'}}>报价单：</span><a target="_blank" onClick={()=>this.handleToBeQuotedOffer()} >商品询价单.xls</a>
                </Col>
              </Row>:
              <span></span>
            }
            {
              tableData.tax!=''?
              <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
        
              <Form onSubmit={this.onPreservation} layout="inline">
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px',fontSize:'16px',marginBottom:'20px'}}>费用报价：</Col>
                </Row>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px'}}>
                    <FormItem label="运费：" style={{marginBottom:'20px'}}>
                        {getFieldDecorator('waybillfee', {
                          initialValue: tableData.waybillfee,
                          rules: [{ required: true, message: '请输入运费' }],
                        })(
                          tableData.status==1?<InputNumber placeholder="请输入运费"/>:<InputNumber disabled={true} placeholder="请输入运费"/>
                        )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px'}}>
                    <FormItem label="税费：" style={{marginBottom:'20px'}}>
                      {getFieldDecorator('tax', {
                        initialValue: tableData.tax,
                        rules: [{ required: true, message: '请输入税费' }],
                      })(
                        tableData.status==1?<InputNumber placeholder="请输入税费"/>:<InputNumber  disabled={true} placeholder="请输入税费"/>
                      )}
                    </FormItem>        
                  </Col>
                </Row>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={9} sm={24}></Col>
                  <Col md={12} sm={24} style={{paddingLeft:'30px'}}>
                    <FormItem label="其　它："style={{marginBottom:'20px'}}>
                      {getFieldDecorator('otherprice', {
                        initialValue: tableData.otherprice,
                        //rules: [{ required: true, message: '请输入其它费用' }],
                      })(
                        tableData.status==1?<InputNumber placeholder="请输入税费"/>:<InputNumber disabled={true} placeholder="请输入税费"/>
                      )}
                    </FormItem>      
                  </Col>
                </Row>
    
              </Form>
            </Row>:
            <span></span>  
            }
            <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
              
            </Row>
            <Row style={{marginTop:'35px', marginBottom:'5px',textAlign:'center',padding:'20px 0'}}>
              <Button style={{   }} htmlType="submit"  type="primary" onClick={this.handleToBeQuotedCancel}>关闭</Button>
            </Row>
          </div>
        )
        break;
        default:
        break;
    }  
  }
  

  render() {
   const {roleSupplierBus:{commodityGeneralPage,commodityGeneralPage:{tableData}} } = this.props;
   // console.log(777777777,tableData)
    
    
    return (
      <div >
        <Card bordered={false}>
          <div style={{background:'#fff',fontSize:'18px',color:'#999',marginBottom:'20px'}}>询价单详情</div>  
          <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={9} sm={24}></Col>
            <Col md={12} sm={24}>
              <div style={{fontSize:'16px'}}>询价单号:<span style={{marginLeft:'10px'}}>{tableData.purchasesn}</span></div>
            </Col>
          </Row>
          <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={9} sm={24}></Col>
            <Col md={12} sm={24}>
              <div style={{fontSize:'16px'}}>客户姓名:<span style={{marginLeft:'10px'}}>{tableData.contacts}</span></div>
            </Col>
          </Row>
          <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={9} sm={24}></Col>
            <Col md={12} sm={24}>
              <div style={{fontSize:'16px'}}>联系方式:<span style={{marginLeft:'10px'}}>{tableData.tel}</span></div>
            </Col>
          </Row>
          <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={9} sm={24}></Col>
            <Col md={12} sm={24}>
              <div style={{fontSize:'16px'}}>采购截至日期:<span style={{marginLeft:'10px'}}>{tableData.deliverytime}</span></div>
            </Col>
          </Row>
          <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={9} sm={24}></Col>
            <Col md={12} sm={24}>
              <div style={{fontSize:'16px'}}>提货地点:<span style={{marginLeft:'10px'}}>{tableData.address}</span></div>
            </Col>
          </Row>
          {/* <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={9} sm={24}></Col>
            <Col md={12} sm={24}>
              <div style={{fontSize:'16px'}}>备注:<span style={{marginLeft:'10px',maxWidth:'200px',display:}}>{tableData.remark}</span></div>
             
            </Col>
          </Row> */}
          <Row style={{marginBottom:'20px'}} gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={9} sm={24}></Col>
            <Col md={12} sm={24}>
              <div style={{fontSize:'16px'}}>备注:<span style={{marginLeft:'10px'}}>{tableData.remark}</span></div>
            </Col>
          </Row>
          {this.lowerhalf()}

        </Card>
        
      </div>
    );

    

  }
}

