import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './storesStock.less';
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
    // 库存 - 门店库存
@Form.create()
export default class storesStock extends Component {
  state={
    formValues:{},
    visible: false,
    visibleChildCheck:false,
  }

  //****/
  init(){
    this.props.dispatch({
      type:'roleOperationDistribution/storesStock',
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
        type: 'roleOperationDistribution/storesStock',
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
      type: 'roleOperationDistribution/storesStock',
      payload: params,
    });
  }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }
  
  renderForm(){
    const { roleOperationDistribution:{storesStock:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    
    //console.log('xxx',this.props)
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={9} sm={24}>
            <FormItem label="采购商：">
              {getFieldDecorator('purchasesnName')(
                <Input style={{ width: '100%' }} placeholder="可输入采购商名称进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={9} sm={24}>
            <FormItem label="商品：">
              {getFieldDecorator('select')(
                <Input style={{ width: '100%' }} placeholder="可输入采购商名称进行查询" />
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
            {/* <span>共查询出符合条件的数据：{tableData?tableData.pagination.total:0}条，</span> */}
          </div>
        </div>
      </Form>
    );
  }

  render() {
    const { roleOperationDistribution:{storesStock:{tableData:{list, pagination}}} } = this.props;
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
      title: '采购商',
      dataIndex: 'purchasesnName',
      key: 'purchasesnName',
    }, {
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode',
        render:val=>`¥${val}`
    },{
      title: '规格',
      dataIndex: 'model',
      key: 'model',

    },{
      title: '原产地',
      dataIndex: 'country',
      key: 'country',
      render:val=>`¥${val}`
    },{
      title: '生产商',
      dataIndex: 'brand',
      key: 'brand',
    },{
      title: '库存数量',
      dataIndex: 'pNum',
      key: 'pNum',
      render:val=>`¥${val}`
    },{
      title: '零售价',
      dataIndex: 'rprice',
      key: 'rprice',
    },{
      title: '平台供货价',
      dataIndex: 'pprice',
      key: 'pprice',
    },{
      title: '供货商',
      dataIndex: 'supplierName',
      key: 'supplierName',
      render:val=>`¥${val}`
    },{
      title: '安全库存数',
      dataIndex: 'safeNum',
      key: 'safeNum',
      render:val=>`¥${val}`
    },{
      title: '库存同步时间',
      dataIndex: 'time',
      key: 'time',
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
  
}


