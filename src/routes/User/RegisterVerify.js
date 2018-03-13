import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress,Steps,notification,Upload,Icon ,message  } from 'antd';
import styles from './Register.less';
import { getAuthority } from '../../utils/Global';
import { getCurrentUrl } from '../../services/api'

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const Step = Steps.Step;
var temUploadKey = '';
@connect(({ registerVerify, loading }) => ({
  registerVerify,
  submitting: loading.effects['registerVerify/upload'],
}))
@Form.create()
export default class RegisterVerify extends Component {
	// state = {
	//   currentStep : 1
	// };
	renderStep = (currentStep) => {
	  const { form, submitting } = this.props;
	  const { getFieldDecorator,getFieldsValue,validateFields,setFields } = form;
	  // const { count, prefix } = this.state;

	   const formItemLayout = {
	    labelCol: {
	      xs: { span: 24 },
	      sm: { span: 8 },
	    },
	    wrapperCol: {
	      xs: { span: 24 },
	      sm: { span: 16 },
	    },
	  };
	   const url = getCurrentUrl('/llback/user/validate');
	  const props = {
	      action: url,
	      listType: 'picture',
        accept:'image/*',
	      onChange({ file, fileList }) {
	          if (file.status !== 'uploading') {
	            // console.log(fileList);
	          }
	        }
	    };
  const cusUpload = (e)=>{
    temUploadKey = e.target.id;
  }
	  switch(currentStep){
	    case 1 :
	        return(
	           <Form onSubmit={this.handleVerify}>
	                  <FormItem
	                    {...formItemLayout}
	                    label='公司名称'>
	                    {getFieldDecorator('companyName', {
	                      rules: [
	                        {
	                          required: true,
	                          message: '请输入公司名称！',
	                        }
	                      ]
	                    })(<Input size="large" placeholder="请填写与营业执照一致的公司名称" />)}
	                  </FormItem>
	                 <FormItem
	                    {...formItemLayout}
	                    label='联系人'>
	                    {getFieldDecorator('linkman', {
	                      rules: [
	                        {
	                          required: true,
	                          message: '请输入联系人！',
	                        }
	                      ]
	                    })(<Input size="large" placeholder="联系人姓名" />)}
	                  </FormItem>
	                  <FormItem
	                    {...formItemLayout}
	                    label='联系人电话'>
	                    {getFieldDecorator('linkmanphone', {
	                      rules: [
	                        {
	                          required: true,
	                          message: '请输入联系人手机号码！',
	                        }
	                      ]
	                    })(<Input size="large" placeholder="联系人手机号码" />)}
	                  </FormItem>
	                   <FormItem
	                    {...formItemLayout}
	                    label='邮箱'>
	                    {getFieldDecorator('email', {
	                      rules: [
	                        {
	                          required: true,
	                          message: '请输入联系人手机号码！',
	                        },{
	                          type:'email'
	                        }
	                      ]
	                    })(<Input size="large" placeholder="联系人常用邮箱且能正常收发邮件" />)}
	                  </FormItem>

	                   <FormItem
	                    {...formItemLayout}
	                    label='资质上传'>
	                    {getFieldDecorator('certification', {
	                      rules: [
	                        {
	                          required: true,
	                          message: '请上传资质照片！',
	                        }
	                      ]
	                    })(
	                      <div>
	                      <Row style={{marginBottom:'20px'}}>
	                        <Col span={12}>
	                           <FormItem
	                             {...formItemLayout}>
	                             {getFieldDecorator('img1')(
	                             	<Upload {...props} beforeUpload={this.beforeUpload} >
	                             	    <Button>
	                             	      <Icon type="upload"/> 营业执照
	                             	    </Button>
	                             	  </Upload>
	                             	)}
	                           </FormItem>
	                        </Col>
	                        <Col span={12}>
	                           <FormItem
	                             {...formItemLayout}>
	                             {getFieldDecorator('img2')(
	                             	<Upload {...props} beforeUpload={this.beforeUpload}>
	                             	    <Button>
	                             	      <Icon type="upload" /> 组织机构代码
	                             	    </Button>
	                             	  </Upload>
	                             	)}
	                           </FormItem>
	                        </Col>
	                      </Row>
	                      <Row style={{marginBottom:'20px'}}>
	                        <Col span={12}>
	                           <FormItem
	                             {...formItemLayout}>
	                             {getFieldDecorator('img3')(
	                             	<Upload {...props} beforeUpload={this.beforeUpload}>
	                             	    <Button>
	                             	      <Icon type="upload"/> 税务登记证
	                             	    </Button>
	                             	  </Upload>
	                             	)}
	                           </FormItem>
	                        </Col>
	                        <Col span={12}>
	                           <FormItem
	                             {...formItemLayout}>
	                             {getFieldDecorator('img4')(
	                             	<Upload {...props} beforeUpload={this.beforeUpload}>
	                             	    <Button>
	                             	      <Icon type="upload" /> 营业执照（三证合一）
	                             	    </Button>
	                             	  </Upload>
	                             	)}
	                           </FormItem>
	                        </Col>
	                      </Row>
	                      <Row className={styles.uploadNote}>
	                        中国境内供应商请提交营业执照（三证合一）或者营业执照+组织结构代码+税务登记证。<br/>
	                        中国境内外供应商请提交营业执照。
	                      </Row>
	                      </div>
	                    )}
	                  </FormItem>
	                  <FormItem
	                   {...formItemLayout}
	                    label =' '
	                    colon={false}>
	                    <Button
	                      size="large"
	                      loading={submitting}
	                      className={styles.verifybtn}
	                      type="primary"
	                      htmlType="submit"
	                    >
	                      提交认证
	                    </Button>
	                  </FormItem>
	                </Form>
	          );
	      break;
	    case 2 :
	          return(
	            <div className={styles.verify}>
	              <h2>审核中</h2>
	              <p>认证已提交成功，正在审核中...</p>
	              <p>审核通过后，您会收到短信提示和邮件通知。</p>
	              <p>请稍后，谢谢！</p>
	              <Button size="large"
	                      loading={submitting}
	                      className={styles.step3btn}
	                      type="primary"
	                      >确定</Button>
	            </div>
	            );
	          break;
	  }
	}

  beforeUpload(file) {
    const isJPG = file.type;
    let bolImg = true;
    if (isJPG !=='image/jpg' && isJPG !=='image/jpeg'&& isJPG !=='image/png') {
      message.error('只允许上传图片!');
      bolImg= false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不得超过 2MB!');
    }
    return bolImg && isLt2M;
  }

	handleVerify = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields({ force: true }, (err, values) => {
	    	// console.log(values);
	      const img1Vaule = values.img1 !== undefined ? values.img1.file.thumbUrl : '';
	      const img2Vaule = values.img2 !== undefined ? values.img2.file.thumbUrl : '';
	      const img3Vaule = values.img3 !== undefined ? values.img3.file.thumbUrl : '';
	      const img4Vaule = values.img4 !== undefined ? values.img4.file.thumbUrl : '';

	      if (!err) {

	      	var data = {
	      		...values,
	      		img1 : img1Vaule,
	      		img2 : img2Vaule,
	      		img3 : img3Vaule,
	      		img4 : img4Vaule,
	      	};
	         this.props.dispatch({
	          type: 'registerVerify/upload',
	          payload: {
	            ...data,
	          },
	          callback: this.onUploadCallback,
	        });
	      }
	    });
	  }

  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      notification.error({
        message: "提示",
        description: msg,
      });
    }else {
      notification.success({
        message: "提示",
        description: msg,
      });
    }
  }
  	componentWillMount(){
  		//获取注册用户状态接口（用于判断跳转到第几步）
      const auth = getAuthority();
      if (auth !== 'unaudited-s' && auth !== 'unaudited-p') {
        this.props.dispatch(routerRedux.push('/user/login'));
      } else {
        this.props.dispatch({
          type: 'registerVerify/status',
          payload: {},
        });
      }
  	}
  	// setStep(step){
  	// 	const verifycode = step.verifycode*1;
      //
  	// 	var stepc;
  	// 	if (verifycode == 2) {
       //  stepc = 1
  	// 	}else if (verifycode == 3 || verifycode == -1) {
       //  stepc = 2
  	// 	}
		//   this.props.setState({
		// 	  currentStep : stepc
		//   });
  	// }
	render() {
    const { registerVerify: { currentStep } } = this.props;
    return (
      <div>
        <Steps current={currentStep} className={styles.steps}>
          <Step title="注册账号"/>
          <Step title="认证提交"/>
          <Step title="审核认证"/>
        </Steps>
        <div className={styles.main}>
          {this.renderStep(currentStep)}
      </div>
      </div>

    );
  }
}
