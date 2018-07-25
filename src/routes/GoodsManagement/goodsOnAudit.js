import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import {ChangeGoodsOnAuditModal,CheckGoodsOnAuditModal} from './goodsOnAuditModal';
// import CheckGoodsOnAuditModal from './changeGoodsOnAuditModal';
import styles from './goodsOnAudit.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const userId = getToken().userId;
@connect(({goodsManagement,  loading }) => ({
  goodsManagement,
  loading: loading.effects['goodsManagement/getGoodsOnAuditList'],
}))

@Form.create()
export default class goodsOnAudit extends Component {
  state={
    checkVisible:false,
    changeVisible:false,
  }
  init(){
    this.props.dispatch({
      type: 'goodsManagement/getGoodsOnAuditList',
      payload: {
        userId:userId,
      },
    });
  }
  componentDidMount() {
    this.init();
  }
  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      ...pagination,
      userId:userId,
    };
    this.props.dispatch({
      type: 'goodsManagement/getGoodsOnAuditList',
      payload: params,
    });
  }


  handleCheck=(e, record, index)=>{
    const that = this;
    this.props.dispatch({
      type:'goodsManagement/getGoodsDetails',
      payload:{
        logId:record.id
      }
    }).then(()=>{
      that.props.dispatch({
        type:'goodsManagement/checkStepStatus',
        payload:{
          userId:userId,
          logId:record.id
        },
        callback(params){
          if(params.status=='1'){
            console.log(that.props.goodsManagement.goodsOnAudit)
            that.handleVisible(true,'changeVisible')
          }else{
            that.handleVisible(true,'checkVisible')
          }
        }
      })
    })




  }
  handleVisible = (flag,who) => {
    if (who=='changeVisible'){
      this.setState({
        changeVisible:!!flag,
      });
    } else{
      this.setState({
        checkVisible:!!flag,
      });
    }
  }
  render() {

    // console.log('1',this.props)
    const { goodsManagement:{goodsOnAudit:{tableData,goodsDetails}} } = this.props;
    const {changeVisible,checkVisible} = this.state;

    const changeParent={
      visible:changeVisible,
      handleVisible:this.handleVisible,
      init:this.init,
    }
    const checkParent={
      visible:checkVisible,
      handleVisible:this.handleVisible,
    }
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...tableData.pagination,
    };
    const columns = [
      {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    }, {
      title: '供应商',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '商品上架数量',
      dataIndex: 'uploadNum',
      key: 'uploadNum',
    }, {
      title: '上架状态',
      dataIndex: 'statusText',
      key: 'statusText',
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record, index) => {
          return (
            <Fragment>
              {record.status==1?
                <a href="javascript:;" onClick={(e)=>this.handleCheck(e, record, index)}>审核</a>:
                <a href="javascript:;" onClick={(e) => this.handleCheck(e, record, index)}>查看详情</a>}
            </Fragment>
          )
        }
      }
    ];
    return (
      <div>
        <Card className={styles.mT10}>
          <Table dataSource={tableData.list}
                 rowKey={record => record.id}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
        <ChangeGoodsOnAuditModal
          parent={changeParent}
        />
        <CheckGoodsOnAuditModal
          parent={checkParent}
        />
      </div>
    );
  }
}
