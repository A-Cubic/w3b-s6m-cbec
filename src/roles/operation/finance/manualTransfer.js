import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './manualTransfer.less';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({roleOperationDistribution }) => ({
  roleOperationDistribution,
}))

@Form.create()
export default class manualTransfer extends Component {
  state={
    visible: false,
    formValues:{}
  }
  init(){
    // this.props.dispatch({
    //   type: 'roleOperationDistribution/warehouseList',
    //   payload: {
    //     userId:userId
    //   },
    // });
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
        type: 'roleOperationDistribution/getInquiryListData',
        payload: {
          ...values,
        },
      });
    });

  }
  handleTableChange=(pagination)=>{
    const params = {
      ...pagination,
    };

    // this.props.dispatch({
    //   type: 'roleOperationDistribution/warehouseList',
    //   payload: params
    // });
  }
  componentDidMount() {
    this.init();
  }
  renderForm(){
    //  console.log(this.props.rolePurchaserBulkPurchases.inquiryList.tableData)
    const {roleOperationDistribution:{manualTransfer:{tableData:{ list, pagination }}}}  = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="调整日期：">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <Button style={{ marginLeft:26 }} type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <Button  type="primary" ghost onClick={this.addAdjustmentOrder}>新建调整单</Button>

          <div style={{ float: 'right' }}>
            <span>共查询出符合条件的数据：{list.length?list.length:0} </span>
          </div>
        </div>
      </Form>
    );
  }
  render() {
    // console.log('1',this.props)
    const {roleOperationDistribution:{manualTransfer:{tableData:{ list, pagination }}}}  = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '调整年份',
        dataIndex: 'year',
        key: 'year',
        render:val=>val?val:'--'
      }, {
        title: '调整月份',
        dataIndex: 'month',
        key: 'month',
        render:val=>val?val:'--'
      }, {
        title: '调整金额',
        dataIndex: 'money',
        key: 'money',
        render:val=>val?val + '元':'--'
      }, {
        title: '调整项目',
        dataIndex: 'pro',
        key: 'pro',
        render:val=>val?val:''
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleDelete(record)}>删除</a><br/>
            </Fragment>
          )
        }
      }
    ];

    return (
      <div>
        <Card className={styles.mT10}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
          <Table
            dataSource={list}
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
