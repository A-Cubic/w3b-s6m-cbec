import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './receivingConfirmation.less';
import moment from 'moment';
import {getCurrentUrl, getUploadUrl} from '../../../services/api'
import {getHeader, getToken} from "../../../utils/Global";
const userId = getToken().userId;
import {message} from "antd/lib/index";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({rolePurchaserConsignment }) => ({
  rolePurchaserConsignment,
}))
// -------- 商品销售 --------------
    // 商品销售-列表查询
@Form.create()
export default class goodsSales extends Component {
  state={
    formValues:{},
    visible: false,
    visibleChildCheck:false,
  }

  //****/
  init(){
    this.props.dispatch({
      type:'rolePurchaserConsignment/goodsSales',
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
        type: 'rolePurchaserConsignment/goodsSales',
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
      type: 'rolePurchaserConsignment/goodsSales',
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
    window.location.href='http://ecc-product.oss-cn-beijing.aliyuncs.com/templet/order.xlsx'
  }
  // 上传销售数据
  handleUploadChange=(info)=>{
    if(info.file.status === 'done') {
      this.props.dispatch({
        type: 'rolePurchaserConsignment/uploadOrderbill',
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
    const { rolePurchaserConsignment:{goodsSales:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
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
            <span>商品总数：{tableData.item?tableData.item.totalnum:0}， </span>
            <span>订单金额：¥{tableData.item?tableData.item.totalOrderMoney:0}， </span>
            <span>优惠金额：¥{tableData.item?tableData.item.totalDiscountMoney:0}， </span>
            <span>应收金额：¥{tableData.item?tableData.item.totalReceivable:0}， </span>
            <span>供货金额：¥{tableData.item?tableData.item.totalSupplyMoney:0}</span>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    const { rolePurchaserConsignment:{goodsSales:{tableData:{list, pagination}}} } = this.props;
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
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
    }, {
      title: '商品数量',
      dataIndex: 'num',
      key: 'num',
    }, {
      title: '订单金额',
      dataIndex: 'orderMoney',
      key: 'orderMoney',
        render:val=>`¥${val}`
    },{
      title: '结账时间',
      dataIndex: 'payTime',
      key: 'payTime',

    },{
      title: '应收金额',
      dataIndex: 'receivable',
      key: 'receivable',
      render:val=>`¥${val}`
    },{
        title: '支付方式',
        dataIndex: 'payType',
        key: 'payType',
      },{
        title: '支付金额',
        dataIndex: 'paymoney',
        key: 'paymoney',
        render:val=>`¥${val}`
      },{
        title: '优惠名称',
        dataIndex: 'discountName',
        key: 'discountName',
      },{
        title: '优惠金额',
        dataIndex: 'discountMoney',
        key: 'discountMoney',
        render:val=>`¥${val}`
      }
    ];
    const expandedRowRender = item => {
      const columnsRow = [
        { title: '商品名称', dataIndex: 'goodsName', key: 'goodsName' },
        { title: '商品数量', dataIndex: 'quantity', key: 'quantity', render:val=>`${val}个`},
        { title: '商品金额', dataIndex: 'goodsPrice', key: 'goodsPrice',render:val=>`¥${val}` },
      ];
      return(
        <Table
          columns={columnsRow}
          dataSource={item.list}
          rowKey={item => item.keyId}
          pagination={false}
          />
      )
    };
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
            {/*<Button  type="primary" onClick={this.downloadTemplate} style={{ marginLeft: 8 }}>*/}
              {/*<Icon type="download" />下载销售模板*/}
            {/*</Button>*/}
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
                 expandedRowRender={expandedRowRender}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
      </div>
    );
  }
  ex=(obj)=>{
      const columns = [
        { title: 'Date', dataIndex: 'a', key: 'a' },
        { title: 'Name', dataIndex: 'b', key: 'b' },
      ];
      return (
        <Table
          columns={columns}
          dataSource={obj.children}
          rowKey={record => record.id}
          pagination={false}
        />
      );
  }
}


