import React, { PureComponent, Fragment } from 'react';
import { Modal, Button, Table, Input,Select, Form, Row, Col, Alert, Badge, Divider, Switch, Menu, Dropdown, Icon, message } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ goodsManagement, loading }) => ({
  goodsManagement,
  loading: loading.effects['goodsManagement/getGoodsDetailsA'],
}))
@Form.create()
export default class GoodsAboutAEditModal extends React.PureComponent {

  handleCancel = (e) => {
    this.props.parent.handleVisible();
    this.props.form.resetFields();
  }

  render() {
    const {goodsManagement:{goodsAboutData:{childCheckA}}} = this.props;
    const {getFieldDecorator, validateFields} = this.props.form;
    const divRow = {marginBottom:'8px'}
    const labelWidth = {width:'100px',display:'inline-block'}
    const spanWidth = {width:'70%',display:'inline-flex'}
    const formItemLayout = {
      // labelCol: {
      //   xs: { span: 24 },
      //   sm: { span: 5 },
      // },
      // wrapperCol: {
      //   xs: { span: 24 },
      //   sm: { span: 19 },
      // },
    };
    return (
      <div>
        <Modal
          width={ '100%' }
          style={{maxWidth:1200}}
          cancelText="关闭"
          // okText="提交"
          title="商品信息"

          visible={this.props.parent.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>关闭</Button>
          ]}
        >
          <div>
            <div style={{marginBottom:32}}>
              <Row style={{marginBottom:10}}>
                <Col span={10}>
                  <img style={{border:'1px solid #e8e8e8',width:'96%'}} src={childCheckA.slt} alt=""/>
                </Col>
                <Col span={11} offset={1}>
                  <div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>品牌名称 </label>
                      <span >{childCheckA.brand}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>商品名称</label>
                      <span>{childCheckA.goodsName}</span>
                    </div>
                    {/*<div style={divRow}>*/}
                      {/*<label htmlFor="" style={labelWidth}>二级分类</label>*/}
                      {/*<span>{childCheckA.catelog3}</span>*/}
                    {/*</div>*/}
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>三级分类</label>
                      <span>{childCheckA.catelog3}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>原产地/国</label>
                      <span>{childCheckA.source}</span>
                    </div>

                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>型号</label>
                      <span>{childCheckA.model}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>适用人群</label>
                      <span>{childCheckA.applicable}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>配料成分含量</label>
                      <span style={spanWidth}>{childCheckA.formula}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>保质期（天）</label>
                      <span>{childCheckA.shelfLife}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>贮存方式</label>
                      <span>{childCheckA.storage}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>仓库</label>
                      <span>{childCheckA.wname}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>库存</label>
                      <span>{childCheckA.goodsnum}</span>
                    </div><div style={divRow}>
                    <label htmlFor="" style={labelWidth}>进价</label>
                    <span>{childCheckA.inprice}元</span>
                  </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
