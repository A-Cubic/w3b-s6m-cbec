import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input, Button,Table,Card,Form,Row, Col,DatePicker ,Select } from 'antd';
import styles from '../../utils/utils.less'
import moment from 'moment';
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;

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
const monthFormat = 'YYYY-MM';


@connect(({ goods, loading }) => ({
  goods,
  submitting: loading.effects['goods/list'],
}))

@Form.create()

export default class GoodsList extends Component {
  state = {
    formValues: {
    },
    listGoods:[],
    pagination: {
      current: 1,
      total: 10,
      pageSize: 10,
    },
  }

  componentDidMount() {
    const { formValues, pagination } = this.state;

    this.props.dispatch({
      type: 'goods/sell',
      payload: {
        ...formValues,
        ...pagination,
      },
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    const { pagination } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      var values = {
        ...fieldsValue,
        // timeBegin:"",
        // timeEnd:"",
      };
      if(values.search===undefined)
        values.search="";
      // if(values.times===undefined){
      // }else{
      //   values.timeBegin=values.times[0];
      // }
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'goods/sell',
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
      type: 'goods/sell',
      payload: params,
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { goods: { list, pagination }, submitting }  = this.props;
    const columns = [
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        width: '35%',
      },
      {
        title: '商品名称',
        dataIndex: 'goodsname',
        key: 'goodsname',
        width: '45%',
      },
      {
        title: '销售量',
        dataIndex: 'sellNum',
        key: 'sellNum',
        width: '20%',
      }];

    return(
      <div>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <FormItem
                  {...formItemLayout}
                  label ='仓库'
                >
                  {getFieldDecorator('whid',{rules: [{ required: true, message: '请选择仓库' }]})(
                    <Select   placeholder='请选择仓库' style={{ width: '100%' }} >
                      <Option value='all'>全部仓库</Option>
                      <Option value='HG_RC'>韩国仁川仓</Option>
                      <Option value='RB_DB'>日本大阪仓(自营)</Option>
                      <Option value='RB_GJ'>日本国际仓(自营)</Option>
                      <Option value='HG_SE'>韩国首尔仓(自营)</Option>
                      <Option value='HG_GJ'>韩国国际仓(自营)</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                <FormItem {...formItemLayout} label ='开始时间'>
                  {getFieldDecorator('times')(
                    <MonthPicker   format={monthFormat}/>
                  ) }
                </FormItem>
              </Col>

              <Col span={4}><Button type="primary"
                                    className={styles.submit}
                                    htmlType="submit">搜索</Button></Col>
            </Row>
          </Form>
        </Card>
        <Card className={styles.mT10}>
          <Table dataSource={list}
                 columns={columns}
                 pagination={pagination}
                 rowKey={record => record.barcode}
                 onChange={this.handleStandardTableChange}
                 loading={submitting}
                 size="small"
                 // scroll={{x: 500 }}
          />
        </Card>
      </div>
    )

  }
}
