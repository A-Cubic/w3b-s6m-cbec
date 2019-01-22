import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
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
  }

  //****/
  init(){
    // this.props.dispatch({
    //   type:'roleOperationDistribution/storesSales',
    //   payload:{}
    // })
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
        type: 'roleOperationDistribution/getcreateAgreementData',
        payload: {
          ...values,
        },
      });
      this.props.form.resetFields();
      this.setState({
        formValues: {},
        sortedInfo: null,
      });
    });
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

  renderForm(){
    const { roleOperationDistribution:{storesSales:{tableData:{item}}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    console.log('fs',this.props)
   // const { publicDictionary:{merchantName} } = this.props;
    //console.log('xxxmerchantName',this.props)
    //上传 
    const propsa = {
     name: 'file',
     multiple: true,
     action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const status = info.file.status;
        console.log('status',status)
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
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
              {getFieldDecorator('purchaseName',{
                rules: [{ required: true, message: 'bbb请输入联系人' }],
              })(
                <Input style={{ width: '100%' }} placeholder="可输入采购商名称进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}></Col>
          <Col md={10} sm={24}>
            <FormItem label="提货地点：">
                {getFieldDecorator('sendType',{
                  //initialValue:'1'
                  initialValue:item.sendType==''?'1':item.sendType,
                  rules: [{ required: true, message: '请输入提供地点' }],
                })(
                  <Select
                      placeholder="日本提货"
                    >
                    <Option value="1">日本提货</Option>
                    <Option value="2">韩国提货</Option>
                    <Option value="3">香港提货</Option>
                    <Option value="6">国内提货</Option>
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
                {getFieldDecorator('aaa',{
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
                {getFieldDecorator('bbb',{
                  //initialValue:'1'
                  initialValue:item.sendType==''?'1':item.sendType,
                  rules: [{ required: true, message: '请输入结算账期：' }],
                })(
                  <Select
                      placeholder="全部"
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
                {getFieldDecorator('ccc',{
                  //initialValue:'1'
                  initialValue:item.sendType==''?'1':item.sendType,
                  rules: [{ required: true, message: '请输入合作模式：' }],
                })(
                  <Select
                      placeholder="全部"
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
                      {/* //////////         */}
                      <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={3} sm={24}></Col>
          <Col md={5} sm={24}>
            <FormItem label="平台：">
              {getFieldDecorator('purchaseName',{
                rules: [{ required: true, message: '请输入平台' }],
              })(
                <Input style={{ width: '100%' }} placeholder="可输入采购商名称进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={1} sm={24}></Col>
          <Col md={5} sm={24}>
            <FormItem label="供货中介：">
              {getFieldDecorator('purchaseName',{
                rules: [{ required: true, message: '请输入供货中介：' }],
              })(
                <Input style={{ width: '100%' }} placeholder="可输入采购商名称进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={1} sm={24}></Col>
          <Col md={5} sm={24}>
            <FormItem label="采购中介：">
              {getFieldDecorator('purchaseName',{
                rules: [{ required: true, message: '请输入采购中介：' }],
              })(
                <Input style={{ width: '100%' }} placeholder="可输入采购商名称进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={1} sm={24}></Col>      
          <Col md={3} sm={24}></Col>
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
            <Dragger {...propsa}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
              <p className="ant-upload-hint">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</p>
            </Dragger>,
           
          </Col>
          <Col md={7} sm={24}></Col>
        </Row>          

        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={9} sm={24}>
            
          </Col>
          <Col md={9} sm={24}>
            <Button type="primary" htmlType="submit">保存</Button>
            {/* <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button> */}
            <Button style={{ marginLeft: 8 }} onClick={this.handlecancel}>取消</Button>
          </Col>
          <Col md={6} sm={24}>
            
          </Col>
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




