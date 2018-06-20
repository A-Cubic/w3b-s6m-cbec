import React, { PureComponent, Fragment } from 'react';
import { Modal, Button, Table, Input, Form, Row, Col, Alert, Badge, Divider, Switch, Menu, Dropdown, Icon, message } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
@connect(({ o2o, loading }) => ({
  o2o,
  loading: loading.effects['o2o/orderCheck'],
}))
@Form.create()
export default class ModalUnteratedOrder extends React.PureComponent {

  handleCancel = (e) => {
    this.props.parent.handleVisible();
    this.props.form.resetFields();
  }

  render() {
    const {o2o:{ModalUnteratedOrderdata}} = this.props;
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
          style={{maxWidth:1500}}
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
            <div style={{marginBottom:32}}>
              <Row style={{marginBottom:10}}>
                <Col span={6}>
                  <label htmlFor="">状态 : </label>
                  <span>{ModalUnteratedOrderdata.status}</span>
                </Col>
                <Col span={6}>
                  <label htmlFor="">订单号 : </label>
                  <span>{ModalUnteratedOrderdata.merchantOrderId}</span>
                </Col>
                <Col span={6}>
                  <label htmlFor="">运单号 : </label>
                  <span>{ModalUnteratedOrderdata.waybillno}</span>
                </Col>
                <Col span={6}>
                  <label htmlFor="">下单时间 : </label>
                  <span>{ModalUnteratedOrderdata.tradeTime}</span>
                </Col>
              </Row>
              <Row style={{marginBottom:10}}>
                <Col span={6}>
                  <label htmlFor="">订单总金额 : </label>
                  <span>{ModalUnteratedOrderdata.tradeAmount}</span>
                </Col>
                <Col span={6}>
                  <label htmlFor="">收件人姓名 : </label>
                  <span>{ModalUnteratedOrderdata.consigneeName}</span>
                </Col>
                <Col span={6}>
                  <label htmlFor="">身份证号 : </label>
                  <span>{ModalUnteratedOrderdata.idNumber}</span>
                </Col>
                <Col span={6}>
                  <label htmlFor="">收货人电话 : </label>
                  <span>{ModalUnteratedOrderdata.consigneeMobile}</span>
                </Col>
              </Row>
              <Row style={{marginBottom:10}}>
                <Col span={6}>
                  <label htmlFor="">省份 : </label>
                  <span>{ModalUnteratedOrderdata.addrProvince}</span>
                </Col>
                <Col span={6}>
                  <label htmlFor="">城市 : </label>
                  <span>{ModalUnteratedOrderdata.addrCity}</span>
                </Col>
                <Col span={6}>
                  <label htmlFor="">县区 : </label>
                  <span>{ModalUnteratedOrderdata.addrDistrict}</span>
                </Col>
                <Col span={6}>
                  <label htmlFor="">详细地址 : </label>
                  <span>{ModalUnteratedOrderdata.addrDetail}</span>
                </Col>
              </Row>
            </div>
            <Table columns={columns}
                   rowKey={record => record.id}
                   dataSource={ModalUnteratedOrderdata.OrderGoods}
                   pagination={false}
                   />
          </div>
        </Modal>
      </div>
    );
  }
}
