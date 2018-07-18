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
    const {goods:{ModalwarehouseEdit}}=this.props;
    const _this = this;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)
      if (err) return;
      const values = {
        ...fieldsValue,
      }
      this.setState({
        formValues: values,
      });
      // console.log('ssss',this.props)
      this.props.dispatch({
        type: 'goods/updateWarehouse',
        payload: {
          ...values,
          wid:ModalwarehouseEdit.wid
        },
        callback:function () {
          _this.props.parent.handleVisible();
          _this.props.form.resetFields();
        }
      });
    });


  }
  render() {
    const {goods:{ModalwarehouseEdit,supplierArr}} = this.props;
    const {getFieldDecorator, validateFields} = this.props.form;
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1000}}
          cancelText="关闭"
          okText="确认保存"
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
                    {getFieldDecorator('supplierId',{
                      // initialValue: ModalwarehouseEdit.taxation2type,
                      rules: [{ required: true, message: '请选择供应商' }],
                    })(
                      <Select
                        placeholder="请选择供应商"
                        // onChange={this.handleSelectChange}
                      >
                        {supplierArr.map(val => <Option key={val.supplierId} value={val.supplierId} label={val.supplier}>{val.supplier}</Option>)}

                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={11} >
                  <FormItem
                    {...formItemLayout}
                    label="所属仓库"
                  >
                    {getFieldDecorator('wname', {
                      initialValue: ModalwarehouseEdit.wname,
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
                        // onChange={this.handleSelectChange}
                      >
                        <Option value="2">商品总价</Option>
                        <Option value="1">元/克</Option>
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
