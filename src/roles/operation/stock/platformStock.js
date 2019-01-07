import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './platformStock.less';
import moment from 'moment';
import {getCurrentUrl, getUploadUrl} from '../../../services/api'
import {getHeader, getToken} from "../../../utils/Global";
const userId = getToken().userId;
import {message} from "antd/lib/index";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({roleOperationDistribution }) => ({
  roleOperationDistribution,
}))
// --------  --------------
    // 库存 - 平台库存
@Form.create()
export default class platformStock extends Component {
  state={
    formValues:{},
    visible: false,
    visibleChildCheck:false,
  }

  //****/
  init(){
    this.props.dispatch({
      type:'roleOperationDistribution/platformStock',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'roleOperationDistribution/platformStock',
        payload: {
          ...values,
        },
      });
    });
  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo: null,
    });
    this.init();
  }
  handleTableChange=(pagination, filters, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'roleOperationDistribution/platformStock',
      payload: params,
    });
  }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }
  // 下载销售模板
  downloadTemplate=()=>{
    // window.location.href='http://ecc-product.oss-cn-beijing.aliyuncs.com/templet/order.xlsx'
    window.location.href='http://ecc-product.oss-cn-beijing.aliyuncs.com/templet/dealershipOrder.xlsx'
  }
  // 上传销售数据
  handleUploadChange=(info)=>{
    console.log('userId',userId)
    if(info.file.status === 'done') {
      this.props.dispatch({
        type: 'roleOperationDistribution/uploadOrderbill',
        payload: {
          userId:userId,
          fileTemp: info.file.response.fileName[0]
        },
        callback: this.onUploadCallback,
      });
    }
  }
  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      message.error(msg,8);
    }else{
      message.success("上传成功",5);
    }
    this.init();
  }
  renderForm(){
    const { roleOperationDistribution:{platformStock:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    
    console.log('xxx',this.props)
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={9} sm={24}>
            <FormItem >
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>
          </Col>
          <Col md={9} sm={24}>
            <FormItem label="">
              {getFieldDecorator('select')(
                <Input style={{ width: '100%' }} placeholder="可输入商品条码，商品名称，商品品牌进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span>共查询出符合条件的数据：{tableData?tableData.pagination.total:0}条，</span>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    const { roleOperationDistribution:{platformStock:{tableData:{list, pagination}}} } = this.props;
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
      title: '供货商',
      dataIndex: 'purchasesn',
      key: 'purchasesn',
    }, {
      title: '仓库',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
        render:val=>`¥${val}`
    },{
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode',

    },{
      title: '规格',
      dataIndex: 'receivable',
      key: 'receivable',
      render:val=>`¥${val}`
    },{
        title: '原产地',
        dataIndex: 'payType',
        key: 'payType',
      },{
        title: '生产商',
        dataIndex: 'paymoney',
        key: 'paymoney',
        render:val=>`¥${val}`
      },{
        title: '库存数量',
        dataIndex: 'discountName',
        key: 'discountName',
      },{
        title: '零售价',
        dataIndex: 'a',
        key: 'a',
        render:val=>`¥${val}`
      },{
        title: '平台采购价',
        dataIndex: 'discountMoney',
        key: 'discountMoney',
        render:val=>`¥${val}`
      },{
        title: '操作',
        dataIndex: 'b',
        key: 'b',
        render: (val,record) =>
        <div>
            {<a onClick={(e) => this.handleDel(e, record)}>删除</a>}
        </div>
      }
    ];

    const props = {
      action: getUploadUrl(),
      headers: getHeader(),
      showUploadList: false,
      // listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange,
      multiple: false,
      // customRequest:this.upload,
    };
    return (
      <div>
        <Card bordered={false}>
          <div style={{display: 'inline-flex',marginBottom:20,}} className={styles.hot}>
            <Button  type="primary" onClick={this.downloadTemplate} style={{ marginLeft: 8 }}>
              <Icon type="download" />下载销售模板
            </Button>
            <Upload {...props}>
              <Button style={{ marginLeft: 8 }}>
                <Icon type="upload" /> 上传销售数据
              </Button>
            </Upload>
          </div>

          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
          <Table dataSource={list}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.keyId}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
      </div>
    );
  }
   //删除
   handleDel = (e, record)=>{
    // console.log('record',record)
    this.props.dispatch({
      type: 'roleOperationDistribution/deleteList',
      payload: {
       purchasesn:record.barcode,
        //barcode:record.barcode,
        //index:index
      },
    });
  }
}


