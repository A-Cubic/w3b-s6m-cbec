import React, { PureComponent, Fragment } from 'react';
import { Modal, Button, Table, Input,Select, Form, Row, Col, Alert, Badge, Divider, Switch, Menu, Dropdown, Icon, message } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ goods, loading }) => ({
  goods,
  // loading: loading.effects['goods/'],
}))
@Form.create()
export default class ModalGoodsAboutEdit extends React.PureComponent {

  handleCancel = (e) => {
    this.props.parent.handleVisible();
    this.props.form.resetFields();
  }

  render() {
    const {goods:{ModalGoodsAboutEdit}} = this.props;
    // console.log(ModalGoodsAboutEdit)
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
                  <img style={{border:'1px solid #e8e8e8',width:'96%'}} src={ModalGoodsAboutEdit.slt} alt=""/>
                </Col>
                <Col span={11} offset={1}>
                  <div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>品牌名称 </label>
                      <span >{ModalGoodsAboutEdit.brand}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>商品名称</label>
                      <span>{ModalGoodsAboutEdit.goodsName}</span>
                    </div>
                    {/*<div style={divRow}>*/}
                      {/*<label htmlFor="" style={labelWidth}>二级分类</label>*/}
                      {/*<span>{ModalGoodsAboutEdit.catelog3}</span>*/}
                    {/*</div>*/}
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>三级分类</label>
                      <span>{ModalGoodsAboutEdit.catelog3}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>原产地/国</label>
                      <span>{ModalGoodsAboutEdit.source}</span>
                    </div>

                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>型号</label>
                      <span>{ModalGoodsAboutEdit.model}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>适用人群</label>
                      <span>{ModalGoodsAboutEdit.applicable}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>配料成分含量</label>
                      <span style={spanWidth}>{ModalGoodsAboutEdit.formula}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>保质期（天）</label>
                      <span>{ModalGoodsAboutEdit.shelfLife}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>贮存方式</label>
                      <span>{ModalGoodsAboutEdit.storage}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>仓库</label>
                      <span>{ModalGoodsAboutEdit.wname}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>库存</label>
                      <span>{ModalGoodsAboutEdit.goodsnum}</span>
                    </div><div style={divRow}>
                    <label htmlFor="" style={labelWidth}>进价</label>
                    <span>{ModalGoodsAboutEdit.inprice}元</span>
                  </div>

                  </div>
                  {/*<Form onSubmit={this.onSearch} layout="inline">*/}

                    {/*<Row gutter={{ md: 8, lg: 24, xl: 48 }}>*/}
                      {/*<Col md={18} sm={24}>*/}
                        {/*<FormItem {...formItemLayout}*/}
                          {/*label="所属仓库">*/}
                          {/*{getFieldDecorator('wcode')(*/}
                            {/*<Select*/}
                              {/*style={{ width: 200 }}*/}
                              {/*placeholder="请选择"*/}
                              {/*optionFilterProp="label"*/}
                              {/*// onChange={this.onSelectChange}*/}
                            {/*>*/}
                              {/*/!*<Option value="重庆仓库">重庆仓库</Option>*!/*/}
                              {/*<Option value="香港仓库">香港仓库</Option>*/}
                              {/*/!*<Option value="青岛仓库">青岛仓库</Option>*!/*/}
                              {/*/!*{wareHouseData.map(val => <Option key={val.wid} value={val.wcode} label={val.wname}>{val.wname}</Option>)}*!/*/}
                            {/*</Select>*/}
                          {/*)}*/}
                        {/*</FormItem>*/}
                      {/*</Col>*/}
                    {/*</Row>*/}
                    {/*<Row gutter={{ md: 8, lg: 24, xl: 48 }}>*/}
                      {/*<Col md={18} sm={24}>*/}
                        {/*<FormItem {...formItemLayout}*/}
                          {/*label="供货价格">*/}
                          {/*{getFieldDecorator('orderId')(*/}
                            {/*<Input placeholder="请输入"*/}
                                   {/*style={{ width: 200 }}/>*/}
                          {/*)}*/}
                        {/*</FormItem>*/}
                      {/*</Col>*/}

                    {/*</Row>*/}
                    {/*<Row gutter={{ md: 8, lg: 24, xl: 48 }}>*/}
                      {/*<Col md={18} sm={24}>*/}
                        {/*<FormItem {...formItemLayout}*/}
                                  {/*label="供货数量">*/}
                          {/*{getFieldDecorator('orderId')(*/}
                            {/*<Input placeholder="请输入"*/}
                                   {/*style={{ width: 200 }}/>*/}
                          {/*)}*/}
                        {/*</FormItem>*/}
                      {/*</Col>*/}

                    {/*</Row>*/}

                  {/*</Form>*/}
                </Col>
              </Row>


            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
