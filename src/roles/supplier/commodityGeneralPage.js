import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs  } from 'antd';
import styles from './commodityGeneralPage.less';
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
// 供应商 - 报价管理 - 商品报价
export default class commodityGeneralPage extends Component {
  state={
  }
  init(){
    const { roleSupplierBus:{quotationList,quotationList:{status,tableData:{list,pagination}}} } = this.props;
    // this.props.dispatch({
    //   type:'roleSupplierBus/getQuotationListData',
    //   payload:{
    //     status:status==''?'待报价':status,
    //   }
    // })
    
  }
  componentDidMount() {
    this.init();
  }
 
  

  render() {
   const { roleSupplierBus:{quotationList,quotationList:{status,tableData:{list,pagination}}} } = this.props;
    //console.log(777777777,list)
  
    return (
      <div >
        <Card bordered={false}>
          <div style={{background:'#fff'}}>询价单详情</div>  
        </Card>
      
      </div>
    );
  }
}

