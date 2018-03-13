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
  "id": "",
  "barcode": "",
  "goodsname": "",
  "goodsNameE": "",
  "brand": "",
  "brandE": "",
  "slt": "",
}

const formItemsName = [
  {label: '缩略图', key: 'slt'},
  {label: '序号', key: 'id'},
  {label: '商品条码', key: 'barcode'},
  {label: '商品名称（中文）', key: 'goodsname'},
  {label: '商品名称（外文）', key: 'goodsNameE'},
  {label: '品牌名称（中文）', key: 'brand'},
  {label: '品牌名称（外文）', key: 'brandE'},
];

@connect(({ goods, loading }) => ({
  goods,
  submitting: loading.effects['goods/info'],
}))

@Form.create()

export default class goodsMod extends Component {
  state = {
    formValues: {},
    data: {},
  }


  componentDidMount() {
    const { formValues, data } = this.state;
    this.props.dispatch({
      type: 'goods/info',
      payload: {
        id: this.props.match.params.id,
      },
      callback: this.onGetGoodsCallback,
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { form, submitting, dispatch } = this.props;
    const { pagination } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });
      console.log(values);
      dispatch({
        type: 'goods/update',
        payload: {
          ...values,
        },
        callback:this.onUpdateGoodsCallback,
      });
    });
  }


  componentWillMount () {
    let goodsid = this.props.match.params.id;
    console.log(goodsid);
    //假装获取到数据
    this.setState({
      data: data
    });
    const { formValues, pagination } = this.state;

  }

  onGetGoodsCallback = (params) => {
    const { data } = this.state;
    const { dispatch } = this.props;
    this.setState({
      data: params,
    });
  }
  onUpdateGoodsCallback = (params) => {
    if(params.type==="1"){
      notification.success({
        message: "提示",
        description: "修改完成",
      });
      this.props.dispatch(routerRedux.push('/goods/info/list'));
    }else{
      notification.error({
        message: "提示",
        description: msg,
      });
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
                      case 'slt':
                        return (
                          <Col md={24} lg={24} xl={24} key={item.key}>
                            <FormItem
                              {...formItemLayout2}
                              label={item.label}
                            >
                              <img src={this.state.data[item.key]}  style={{width: 200, height: 200, background: '#f3f3f3', border: 'solid 1px #aaa'}}></img>
                            </FormItem>
                          </Col>
                        );
                      // case 'offer':
                      //   return (
                      //     <Col md={6} lg={8} xl={12} key={item.key}>
                      //       <FormItem
                      //         {...formItemLayout}
                      //         label={item.label}
                      //       >
                      //         {getFieldDecorator(`${item.key}`,{
                      //           initialValue: this.state.data ? this.state.data[item.key] : ''
                      //         })(
                      //           <InputNumber />
                      //         )}
                      //       </FormItem>
                      //     </Col>
                      //   );
                      // case 'remark':
                      //   return (
                      //     <Col md={6} lg={8} xl={12} key={item.key}>
                      //       <FormItem
                      //         {...formItemLayout}
                      //         label={item.label}
                      //       >
                      //         {getFieldDecorator(`${item.key}`,{
                      //           initialValue: this.state.data ? this.state.data[item.key] : ''
                      //         })(
                      //           <Input />
                      //         )}
                      //       </FormItem>
                      //     </Col>
                      //   );
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
                    <Button href={'#/goods/info/list'}>放弃</Button>
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

