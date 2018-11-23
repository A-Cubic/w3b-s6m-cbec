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
 // loading: loading.effects['goodsManagement/getGoodsAboutData'],
}))

@Form.create()
export default class goodsSales extends Component {
  state={
    //sortedInfo:null,
    formValues:{},
    visible: false,


    visibleChildCheck:false,
  }

  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // }

  // handleOk = (e) => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // }

  // handleCancel = (e) => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // }




  //****/
  init(){
    this.props.dispatch({
      type:'rolePurchaserConsignment/goodsSales',
      payload:{}
    })
    //console.log('qa',this.props)
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

      
      
      //console.log('values',rangeValue[0].format('YYYY-MM-DD'))
      this.setState({
        formValues: values,
        //sortedInfo: null,
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
    // const sorterConditions = ['ascend','descend']

    // let sorters={}
    // if (sorter.field) {
    //   sorters = {
    //     [sorter.field]: sorterConditions.findIndex(i => i==sorter.order)
    //   }
    // }

    // this.setState({
    //   sortedInfo: null,
    // });
    const params = {
      ...pagination,
      ...this.state.formValues,
      //...sorters,
    };
     //console.log('顺序',params)
    this.props.dispatch({
      type: 'rolePurchaserConsignment/goodsSales',
      payload: params,
    });
  }

//const { rolePurchaserConsignment:{confirmReceipt:{tableData:{list, pagination}}} } = this.props;

handleVisible = (flag,who) => {
  console.log('flag',flag,who)

  this.setState({
    visibleChildCheck:!!flag,
  });



  // if(who=='childCheck'){
  //   this.setState({
  //     visibleChildCheck:!!flag,
  //   });
  // }else if(who=='childDelivery'){
  //   this.setState({
  //     visibleChildDelivery:!!flag,
  //   });
  // }
}
handleChildrenCheck =(record)=>{
  console.log('record',record,111)
  // this.props.dispatch({
  //   type: 'orderManagement/supplierOrderChildCheck',
  //   payload: {
  //     orderId:record.merchantOrderId,
  //   },
  // });
  this.handleVisible(true,'childCheck');
  // setTimeout(()=>{
  //   this.handleVisible(true,'childCheck');
  // },0)
}

  renderForm(){
    const { rolePurchaserConsignment:{confirmReceipt:{tableData}} } = this.props;
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
              {getFieldDecorator('information')(
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

// type: 'rolePurchaserConsignment/goodsSales',
  render() {
    //console.log('1',this.props)
    //let { sortedInfo } = this.state;
    const { rolePurchaserConsignment:{confirmReceipt:{tableData:{list, pagination}}} } = this.props;

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

        // console.log('val',val)
        // console.log('record',record)
        return (
          <div>
            <img src={record.img} alt="" width={80} style={{marginRight:8,}}/>
            <span style={{display:'inline-block',width:200}}>{val}</span>
          </div>
        )
    }}, {
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode',
    }, {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    },{
      title: '供货价',
      dataIndex: 'supplyPrice',
      key: 'supplyPrice',
     
    },{
      title: '销售单价',
      dataIndex: 'salesUnitPrice',
      key: 'salesUnitPrice',
      
    },{
        title: '销售数量',
        dataIndex: 'SalesVolumes',
        key: 'SalesVolumes',
       
      },{
        title: '销售金额',
        dataIndex: 'salesAmount',
        key: 'salesAmount',
        
      },{
        title: '销售日期',
        dataIndex: 'dateOfSale',
        key: 'dateOfSale',
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
          footer={[
            <Button key="1" onClick={this.handleCancel}>关闭</Button>,
            <Button key="2" type="primary" onClick={this.handleOverseas}>海外出货</Button>,
            <Button key="3" type="primary" onClick={this.handleOk}>确定</Button>
          ]}
        >
        <div className={styles.tableListForm}>
          <Form onSubmit={this.handleOk} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={24} sm={24}>
                <FormItem label="运单号">
                  {getFieldDecorator('waybillno',{
                    rules:[{
                      required:true,message:'请填写运单号',
                    }]
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Col>
            
              </Row>
          </Form>
        </div>
        </Modal>
      </div>
    );
  }

}