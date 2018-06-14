import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input,Select,TreeSelect, Button, notification,Table,Card,Form,Row, Col,Divider,Switch  } from 'antd';
import styles from '../../utils/utils.less'
import { getToken ,getAuthority} from '../../utils/Global';

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



@connect(({ goods, loading }) => ({
  goods,
  submitting: loading.effects['goods/list'],
}))

@Form.create()

export default class GoodsList extends Component {
  state = {
    treeValue:undefined,
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
      type: 'goods/list',
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
        type: 'goods/list',
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
      type: 'goods/list',
      payload: params,
    });
  }

  handleChangeB2B= (record) => {
    const { dispatch } = this.props;
    if(record.ifB2B==="1"){
      record.ifB2B="0";
    }else{
      record.ifB2B="1";
    }
    dispatch({
      type: 'goods/update',
      payload: {
        id: record.id,
        ifB2B: record.ifB2B,
      },
      callback: this.onChangeStatusCallback,
    });
  }
  handleChangeBBC= (record) => {
    const { dispatch } = this.props;
    if(record.ifBBC==="1"){
      record.ifBBC="0";
    }else{
      record.ifBBC="1";
    }
    dispatch({
      type: 'goods/update',
      payload: {
        id: record.id,
        ifBBC: record.ifBBC,
      },
      callback: this.onChangeStatusCallback,
    });
  }
  onChangeStatusCallback = (params) => {
    const { formValues,pagination } = this.state;
    const { dispatch } = this.props;

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

    // dispatch({
    //   type: 'goods/list',
    //   payload: {
    //     ...formValues,
    //     ...pagination,
    //   },
    // });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { goods: { list, pagination }, submitting }  = this.props;
    const columns = [
      {
        title: '商品编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '图片',
        dataIndex: 'slt',
        key: 'slt',
        render : (text, record) => <img src={`${text}`} style={{width:100,height:100}}/>
      },
      {
        title: '条码',
        dataIndex: 'barcode',
        key: 'barcode',
      },
      {
        title: '商品名称',
        dataIndex: 'goodsname',
        key: 'goodsname',
      },
      {
        title: '是否有效',
        dataIndex: 'effective',
        key: 'effective',
      },
      {
        title: '',
        dataIndex: 'operate1',
        key: 'operate1',
        render:(text, record)=>
          <div>
            <Divider type="vertical" />
            {/*<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />*/}

            <Switch checkedChildren="B2B上架"
                    unCheckedChildren="B2B下架"
                    defaultChecked={record.ifB2B==="0"?false:true}
                    onChange={()=>this.handleChangeB2B(record)}/>
            <Divider type="vertical" />
            <Switch checkedChildren="BBC上架"
                    unCheckedChildren="BBC下架"
                    defaultChecked={record.ifBBC==="0"?false:true}
                    onChange={()=>this.handleChangeBBC(record)}/>
          </div>

      },
      {
        title: '编辑',
        dataIndex: 'operate2',
        key: 'operate2',
        render:(text, record)=>
          <div>
            <Link to={`/goods/info/mod/${record.id}`}>编辑</Link>
          </div>
      }];
    const treeData = [{
      label: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [{
        label: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      }, {
        label: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      }],
    }, {
      label: 'Node2',
      value: '0-1',
      key: '0-1',
    }];
    return(
      <div>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={7} sm={24}>
                <FormItem label="查询信息" {...formItemLayout}>
                  {getFieldDecorator('search')(
                    <Input placeholder="请输入商品条码，名称或品牌名" />
                  )}
                </FormItem>
              </Col>
              <Col md={7} sm={24}>
                <FormItem label="商品分类" {...formItemLayout}>
                  {getFieldDecorator('classify')(
                    <TreeSelect
                      // style={{ width: 300 }}
                      value={this.state.treeValue}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={treeData}
                      placeholder="请选择分类"
                      treeDefaultExpandAll
                      // onChange={this.onChange}
                    />
                  )}
                </FormItem>
              </Col>
              <Col md={7} sm={24}>
                <FormItem label="是否有效" {...formItemLayout}>
                  {getFieldDecorator('effective')(
                    <Select
                      placeholder="请选择"
                      optionFilterProp="label"
                      // onChange={this.onSelectChange}
                    >
                      <Option value="0">无效</Option>
                      <Option value="1">有效</Option>
                      {/* {brandsData.map(val => <Option key={val.id} value={val.id} label={val.name}>{val.name}</Option>)} */}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col  md={3} sm={24}>
                <Button type="primary" style={{marginTop:4}}
              htmlType="submit">搜索</Button>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col >
                <Button type="primary" >批量导入</Button>
                <Button type="primary" ghost style={{marginLeft:8}}>下载导入模板</Button>
              </Col>
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
