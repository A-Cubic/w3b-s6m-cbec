import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input, Button, notification,Table,Card,Form,Row, Col,Divider,Switch  } from 'antd';
import styles from '../../utils/utils.less'
import { getToken ,getAuthority} from '../../utils/Global';


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



@connect(({ goods, loading }) => ({
  goods,
  submitting: loading.effects['goods/list'],
}))

@Form.create()

export default class GoodsList extends Component {
  state = {
    formValues: {
    },
    pagination: {
      current: 1,
      total: 10,
      pageSize: 10,
    },
  }

  componentDidMount() {
    const { formValues, pagination } = this.state;

    this.props.dispatch({
      type: 'goods/numlist',
      payload: {
        search:"",
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

      var values = {
        ...fieldsValue,
      };
      if(values.search===undefined)
        values.search="";
      this.setState({
        formValues: values,
      });
      console.log(values);
      dispatch({
        type: 'goods/numlist',
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
      type: 'goods/numlist',
      payload: params,
    });
  }

  // handleChangeB2B= (record) => {
  //   const { dispatch } = this.props;
  //   if(record.ifB2B==="1"){
  //     record.ifB2B="0";
  //   }else{
  //     record.ifB2B="1";
  //   }
  //   dispatch({
  //     type: 'goods/update',
  //     payload: {
  //       id: record.id,
  //       ifB2B: record.ifB2B,
  //     },
  //     callback: this.onChangeStatusCallback,
  //   });
  // }
  // handleChangeBBC= (record) => {
  //   const { dispatch } = this.props;
  //   if(record.ifBBC==="1"){
  //     record.ifBBC="0";
  //   }else{
  //     record.ifBBC="1";
  //   }
  //   dispatch({
  //     type: 'goods/update',
  //     payload: {
  //       id: record.id,
  //       ifBBC: record.ifBBC,
  //     },
  //     callback: this.onChangeStatusCallback,
  //   });
  // }
  // onChangeStatusCallback = (params) => {
  //   const { formValues,pagination } = this.state;
  //   const { dispatch } = this.props;
  //
  //   const msg = params.msg;
  //   if(params.type==="0"){
  //     notification.error({
  //       message: "提示",
  //       description: msg,
  //     });
  //   }else {
  //     notification.success({
  //       message: "提示",
  //       description: "修改完成",
  //     });
  //   }

    // dispatch({
    //   type: 'goods/list',
    //   payload: {
    //     ...formValues,
    //     ...pagination,
    //   },
    // });
  // }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { goods: { list, pagination }, submitting }  = this.props;
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'goodsname',
        key: 'goodsname',
      },
      {
        title: '日本仓',
        dataIndex: 'rb',
        key: 'rb',
      },
      {
        title: '韩国仓',
        dataIndex: 'hg',
        key: 'hg',
      },
      {
        title: '国际仓',
        dataIndex: 'gj',
        key: 'gj',
      }];

    return(
      <div>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={20}> <FormItem
                {...formItemLayout}
                label ='查询信息'
              >
                {getFieldDecorator('search')(
                  <Input  placeholder="请输入商品条码，商品名称" />)
                }
              </FormItem></Col>
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
                 rowKey={record => record.id}
                 onChange={this.handleStandardTableChange}
                 loading={submitting}/>
        </Card>
      </div>
    )

  }
}
