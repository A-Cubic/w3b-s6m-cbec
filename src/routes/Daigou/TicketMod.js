import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button, Table, Card, Form, Row, Col,Divider ,Select,notification} from 'antd';
import styles from '../../utils/utils.less';
import { routerRedux } from 'dva/router'

const Option = Select.Option;
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
  "ticketCode": "",
  "openId": "",
  "shopName": "",
  "status": "",
  "remark": "",
  "img": "",
}

const formItemsName = [
  {label: '小票图片', key: 'img'},
  {label: '小票编号', key: 'ticketCode'},
  {label: '微信编号', key: 'openId'},
  {label: '购买商场', key: 'shopName'},
  {label: '状态', key: 'status'},
  {label: '备注', key: 'remark'},
];

@connect(({ daigou, loading }) => ({
  daigou,
  submitting: loading.effects['daigou/info'],
}))

@Form.create()

export default class TicketMod extends Component {
  state = {
    formValues: {},
    data: {},
  }


  componentDidMount() {
    var goodsTm = this.props.match.params.id;
    console.log(goodsTm);
    const { formValues, data } = this.state;
    this.props.dispatch({
      type: 'daigou/info',
      payload: {
        ticketCode: this.props.match.params.id,
      },
      callback: this.onGetOfferCallback,
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { form, submitting, dispatch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err){
        notification.success({
          message: "提示",
          description: "发生错误",
        });
        return;
      }
      if(fieldsValue.status1=="8"||fieldsValue.status1=="9"){
        if(!fieldsValue.remark1||fieldsValue.remark1==""){
          notification.success({
            message: "提示",
            description: "如改为“录入错误”或“退回”则必须填写备注！",
          });
          return;
        }

      }
      if(!fieldsValue.remark1){
        fieldsValue.remark1="";
      }
      const values = {
        ...fieldsValue,
      };


      this.setState({
        formValues: values,
      });
      console.log(values);
      dispatch({
        type: 'daigou/update',
        payload: {
          ...values,
        },
        callback:this.onUpdateOfferCallback,
      });
    });
  }


  componentWillMount () {
    //假装获取到数据
    this.setState({
      data: data
    });
    const { formValues, pagination } = this.state;

  }

  onGetOfferCallback = (params) => {
    const { data } = this.state;
    const { dispatch } = this.props;
    this.setState({
      data: params,
    });
  }
  onUpdateOfferCallback = (params) => {
    if(params.type==1){
      this.props.dispatch(routerRedux.push('/daigou/ticket'));
    }else{

    }
  }


  render () {
    const { getFieldDecorator } = this.props.form;
    const {  submitting }  = this.props;
    const columns = [{
      title: '品牌名称',
      dataIndex: 'brand',
      key: 'brand',
    },
      {
        title: '品牌金额合计',
        dataIndex: 'price',
        key: 'price',
      }];
    return (
      <div>
        <Card>
          <Row>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                {
                  formItemsName.map(item => {
                    switch (item.key) {
                      case 'img':
                        return (
                          <Col md={14} lg={14} xl={14} key={item.key}>
                            <FormItem
                              {...formItemLayout2}
                              label={item.label}
                              style={{minHeight:'760px' }}
                            >
                              <img src={this.state.data[item.key]}  style={{width: '100%', background: '#f3f3f3', border: 'solid 1px #aaa'}}></img>
                            </FormItem>
                          </Col>
                        );
                      case 'status':
                        return (
                          <Col md={10} lg={10} xl={10} key={item.key}>
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
                      default:
                        return (
                          <Col md={10} lg={10} xl={10} key={item.key}>
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
                <Col md={2} lg={2} xl={2} >
                </Col>
                <Col md={8} lg={8} xl={8} >
                <Table dataSource={this.state.data.ticketModList}
                       columns={columns}
                       pagination={false}
                       bordered
                       rowKey={record => record.id}
                       loading={submitting}/>
                </Col>
                <Col md={10} lg={10} xl={10}>
                  <Divider>With Text</Divider>
                  <Row>
                  <FormItem
                    {...formItemLayout}
                    label ='状态'
                  >
                    {getFieldDecorator('status1', {
                      initialValue: this.state.data.status,
                    })(
                      <Select   >
                        <Option value="0">新录入</Option>
                        <Option value="1">处理中</Option>
                        <Option value="2">处理完成</Option>
                        <Option value="3">兑现完成</Option>
                        <Option value="8">录入错误</Option>
                        <Option value="9">退回</Option>
                      </Select>

                      )
                    }
                  </FormItem>
                </Row>
                  <Row>
                  <FormItem
                    {...formItemLayout}
                    label ='备注信息'
                  >
                    {getFieldDecorator('remark1')(
                      <Input  placeholder="请输入内容" />)
                    }
                  </FormItem>
                  </Row>
                  <Row>
                    <FormItem
                      style={{textAlign:'center'}}
                    >
                      <Button type='primary' className={styles.mR10} htmlType="submit">保存</Button>
                      <Button href={'#/daigou/ticket'}>放弃</Button>
                    </FormItem>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Row>
        </Card>
      </div>
    );
  }
}

