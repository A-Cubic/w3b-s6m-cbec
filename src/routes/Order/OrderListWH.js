import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input, Button, notification,Table,Card,Form,Row, Col, Icon,Radio ,Select } from 'antd';
import styles from '../../utils/utils.less'
import { getToken ,getAuthority} from '../../utils/Global';
import OrderGoods from "./OrderGoodsP";


const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  }
};



@connect(({ order, loading }) => ({
  order,
  submitting: loading.effects['order/listw'],
}))

@Form.create()

export default class OrderListWH extends Component {
  state = {
    formValues: {
    },
    pagination: {
      current: 1,
      total: 10,
      pageSize: 20,
    },
  }

  componentDidMount() {
    const { formValues, pagination } = this.state;

    this.props.dispatch({
      type: 'order/listw',
      payload: {
        ...formValues,
        ...pagination,
      },
    });
  }

  handleSubmit = (e) => {
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
      // console.log(values);
      dispatch({
        type: 'order/listw',
        payload: {
          ...values,
          ...pagination,
        },
      });
    });

  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      // ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'order/listw',
      payload: params,
    });
  }

  handleSizeChange = (e) => {
    const { dispatch } = this.props;
    const { pagination } = this.state;

    // console.log(e.target.value);
    dispatch({
      type: 'order/listw',
      payload: {
        status:e.target.value,
        ...pagination,
      },
    });
    //this.setState({ size: e.target.value });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { order: { list, pagination,total,totalyj }, submitting }  = this.props;
    const columns = [
      // {
      //   title: '订单编号',
      //   dataIndex: 'merchantOrderId',
      //   key: 'merchantOrderId',
      //   width: '20%',
      //   render: (text, record) =>
      //     <div>
      //       <h3>条码：{record.barcode}<br/>商品名：{record.goodsname}</h3>
      //       <span>日本仓：{record.rb}</span><br/>
      //       <span>韩国仓：{record.hg}</span><br/>
      //       <span>国际仓：{record.gj}</span><br/>
      //       <Link to={`/goods/info/nummod/${record.barcode}`}>编辑</Link>
      //     </div>
      // },
      // {
      //   title: '下单时间',
      //   dataIndex: 'tradeTime',
      //   key: 'tradeTime',
      //   width: '20%',
      // },
      // {
      //   title: '订单金额',
      //   dataIndex: 'goodsTotalAmount',
      //   key: 'goodsTotalAmount',
      //   width: '20%',
      // },
      // {
      //   title: '状态',
      //   dataIndex: 'status',
      //   key: 'status',
      //   width: '20%',
      // },
      {
        title: '订单列表',
        dataIndex: 'operate2',
        key: 'operate2',
        width: '20%',
        render: (text, record) =>
          <div>
            <span>下单时间：{record.tradeTime}</span><br/>
            <span>订单编号：{record.merchantOrderId}</span><br/>
            <span>订单金额：￥{record.goodsTotalAmount}</span><br/>
            <span>佣金金额：￥{record.yjsum}</span><br/>
            <span>订单状态：{record.status}</span><br/>
            <Link to={`/account/ordergoods-w/${record.merchantOrderId}`}>查看订单商品</Link>
          </div>
      }];
    return(
      <div>
        <Card>
          <Radio.Group onChange={this.handleSizeChange} size="small" defaultValue="all" >
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="new">新订单</Radio.Button>
            <Radio.Button value="fh">已发货</Radio.Button>
            <Radio.Button value="wc">已完成</Radio.Button>
          </Radio.Group>
        </Card>
        {/*<Card>*/}
          {/*<Form onSubmit={this.handleSubmit}>*/}
            {/*<Row>*/}
                {/*<Col  xs={24} sm={8} md={8} lg={8} xl={8}>*/}
                {/*<FormItem {...formItemLayout} label="订单状态">*/}
                  {/*{getFieldDecorator('status',{initialValue: ""})(*/}
                    {/*<Select placeholder='请选择订单状态'>*/}
                      {/*<Option value={"全部"}>全部</Option>*/}
                      {/*<Option value={"新订单"}>新订单</Option>*/}
                      {/*<Option value={"准备出库"}>准备出库</Option>*/}
                      {/*<Option value={"已发货"}>已发货</Option>*/}
                      {/*<Option value={"已回传"}>已回传</Option>*/}
                    {/*</Select>*/}
                  {/*)}*/}
                {/*</FormItem>*/}

              {/*</Col>*/}
              {/*<Col  xs={6} sm={6} md={6} lg={6} xl={6}><Button type="primary"*/}
                                    {/*className={styles.submit}*/}
                                    {/*htmlType="submit">搜索</Button></Col>*/}
            {/*</Row>*/}
          {/*</Form>*/}
        {/*</Card>*/}
        <Card className={styles.mT10}>
          <h3>订单总金额：￥{total}</h3>
          <Table dataSource={list}
                 columns={columns}
                 pagination={pagination}
                 size="small"
                 rowKey={record => record.id}
                 onChange={this.handleStandardTableChange}
                 loading={submitting}
                 showHeader={false}/>
        </Card>
      </div>
    )

  }
}
