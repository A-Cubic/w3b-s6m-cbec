import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import ModalWarehouse from './ModalWarehouse';
import styles from './Warehouse.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'

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
      },
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
  addWarehouse =(record)=>{
    // this.props.dispatch({
    //   type: 'o2o/orderCheck',
    //   payload: {
    //     orderId:record.merchantOrderId,
    //   },
    // });
    setTimeout(()=>{
      this.handleVisible(true);
    },0)
  }

  render() {
    // console.log('1',this.props)
    const { goods:{warehouseTable:{ list, pagination }} } = this.props;
    const columns = [
      {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleEdit(e, record, index)}>编辑</a><br/>
              <a href="javascript:;" onClick={(e) => this.handleDelete(e, record, index)}>删除</a><br/>
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
                 rowKey={record => record.id}
                 columns={columns}
                 pagination={pagination}
                 // rowKey={record => record.id}
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
