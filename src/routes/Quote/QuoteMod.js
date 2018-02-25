import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button, Table, Card, Form, Row, Col } from 'antd';
import styles from '../../utils/utils.less';


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

const data = {
  "id": 1,
  "userCode": "admin",
  "company": "BGN",
  "goodsId": 1,
  "barcode": 123,
  "goodsName": "ces",
  "offer": 33.32,
  "remark": "",
  "flag": 1,
  "slt": "slt",
}

const formItemsName = [
  {label: '序号', key: 'id'},
  {label: '供应商code', key: 'userCode'},
  {label: '公司名', key: 'company'},
  {label: '商品序号', key: 'goodsId'},
  {label: '商品条码', key: 'barcode'},
  {label: '商品名称（中文）', key: 'goodsName'},
  {label: '报价', key: 'offer'},
  {label: '备注', key: 'remark'},
  {label: '审批状态', key: 'flag'},
  {label: '缩略图', key: 'slt'},
];

@Form.create()

class QuoteMod extends Component {

  constructor () {
    super();
    this.state = {
      data: null
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let offer = e.target.value;
    console.log(this.state.data);
  }

  handleDelete = e => {
    e.preventDefault();
    const { id } = this.state.data;
    console.log(id);
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      data: {
        ...this.state.data,
        offer: e.target.value
      }
    })
  }

  componentWillMount () {
    let goodsTm = this.props.match.params.id;
    console.log(goodsTm);
    //假装获取到数据
    this.setState({
      data: data
    });
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
                          <Col md={6} lg={8} xl={10} key={item.key}>
                            <FormItem
                              {...formItemLayout}
                              label={item.label}
                            >
                              <div style={{width: 90, height: 90, background: '#f3f3f3', border: 'solid 1px #aaa'}}></div>
                            </FormItem>
                          </Col>
                        );
                      case 'offer':
                        return (
                          <Col md={6} lg={8} xl={10} key={item.key}>
                            <FormItem
                              {...formItemLayout}
                              label={item.label}
                            >
                              {getFieldDecorator(`type-${item.key}`,{
                                initialValue: this.state.data ? this.state.data[item.key] : ''
                              })(
                                <Input onChange={this.handleChange} />
                              )}
                            </FormItem>
                          </Col>
                        );
                      default:
                        return (
                          <Col md={6} lg={8} xl={10} key={item.key}>
                            <FormItem
                              {...formItemLayout}
                              label={item.label}
                            >
                              {getFieldDecorator(`type-${item.key}`,{
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
                    <Button onClick={this.handleDelete}>放弃</Button>
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


export default QuoteMod;
