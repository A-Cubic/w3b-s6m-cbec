import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
// import ModalUnteratedOrder from './ModalUnteratedOrder';
import styles from './supplierOrder.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(({orderManagement,  loading }) => ({
  orderManagement,
  loading: loading.effects['orderManagement/list'],
}))

@Form.create()
export default class supplierOrder extends Component {
  state={
    fileList:[],
    fileList1:[],
    visible: false,
    formValues:{},
  }
  init(){
    this.props.dispatch({
      type: 'orderManagement/getWareHouse',
      payload: {
        userId:userId,
      },
    });
    this.props.dispatch({
      type: 'orderManagement/supplierOrderTable',
      payload: {
        userId:userId,
        status:"全部"
      },
    });
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
    const {orderManagement:{supplierOrder:{tableData}}}=this.props
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)

      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        'date': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'orderManagement/supplierOrderTable',
        payload: {
          userId:userId,
          ...values,
          ...tableData.pagination
        },
      });
    });


  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.init();
  }
  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      ...this.state.formValues,
      ...pagination,
      userId:userId
    };

    this.props.dispatch({
      type: 'orderManagement/supplierOrderTable',
      payload: params,
    });
  }
  handleVisible = (flag) => {
    this.setState({
      visible:!!flag,
    });
  }
  handleChildrenCheck =(record)=>{
    this.props.dispatch({
      type: 'o2o/orderCheck',
      payload: {
        orderId:record.merchantOrderId,
      },
    });
    setTimeout(()=>{
      this.handleVisible(true);
    },0)
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
  renderAdvancedForm(){
    const { orderManagement:{supplierOrder:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单状态">
              {getFieldDecorator('status',{
                initialValue:'全部'
              })(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="全部">全部</Option>
                  <Option value="待付款">待付款</Option>
                  <Option value="待发货">待发货</Option>
                  <Option value="已发货">已发货</Option>
                  <Option value="已完成">已完成</Option>
                  <Option value="已关闭">已关闭</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单编号">
              {getFieldDecorator('orderId')(
                <Input placeholder="请输入订单编号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="运单编号">
              {getFieldDecorator('waybillno')(
                <Input placeholder="请输入运单编号" />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="时段">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
          </Col>
          <Col md={8} sm={24}>
            <span style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </span>
          </Col>
        </Row>
        {/*<div style={{ overflow: 'hidden',marginBottom:20 }}>*/}
          {/*<span style={{ float: 'right' }}>*/}
            {/*<Button type="primary" htmlType="submit">查询</Button>*/}
            {/*<Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>*/}
          {/*</span>*/}
        {/*</div>*/}
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10 }}>
          <span style={{ float: 'right' }}>
            共查询出符合条件的数据：{tableData?tableData.pagination.total:0}
            <Button  style={{marginLeft:18}}>
              <Icon type="cloud-download-o" />导出数据
            </Button>
          </span>
        </div>
      </Form>
    );
  }
  render() {
    const { orderManagement:{supplierOrder:{tableData},wareHouseData} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...tableData.pagination,
    }

    const columns = [
      {
      title: '订单日期',
      dataIndex: 'tradeTime',
      key: 'tradeTime',
    }, {
      title: '订单编号',
      dataIndex: 'merchantOrderId',
      key: 'merchantOrderId',
    }, {
      title: '订单总额',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
    }, {
      title: '运单编号',
      dataIndex: 'waybillno',
      key: 'waybillno',
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
    },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) =>
          <div>
            <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>查看</a><br/>
            {record.status=='待发货'?
            <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>发货</a>:''}
          </div>
      }
    ];
    const {visible} = this.state;
    const parent  = {
      visible:visible,
      handleVisible : this.handleVisible,
    };
    const url1 = 'http://192.168.0.109:51186/llback/O2O/UploadOrder'
    const props1 = {
      action: url1,
      listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange1,
      multiple: false,
      customRequest:this.upload,
    };
    return (
      <div>
        <div style={{display: 'inline-flex'}}>
          <Select style={{ width: 180 }}
                  placeholder="请选择仓库"
                  onChange={this.onSelectChange}>
                  {wareHouseData.map(val => <Option key={val.wid} value={val.wid} label={val.wname}>{val.wname}</Option>)}
          </Select>
          <Button style={{ marginLeft: 8 }}>
            <Icon type="cloud-download-o" />导出需发货的订单
          </Button>
          <Button style={{ marginLeft: 8 }} type="primary">
            <Icon type="download" />下载运单模板
          </Button>
          <Upload {...props1} fileList={this.state.fileList1}>
            <Button style={{ marginLeft: 8 }}>
              <Icon type="cloud-upload-o" /> 导入运单信息
            </Button>
          </Upload>


        </div>
        <Card className={styles.mT10}>
          <div className={styles.tableListForm}>
            {this.renderAdvancedForm()}
          </div>
          <Table
            dataSource={tableData.list}
                 rowKey={record => record.id}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
        {/*<ModalUnteratedOrder*/}
          {/*parent = {parent}*/}
        {/*/>*/}
      </div>
    );
  }
}
