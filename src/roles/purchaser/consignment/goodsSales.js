import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './receivingConfirmation.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
import {getToken} from "../../../utils/Global";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserConsignment }) => ({
  rolePurchaserConsignment,
}))
// -------- 商品销售 --------------
    // 商品销售-列表查询
@Form.create()
export default class goodsSales extends Component {
  state={
    formValues:{},
    visible: false,

    visibleChildCheck:false,
  }

  //****/
  init(){
    this.props.dispatch({
      type:'rolePurchaserConsignment/goodsSales',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'rolePurchaserConsignment/goodsSales',
        payload: {
          ...values,
        },
      });
    });


  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo: null,
    });
    this.init();
  }
  handlCheck(){
    console.log(111)
  }
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'rolePurchaserConsignment/goodsSales',
      payload: params,
    });
  }

handleVisible = (flag,who) => {
  this.setState({
    visibleChildCheck:!!flag,
  });
}
handleChildrenCheck =(record)=>{
  console.log('record',record,111)
  this.handleVisible(true,'childCheck');
}

  renderForm(){
    const { rolePurchaserConsignment:{goodsSales:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={9} sm={24}>
            <FormItem >
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>
          </Col>
          <Col md={9} sm={24}>
            <FormItem label="">
              {getFieldDecorator('select')(
                <Input style={{ width: '100%' }} placeholder="可输入商品条码，商品名称，商品品牌进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span>共查询出符合条件的数据：{tableData?tableData.pagination.total:0} </span>
          </div>
        </div>
      </Form>
    );
  }

  // "barCode": "4580482175534",
  // "brand": "Dr.select",
  // "skuUnitPrice": 148,
  // "quantity": 1,
  // "supplyPrice": 117,
  // "tradeTime": "2018/2/9 18:08:48",
  // "money": 148


  render() {
    const { rolePurchaserConsignment:{goodsSales:{tableData:{list, pagination}}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const columns = [
    {
      title: '序号',
      dataIndex: 'keyId',
      key: 'keyId',
    }, {
      title: '商品（SKU）',
      dataIndex: 'goodsName',
      key: 'goodsName',
      render: (val,record) =>{
        return (
          <div>
            <img src={record.slt} alt="" width={80} style={{marginRight:8,}}/>
            <span style={{display:'inline-block',width:200}}>{val}</span>
          </div>
        )
    }}, {
      title: '商品条码',
      dataIndex: 'barCode',
      key: 'barCode',
    }, {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    },{
      title: '供货价',
      dataIndex: 'skuUnitPrice',
      key: 'skuUnitPrice',

    },{
      title: '销售单价',
      dataIndex: 'quantity',
      key: 'quantity',

    },{
        title: '销售数量',
        dataIndex: 'supplyPrice',
        key: 'supplyPrice',

      },{
        title: '销售金额',
        dataIndex: 'money',
        key: 'money',

      },{
        title: '销售日期',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
      }
      // ,{
      //   title: '弹窗',
      //   dataIndex: 'windio',
      //   key: 'windio',
      //   render: (val,record) => {
      //     return (
      //       <div>
      //         {/* <a href="javascript:;" onClick={()=>this.handlCheck(record)}>点击</a><br/> */}
      //         <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>点击</a><br/>

      //         {/* <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>订单详情</a><br/> */}
      //       </div>
      //     )
      //   }
      // }
    ];

    const parenta  = {
      //visible:visibleChildCheck,
      handleVisible : this.handleVisible,
    };
    const TestParenta  = {
     // visible:visibleChildDelivery,
      handleVisible : this.handleVisible,
     // expressArr:expressArr,
      dispatch:this.props.dispatch,
      orderId:this.state.orderId
    };



    return (
      <div>
        <Card bordered={false}>

          <div style={{display: 'inline-flex',marginBottom:20,}} className={styles.hot}>
            <Button  type="primary" onClick={this.downloadTemplate} style={{ marginLeft: 8 }}>
              <Icon type="download" />下载销售模板
            </Button>
            <Upload >
              <Button style={{ marginLeft: 8 }}>
                <Icon type="upload" /> 上传销售数据
              </Button>
            </Upload>
          </div>

          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
        {/* </Card>



        <Card className={styles.mT10}> */}
          <Table dataSource={list}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.id}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
        <Test
          parenta = {TestParenta}
        />
      </div>
    );
  }
}


@connect(({rolePurchaserConsignment }) => ({
  rolePurchaserConsignment,
 // loading: loading.effects['goodsManagement/getGoodsAboutData'],
}))

@Form.create()
class Test extends Component {

  // handleOk = (e) => {
  //   e.preventDefault();
  //   const that = this;
  //   this.props.form.validateFields((err, fieldsValue)=>{
  //     if(!err){
  //       this.props.parent.dispatch({
  //         type:'orderManagement/confirmDelivery',
  //         payload:{
  //           ...fieldsValue,
  //           userId:userId,
  //           orderId:this.props.parent.orderId
  //         },
  //         callback:function () {
  //           that.props.parent.handleVisible(false,'childDelivery')
  //           that.props.form.resetFields();
  //           that.props.dispatch({
  //             type: 'orderManagement/supplierOrderTable',
  //             payload: {
  //               userId:userId,
  //               status:"全部"
  //             },
  //           });
  //         }
  //       })
  //     }
  //   })
  // }
  handleOverseas =(e)=>{
    e.preventDefault();
    const that = this;
    // this.props.parent.dispatch({
    //   type:'orderManagement/shipmentOverseas',
    //   payload:{
    //     userId:userId,
    //     orderId:this.props.parent.orderId
    //   },
    //   callback:function () {
    //     that.props.parent.handleVisible(false,'childDelivery')
    //     that.props.form.resetFields();
    //     that.props.dispatch({
    //       type: 'orderManagement/supplierOrderTable',
    //       payload: {
    //         userId:userId,
    //         status:"全部"
    //       },
    //     });
    //   }
    // })
  }
  handleCancel = (e) => {
    this.props.parent.handleVisible(false,'childDelivery')
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const {parent:{expressArr}} = this.props
    // console.log(this.props)
    return (
      <div>
        <Modal
          title="发货"
         // visible={this.props.parent.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
        <div >
          aaaa
        </div>
        </Modal>
      </div>
    );
  }

}
