import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input, Button, notification,Table,Card,Form,Row, Col,Divider,Switch ,Select } from 'antd';
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

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);



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
      type: 'goods/numlist',
      payload: {
        search:"",
        ...formValues,
        ...pagination,
      },
      callback: this.onCallback,
    });
  }
  onCallback = (params) => {
    const { formValues,pagination } = this.state;
    const { dispatch } = this.props;
    var v= params.list;
    var v2 = params.pagination;
    this.setState({
      listGoods:params.list,
      pagination:params.pagination,
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
      //console.log(values);
      dispatch({
        type: 'goods/numlist',
        payload: {
          ...values,
          ...pagination,
        },
        callback: this.onCallback,
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
      callback: this.onCallback,
    });
  }
////////////////////////可编辑行start//////////////////////////
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.barcode, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.listGoods];
    const target = newData.filter(item => key === item.barcode)[0];
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (target) {
      if ((!isNaN(value) && reg.test(value))) {
        // let totalPrice = this.state.totalPrice;
        // let goodsSum = this.state.goodsSum;
        // if(column==='price'){
        //   totalPrice = totalPrice*1-(target[column]*1-value*1);
        //   goodsSum = goodsSum*1-(target[column]*1-value*1);
        // }
        target[column] = value;
        // this.cacheData = newData.map(item => ({ ...item }));
        this.setState({ listGoods: newData });
      }
    }
  }

  edit(key) {
    const newData = [...this.state.listGoods];
    const target = newData.filter(item => key === item.barcode)[0];
    if (target) {
      target.editable = true;
      this.setState({ listGoods: newData });
    }
  }
  save(key) {
    const newData = [...this.state.listGoods];
    const target = newData.filter(item => key === item.barcode)[0];
    if (target) {
      this.props.dispatch({
        type: 'goods/updateKC',
        payload: {
          barcode: target.barcode,
          rb: parseInt(target.rb),
          hg: parseInt(target.hg),
          gj: parseInt(target.gj),
        },
        callback: this.updateCallback,
      });
      delete target.editable;
      this.setState({ listGoods: newData});
    }
  }

  cancel(key) {
    const newData = [...this.state.listGoods];
    const target = newData.filter(item => key === item.barcode)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.barcode)[0]);
      delete target.editable;
      this.setState({ listGoods: newData });
    }
  }
  updateCallback = (params) => {

    const msg = params.msg;
    if(params.type==="0"){
      notification.error({
        message: "提示",
        description: msg,
      });
    }else {
      notification.success({
        message: "提示",
        description: "修改完成",
      });
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { goods: { list, pagination }, submitting }  = this.props;
    const columns = [
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
      },
      {
        title: '商品名称',
        dataIndex: 'goodsname',
        key: 'goodsname',
      },
      {
        title: '日本仓',
        dataIndex: 'rb',
        key: 'rb',
        render: (text, record) => this.renderColumns(text, record, 'rb'),
      },
      {
        title: '韩国仓',
        dataIndex: 'hg',
        key: 'hg',
        render: (text, record) => this.renderColumns(text, record, 'hg'),
      },
      {
        title: '国际仓',
        dataIndex: 'gj',
        key: 'gj',
        render: (text, record) => this.renderColumns(text, record, 'gj'),
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '13%',
        render: (text, record) => {
          const { editable } = record;
          return (
              <div className={styles.editableRowOperations}>
                {
                  editable ?
                    <span>
                  <a onClick={() => this.save(record.barcode)}>保存</a>
                    <a onClick={() => this.cancel(record.barcode)}>取消</a>
                </span>
                    : <a onClick={() => this.edit(record.barcode)} >编辑</a>
                }
              </div>
          );
        },
      }];

    return(
      <div>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <FormItem
                  {...formItemLayout}
                  label ='仓库'
                >
                  {getFieldDecorator('warehouse',{rules: [{ required: true, message: '请选择仓库' }]})(
                    <Select  defaultValue='all' placeholder='请选择仓库' style={{ width: '100%' }} >
                      <Option value='all'>全部仓库</Option>
                      <Option value='15'>日本仓库</Option>
                      <Option value='16'>韩国仓库</Option>
                      <Option value='17'>国际仓库</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={24} sm={12} md={8} lg={8} xl={8}> <FormItem
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
          <Table dataSource={this.state.listGoods}
                 columns={columns}
                 pagination={this.state.pagination}
                 rowKey={record => record.barcode}
                 onChange={this.handleStandardTableChange}
                 loading={submitting}/>
        </Card>
      </div>
    )

  }
}
