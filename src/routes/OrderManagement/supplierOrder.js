import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
// import ModalUnteratedOrder from './ModalUnteratedOrder';
import styles from './supplierOrder.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
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
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type: 'orderManagement/supplierOrderTable',
      payload: {
        status:'新订单',
      },
    });
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
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
          status:'新订单',
          ...values,
        },
      });
    });


  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.init();
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
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
          <Col md={8} sm={24}>
            <FormItem label="时段">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden',marginBottom:20 }}>
          <span style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </span>
        </div>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10 }}>
          <span style={{ float: 'right' }}>
            共查询出符合条件的数据：3
            <Button  style={{marginLeft:18}}>
              <Icon type="cloud-download-o" />导出数据
            </Button>
          </span>
        </div>
      </Form>
    );
  }
  render() {
    console.log('1',this.props)
    const { orderManagement:{supplierOrder:{tableData}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...tableData.pagination,
    }

    const columns = [
      {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '订单号',
      dataIndex: 'merchantOrderId',
      key: 'merchantOrderId',
    }, {
      title: '运单号',
      dataIndex: 'waybillno',
      key: 'waybillno',
    }, {
      title: '下单时间',
      dataIndex: 'tradeTime',
      key: 'tradeTime',
    }, {
      title: '收件人姓名',
      dataIndex: 'consigneeName',
      key: 'consigneeName',
    },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) => <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>查看</a>
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
    function callback(key) {
      console.log(key);
    }
    return (
      <div>
        <div style={{display: 'inline-flex'}}>
          <Button type="primary">
            <Icon type="download" />下载运单模板
          </Button>
          <Upload {...props1} fileList={this.state.fileList1}>
            <Button style={{ marginLeft: 8 }}>
              <Icon type="cloud-upload-o" /> 导入运单信息
            </Button>
          </Upload>
          <Select style={{ width: 120,marginLeft:8 }}  placeholder="请选择仓库">
            <Option value="lucy">Lucy</Option>
          </Select>
          <Button style={{ marginLeft: 8 }}>
            <Icon type="cloud-download-o" />导出需发货的订单
          </Button>

        </div>
        <Card className={styles.mT10}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="所有订单" key="1">
            </TabPane>
            <TabPane tab="待发货" key="2">
            </TabPane>
            <TabPane tab="已发货" key="3">
            </TabPane>
            <TabPane tab="已完成" key="4">
            </TabPane>
            <TabPane tab="已关闭" key="5">
            </TabPane>
          </Tabs>
          <div className={styles.tableListForm}>
            {this.renderAdvancedForm()}
          </div>
          <Table
            dataSource={tableData.list}
            //      rowKey={record => record.id}
                 columns={columns}
                 pagination={paginationProps}
                 // rowKey={record => record.id}
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
