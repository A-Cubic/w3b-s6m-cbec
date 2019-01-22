import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs  } from 'antd';
import styles from './listDetails.less';
import moment from 'moment';
import { getCurrentUrl } from '../../../services/api'
import {getToken} from "../../../utils/Global";
import { isRegExp } from 'util';
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserBulkPurchases }) => ({
  rolePurchaserBulkPurchases
}))

@Form.create()
// 采购商 - 采购列表-报价中 - 20181211
export default class quoteWithDetails extends Component {
  state={
    formValues:{}
  }

  componentDidMount() {
    //this.init();
    //console.log('fs', this.props.rolePurchaserBulkPurchases.listQuotedQrice.tableData.item)
    const {match,dispatch}=this.props;
    //console.log('match',match)
    const getData = JSON.parse(match.params.biography)
    // if(getData.status == 3 || getData.status == 4 || getData.status == 5){
      this.props.dispatch({
        type:'rolePurchaserBulkPurchases/getquotedPrice',
        payload:{
          purchasesn:getData.purchasesn,
          status:getData.status
        }
      })
    // }
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
      type: 'rolePurchaserBulkPurchases/getquotedPrice',
      payload: {
        ...params,
        purchasesn:this.props.rolePurchaserBulkPurchases.listQuotedQrice.tableData.list[0].purchasesn,
        status:this.props.rolePurchaserBulkPurchases.listQuotedQrice.tableData.item.status
      },
    });
  }
  render() {
    const { rolePurchaserBulkPurchases:{listQuotedQrice:{tableData:{item,list, pagination}}} } = this.props;
    //const { rolePurchaserConsignment:{confirmReceipt:{tableData:{list, pagination}}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    //console.log('qqqqqfs',this.props.rolePurchaserBulkPurchases.listQuotedQrice.tableData.item.status)
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
        dataIndex: 'maxAvailableNum',
        key: 'maxAvailableNum',
      },{
        title: '供货单价',
        dataIndex: 'supplyPrice',
        key: 'supplyPrice',
      },{
        title: '采购数量',
        dataIndex: 'purchaseNum',
        key: 'purchaseNum',
      },{
        title: '总金额',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
      },{
        title: '操作',
        dataIndex: 'elseMoney',
        key: 'elseMoney',
        render: (val,record) =>{
          if(record.supplierNumType == 2){
            return (
              <div>
                <a href="javascript:;" onClick={()=>this.handleDetailsCheck(record)}>详情 </a><br/>
              </div>
            )
          }
        }


      }
    ];

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

           {

              this.props.rolePurchaserBulkPurchases.listQuotedQrice.tableData.item.status==4?
                // <div onClick={()=>this.demo()}>777</div>:
                <Row style={{marginTop:'30px', marginBottom:'35px'}}>
                  <Col md={9} sm={24}></Col>
                  <Col md={6} sm={24}>
                    <Button style={{ marginLeft: 48, marginLeft:"20px"}}type="primary" onClick={this.handleOnPlaceAnOrder} >立即下单</Button>
                    <Button style={{ marginLeft: 48 }} onClick={this.handleReturn}>取消</Button>
                  </Col>
                  <Col md={9} sm={24}></Col>
                </Row>:
                <div></div>
           }

        </Card>
      </div>
    );
  }
  handleDetailsCheck = (record) => {
   // console.log('详情',record)
    this.props.dispatch({
      type: 'rolePurchaserBulkPurchases/getAllListdetails',
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
   // console.log('getData.status',getData.status)
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

  handleCancel = () => {
   // console.log('del')
    this.props.dispatch({
      type:'rolePurchaserBulkPurchases/getAllListdetailsDelR',
      payload:false
    })
  }


  render(){

   // const {rolePurchaserBulkPurchases:{detailsList:{show,tableData:{list,pagination}}}} = this.props
   const {rolePurchaserBulkPurchases:{inquiryDetailsList:{show,tableData}}} = this.props
  //  console.log('22ok',this.props.rolePurchaserBulkPurchases.inquiryDetailsList.tableData)

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
        dataIndex: 'offerPrice',
        key: 'offerPrice',

      },  {
        title: '可供数量',
        dataIndex: 'maxOfferNum',
        key: 'maxOfferNum',
        render: (val,record) =>{

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
      }, {
        title: '采购金额',
        dataIndex: 'purchaseAmount',
        key: 'purchaseAmount',

      }
    ];

    return(
      <div>
        <Modal
          visible= {show}
          onCancel={this.handleCancel}
          width={1000}
        >
          <Card>
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
