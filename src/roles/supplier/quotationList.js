import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs  } from 'antd';
import styles from './quotationList.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";
import { spawn } from 'child_process';
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({roleSupplierBus }) => ({
  roleSupplierBus
}))

@Form.create()
// 供应商 - 报价管理
export default class quotationList extends Component {
  state={
    formValues:{}
  }
  init(){
    const { roleSupplierBus:{quotationList,quotationList:{status,tableData:{list,pagination}}} } = this.props;
    this.props.dispatch({
      type:'roleSupplierBus/getQuotationListData',
      payload:{
        status:status==''?'待报价':status,
      }
    })
    
  }
  componentDidMount() {
    this.init();
  }
 
  callback=(index) => {
    this.props.dispatch({
      type:'roleSupplierBus/getQuotationListData',
      payload: {
        status:index,
      }
    });
  }

  handleStatus=(item) => {
    //console.log('item',item)
    this.props.dispatch(routerRedux.push('/quotationManagement/commodityGeneralPage/' + item.id  ));
  } 

  handleTableChange=(pagination, filtersArg, sorter)=>{
    const { roleSupplierBus:{quotationList,quotationList:{status}} } = this.props;
    const params = {
      ...pagination,
    };
    this.props.dispatch({
      type:'roleSupplierBus/getQuotationListData',
      // payload: params,
      payload: {
        ...params,
        status:status==''?'待报价':status,
      }
    });
  }

  render() {
   const { roleSupplierBus:{quotationList,quotationList:{status,tableData:{list,pagination}}} } = this.props;
    //console.log(777777777,list)
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
      }, 
      {
        title: '询价单号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '采购截至日期',
        dataIndex: 'sendTime',
        key: 'sendTime',
      }, {
        title: '询价日期',
        dataIndex: 'sendTel',
        key: 'sendTel',
      }, 
      {
        title: '操作',
        dataIndex: 'status',
        key: 'status',
        render: (val,record) =>{

          switch(status){
            case '待报价':
              return <span onClick={()=>this.handleStatus(record)}><a>去报价</a></span>
              break;
            case '已报价':
              return <span onClick={()=> this.handleStatus(record)}><a>查看</a></span>
              break;
            case '待确认':
              return <span onClick={()=> this.handleStatus(record)}><a>去确认</a></span>
              break;
            case '已成交':
              return <span onClick={()=> this.handleStatus(record)}><a>查看</a></span>
              break;
            case '已关闭':
              return <span onClick={()=> this.handleStatus(record)}><a>查看</a></span>
              break;
              default:
              break;
          }
        }
        
      }
    ];


    return (
      <div >
        <Card bordered={false}>
          <Tabs  type="line" style={{marginBottom:'10px'}} onChange={this.callback}>
            <TabPane tab="待报价" key="待报价">
            </TabPane>
            <TabPane tab="已报价" key="已报价">
            </TabPane>
            <TabPane tab="待确认" key="待确认">
            </TabPane>
            <TabPane tab="已成交" key="已成交">
            </TabPane>
            <TabPane tab="已关闭" key="已关闭">
            </TabPane>
          </Tabs>
          <Table dataSource={list}
                rowClassName={styles.td}
                className={styles.rowClass}
                rowKey={record => record.keyId}
                columns={columns}
                pagination={paginationProps}
                onChange={this.handleTableChange}
          />
        </Card>
      
      </div>
    );
  }
}

