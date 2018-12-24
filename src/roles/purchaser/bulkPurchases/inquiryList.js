import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs  } from 'antd';
import styles from './inquiryList.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
import {getToken} from "../../../utils/Global";
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserBulkPurchases }) => ({
  rolePurchaserBulkPurchases
}))

@Form.create()
// 采购商 - 询价列表 - 20181211
export default class inquiryList extends Component {
  state={
    formValues:{}
    // fileList:[],
    // visibleChildCheck:false,
    // visibleChildDelivery:false,
    // orderId:'',
    // visible: false,
    // formValues:{},
    // warehouseId:'',
    // hidd:false,
  }
  init(){
    this.props.dispatch({
      type:'rolePurchaserBulkPurchases/getInquiryListData',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values111',fieldsValue)
      console.log('this.props',this.props.rolePurchaserBulkPurchases.inquiryList.tableData.pagination)
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
        type: 'rolePurchaserBulkPurchases/getInquiryListData',
        payload: {
          ...values,
          current:this.props.rolePurchaserBulkPurchases.inquiryList.tableData.pagination.current,
          pageSize:this.props.rolePurchaserBulkPurchases.inquiryList.tableData.pagination.pageSize
        },
      });
    });

  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.setState({
      formValues: {},
    });
    this.init();
  }
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    console.log('params',params)
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getInquiryListData',
      //payload: params,
      payload: {
        ...params,
      },
    });
  }
  renderForm(){
    console.log(this.props.rolePurchaserBulkPurchases.inquiryList.tableData)
    const { rolePurchaserBulkPurchases:{inquiryList:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;


    //console.log('询价~~~',this.props)
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="单据日期：">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
          
          <Col md={12} sm={24}>
            <FormItem label="">
              {getFieldDecorator('select')(
                <Input placeholder="请输入询价单号及询价单描述进行搜索" />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col md={12} sm={24}>
            <FormItem label="结算状态">
              {getFieldDecorator('status',{
              })(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="">全部</Option>
                  <Option value="1">询价中</Option>
                  <Option value="2">已报价</Option>
                  <Option value="3">报价中</Option>
                  <Option value="4">已报价(二次)</Option>
                  <Option value="5">已完成</Option>
                  <Option value="6">已关闭</Option>
                  <Option value="7">待提交</Option>
                  
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
            <Button style={{ marginLeft:26 }} type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            {/*<span>共查询出符合条件的数据：{tableData?tableData.list.length:0} </span>*/}
          </div>
        </div>
      </Form>
    );
  }

  render() {

    const { rolePurchaserBulkPurchases:{inquiryList:{tableData:{list, pagination}}} } = this.props;   
    //const { rolePurchaserConsignment:{confirmReceipt:{tableData:{list, pagination}}} } = this.props;
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
        title: '询价单号',
        dataIndex: 'purchasesn',
        key: 'purchasesn',
      }, {
        title: '询价日期',
        dataIndex: 'createtime',
        key: 'createtime',
      },{
        title: '询价单描述',
        dataIndex: 'remark',
        key: 'remark',
        //render:val=>`${val==1?'收货单':'退货单'}`
      }, {
        title: '状态',
        dataIndex: 'status',
        render: (val) => {
          return(<div>
            {['','询价中','已报价','报价中','已报价(二次)','已完成','已关闭','待提交'][`${val}`]}
          </div>)
        }
      }, {
        title: '操作',
        dataIndex: 'sendTime',
        key: 'sendTime',
        render: (val,record) =>
          <div>
            <a href="javascript:;" onClick={()=>this.handleViewState(record)} >查看</a><br/>
          </div>
      }
    ];

    
    return (
      <div className={styles.qa}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
        
          <Table dataSource={list}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.keyId}
                 columns={columns}
                 //rowClassName={record => record.status==0||record.status==2?styles.columnsBgColor:''}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
          {/* <PurchaseOrder /> */}
        </Card>  
      </div>
    );
  }

  handleViewState(record){
    //console.log(record)
  //  this.props.dispatch({
  //     type: 'rolePurchaserBulkPurchases/getSeeData',
  //     //payload: params,
  //     payload: {
  //       purchasesn:record.purchasesn,
  //       status:record.status
  //     },
  //   });
  //dispatch(routerRedux.push('/goods/step-form/confirm/' + params.id));
  //this.props.dispatch(routerRedux.push('/goods/step-form/confirm/'+params.id));
    if(record.status === '7'){
      this.props.dispatch(routerRedux.push('/bulkPurchases/initiateInquiry/' + JSON.stringify(record)  ));
    }
    
    //JSON.parse JSON.stringify

    let type;
    switch (record.status){
      
      case '1':
          type=1; //询价中
          console.log(type)
          break;
        case '2':
          type=2; //已报价
          console.log(type)
          break;
        case '3':
          type=3; //报价中
          console.log(type)
          break;
        case '4':
          type=4; //已报价(二次)
          console.log(type)
          break;
        case '5':
          type=5; //已完成
          console.log(type)
          break;
        case '6':
          type=6; //已关闭
          console.log(type)
          break;
        case '7':
          type=7; //待提交
          console.log(type)
          break;
        default:
          console.log(1)
          break;
    }
    //console.log(record)
    
   
  }












  // handleChildrenCheck = (record) => {
  //   this.props.dispatch({
  //     type: 'rolePurchaserBulkPurchases/childrenCheck',
  //     payload: {}
  //   })
  // }
   

}


// @connect(({rolePurchaserBulkPurchases }) => ({
//   rolePurchaserBulkPurchases
// }))
// class PurchaseOrder extends Component {

//   handleCancel = () => {
//     this.props.dispatch({
//       type:'rolePurchaserBulkPurchases/childrenCheckDelR',
//       payload:false
//     })
//   }

  

//   render(){
    
//     //const { rolePurchaserBulkPurchases:{myqa:{show,tableData:{list,pagination}}} } = this.props;
//     const {rolePurchaserBulkPurchases:{seeList:{show,tableData:{list,pagination}}}} = this.props
//     //console.log('22ok',this.props)

//     const columns = [
//       {
//         title: '序号',
//         dataIndex: 'keyId',
//         key: 'keyId',
//       }, {
//         title: '询价单号',
//         dataIndex: 'order',
//         key: 'order',
//       }, {
//         title: '询价单标题',
//         dataIndex: 'date',
//         key: 'date',
        
//       }, {
//         title: '状态',
//         dataIndex: 'goodsTotal',
//         key: 'goodsTotal',
//       }, {
//         title: '操作',
//         dataIndex: 'sendTime',
//         key: 'sendTime',
//         render: (val,record) =>
//           <div>
//             <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)} >查看</a><br/>
//           </div>
//       }
//     ];



//     return(
//       <div>
//         <Modal
//           visible= {show}
//           onCancel={this.handleCancel}
//           width={1000}
//         >
//           <Card>
            
//             <Table dataSource={list}
//                   // scroll={{ x: 1500}}
//                   columns={columns}
//                   onChange={this.handleTableChange}
//                   // loading={submitting}
//                   rowKey={record => record.keyId}
//             />

//           </Card>
         

//         </Modal>
//       </div>
//     )

//   }

// }