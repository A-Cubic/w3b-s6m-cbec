import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs,InputNumber   } from 'antd';
import styles from './listDetails.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
import {getToken} from "../../../utils/Global";
import { isRegExp } from 'util';
import { func } from 'prop-types';
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserBulkPurchases }) => ({
  rolePurchaserBulkPurchases
}))

@Form.create()
// 采购商 - 采购列表-已报价 - 20181211
export default class quotedPriceOver extends Component {
  state={
    formValues:{},
    value:'',
    //valueDetails:'',
    getDataPurchasesn:''
  }
  componentDidMount() {
    //this.init();
    const {match,dispatch}=this.props;
   // console.log('match',match)
    const getData = JSON.parse(match.params.biography)

    if(getData.status == 2 ){
      this.props.dispatch({
        type:'rolePurchaserBulkPurchases/getquotedPriceOver',
        payload:{
          purchasesn:getData.purchasesn,
          status:getData.status
        }
      })
    } 
  }
  //分页 
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
   // console.log('11111',this.props.rolePurchaserBulkPurchases.listDetails.tableData.list[0].purchasesn)
   // console.log('22222',this.props.rolePurchaserBulkPurchases.listDetails.tableData.item.stage)
    this.props.dispatch({
      // type: 'rolePurchaserBulkPurchases/getpurchasepaging',
      type: 'rolePurchaserBulkPurchases/getQuotationPaging',
     // payload: params,
      payload: {
        ...params,
        purchasesn:this.props.rolePurchaserBulkPurchases.listQuotedQriceOver.tableData.list[0].purchasesn,
        status:this.props.rolePurchaserBulkPurchases.listQuotedQriceOver.tableData.item.status
      },
    });
  }

   onChange=(v)=>{
    //console.log('v',v)
    this.setState({
      value: v
    },()=>{
      //console.log('bbbbbb',this.state.value)
    });
   
    }
  render() {
    const { rolePurchaserBulkPurchases:{listQuotedQriceOver:{tableData:{item,list, pagination}}} } = this.props;
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
        title: '询价商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      }, {
        title: '询价商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        //render:val=>`${val==1?'收货单':'退货单'}`
      }, {
        title: '询价数量',
        dataIndex: 'total',
        key: 'total',
      }, {
        title: '可供数量',
        dataIndex: 'maxOfferNum',
        key: 'maxOfferNum',
        render: (val,record) =>{
        
          return (
            <div>
              {record.minAvailableNum}-{record.maxAvailableNum}
            </div>
          )
        
      }
      },{
        title: '供货单价',
        dataIndex: 'supplyPrice',
        key: 'supplyPrice',
      },
      {
        title: '采购数量',
        dataIndex: 'purchaseNum',
        key: 'purchaseNum',
       
        render: (val,record,e) =>{
         // console.log(2,record)
          // {record.supplierNumType ==2?<a onClick={()=>this.handleDetailsCheck(record)}>详情<br/></a>:<span></span>}
          return (
            record.supplierNumType ==2?<span >--</span>:
          <InputNumber 
            // onChange={this.onChange(record)} 
             onChange={this.onChange}
             onBlur={()=>this.inputOnBlur(record) }
             //  onClick={(e) => this.handleDelCheck(e, record, index)}>
              min={parseInt(record.minAvailableNum)} 
              max={parseInt(record.maxAvailableNum)} 
              defaultValue={record.purchaseNum}
            />

          )
        }
      }
      ,{
        title: '总金额',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        // render: (val,record) =>{
        //   return(
        //     record.purchaseNum * record.supplyPrice
        //   )
        // }

      },{
        title: '操作',
        dataIndex: 'elseMoney',
        key: 'elseMoney',
        render: (val,record) =>
        
          <div>
              {record.supplierNumType ==2?<a onClick={()=>this.handleDetailsCheck(record)}>详情<br/></a>:<span></span>}
              {record.status !=3?<a onClick={(e) => this.handleDel(e, record)}>删除</a>:<div></div>}
          </div>    
      }
    ]
    return (
      <div >
        <Card bordered={false} >
        
          <div className={styles.titleName}>采购单</div>
          <div className={styles.takeGoods}>
            <span></span>
            提货信息
          </div>
          <div className={styles.takeAdd}>
            <p>提货地点：{item.typeName}</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.takeGoods}>
            <span></span>
            采购商信息
          </div>
          <div className={styles.information}>
            <p>姓名：{item.contacts}</p>
            <p>联系电话：{item.tel}</p>
            <p>采购截止日期：{item.deliveryTime}</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.takeGoods}>
            <span></span>
            采购商品
          </div>
          <div className={styles.describe}>
            <p>询价单描述：{item.remark}<span></span></p>
          </div>
          <Table dataSource={list}

                 rowKey={record => record.keyId}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
          />
          <div className={styles.line}></div>
          <div className={styles.takeGoods}>
            <span></span>
            费用计算
          </div>
          <div className={styles.money}>
          商品金额：<span>{item.purchasePrice}</span>　运费：<span>￥{item.waybillfee}</span>　税费：<span>￥{item.tax}</span>
          </div>
          <PurchaseOrder />
          
            <Row style={{marginTop:'30px', marginBottom:'35px'}}>
              <Col md={9} sm={24}></Col>      
              <Col md={6} sm={24}>
                <Button style={{ marginLeft: 48, marginLeft:"20px"}}type="primary" onClick={this.handleSubmission} >提交</Button>
                <Button style={{ marginLeft: 48 }} onClick={this.handleCancel}>取消</Button>
              </Col>
              <Col md={9} sm={24}></Col>      
            </Row>

        </Card>
      </div>
    );
  }


//改变数量
  //onChange
  inputOnBlur = (record,val) =>{
   // console.log('record',record.barcode)
    //console.log('onchange_valuce', this.state.value)
    const {match,dispatch}=this.props;
    const getData = JSON.parse(match.params.biography)
    const b = this.props.rolePurchaserBulkPurchases.listQuotedQriceOver.tableData.list.map((item) => {
     return {
      // demand:this.state.value,
      // price:item.supplyPrice,
      purchaseNum:this.state.value,
      supplyPrice:item.supplyPrice,
      barcode:item.barcode,
     }
    })

    const c =b.find(item=>
      item.barcode===record.barcode
    )
    const d = [c].map((item) => {
      // const demand
      // const price
       //return  [item.demand = item.purchaseNum,item.price = item.supplyPrice]
       return {
        // demand:this.state.value,
        // price:item.supplyPrice,
        demand:this.state.value,
        price:item.supplyPrice,
       }
      })  
    // console.log('item返回值b',b)
    // console.log('item返回值c',[c])
    // console.log('item返回值d',d)
    // console.log('purchaseNum',record.purchaseNum)  
    // console.log('this.state.value',this.state.value =='') 
    if(this.state.value != ''){
      if(record.purchaseNum != this.state.value){
        //console.log('传数')
        this.props.dispatch({
          type: 'rolePurchaserBulkPurchases/getChangeNum',
          //payload: params,
          payload: {
            purchasesn:getData.purchasesn,
            // list:this.props.rolePurchaserBulkPurchases.listQuotedQriceOver.tableData.list,
            list:d,
            barcode:record.barcode
          },
        }); 
      }  
    }  
  }

  //提交
  handleSubmission = () => {
    //const { this.props:{listQuotedQrice:{listQuotedQrice:{item,list, pagination}}} } = this.props;
    const {match,dispatch}=this.props;
    const getData = JSON.parse(match.params.biography)
    //console.log('qqqqq',getData)
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getOffer',
      //payload: params,
      payload: {
        purchasesn:getData.purchasesn,
        //status:getData.status
      },
    });
    
  }
   //取消
   handleCancel = () => {
    //const { this.props:{listQuotedQrice:{listQuotedQrice:{item,list, pagination}}} } = this.props;
   // console.log('over')
    const {match,dispatch}=this.props;
    const getData = JSON.parse(match.params.biography)
    //console.log('qqqqq',getData)
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getCancel',
      //payload: params,
      payload: {
        purchasesn:getData.purchasesn,
        //status:getData.status
      },
    });
  }

   //删除
   handleDel = (e, record)=>{
     this.props.dispatch({
       type: 'rolePurchaserBulkPurchases/getQuotedPriceDel',
       payload: {
         purchasesn:record.purchasesn,
         barcode:record.barcode,
         //index:index
       },
     });
   }

  handleDetailsCheck = (record) => {
    //console.log('详情',record)
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/completedDetails',
      payload: {
        purchasesn:record.purchasesn,
        barcode:record.barcode
      }
    })
  }
  handleOnPlaceAnOrder = () => {
    //const { this.props:{listQuotedQrice:{listQuotedQrice:{item,list, pagination}}} } = this.props;
    const {match,dispatch}=this.props;
    const getData = JSON.parse(match.params.biography)
    //console.log('qqqqq',getData)
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getPlaceAnOrder',
      //payload: params,
      payload: {
        purchasesn:getData.purchasesn,
        status:getData.status
      },
    });
    
  }
  handleReturn = () => {
    this.props.dispatch(routerRedux.push('/bulkPurchases/inquiryList/' ))
  }
}

@connect(({rolePurchaserBulkPurchases }) => ({
  rolePurchaserBulkPurchases
}))
class PurchaseOrder extends Component {
  state={
    valueDetails:{},
  
  }
  onChangeDetails=(v, r)=>{
    //console.log('v',v)
    const sss = r.keyId;
    this.setState({
      valueDetails: {...this.state.valueDetails, [sss]: v}
    }
    // ,()=>{
    //   console.log('bbbbbb',this.state.valueDetails)
    // }
    );
  }
  inputOnBlurDetails = (record,val) =>{
    
    //  console.log(this.state.valueDetails)
    const a = this.props.rolePurchaserBulkPurchases.inquiryDetailsListDetails.tableData;
    a.map((item) => {
      if(item.keyId == record.keyId && this.state.valueDetails[item.keyId] != undefined){
        item.demand=this.state.valueDetails[item.keyId]
        
      }
       // console.log('item',item)
    })

   }


  handleOk = () => {
    const {rolePurchaserBulkPurchases:{inquiryDetailsListDetails:{show,tableData}}} = this.props
    this.props.dispatch({
      // type: 'rolePurchaserBulkPurchases/getChangeNum',
      type: 'rolePurchaserBulkPurchases/CommodityDetails',
      //payload: params,
      payload: {
        purchasesn:this.props.rolePurchaserBulkPurchases.inquiryDetailsListDetails.obj.purchasesn,
        barcode:this.props.rolePurchaserBulkPurchases.inquiryDetailsListDetails.obj.barcode,
        list:this.props.rolePurchaserBulkPurchases.inquiryDetailsListDetails.tableData
        // list:this.props.rolePurchaserBulkPurchases.listQuotedQriceOver.tableData.list,
        //list:b,
        //barcode:record.barcode
      },
    });  
    this.props.dispatch({
      type:'rolePurchaserBulkPurchases/gethideR',
      payload:false
    }) 

  }


  handleCancel = () => {
    //console.log('del')
     this.props.dispatch({
       type:'rolePurchaserBulkPurchases/gethideR',
       payload:false
     })
   }


  render(){
   // const {rolePurchaserBulkPurchases:{detailsList:{show,tableData:{list,pagination}}}} = this.props
   const {rolePurchaserBulkPurchases:{inquiryDetailsListDetails:{show,tableData}}} = this.props
    //console.log('22ok',this.props.rolePurchaserBulkPurchases.inquiryDetailsListDetails.tableData)

    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '供货编号',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '供货单价',
        dataIndex: 'price',
        key: 'price',
        
      },  {
        title: '可供数量',
        dataIndex: 'maxOfferNum',
        key: 'maxOfferNum',
        render: (val,record,e) =>{
        // console.log('e',e)
            return (
              <div>
                {record.minOfferNum}-{record.maxOfferNum}
              </div>
            )
        }
      }, {
        title: '采购数量',
        dataIndex: 'demand',
        key: 'demand',
        render: (val,record) =>{

          return(
            <InputNumber 
            // onChange={this.onChange(record)} 
            // onChange={onChange}
             
             //  onClick={(e) => this.handleDelCheck(e, record, index)}>
              min={parseInt(record.minOfferNum)} 
              max={parseInt(record.maxOfferNum)} 
              defaultValue={ this.state.valueDetails[record.keyId] == undefined ? record.demand : this.state.valueDetails[record.keyId]}
              //defaultValue={record.demand}
              onChange={(e)=>{this.onChangeDetails(e, record)}}
              onBlur={()=>this.inputOnBlurDetails(record) }
            />
          )

        }
      }, {
        title: '采购金额',
        dataIndex: 'purchaseAmount',
        key: 'purchaseAmount',
        render: (val,record) =>{

        //   const a = this.props.rolePurchaserBulkPurchases.inquiryDetailsListDetails.tableData;
        //   a.map((item) => {
        //   //  console.log('keyId',record.keyId)
        //     if(item.keyId == record.keyId){
        //       item.demand=this.state.valueDetails
              
        //     }
        //      // console.log('item',item)
        //   })
        // console.log('a',a)
          

         const c = this.props.rolePurchaserBulkPurchases.inquiryDetailsListDetails.tableData.find(item=>
          item.keyId===record.keyId
          )
       


         // console.log('c ',this.state.valueDetails)


          return(
            //this.state.valueDetails * record.price
            this.state.valueDetails[record.keyId] == undefined ? record.demand * record.price : this.state.valueDetails[record.keyId] * record.price
          )
        }
      
      }
    ];

    return(
      <div>
        <Modal
          visible= {show}
          onCancel={this.handleCancel}
          width={1000}
          onOk={this.handleOk}
        >
          <Card>
              {/* <div>11111</div> */}
              <Table dataSource={tableData}
                // scroll={{ x: 1500}}
                columns={columns}
                //onChange={this.handleTableChange}
                // loading={submitting}
                rowKey={record => record.keyId}
              />

          </Card>
        </Modal>
      </div>
    )
  }

}