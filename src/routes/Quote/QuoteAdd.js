import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table, Card, Form, Row, Col, Steps, message, Radio, Upload,Divider,Switch,InputNumber } from 'antd';
import styles from '../../utils/utils.less';


const FormItem = Form.Item;
const Step = Steps.Step;
const RadioGroup = Radio.Group;

const dataSource = [{
  id: 1,
  barcode: '1',
  goodsName: '1',
  offer:1,
  slt:''
},{
  id: 2,
  barcode: '2',
  goodsName: '2',
  offer:2,
  slt:''
}];

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
  "id": "",
  "userCode": "",
  "company": "",
  "goodsId": "",
  "barcode": "",
  "goodsName": "",
  "offer": "",
  "remark": "",
  "flag": "",
  "slt": "",
}

const keyItems = [
    {label: '缩略图', keyName: 'slt'},
    {label: '商品序号', keyName: 'id', placeholder: '商品序号'},
    {label: '商品条码', keyName: 'barcode', placeholder: '商品条码'},
    {label: '商品名称', keyName: 'goodsName', placeholder: '商品名称'},
    {label: '商品报价', keyName: 'offer', placeholder: '商品报价'},
    {label: '备注', keyName: 'remark', placeholder: ''},
];


const steps = [{
    title: '第一步',
    render: () => {
        return (
            <div>
                <input type="text"/><br/>
                <button>click!</button>
            </div>
        );
    }
  }, {
    title: '第二步',
    content: '您已经完成操作!'
  }
];

@Form.create()

export default class QuoteAdd extends Component {
  state = {
    formValues: {},
    data: {},
    current:0,
  }

  constructor (props) {
        super(props);
        this.state = {
            current: 0
        }
    }

    next= (record) => {
      // this.setState({
      //   data: data
      // });
      //   const current = this.state.current + 1;
        this.setState({
          data: record,
          current:1,
        });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render () {
        const { getFieldDecorator } = this.props.form;

      const columns = [{
        title: '商品序号',
        dataIndex: 'id',
        key: 'id',
      },{
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
      },  {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      },{
        title: '商品报价',
        dataIndex: 'offer',
        key: 'offer',
      },{
        title: '供应商',
        dataIndex: 'gys',
        key: 'gys',
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render:(text, record)=>
          <div>
            {/*<Link to={`/goods/quote/mod/${record}`}>添加</Link>*/}
            <button onClick={()=>this.next(record)}>添加</button>
            {/*<Divider type="vertical" />*/}
            {/*/!*<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />*!/*/}

            {/*<Switch checkedChildren="使用中"*/}
                    {/*unCheckedChildren="冻结"*/}
                    {/*defaultChecked={record.flag==="0"?false:true}*/}
                    {/*onChange={()=>this.handleChangeStatus(record)}/>*/}
          </div>

      }];
        return (
            <div>
                <Card>
                    <Steps current={this.state.current} style={{width: '40%'}}>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className={styles['steps-content']}>
                        {
                            this.state.current < steps.length -1
                            &&
                            <div>
                                <Row>
                                    <Col xs={2} sm={4} md={6} lg={8} style={{marginLeft: 20}}>
                                        <FormItem>
                                            <Input type="text" placeholder='请输入你要搜索的商品'/>
                                        </FormItem>
                                    </Col>
                                    <Col xs={2}>
                                        <FormItem>
                                            <Button type='primary'>搜索</Button>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <div className={styles['steps-content']} style={{paddingTop: 0, margin: 20, border: 'none'}}>
                                    <Table dataSource={dataSource} columns={columns}/>
                                </div>
                            </div>
                        }
                        {
                            this.state.current === steps.length - 1
                            &&
                            <div>
                                <Row>

                                  <Form onSubmit={this.handleSubmit}>
                                    <Row>
                                    {
                                        keyItems.map(item => {
                                            switch (item.keyName) {
                                                case 'slt':
                                                    return (
                                                      <Col md={24} lg={24} xl={24} key={item.key}>
                                                        <FormItem
                                                          {...formItemLayout}
                                                          label={item.label}
                                                        >
                                                          <img src={this.state.data[item.keyName]}  style={{width: 200, height: 200, background: '#f3f3f3', border: 'solid 1px #aaa'}}></img>
                                                        </FormItem>
                                                      </Col>

                                                    );
                                              case 'offer':
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
                                              case 'remark':
                                                return (
                                                  <Col md={6} lg={8} xl={12} key={item.key}>
                                                    <FormItem
                                                      {...formItemLayout}
                                                      label={item.label}
                                                    >
                                                      {getFieldDecorator(`${item.key}`,{
                                                        initialValue: this.state.data ? this.state.data[item.key] : ''
                                                      })(
                                                        <Input />
                                                      )}
                                                    </FormItem>
                                                  </Col>
                                                );
                                                default:
                                                    return (
                                                        <Col xs={2} sm={4} md={6} lg={8} xl={10} key={item.keyName}>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label = {item.label}
                                                            >
                                                              {getFieldDecorator(`${item.key}`,{
                                                                initialValue: this.state.data ? this.state.data[item.key] : ''
                                                              })(
                                                                <Input disabled/>
                                                              )}
                                                            </FormItem>
                                                        </Col>
                                                    );
                                            }
                                        })
                                    }
                                    </Row>
                                  </Form>
                                </Row>
                            </div>
                        }
                    </div>
                    <div className={styles['steps-action']}>
                        {
                            // this.state.current < steps.length - 1
                            // &&
                            // <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {
                            this.state.current === steps.length - 1
                            &&
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                        }
                    </div>
                </Card>
            </div>
        );
    }
}
