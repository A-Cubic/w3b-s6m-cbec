import React, { PureComponent, Fragment } from 'react';
import { Modal,Radio, Button, Table, Input,Select, Form, Row, Col, Alert, Badge, Divider, Switch, Menu, Dropdown, Icon, message } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ goodsManagement, loading }) => ({
  goodsManagement,
  loading: loading.effects['goodsManagement/getGoodsDetailsO'],
}))
@Form.create()
export default class GoodsAboutOEditModal extends React.PureComponent {

  handleCancel = (e) => {
    this.props.parent.handleVisible();
    this.props.form.resetFields();
  }
  onRadioChange=(e,record)=>{
    this.props.dispatch({
      type:'goodsManagement/getDefaultRadios',
      payload:{
        id:record.id,
      }
    })
  }
  render() {
    const {goodsManagement:{goodsAboutData:{childCheckO}}} = this.props;
    // console.log(this.props)
    const {getFieldDecorator, validateFields} = this.props.form;
    const divRow = {marginBottom:'8px'}
    const divRowName = {marginBottom:'18px',fontSize:18,color:'#000'}
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
    const data =[
      {
        id:1,
        ifSel:1,
        supplierName:'gongyingshang',
        wname:'cangju',
        goodsnum:'',
        inprice:'',
      },
      {
        id:2,
        ifSel:0,
        supplierName:'gongyingshang',
        wname:'cangju',
        goodsnum:'',
        inprice:'',
      }
    ]
    const columns = [
      {
        title: '默认选中',
        dataIndex: 'ifSel',
        key: 'ifSel',
        render:(val,record)=>{
         return(
           <div>
             {val=='1'?<Radio checked={true} onChange={(e)=>{this.onRadioChange(e,record)}}></Radio>:
               <Radio checked={false} onChange={(e)=>{this.onRadioChange(e,record)}}></Radio>}
           </div>
         )

        },
      },{
        title: '供应商',
        dataIndex: 'supplierName',
        key: 'supplierName',
      },{
        title: '仓库',
        dataIndex: 'wname',
        key: 'wname',
      },{
        title: '库存',
        dataIndex: 'goodsnum',
        key: 'goodsnum',
      },{
        title: '供货价',
        dataIndex: 'inprice',
        key: 'inprice',
      }
      ]

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

                <Col span={11} offset={1}>
                  <div>
                    <div style={divRowName}>
                      <label htmlFor="" style={labelWidth}>品牌名称 </label>
                      <span >{childCheckO.brand}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>商品名称</label>
                      <span>{childCheckO.goodsName}</span>
                    </div>
                    {/*<div style={divRow}>*/}
                      {/*<label htmlFor="" style={labelWidth}>二级分类</label>*/}
                      {/*<span>{ModalGoodsAboutEdit.catelog3}</span>*/}
                    {/*</div>*/}
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>三级分类</label>
                      <span>{childCheckO.catelog3}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>原产地/国</label>
                      <span>{childCheckO.source}</span>
                    </div>

                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>型号</label>
                      <span>{childCheckO.model}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>适用人群</label>
                      <span>{childCheckO.applicable}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>配料成分含量</label>
                      <span style={spanWidth}>{childCheckO.formula}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>保质期（天）</label>
                      <span>{childCheckO.shelfLife}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>贮存方式</label>
                      <span>{childCheckO.storage}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>仓库</label>
                      <span>{childCheckO.wname}</span>
                    </div>
                    <div style={divRow}>
                      <label htmlFor="" style={labelWidth}>库存</label>
                      <span>{childCheckO.goodsnum}</span>
                    </div><div style={divRow}>
                    <label htmlFor="" style={labelWidth}>进价</label>
                    <span>{childCheckO.inprice}元</span>
                  </div>

                  </div>

                </Col>
                <Col span={10}>
                  <img style={{border:'1px solid #e8e8e8',width:'96%'}} src={childCheckO.slt} alt=""/>
                </Col>
              </Row>
              <Row style={{marginBottom:10}}>
                <Table
                  dataSource={childCheckO.goodsSelectSupplierList}
                   rowKey={record => record.id}
                   columns={columns}
                   pagination={false}
                />
              </Row>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
