import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import ModalUnteratedOrder from './ModalUnteratedOrder';
import styles from './untreatedOrder.less';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({o2o,  loading }) => ({
  o2o,
  loading: loading.effects['o2o/list'],
}))

@Form.create()
export default class completeOrder extends Component {
  state={
    visible: false,
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type: 'o2o/list',
      payload: {
        status:'已完成订单',
      },
    });
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)

      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        'date': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'o2o/list',
        payload: {
          status:'已完成订单',
          ...values,
        },
      });
    });


  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.init();
  }
  handleVisible = (flag) => {
    this.setState({
      visible:!!flag,
    });
  }
  handleChildrenCheck =(record)=>{
    this.props.dispatch({
      type: 'o2o/orderCheck',
      payload: {
        orderId:record.merchantOrderId,
      },
    });
    setTimeout(()=>{
      this.handleVisible(true);
    },0)
  }
  renderAdvancedForm(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="店铺名">
              {getFieldDecorator('shopId',{
                initialValue :'S005'
              })(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="S005">流连优选大连奥林匹克展会</Option>
                  {/* {brandsData.map(val => <Option key={val.id} value={val.id} label={val.name}>{val.name}</Option>)} */}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="仓库">
              {getFieldDecorator('wcode')(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="重庆仓库">重庆仓库</Option>
                  <Option value="香港仓库">香港仓库</Option>
                  <Option value="青岛仓库">青岛仓库</Option>
                  {/* {brandsData.map(val => <Option key={val.id} value={val.id} label={val.name}>{val.name}</Option>)} */}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('orderId')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {/*<Col md={8} sm={24} style={{display:'none'}}>*/}
            {/*<FormItem label="订单状态">*/}
              {/*{getFieldDecorator('status')(*/}
                {/*<Select*/}
                  {/*placeholder="请选择"*/}
                  {/*optionFilterProp="label"*/}
                  {/*// onChange={this.onSelectChange}*/}
                {/*>*/}
                  {/*<Option value="新订单">新订单</Option>*/}
                  {/*<Option value="已导出">已导出</Option>*/}
                  {/*<Option value="已录运单号">已录运单号</Option>*/}
                  {/*<Option value="已完成">已完成</Option>*/}
                  {/*/!* {brandsData.map(val => <Option key={val.id} value={val.id} label={val.name}>{val.name}</Option>)} *!/*/}
                {/*</Select>*/}
              {/*)}*/}
            {/*</FormItem>*/}
          {/*</Col>*/}
          <Col md={8} sm={24}>
            <FormItem label="时段">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 0 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <Button style={{ marginLeft: 8 }} >导出订单</Button>
            <Button style={{ marginLeft: 8 }} >导入运单</Button>
          </span>
        </div>
      </Form>
    );
  }
  render() {
    // console.log('1',this.props)
    const { o2o:{list, pagination} } = this.props;
    const dataSource = [
      {
      key: '1',
      status: '新订单',
      orderNumber: '12345646',
      waybillNumber: '415646132',
      orderTime:'2018-01-12 10:10:10',
      name:'收件人a'
    }, {
      key: '2',
      status: '新订单',
      orderNumber: '12345646',
      waybillNumber: '415646132',
      orderTime:'2018-01-12 10:10:10',
      name:'收件人b'
    }
    ];

    const columns = [
      {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '订单号',
      dataIndex: 'merchantOrderId',
      key: 'merchantOrderId',
    }, {
      title: '运单号',
      dataIndex: 'waybillno',
      key: 'waybillno',
    }, {
      title: '下单时间',
      dataIndex: 'tradeTime',
      key: 'tradeTime',
    }, {
      title: '收件人姓名',
      dataIndex: 'consigneeName',
      key: 'consigneeName',
    },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) => <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>查看</a>
      }
    ];
    const {visible} = this.state;
    const parent  = {
      visible:visible,
      handleVisible : this.handleVisible,
    };
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderAdvancedForm()}
            </div>
          </div>
        </Card>
        <Card className={styles.mT10}>
          <Table dataSource={list}
                 rowKey={record => record.id}
                 columns={columns}
                 pagination={pagination}
                 // rowKey={record => record.id}
                 // loading={submitting}
          />
        </Card>
        <ModalUnteratedOrder
          parent = {parent}
        />
      </div>
    );
  }
}
