import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import ModalWarehouse from './ModalWarehouse';
import styles from './Warehouse.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";
const userId = getToken().userId;

const Option = Select.Option;
const FormItem = Form.Item;
@connect(({goods,  loading }) => ({
  goods,
  // loading: loading.effects['o2o/list'],
}))

@Form.create()
export default class Warehouse extends Component {
  state={
    fileList:[],
    visible: false,
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type: 'goods/warehouseList',
      payload: {
        userId:userId
      },
    });
  }
  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      ...pagination,
      userId:userId,
    };

    this.props.dispatch({
      type: 'goods/warehouseList',
      payload: params
    });
  }
  componentDidMount() {
    this.init();
  }

  handleVisible = (flag) => {
    this.setState({
      visible:!!flag,
    });
  }
  addWarehouse =()=>{
    this.props.dispatch({
      type:'goods/getSupplier',
      payload:{
        userId:userId
      }
    })
    this.props.dispatch({
      type: 'goods/editWarehouse',
      payload: {
        taxation2type:'1',
        supplierId:'2',
      },
    });
    setTimeout(()=>{
      this.handleVisible(true);
    },0)
  }
  handleEditWarehouse =(record)=>{
    // console.log('aa',record)
    this.props.dispatch({
      type:'goods/getSupplier',
      payload:{
        userId:userId
      }
    })
    this.props.dispatch({
      type: 'goods/editWarehouse',
      payload: record,
    });
    setTimeout(()=>{
      this.handleVisible(true);
    },0)
  }
  handleDeleteWarehouse=(record)=>{
    const _this = this;
    this.props.dispatch({
      type: 'goods/deleteWarehouse',
      payload: {
        wid:record.wid
      },
      callback:function () {
        _this.init();
      }
    });
  }
  render() {
    // console.log('1',this.props)
    const { goods:{warehouseTable:{ list, pagination },supplierArr} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    }
    const columns = [
      {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier',
      render:val=>val?val:''

    }, {
        title: '所属仓库',
        dataIndex: 'wname',
        key: 'wname',
      }, {
        title: '税率',
        dataIndex: 'taxation',
        key: 'taxation',
        render:val=>val?val+'%':''
      }, {
        title: '税率提档类别',
        dataIndex: 'taxation2type',
        key: 'taxation2type',
        render:val=>val?['','按元/克提档','按总价提档'][val]:''
      }, {
        title: '税率提档线',
        dataIndex: 'taxation2line',
        key: 'taxation2line',
        render:val=>val?val+'元':''
      }, {
        title: '提档税率',
        dataIndex: 'taxation2',
        key: 'taxation2',
        render:val=>val?val+'%':''
      }, {
        title: '运费',
        dataIndex: 'freight',
        key: 'freight',
        render:val=>val?val+'元':''
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleEditWarehouse(record)}>编辑</a><br/>
              <a href="javascript:;" onClick={(e) => this.handleDeleteWarehouse(record)}>删除</a><br/>
            </Fragment>
          )
        }
      }
    ];
    const {visible} = this.state;
    const parent  = {
      visible:visible,
      handleVisible : this.handleVisible,
    };
    return (
      <div>
        <Card className={styles.mT10}>
          <Button type="primary" ghost onClick={this.addWarehouse}>新增仓库</Button>
          <Table
            dataSource={list}
            rowKey={record => record.wid}
            columns={columns}
            pagination={paginationProps}
            onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
        <ModalWarehouse
          parent = {parent}
        />
      </div>
    );
  }
}
