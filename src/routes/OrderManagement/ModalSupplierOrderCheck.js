import React, { PureComponent, Fragment } from 'react';
import { Modal, Button, Table, Input,Select, Form, Row, Col, Alert, Badge, Divider, Switch, Menu, Dropdown, Icon, message } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ orderManagement, loading }) => ({
  orderManagement,
  // loading: loading.effects['goods/'],
}))
@Form.create()
export default class ModalSupplierOrderChecksssss extends React.PureComponent {

  handleCancel = (e) => {
    this.props.parent.handleVisible(false,'childCheck');
    this.props.form.resetFields();
  }

  render() {
    const {orderManagement:{supplierOrder:{childCheck}}} = this.props;
    const columns = [
      {
      title: '商品条码',
      dataIndex: 'barCode',
      key: 'barCode',
    }, {
      title: '商品图片',
      dataIndex: 'slt',
      key: 'slt',
      render: (val) => (
        <img src={ val} alt="" width={80} style={{float:'left',marginRight:8}}/>
      )
    }, {
      title: '商品名称',
      dataIndex: 'skuBillName',
      key: 'skuBillName',
    }, {
      title: '供货单价',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
    }, {
      title: '销量',
      dataIndex: 'quantity',
      key: 'quantity',
    }, {
      title: '销售单价',
      dataIndex: 'skuUnitPrice',
      key: 'skuUnitPrice',
    }, {
      title: '销售额',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    }
    ];
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1200}}
          cancelText="关闭"
          // okText="提交"
          title="订单详情"

          visible={this.props.parent.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>关闭</Button>
          ]}
        >
          <div>
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Table
              dataSource={childCheck.orderGoods}
              rowKey={record => record.id}
              pagination={false}
              columns={columns}
            />

          </div>
        </Modal>
      </div>
    );
  }
}
