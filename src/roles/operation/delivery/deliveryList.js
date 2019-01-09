import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal } from 'antd';
import styles from './selectProduct.less';
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
    // 发货管理 - 发货列表
@Form.create()
export default class deliveryList extends Component {
  state={
    formValues:{},
    
  }

  //****/
  init(){
    this.props.dispatch({
      type:'roleOperationDistribution/getDeliveryListData',
      payload:{

      }
    })
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    console.log('this.props',this.props.roleOperationDistribution.shippingListBig)
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
        type: 'roleOperationDistribution/getDeliveryListData',
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
    console.log('翻页')
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'roleOperationDistribution/getDeliveryListData',
      payload: params,
    });
  }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }

  //删除
  handleDelCheck = (e, record, index)=>{
    this.props.dispatch({
      type: 'roleOperationDistribution/getdeleteDeliveryList',
      payload: {
        purchasesn:record.purchasesn,
        barcode:record.id,
       // index:index
      },
    });
  }


  renderForm(){
    const { roleOperationDistribution:{chooseShipment:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    

    console.log('xxx',this.props.roleOperationDistribution.shippingListBig)
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
    const { roleOperationDistribution:{shippingListBig:{tableData:{list, pagination}}} } = this.props;
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
      title: '发货单编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '采购商',
      dataIndex: 'purchasersName',
      key: 'purchasersName',
    }, {
      title: '发货数量',
      dataIndex: 'goodsTotal',
      key: 'goodsTotal',
       
    },{
      title: '发货日期',
      dataIndex: 'sendTime',
      key: 'sendTime',

    },{
      title: '发货人',
      dataIndex: 'sendName',
      key: 'sendName',
     
    },{
        title: '发货人联系电话',
        dataIndex: 'sendTel',
        key: 'sendTel',
      },{
        title: '状态',
        dataIndex: 'status',
        key: 'status',
       
      },{
        title: '操作',
        dataIndex: 'discountName',
        key: 'discountName',
        render: (text, record, index) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleDelCheck(e, record, index)}>删除</a><br/>
            </Fragment>
          )
        }
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


