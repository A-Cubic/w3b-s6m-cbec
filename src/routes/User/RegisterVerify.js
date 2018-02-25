import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress,Steps,notification,Upload,Icon   } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const Step = Steps.Step;

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
export default class RegisterVerify extends Component {
	state = {
	  currentStep : 1,
	  verifyMsg:{}
	};
	renderStep = (currentStep) => {
	  const { form, submitting } = this.props;
	  const { getFieldDecorator,getFieldsValue,validateFields,setFields } = form;
	  const { count, prefix } = this.state;
	  var temUploadKey = '';
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
	  const props = {
	      action: '/llback/user/validate',
	      listType: 'picture',
	      onChange({ file, fileList }) {
	          if (file.status !== 'uploading') {
	            console.log(file);
	            setFields({
	            	certification: {
	                    value: {
	                    	// ...getFieldsValue('certification'),
	                    	[temUploadKey]:file.thumbUrl
	                    }
	                  }
	            });
	            // console.log(getFieldsValue());
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
	                      <Row>
	                        <Col span={12}>
	                          <Upload {...props} >
	                              <Button id="img1" onClick={cusUpload}>
	                                <Icon type="upload"/> 营业执照
	                              </Button>
	                            </Upload>
	                        </Col>
	                        <Col span={12}>
	                          <Upload {...props}>
	                              <Button>
	                                <Icon type="upload" /> 组织机构代码
	                              </Button>
	                            </Upload>
	                        </Col>
	                      </Row>
	                       <Row>
	                        <Col span={12}>
	                          <Upload {...props}>
	                              <Button>
	                                <Icon type="upload" /> 税务登记证
	                              </Button>
	                            </Upload>
	                        </Col>
	                        <Col span={12}>
	                          <Upload {...props}>
	                              <Button>
	                                <Icon type="upload" /> 营业执照（三证合一）
	                              </Button>
	                            </Upload>
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
	handleVerify = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
         /*this.props.dispatch({
          type: 'register/verify',
          payload: {
            ...values,
            prefix: this.state.prefix,
          },
        });*/
        console.log(values);
        this.state.currentStep++;
      }
    });
  }

	render() {
    return (
      <div>
        <Steps current={this.state.currentStep} className={styles.steps}>
          <Step title="注册账号"/>
          <Step title="认证提交"/>
          <Step title="审核认证"/>
        </Steps>
        <div className={styles.main}>
          {this.renderStep(this.state.currentStep)}
      </div>
      </div>
      
    );
  }
}