import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button, Table, Card, Form, Row, Col ,InputNumber,notification} from 'antd';
import styles from '../../utils/utils.less';
import { routerRedux } from 'dva/router';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  }
};
const formItemLayout2 = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4},
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  }
};

const data = {
  "barcode": "",
  "goodsname": "",
  "rb": "",
  "hg": "",
  "gj": "",
}

const formItemsName = [
  {label: '商品条码', key: 'barcode'},
  {label: '商品名称（中文）', key: 'goodsname'},
  {label: '日本仓', key: 'rb'},
  {label: '韩国仓', key: 'hg'},
  {label: '国籍仓', key: 'gj'},
];

@connect(({ goods, loading }) => ({
  goods,
  submitting: loading.effects['goods/numinfo'],
}))

@Form.create()

export default class GoodsNumMod extends Component {
  state = {
    formValues: {},
    data: {},
  }


  componentDidMount() {
    const { formValues, data } = this.state;
    // console.log(123);
    this.props.dispatch({
      type: 'goods/numinfo',
      payload: {
        id: this.props.match.params.id,
      },
      callback: this.onGetOfferCallback,
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { form, submitting, dispatch } = this.props;
    const { pagination } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err){
        notification.success({
          message: "提示",
          description: "发生错误",
        });
        return;
      }
      if(fieldsValue.offer<0||fieldsValue.offer>99999){
        notification.success({
          message: "提示",
          description: "报价错误，请录入合适的数值！",
        });
        return;
      }
      const values = {
        ...fieldsValue,
      };


      this.setState({
        formValues: values,
      });
      console.log(values);
      dispatch({
        type: 'goods/updateKC',
        payload: {
          ...values,
        },
        callback:this.onUpdateOfferCallback,
      });
    });
  }


  componentWillMount () {
    let goodsTm = this.props.match.params.id;
    console.log(goodsTm);
    //假装获取到数据
    this.setState({
      data: data
    });
    const { formValues, pagination } = this.state;

  }

  onGetOfferCallback = (params) => {
    this.setState({
      data: params,
    });
  }
  onUpdateOfferCallback = (params) => {
    if(params.type==1){
      this.props.dispatch(routerRedux.push('/goods/info/num'));
    }else{

    }
  }


  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card>
          <Row>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                {
                  formItemsName.map(item => {
                    switch (item.key) {
                      case 'rb':
                        return (
                          <Col md={6} lg={8} xl={12} key={item.key}>
                            <FormItem
                              {...formItemLayout}
                              label={item.label}
                            >
                              {getFieldDecorator(`${item.key}`,{
                                initialValue: this.state.data ? this.state.data[item.key] : ''
                              })(
                                <InputNumber />
                              )}
                            </FormItem>
                          </Col>
                        );
                      case 'hg':
                        return (
                          <Col md={6} lg={8} xl={12} key={item.key}>
                            <FormItem
                              {...formItemLayout}
                              label={item.label}
                            >
                              {getFieldDecorator(`${item.key}`,{
                                initialValue: this.state.data ? this.state.data[item.key] : ''
                              })(
                                <InputNumber />
                              )}
                            </FormItem>
                          </Col>
                        );
                      case 'gj':
                        return (
                          <Col md={6} lg={8} xl={12} key={item.key}>
                            <FormItem
                              {...formItemLayout}
                              label={item.label}
                            >
                              {getFieldDecorator(`${item.key}`,{
                                initialValue: this.state.data ? this.state.data[item.key] : ''
                              })(
                                <InputNumber />
                              )}
                            </FormItem>
                          </Col>
                        );
                      default:
                        return (
                          <Col md={6} lg={8} xl={12} key={item.key}>
                            <FormItem
                              {...formItemLayout}
                              label={item.label}
                            >
                              {getFieldDecorator(`${item.key}`,{
                                initialValue: this.state.data ? this.state.data[item.key] : ''
                              })(
                                <Input disabled />
                              )}
                            </FormItem>
                          </Col>
                        );
                    }
                  })
                }
              </Row>
              <Row>
                <Col>
                  <FormItem
                    style={{marginLeft: '8%'}}
                  >
                    <Button type='primary' className={styles.mR10} htmlType="submit">保存</Button>
                    <Button href={'#/goods/info/num'}>放弃</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Row>
        </Card>
      </div>
    );
  }
}

