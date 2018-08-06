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
  // loading: loading.effects['goodsManagement/getGoodsOnAuditList'],
}))

@Form.create()
export default class goodsOnAudit extends Component {

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
    this.props.dispatch({
      type:'goodsManagement/getGoodsDetailsAndOther',
      payload:{
        userId:userId,
        logId:record.id
      }
    })
  }
  handleVisible = (flag,who) => {
    this.props.dispatch({
      type: 'goodsManagement/changeVisible',
      payload: {
        visibleType: who,
        visibleValue: !!flag
      }
    });
  }
  render() {
    const { goodsManagement:{goodsOnAudit:{tableData}} } = this.props;
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
          />
        </Card>
        <ChangeGoodsOnAuditModal
        />
        <CheckGoodsOnAuditModal
        />
      </div>
    );
  }
}
