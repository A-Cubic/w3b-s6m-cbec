import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input, Button, notification,Table,Card,Form,Row, Col,Divider,Switch ,Select } from 'antd';
import styles from '../../utils/utils.less'
import { getToken ,getAuthority} from '../../utils/Global';


const { Option } = Select;
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
  submitting: loading.effects['order/goodslist'],
}))

@Form.create()

export default class OrderGoodsP extends Component {
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
      type: 'order/goodslist',
      payload: {
        orderid: this.props.match.params.id,
        ...pagination,
      },
    });
  }
  //
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { form, submitting, dispatch } = this.props;
  //   const { pagination } = this.state;
  //   form.validateFields((err, fieldsValue) => {
  //     if (err) return;
  //
  //     const values = {
  //       ...fieldsValue,
  //     };
  //
  //     this.setState({
  //       formValues: values,
  //     });
  //     console.log(values);
  //     dispatch({
  //       type: 'order/listp',
  //       payload: {
  //         ...values,
  //         ...pagination,
  //       },
  //     });
  //   });
  //
  // }
  //
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
      type: 'order/goodslist',
      payload: params,
    });
  }
  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.getData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { order: { goodsList, pagination }, submitting }  = this.props;
    const columns = [
      // {
      //   title: '订单编号',
      //   dataIndex: 'merchantOrderId',
      //   key: 'merchantOrderId',
      // },
      // {
      //   title: '条码',
      //   dataIndex: 'barCode',
      //   key: 'barCode',
      // },
      // {
      //   title: '售价',
      //   dataIndex: 'skuUnitPrice',
      //   key: 'skuUnitPrice',
      // },
      // {
      //   title: '数量',
      //   dataIndex: 'quantity',
      //   key: 'quantity',
      // },
      {
        title: '商品名',
        dataIndex: 'skuBillName',
        key: 'skuBillName',
        render: (text, record) =>
          <div>
            <span>商品名：{record.skuBillName}</span><br/>
            <span>售价：￥{record.skuUnitPrice}</span>
            <span>佣金：￥{record.skuUnitPrice}</span><br/>
            <span>数量：{record.quantity}</span><br/>
          </div>
      }
    ];

    return(
      <div>
        <Card>
        <h2>订单商品信息</h2><Button href={'#/account/order-w'}>返回</Button>
      </Card>
         <Card className={styles.mT10}>
          <Table dataSource={goodsList}
                 showHeader={false}
                 columns={columns}
                 pagination={pagination}
                 rowKey={record => record.id}
                 onChange={this.handleStandardTableChange}
                 loading={submitting}/>
        </Card>
      </div>
    )

  }
}
