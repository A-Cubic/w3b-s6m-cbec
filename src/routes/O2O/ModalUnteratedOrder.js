import React, { PureComponent, Fragment } from 'react';
import { Modal, Button, Table, Input, Form, Row, Col, Alert, Badge, Divider, Switch, Menu, Dropdown, Icon, message } from 'antd';
const FormItem = Form.Item;
@Form.create()
export default class ModalUnteratedOrder extends React.PureComponent {

  handleOk = (e) => {
    // console.log(e);
    this.props.parent.handleVisible();
  }
  handleCancel = (e) => {
    this.props.parent.handleVisible();
    this.props.form.resetFields();
  }
  onInputChange = (e) => {
    const formValues = this.state.formValues;
    this.setState({
      formValues: {
        ...formValues,
        keyword:e.target.value
      }
    });
  };
  handleSearch = (e) => {
    e.preventDefault();
    // console.log('搜索')
    // console.log(this.props)
    // console.log(this.state.formValues)
    this.props.parent.handleVisible(true,this.state.formValues)
  }
  render() {
    console.log(this.props)
    // const {fetchCheckUsersDatas:{ruleUsers, pagination}} = this.props;
    const {getFieldDecorator, validateFields} = this.props.form;
    // const paginationProps = {
    //   showSizeChanger: true,
    //   showQuickJumper: true,
    //   ...pagination,
    // };
    // console.log(this.props);
    const columns = [
      {
        title: '商品条码',
        dataIndex: 'a',
        key: 'a',
      }, {
        title: '商品名称',
        dataIndex: 'b',
        key: 'b',
      }, {
        title: '商品单价',
        dataIndex: 'c',
        key: 'c',
      }, {
        title: '购买数量',
        dataIndex: 'd',
        key: 'd',
      }, {
        title: '状态',
        dataIndex: 'e',
        key: 'e',
      }, {
        title: '父订单号',
        dataIndex: 'f',
        key: 'f',
      }, {
        title: '订单号',
        dataIndex: 'g',
        key: 'g',
      }, {
        title: '运单号',
        dataIndex: 'h',
        key: 'h',
      }, {
        title: '下单时间',
        dataIndex: 'i',
        key: 'i',
      }, {
        title: '订单总金额',
        dataIndex: 'j',
        key: 'j',
      }, {
        title: '收件人姓名',
        dataIndex: 'k',
        key: 'k',
      }, {
        title: '身份证号',
        dataIndex: 'l',
        key: 'l',
      }, {
        title: '收货人电话',
        dataIndex: 'm',
        key: 'm',
      }, {
        title: '省份',
        dataIndex: 'n',
        key: 'n',
      }, {
        title: '城市',
        dataIndex: 'o',
        key: 'o',
      }, {
        title: '县区',
        dataIndex: 'p',
        key: 'p',
      }, {
        title: '详细地址',
        dataIndex: 'q',
        key: 'q',
      }
    ];
    const data = [
      {
        key: '1',
        a: '商品条码1',
        b: '商品名称',
        c: '商品单价',
        d: '购买数量',
        e: '状态',
        f: '父订单号',
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
      },{
        key: '2',
        a: '商品条码2',
        b: '商品名称2',
        c: '商品单价2',
        d: '购买数量2',
        e: '状态2',
        f: '父订单号2',
        g: '订单号2',
        h: '运单号2',
        i: '下单时间2',
        j: '订单总金额2',
        k: '收件人姓名2',
        l: '身份证号2',
        m: '收货人电话2',
        n: '省份2',
        o: '城市2',
        p: '县区2',
        q: '详细地址2',
      }
    ];
    return (
      <div>
        <Modal
          width={ '100%' }
          cancelText="关闭"
          title="查看订单详细信息"

          visible={this.props.parent.visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>关闭</Button>
          ]}
        >
          <div>

            <Table columns={columns}
                   dataSource={data}
                   pagination={false}
                   />
          </div>
        </Modal>
      </div>
    );
  }
}
