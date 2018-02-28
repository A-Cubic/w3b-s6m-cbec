import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table, Card, Form, Row, Col, Steps, message, Radio, Upload } from 'antd';
import styles from '../../utils/utils.less';


const FormItem = Form.Item;
const Step = Steps.Step;
const RadioGroup = Radio.Group;

const dataSource = [{
    key: '1',
    goodsTm: '1',
    goodsCode: 1,
    goodsName: '1',
    goodsQuote:1,
    gys:1
},{
    key: '2',
    goodsTm: '2',
    goodsCode: 2,
    goodsName: '2',
    goodsQuote:2,
    gys:2
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
  
const columns = [{
    title: '商品条码',
    dataIndex: 'goodsTm',
    key: 'goodsTm',
}, {
    title: '商品编号',
    dataIndex: 'goodsCode',
    key: 'goodsCode',
}, {
    title: '商品名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
},{
    title: '商品报价',
    dataIndex: 'goodsQuote',
    key: 'goodsQuote',
},{
    title: '供应商',
    dataIndex: 'gys',
    key: 'gys',
}];


const keyItems = [
    {label: '商品序号', keyName: 'id', placeholder: '商品序号'},
    {label: '供应商', keyName: 'userCode', placeholder: '供应商'},
    {label: '公司名称', keyName: 'company', placeholder: '公司名称'},
    {label: '商品编码', keyName: 'goodsId', placeholder: '商品编码'},
    {label: '商品条码', keyName: 'barcode', placeholder: '商品条码'},
    {label: '商品名称', keyName: 'goodsName', placeholder: '商品名称'},
    {label: '商品报价', keyName: 'offer', placeholder: '商品报价'},
    {label: '备注', keyName: 'remark', placeholder: ''},
    {label: '状态', keyName: 'flag'},
    {label: '缩略图', keyName: 'slt'},
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
    constructor (props) {
        super(props);
        this.state = {
            current: 0
        }
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render () {
        const { getFieldDecorator } = this.props.form;

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
                                    {
                                        keyItems.map(item => {
                                            switch (item.keyName) {
                                                case 'flag': 
                                                    return (
                                                        <Col xs={2} sm={4} md={6} lg={8} xl={10} key={item.keyName}>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label = {item.label}
                                                                style={{textAlign: 'left'}}
                                                            >
                                                                {getFieldDecorator(item.keyName)(
                                                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                                                        <Radio value={1}>批准</Radio>
                                                                        <Radio value={0}>未批准</Radio>
                                                                    </RadioGroup>)
                                                                }
                                                            </FormItem>
                                                        </Col>
                                                    );
                                                case 'slt': 
                                                    return (
                                                        <Col xs={2} sm={4} md={6} lg={8} xl={10} key={item.keyName}>
                                                            2
                                                        </Col>
                                                    );
                                                default:
                                                    return (
                                                        <Col xs={2} sm={4} md={6} lg={8} xl={10} key={item.keyName}>
                                                            <FormItem
                                                                {...formItemLayout}
                                                                label = {item.label}
                                                            >
                                                                {getFieldDecorator(item.keyName)(
                                                                    <Input  placeholder={item.placeholder} />)
                                                                }
                                                            </FormItem>
                                                        </Col>
                                                    );
                                            }
                                        })
                                    }
                                </Row>
                            </div>
                        }
                    </div>
                    <div className={styles['steps-action']}>
                        {
                            this.state.current < steps.length - 1
                            &&
                            <Button type="primary" onClick={() => this.next()}>Next</Button>
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