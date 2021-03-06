import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,InputNumber  } from 'antd';
import styles from './createAgreement.less';
import moment from 'moment';
import {getCurrentUrl, getUploadUrl} from '../../../services/api'
import {getHeader, getToken} from "../../../utils/Global";
const userId = getToken().userId;
import {message} from "antd/lib/index";

const Dragger = Upload.Dragger;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({roleOperationDistribution,publicDictionary }) => ({
  roleOperationDistribution,publicDictionary
}))
// --------  --------------
    // 合同 - 创建合同
@Form.create()
export default class createAgreement extends Component {
  state={
    formValues:{},
    visible: false,
    visibleChildCheck:false,
    // fileList:[],
    // file:{},
    // thumbUrl:'',
    img:false,//检查img初始是否为空
    listImg:[]
  }

  //****/
  init(){
    // this.props.dispatch({
    //   type:'roleOperationDistribution/storesSales',
    //   payload:{}
    // })

    //获取下拉菜单 客商名字
    this.props.dispatch({
      type:'publicDictionary/merchantName',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  //保存
  onSearch=(e)=>{
    e.preventDefault();
    const { roleOperationDistribution:{createAgreement} } = this.props;
    //console.log(777,createAgreement)
    let that = this

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
    //  console.log('img',this.state.listImg.length > 0)
      if( this.state.img == true){
        this.props.dispatch({
          type: 'roleOperationDistribution/getcreateAgreementData',
          payload: {
            ...values,
            list:this.state.listImg
          },
          callback: that.callbackType,
        });
       // this.props.form.resetFields();
        this.setState({
          formValues: {},
          sortedInfo: null,
        });
      }else{
        message.error('请上传附件');
      }
    });
  }

  callbackType = (params) => {
     console.log('1111',params)
     if(params.type==1){
      this.props.form.resetFields();
     }
   }

  
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo: null,
    });
   // this.init();
  }
  // handleTableChange=(pagination, filters, sorter)=>{
  //   const params = {
  //     ...pagination,
  //     ...this.state.formValues,
  //   };
  //   this.props.dispatch({
  //     type: 'roleOperationDistribution/storesSales',
  //     payload: params,
  //   });
  // }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }
  handlecancel = () => {
    this.props.dispatch(routerRedux.push('/agreement/agreementList'))
  }

  //导入
  handleUploadChange=(info)=>{
    let that = this
    // console.log(info)
    if(info.file.status === 'done') {
      this.props.dispatch({
        type: 'roleOperationDistribution/getcreateAgreementImg',
        payload: {
          //userId:userId,
         fileName: info.file.response.fileName[0]
         //fileName:info.file.name
        },
        callback: that.onUploadCallback,
      });
     
    }
  }
  onUploadCallback = (params) => {
   // console.log('1111',params)
    const msg = params.msg;
    if(params.type==="0"){

    message.error(params.msg);
    }else{
      message.success("上传成功",5);
       this.state.listImg.push(params.msg)
       
      // console.log(this.state.listImg)
      this.setState({
        img: true,
      });
    }
  }
// onRemoveR = (e) => {
//   //console.log(1111)
//   console.log('e',e)
  
// }



  renderForm(){
    const { roleOperationDistribution:{storesSales:{tableData:{item}}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { publicDictionary:{merchantName} } = this.props;
   // console.log('listImg',this.state.listImg)
   // const { publicDictionary:{merchantName} } = this.props;
    //console.log('xxxmerchantName',this.props)
    //上传 

    const props = {
      action: getUploadUrl(),
      // data: {test: 123}, //传递到后台的自定义参数
      headers: getHeader(), //未封装的头信息，以满足后台对头参数的验证
      onChange: this.handleUploadChange, //回调函数通过res.filelist[i].respose获取回传的文件名
      multiple: false,
      // onRemove: this.onRemoveR
      onRemove:false,
    };
   
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <div className={styles.titleName}></div>
          <div className={styles.takeGoods}>
            <span></span>
            创建合同
          </div>
        </Row>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="客商编码：">
              {getFieldDecorator('customersCode',{
                rules: [{ required: true, message: '请输入客商编码' }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输客商编码" />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
           
            <FormItem label="客商名称：">
              {getFieldDecorator('userName',{
                  rules: [{ required: true, message: '请输入客商名称' }],
              })(
                <Select
                placeholder="选择"
                optionFilterProp="label"
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  
                  {/* <Option value="1">大连XX公司</Option>
                  <Option value="2">青岛XX公司</Option> */}
                   {/* {purchaserArr.map(val => <Option key={val.usercode} value={val.usercode} label={val.getName}>{val.getName}</Option>)} */}
                  {merchantName.map((val) => <Option key={val.keyId} value={val.userName} label={val.userName}>{val.userName}</Option>)}
                </Select>
              )}
            </FormItem>


          </Col>
          <Col md={7} sm={24}></Col>
        </Row>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="签订日期：">
                {getFieldDecorator('createTime',{
                  //initialValue:'1'
                  rules: [{ required: true, message: '请输入签订日期：' }],
                
                })(
                  <DatePicker  />
                )}

            </FormItem>
          </Col>
          {/* <Col md={7} sm={24}></Col> */}
        </Row>          
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="结算账期：">
                {getFieldDecorator('cycle',{
                  //initialValue:'1'
                  initialValue:item.sendType==''?'1':item.sendType,
                  rules: [{ required: true, message: '请输入结算账期：' }],
                })(
                  <Select
                      placeholder="选择"
                    >
                    <Option value="1">实时</Option>
                    <Option value="2">日结</Option>
                    <Option value="3">周结</Option>
                    <Option value="4">半月结</Option>
                    <Option value="5">月结</Option>
                    <Option value="6">季结</Option>
                    <Option value="7">半年结</Option>
                    <Option value="8">年结</Option>
                    <Option value="9">其他</Option>
                  </Select>
                )}

            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>          
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="合作模式：">
                {getFieldDecorator('model',{
                  //initialValue:'1'
                  initialValue:item.sendType==''?'1':item.sendType,
                  rules: [{ required: true, message: '请输入合作模式：' }],
                })(
                  <Select
                      placeholder="选择"
                    >
                    <Option value="1">直营</Option>
                    <Option value="2">代销</Option>
                    <Option value="3">一件代发</Option>
                    <Option value="4">bbc</Option>
                  </Select>
                )}

            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>          
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="合作期限：">
              {getFieldDecorator('date',{
                rules: [{ required: true, message: '请输入合作期限：' }],
              })(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>                  
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <div className={styles.titleName}></div>
          <div className={styles.takeGoods}>
            <span></span>
            扣点方式
          </div>
        </Row>        
    

        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={3} sm={24}></Col>
          <Col md={5} sm={24}>
            <FormItem label="平台：">
              {getFieldDecorator('platformPoint',{
                rules: [{ required: true, message: '请输入平台扣点' }],
              })(
                <InputNumber style={{ width: '100%' }} placeholder="请输入平台扣点"  min={0} max={100}  />
               
              )}
            </FormItem>
          </Col>
          <Col md={1} sm={24}>
            <span style={{textAlign:'center',fontSize:'18px',marginTop:'10px',fontStyle:'normal',lineHeight:'200%'}}>
              <em>%</em><em>+</em> 
            </span>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="供货中介：">
              {getFieldDecorator('supplierPoint',{
                rules: [{ required: true, message: '请输入供货中介扣点：' }],
              })(
                <InputNumber style={{ width: '100%' }} placeholder="请输入供货中介扣点" min={0} max={100} />
              )}
            </FormItem>
          </Col>
          <Col md={1} sm={24}>
            <span style={{textAlign:'center',fontSize:'18px',marginTop:'10px',fontStyle:'normal',lineHeight:'200%'}}>
              <em>%</em><em>+</em> 
            </span>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="采购中介：">
              {getFieldDecorator('purchasePoint',{
                rules: [{ required: true, message: '请输入采购中介扣点：' }],
              })(
                <InputNumber style={{ width: '100%' }} placeholder="请输入采购中介扣点"   min={0} max={100}  />
              )}
              
            </FormItem>
          </Col>
          <Col md={1} sm={24}>
            <span style={{textAlign:'center',fontSize:'18px',marginTop:'10px',fontStyle:'normal',lineHeight:'200%'}}>
              <em>%</em>
            </span>
          </Col>      
          <Col md={3} sm={24}></Col>
        </Row>                   
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="运费承担方式">
                {getFieldDecorator('freightBelong',{
                  //initialValue:'1'
                 // initialValue:item.sendType==''?'1':item.sendType,
                  rules: [{ required: true, message: '请输入运费承担方式：' }],
                })(
                  <Select
                      placeholder="选择"
                    >
                    <Option value="1">供货商承担</Option>
                    <Option value="2">平台承担</Option>
                  </Select>
                )}

            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>               
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="税费承担方式">
                {getFieldDecorator('taxBelong',{
                  //initialValue:'1'
                 // initialValue:item.sendType==''?'1':item.sendType,
                  rules: [{ required: true, message: '请输入税费承担方式：' }],
                })(
                  <Select
                      placeholder="选择"
                    >
                    <Option value="1">供货商承担</Option>
                    <Option value="2">平台承担</Option>
                  </Select>
                )}

            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>              
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="商户名称：">
              {getFieldDecorator('merchantName',{
                rules: [{ required: true, message: '请输入商户名称' }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入商户名称" />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>            
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="开户行：">
              {getFieldDecorator('depositBank',{
                rules: [{ required: true, message: '请输入开户行' }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入开户行" />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>    
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="开户行支行：">
              {getFieldDecorator('depositBankSubbranch',{
                rules: [{ required: true, message: '请输入开户行支行' }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入开户行支行" />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>       
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="银行卡号：">
              {getFieldDecorator('bankCard',{
                rules: [{ required: true, message: '请输入银行卡号' }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入银行卡号" />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>             
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <div className={styles.titleName}></div>
          <div className={styles.takeGoods}>
            <span></span>
            附件
          </div>
        </Row>            

        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
              <p className="ant-upload-hint">支持扩展名：.jpg .png .jpeg .tga .tif,并且不能大写</p>
            </Dragger>
          
          </Col>
          <Col md={7} sm={24}></Col> 
        </Row>          

        <Row gutter={{ md: 12, lg: 24, xl: 48 }} style={{marginTop:'15px', marginBottom:'5px',textAlign:'center'}}>
          <Button type="primary" htmlType="submit">保存</Button>
          {/* <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button> */}
          <Button style={{ marginLeft: 8 }} onClick={this.handlecancel}>取消</Button>
        </Row>
        {/* <Divider dashed /> */}
      </Form>
    );
  }

  render() {
    const { roleOperationDistribution:{storesSales:{tableData:{list, pagination}}} } = this.props;
    
    const props = {
      action: getUploadUrl(),
      headers: getHeader(),
      showUploadList: false,
      onChange: this.handleUploadChange,
      multiple: false,
    };
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
        </Card>
      </div>
    );
  }
  
}




