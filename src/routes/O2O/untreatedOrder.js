import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import ModalUnteratedOrder from './ModalUnteratedOrder';
import styles from './untreatedOrder.less';
import moment from 'moment';
import { getToken } from '../../utils/Global';
const { RangePicker, MonthPicker } = DatePicker;
const Option = Select.Option;

const FormItem = Form.Item;
@connect(({SubjectManagementModel,  loading }) => ({
  SubjectManagementModel,
  // loading:loading.effects['SubjectManagementModel/fetchAlertManageProjectClassificationTable'],
  // tableLoading:loading.effects['SubjectManagementModel/fetchSubjectManagementTable']
  loading: loading.models.SubjectManagementModel,
}))
@Form.create()
export default class untreatedOrder extends Component {
  state={
    visible: false,
    formValues:{}
  }
  handleVisible = (flag) => {

    this.setState({
      visible:!!flag,
    });
  }
  onSearch=(e)=>{
    e.preventDefault();
  }
  renderAdvancedForm(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="店铺名">
              {getFieldDecorator('shop')(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="S005">流连优选大连奥林匹克展会</Option>
                  {/* {brandsData.map(val => <Option key={val.id} value={val.id} label={val.name}>{val.name}</Option>)} */}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="仓库">
              {getFieldDecorator('warehouse')(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="重庆仓库">重庆仓库</Option>
                  <Option value="香港仓库">香港仓库</Option>
                  <Option value="青岛仓库">青岛仓库</Option>
                  {/* {brandsData.map(val => <Option key={val.id} value={val.id} label={val.name}>{val.name}</Option>)} */}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('orderNumber')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单状态">
              {getFieldDecorator('orderStatus')(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="新订单">新订单</Option>
                  <Option value="已导出">已导出</Option>
                  <Option value="已录运单号">已录运单号</Option>
                  <Option value="已完成">已完成</Option>
                  {/* {brandsData.map(val => <Option key={val.id} value={val.id} label={val.name}>{val.name}</Option>)} */}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="时段">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }} placeholder={['起始时间', '终止时间']} />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 0 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <Button style={{ marginLeft: 8 }} >导出订单</Button>
            <Button style={{ marginLeft: 8 }} >导入运单</Button>
          </span>
        </div>
      </Form>
    );
  }
  render() {
    const dataSource = [
      {
      key: '1',
      status: '新订单',
      orderNumber: '12345646',
      waybillNumber: '415646132',
      orderTime:'2018-01-12 10:10:10',
      name:'收件人a'
    }, {
      key: '2',
      status: '新订单',
      orderNumber: '12345646',
      waybillNumber: '415646132',
      orderTime:'2018-01-12 10:10:10',
      name:'收件人b'
    }
    ];

    const columns = [
      {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    }, {
      title: '运单号',
      dataIndex: 'waybillNumber',
      key: 'waybillNumber',
    }, {
      title: '下单时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
    }, {
      title: '收件人姓名',
      dataIndex: 'name',
      key: 'name',
    },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (val,record) => <a href="javascript:;" onClick={()=>this.handleVisible(true)}>查看</a>
      }
    ];
    const {visible} = this.state;
    const parent  = {
      visible:visible,
      handleVisible : this.handleVisible,
    };
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderAdvancedForm()}
            </div>
          </div>
        </Card>
        <Card className={styles.mT10}>
          <Table dataSource={dataSource}
                 columns={columns}
                 // pagination={pagination}
                 // rowKey={record => record.id}
                 // loading={submitting}
          />
        </Card>
        <ModalUnteratedOrder
          parent = {parent}
        />
      </div>
    );
  }
}
