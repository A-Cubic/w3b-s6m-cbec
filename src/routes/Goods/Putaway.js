import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker } from 'antd';
// import ModalGoodsAboutEdit from './ModalGoodsAboutEdit';
import styles from './Putaway.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const userId = getToken().userId;
@connect(({goods,  loading }) => ({
  goods,
  loading: loading.effects['goods/goodslist'],
}))

@Form.create()
export default class GoodsAbout extends Component {
  state={
    fileList:[]
  }
  init(){

    this.props.dispatch({
      type: 'goods/goodslist',
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
      ...this.state.formValues,
      userId:userId,
    };
    // console.log('params',params)
    this.props.dispatch({
      type: 'goods/goodslist',
      payload: params,
    });
  }
  handleUploadChange=(info)=>{
    console.log('info',info)
    let fileList = info.fileList;
    this.setState({
      fileList:info.fileList
    })

    this.props.dispatch({
      type: 'o2o/upload',
      payload: {
        fileList:info.fileList
      },
      callback: this.onUploadCallback,
    });
    this.setState({
      fileList:[]
    })
  }
  upload=(file)=>{}
  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      notification.error({
        message: "提示",
        description: msg,
      });
    }else {
      notification.success({
        message: "提示",
        description: msg,
      });
    }
  }
  onStartUpload=()=>{
    this.props.dispatch(routerRedux.push('/goods/step-form'));
  }
  render() {

    // console.log('1',this.props)
    const { goods:{goodsTable:{list, pagination},brandData} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const url = 'http://192.168.0.109:51186/llback/O2O/UploadOrder'
    const props = {
      action: url,
      listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange,
      multiple: false,
      customRequest:this.upload,
    };
    const columns = [
      {
      title: '上传时间',
      dataIndex: 'slt',
      key: 'slt',
    }, {
      title: '入库商品',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '入库状态',
      dataIndex: 'barcode',
      key: 'barcode',
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record, index) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleEdit(e, record, index)}>查看详情</a><br/>
            </Fragment>
          )
        }
      }
    ];
    return (
      <div>
        <Card className={styles.mT10}>
          <Button type="primary" ghost onClick={this.downloadStoreTemp}>下载商品及入库模板</Button>
          <Button style={{marginLeft:8}} type="primary" ghost onClick={this.onStartUpload}>开始上传商品入库信息</Button>

          <Table dataSource={list}
                 rowKey={record => record.id}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
      </div>
    );
  }
}
