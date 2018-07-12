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
      type: 'goods/goodsPutaway',
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
    // console.log('params',params)
    this.props.dispatch({
      type: 'goods/goodsPutaway',
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
  handleCheck=(e, record, index)=>{
    const {dispatch}=this.props;
    this.props.dispatch({
      type:'goods/checkStepStatus',
      payload:{
        userId:userId,
        logId:record.id
      },
      callback(params){
        switch (params.status){
          case '0':
            dispatch(routerRedux.push('/goods/step-form/confirm/' + params.id));
            break;
          case '1':
            dispatch(routerRedux.push('/goods/step-form/wait/' + params.id));
            break;
          case '2':
            dispatch(routerRedux.push('/goods/step-form/result/true/' + params.id));
            break;
          case '3' :
            dispatch(routerRedux.push('/goods/step-form/result/false/'+ params.id));
            break;
          default:
            break;
        }
      }
    })

  }
  downloadStoreTemp=()=>{
    window.location.href='http://ecc-product.oss-cn-beijing.aliyuncs.com/b2b/goodsnum/warehouse.xlsx'
  }
  render() {

    // console.log('1',this.props)
    const { goods:{goodsPutawayTable:{list, pagination}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const columns = [
      {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    }, {
      title: '入库商品数量',
      dataIndex: 'uploadNum',
      key: 'uploadNum',
    }, {
      title: '入库状态',
      dataIndex: 'statusText',
      key: 'statusText',
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record, index) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleCheck(e, record, index)}>查看详情</a><br/>
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
