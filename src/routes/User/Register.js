import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Modal, Checkbox, Form, Input, Button, Select, Row, Col, Popover, Progress,Steps,notification,Upload,Icon,Radio} from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: '注册通知',
    description: '',
  });
};

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
export default class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
    currentStep : 0,
    agree:false,
    agreementVisible:false,
  };
  showModalAgreement = (flag) => {
    this.setState({
      agreementVisible: !!flag,
    });
  }
  /*componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const account = this.props.form.getFieldValue('mail');
    if (nextProps.register.status === 'ok') {
      this.props.dispatch(routerRedux.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      }));
    }
  }*/

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onMailCallback = (params) => {
    // let count = 0;
    const count = params.msg;
    if(params.type==="-1") {
      this.setState({count});
    } else if(params.type==="0"){
      notification.error({
        message: "提示",
        description: count,
      });
    }else {
      notification.success({
        message: "提示",
        description: count,
      });
    }
}

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.props.form.validateFields(['mail'],{ force: true }, (err, values) => {
      if (!err) {
        const mail = this.props.form.getFieldValue('mail');
        this.props.dispatch({
          type: 'register/getCode',
          payload: {
            mail,
          },
          callback: this.onMailCallback,
        });
      }
    });

    this.interval = setInterval(() => {
      count = this.state.count - 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  onSubmitCallback = (params) => {
    const msg = params.msg;
    notification.error({
      message: "提示",
      description: msg,
    });

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        // console.log(values);
        this.props.dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            // type: 2,
          },
          callback: this.onSubmitCallback,
        });
      }
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = (value) => {
    this.setState({
      prefix: value,
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };
  handleChangeRole = (e) =>{
    this.props.form.setFields({
          type:{
            value : e.target.value
          }
      });
  }
  handleMail = (rule, value, callback) => {
    var re = /^1\d{10}$/;
    if (re.test(value)) {
      callback();
    } else {
      var re1 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if(re1.test(value)){
        callback();
      }else{
        // callback("填写错误，请填入正确的邮箱或者手机号码！");
        callback("填写错误，请填入正确的手机号码！");
      }

    }

  }
  onChangeCheckbox=(e)=>{
    this.setState({
      agree:e.target.checked,
    })
  }
  handleChangeCheckbox=(flag)=>{
    this.setState({
      agree:!!flag,
    })
  }
  renderStep = (currentStep) => {
    const { form, submitting } = this.props;
    const { getFieldDecorator,getFieldsValue,getFieldValue } = form;
    const { count, prefix,type } = this.state;
    const fileList = [];
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
        action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        defaultFileList: [...fileList],
      };

    switch(currentStep){
      case 0 :
            return(
                <Form onSubmit={this.handleSubmit}>
                  <FormItem
                  {...formItemLayout}
                    label ='注册身份'
                  >
                    {getFieldDecorator('type', {
                      rules: [
                        {
                          required: true,
                          message: '请选择注册身份',
                        }
                      ],
                      initialValue: getFieldValue('type')
                    })(
                      <RadioGroup onChange={this.handleChangeRole} >
                        <Radio value={1}>供应商</Radio>
                        <Radio value={2}>采购商</Radio>
                        <Radio value={3}>渠道代理</Radio>
                        <Radio value={4}>分销商</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>

                  <FormItem
                  {...formItemLayout}
                    // label ='邮箱/手机号码'
                    label ='手机号码'
                  >
                    {getFieldDecorator('mail', {

                      rules: [
                        {
                          required: true,
                          // message: '请输入邮箱地址或手机号！',
                          message: '请输入手机号！',
                        }, {
                          validator: this.handleMail,
                        }
                        // ,
                        // {
                        //   type: 'email',
                        //   message: '邮箱地址格式错误！',
                        // }
                      ],
                    })(
                      <Input size="large" placeholder="手机号" />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label ='验证码'>
                    <Row gutter={8}>
                      <Col span={16}>
                        {getFieldDecorator('captcha', {
                          rules: [
                            {
                              required: true,
                              message: '请输入6位验证码！',
                              len: 6
                            },
                          ],
                        })(<Input size="large" placeholder="验证码"/>)}
                      </Col>
                      <Col span={8}>
                        <Button
                          size="large"
                          disabled={count}
                          className={styles.getCaptcha}
                          onClick={ this.onGetCaptcha }
                        >
                          {count ? `${count} s` : '获取验证码'}
                        </Button>
                      </Col>
                    </Row>
                  </FormItem>
                    <FormItem
                      help={this.state.help}
                       {...formItemLayout}
                      label ='密码'
                    >
                    <Popover
                      content={
                        <div style={{ padding: '4px 0' }}>
                          {passwordStatusMap[this.getPasswordStatus()]}
                          {this.renderPasswordProgress()}
                          <div style={{ marginTop: 10 }}>
                            请至少输入 6 个字符。请不要使用容易被猜到的密码。
                          </div>
                        </div>
                      }
                      overlayStyle={{ width: 240 }}
                      placement="right"
                      visible={this.state.visible}
                    >
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            validator: this.checkPassword,
                          },
                        ],
                      })(
                        <Input
                          size="large"
                          type="password"
                          placeholder="至少6位密码，区分大小写"
                        />
                      )}
                    </Popover>
                  </FormItem>
                  <FormItem
                     {...formItemLayout}
                    label ='确认密码'>
                    {getFieldDecorator('confirm', {
                      rules: [
                        {
                          required: true,
                          message: '请确认密码！',
                        },
                        {
                          validator: this.checkConfirm,
                        },
                      ],
                    })(<Input size="large" type="password" placeholder="确认密码" />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label =' '
                    colon={false}>
                    <Checkbox onChange={this.onChangeCheckbox} checked={this.state.agree}>我已阅读并同意</Checkbox><span style={{cursor:'pointer'}} onClick={()=>this.showModalAgreement(true)}>《流连用户协议》</span>

                  </FormItem>
                  <FormItem
                     {...formItemLayout}
                    label =' '
                    colon={false}>
                    <Button
                      size="large"
                      loading={submitting}
                      className={styles.submit}
                      type="primary"
                      htmlType="submit"
                      disabled={!this.state.agree}
                    >
                      注册
                    </Button>
                    <Link className={styles.login} to="/user/login">
                      使用已有账户登录
                    </Link>
                  </FormItem>
                </Form>
              );
            break;
    }
  }
  componentDidMount (){
    var type = parseInt(this.props.match.params.type);
    if(!type || (type!==2 && type!==3)){
      return
    }
    //初始设置注册身份
    this.props.form.setFields({
          type:{
            value : type
          }
      });
    // console.log(this.props.form.getFieldsValue())
  }
  render() {
    const {agreementVisible} = this.state;
    const parent ={
      showModalAgreement:this.showModalAgreement,
      agreementVisible:agreementVisible,
      handleChangeCheckbox:this.handleChangeCheckbox,
    }
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
        <Agreement
          parent={parent}
        />
      </div>

    );
  }
}

class Agreement extends React.Component {

  handleOk = (e) => {
    this.props.parent.handleChangeCheckbox(true)
    this.props.parent.showModalAgreement(false)
  }

  handleCancel = (e) => {
    this.props.parent.showModalAgreement(false)
  }

  render() {
    return (
      <div>
        <Modal
          title="流连用户协议"
          width={650}
          visible={this.props.parent.agreementVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="primary" onClick={this.handleOk}>好的，我已阅读并同意</Button>
          ]}
        >
          <div style={{fontSize:14,padding:'0 20px'}}>
            <p>流连B2B平台将对用户所提供的资料进行严格的管理及保护，用户自愿注册个人信息，用户在注册时提供的所有信息，都是基于自愿，用户有权在任何时候拒绝提供这些信息。</p>
            <p>流连B2B平台保证不对外公开或向第三方提供用户注册的个人资料，及用户在使用服务时存储的非公开内容，但下列情况除外：<br/>
              1.事先获得您的明确授权。<br/>
              2.根据有关的法律法规要求。<br/>
              3.按照相关司法机构或政府主管部门的要求。<br/>
              4.只有透露您的个人资料，才能提供你所要求的产品和服务。<br/>
              5.因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用。<br/>
              6.由于您将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露。</p>
            <p>流连B2B平台承诺尊重您的隐私和您的个人信息安全，并且承诺尽可能地为您提供最佳的服务。</p>
          </div>

        </Modal>
      </div>
    );
  }
}
