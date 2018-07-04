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
          style={{maxWidth:1200}}
          cancelText="关闭"
          okText="提交"
          title="编辑商品信息"

          visible={this.props.parent.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // footer={[
          //   <Button key="back" onClick={this.handleCancel}>关闭</Button>
          // ]}
        >
          <div>
            <div style={{marginBottom:32}}>
              <Row style={{marginBottom:10}}>
                <Col span={10}>
                  <img style={{border:'1px solid #e8e8e8',width:'96%'}} src="http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/goodtest.png" alt=""/>
                </Col>
                <Col span={11} offset={1}>
                  <div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>品牌名称 </label>
                      {/*<span>{tableAll.f}</span>*/}
                      <span style={spanWidth}>DOSHISHA</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>商品名称</label>
                      {/*<span>{tableAll.f}</span>*/}
                      <span>Platinum Lavel 薏仁啫喱状面霜300g</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>二级分类</label>
                      {/*<span>{tableAll.f}</span>*/}
                      <span>面部护理</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>三级分类</label>
                      {/*<span>{tableAll.f}</span>*/}
                      <span>化妆水/喷雾</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>原产地/国</label>
                      <span>{tableAll.f}</span>
                    </div>

                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>型号</label>
                      {/*<span>{tableAll.f}</span>*/}
                      <span>1000ml</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>适用人群</label>
                      {/*<span>{tableAll.f}</span>*/}
                      <span>所有人群</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>配料成分含量</label>
                      {/*<span>{tableAll.f}</span>*/}
                      <span style={spanWidth}>水, 冰川水, 丁二醇, 甘油, 烟酰胺, 甜菜碱, PEG-60氢化蓖麻油, 苯氧乙醇, 透明质酸钠, 氯苯甘醚, 卡波姆, 羟乙基纤维素, 叉珊藻（JANIA RUBENS)提取物, 透明质酸, 麦芽寡糖葡糖苷, C12-14 羟烷基麦芽糖醇醚, 聚谷氨酸, 岩藻糖, 矿泉水, 西班牙鼠尾草（SALVIA HISPANICA）籽提取物, 稻（ORYZA SATIVA）提取物, 水解胶原, 奎尔帕特赤竹(SASA QUELPAERTENSIS)提取物, 腺苷, 氢氧化钾, EDTA 二钠, 香精</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>保质期（天）</label>
                      {/*<span>{tableAll.f}</span>*/}
                      <span>1000天</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>贮存方式</label>
                      {/*<span>{tableAll.f}</span>*/}
                      <span>避免高温、置于阴凉干燥处</span>
                    </div>
                  </div>
                  <Form onSubmit={this.onSearch} layout="inline">

                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                      <Col md={18} sm={24}>
                        <FormItem {...formItemLayout}
                          label="所属仓库">
                          {getFieldDecorator('wcode')(
                            <Select
                              style={{ width: 200 }}
                              placeholder="请选择"
                              optionFilterProp="label"
                              // onChange={this.onSelectChange}
                            >
                              {/*<Option value="重庆仓库">重庆仓库</Option>*/}
                              <Option value="香港仓库">香港仓库</Option>
                              {/*<Option value="青岛仓库">青岛仓库</Option>*/}
                              {/*{wareHouseData.map(val => <Option key={val.wid} value={val.wcode} label={val.wname}>{val.wname}</Option>)}*/}
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                      <Col md={18} sm={24}>
                        <FormItem {...formItemLayout}
                          label="供货价格">
                          {getFieldDecorator('orderId')(
                            <Input placeholder="请输入"
                                   style={{ width: 200 }}/>
                          )}
                        </FormItem>
                      </Col>

                    </Row>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                      <Col md={18} sm={24}>
                        <FormItem {...formItemLayout}
                                  label="供货数量">
                          {getFieldDecorator('orderId')(
                            <Input placeholder="请输入"
                                   style={{ width: 200 }}/>
                          )}
                        </FormItem>
                      </Col>

                    </Row>

                  </Form>
                </Col>
              </Row>


            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
