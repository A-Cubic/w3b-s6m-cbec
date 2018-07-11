import React, { PureComponent, Fragment } from 'react';
import { Modal, Button, Table,Select, Input, Form, Row, Col, Alert, Badge, Divider, Switch, Menu, Dropdown, Icon, message } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};
@connect(({ goods, loading }) => ({
  goods,
  loading: loading.effects['goods/warehouseList'],
}))
@Form.create()
export default class ModalUnteratedOrder extends React.PureComponent {

  handleCancel = (e) => {
    this.props.parent.handleVisible();
    this.props.form.resetFields();
  }
  handleOk=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('values',fieldsValue)

      // if (err) return;
      // const values = {
      //   ...fieldsValue,
      // }
      //
      // this.setState({
      //   formValues: values,
      // });
      // this.props.dispatch({
      //   type: 'goods/goodslist',
      //   payload: {
      //     userId:userId,
      //     ...values,
      //   },
      // });
    });


  }
  render() {
    const {goods:{ModalwarehouseEdit}} = this.props;
    const {getFieldDecorator, validateFields} = this.props.form;

    // console.log(this.props);
    const columns = [
      {
        title: '商品条码',
        dataIndex: 'barCode',
        key: 'barCode',
      }, {
        title: '商品名称',
        dataIndex: 'skuBillName',
        key: 'skuBillName',
      }, {
        title: '商品单价',
        dataIndex: 'skuUnitPrice',
        key: 'skuUnitPrice',
      }, {
        title: '购买数量',
        dataIndex: 'quantity',
        key: 'quantity',
      }
    ];
    const tableAll = {
      table,
      f: '状态',
      g: '订单号',
      h: '运单号',
      i: '下单时间',
      j: '订单总金额',
      k: '收件人姓名',
      l: '身份证号',
      m: '收货人电话',
      n: '省份',
      o: '城市',
      p: '县区',
      q: '详细地址',
    }
    const table = [
      {
        key: '1',
        a: '商品条码1',
        b: '商品名称',
        c: '商品单价',
        d: '购买数量',
        e: '状态',

      },{
        key: '2',
        a: '商品条码2',
        b: '商品名称2',
        c: '商品单价2',
        d: '购买数量2',
        e: '状态2',
      }
    ];
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1000}}
          cancelText="关闭"
          okText="确认新增"
          title="仓库基础信息"

          visible={this.props.parent.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // footer={[
          //   <Button key="back" onClick={this.handleCancel}>关闭</Button>
          // ]}
        >
          <div>
            <Form>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="供应商"
                  >
                    {getFieldDecorator('supplier', {
                      initialValue: ModalwarehouseEdit.supplier,
                      rules: [{ required: true, message: '请输入供应商' }],
                    })(
                      <Input placeholder="请输入供应商账号/邮箱/手机号"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="所属仓库"
                  >
                    {getFieldDecorator('wcode', {
                      initialValue: ModalwarehouseEdit.wcode,
                      rules: [{ required: true, message: '请输入仓库名称' }],
                    })(
                      <Input placeholder="请输入仓库名称"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="税率（%）"
                  >
                    {getFieldDecorator('taxation', {
                      initialValue: ModalwarehouseEdit.taxation,
                      rules: [{ required: true, message: '请输入税率' }],
                    })(
                      <Input placeholder="请输入税率"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="税率提档类别"
                  >
                    {getFieldDecorator('taxation2type',{
                      initialValue: ModalwarehouseEdit.taxation2type,
                      rules: [{ required: true, message: '请选择税率提档类别' }],
                    })(
                      <Select
                        placeholder="请选择税率提档类别"
                        onChange={this.handleSelectChange}
                      >
                        <Option value="1">元/克</Option>
                        <Option value="2">商品总价</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="税率提档线（¥）"
                  >
                    {getFieldDecorator('taxation2line', {
                      initialValue: ModalwarehouseEdit.taxation2line,
                      rules: [{ required: true, message: '请输入税率提档线' }],
                    })(
                      <Input placeholder="请输入税率提档线"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="提挡税率（%）"
                  >
                    {getFieldDecorator('taxation2', {
                      initialValue: ModalwarehouseEdit.taxation2,
                      rules: [{ required: true, message: '请输入提档税率' }],
                    })(
                      <Input placeholder="请输入提档税率"/>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" gutter={8}>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="运费（¥）"
                  >
                    {getFieldDecorator('freight', {
                      initialValue: ModalwarehouseEdit.freight,
                      rules: [{ required: true, message: '请输入运费' }],
                    })(
                      <Input placeholder="请输入运费"/>
                    )}
                  </FormItem>
                </Col>
                <Col span={11} >

                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}
