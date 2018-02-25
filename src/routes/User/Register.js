import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress,Steps,notification,Upload,Icon   } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const Step = Steps.Step;
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
    currentStep : 0
  };

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
        this.props.dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            type: 2,
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
  renderStep = (currentStep) => {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix } = this.state;
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
                    label ='邮箱/手机号码'
                  >
                    {getFieldDecorator('mail', {

                      rules: [
                        {
                          required: true,
                          message: '请输入邮箱地址！',
                        },
                        {
                          type: 'email',
                          message: '邮箱地址格式错误！',
                        },
                      ],
                    })(<Input size="large" placeholder="邮箱" />)}
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
                              message: '请输入验证码！',
                            },
                          ],
                        })(<Input size="large" placeholder="验证码" />)}
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
                    <Button
                      size="large"
                      loading={submitting}
                      className={styles.submit}
                      type="primary"
                      htmlType="submit"
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
