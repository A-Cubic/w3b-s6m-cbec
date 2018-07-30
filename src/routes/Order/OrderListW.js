import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input, Button, notification,Table,Card,Form,Row, Col,Divider,Switch ,Select ,List} from 'antd';
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
  submitting: loading.effects['order/listw'],
}))

@Form.create()

export default class OrderListW extends Component {
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


  render(){
    const { getFieldDecorator } = this.props.form;
    const { order: { list, pagination }, submitting }  = this.props;
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'merchantOrderId',
        key: 'merchantOrderId',
        width: '20%',
      },
      {
        title: '下单时间',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
        width: '20%',
      },
      {
        title: '订单金额',
        dataIndex: 'goodsTotalAmount',
        key: 'goodsTotalAmount',
        width: '20%',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '20%',
      },
      {
        title: '查看',
        dataIndex: 'operate2',
        width: '20%',
        key: 'operate2',
        render:(text, record)=>
          <div>
            <Link to={`/account/ordergoods-s/${record.merchantOrderId}`}>查看订单商品</Link>

          </div>

      }];

    return(
      <div>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col  xs={24} sm={24} md={12} lg={12} xl={12}>
                <FormItem {...formItemLayout} label="订单状态">
                  {getFieldDecorator('status',{initialValue: ""})(
                    <Select placeholder='请选择订单状态'>
                      <Option value={"全部"}>全部</Option>
                      <Option value={"新订单"}>新订单</Option>
                      <Option value={"准备出库"}>准备出库</Option>
                      <Option value={"已发货"}>已发货</Option>
                      <Option value={"已回传"}>已回传</Option>
                    </Select>
                  )}
                </FormItem>

              </Col>
              <Col  xs={6} sm={6} md={6} lg={6} xl={6}><Button type="primary"
                                    className={styles.submit}
                                    htmlType="submit">搜索</Button></Col>
            </Row>
          </Form>
        </Card>
        <Card className={styles.mT10}>
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<Link to={`/account/ordergoods-w/${item.merchantOrderId}`}>订单号：{item.merchantOrderId}</Link>}
                  description={<Link to={`/account/ordergoods-w/${item.merchantOrderId}`}>下单时间:{item.tradeTime}<br/> 订单金额:{item.goodsTotalAmount}<br/> 订单状态:{item.status}</Link>}
                />
              </List.Item>
            )}
          />
          {/*<Table dataSource={list}*/}
                 {/*columns={columns}*/}
                 {/*pagination={pagination}*/}
                 {/*rowKey={record => record.id}*/}
                 {/*onChange={this.handleStandardTableChange}*/}
                 {/*loading={submitting}*/}
                 {/*scroll={{x: 500 }}/>*/}
        </Card>
      </div>
    )

  }
}
