import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {Divider,Select,Form,Input,Button,message,Modal,Row,Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,} from 'antd';
import numeral from 'numeral';
import {ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,} from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;

import styles from './managementStatisticS.less';

@connect(({ workbench,salesStatistics, loading }) => ({
  workbench,salesStatistics,
  // loading: loading.effects['chart/fetch'],
}))
@Form.create()

// 统计 柱状图 
export default class managementStatisticS extends Component {
  state = {

  };

  componentDidMount() {
   
    this.props.dispatch({
      type: 'salesStatistics/getWorkStatisticsDate',
      payload:{}
    });

  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'workbench/clear',
    });
  }

  orderList=()=>{
    this.props.dispatch(routerRedux.push('/orderManagement/operatorOrder'));
  }
  goodsList=()=>{
    this.props.dispatch(routerRedux.push('/goods/goodsAboutO'));
  }

  //列表
  onSearch=(e)=>{
    e.preventDefault();
    //const {orderManagement:{supplierOrder:{tableData}}}=this.props
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
        type: 'salesStatistics/getWorkStatisticsDate',
        payload:{
          ...values,
        }
      });
  
    });


  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'salesStatistics/getWorkStatisticsDate',
      payload:{}
    });
  }



  renderAdvancedForm(){

    //const { salesStatistics:{salesStatisticsAll:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { salesStatistics:{managementStatisticS:{tableData:{list,item}}} } = this.props;
   


    return (
      <Form onSubmit={this.onSearch} layout="inline">
        
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单日期">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />
              )}
            </FormItem>

          </Col>
          <Col md={8} sm={24}>
            <FormItem style={{width:'80%'}} label="分析状态">
              {getFieldDecorator('type',{
                initialValue:'地址'
              })(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                >
                  
                  <Option value="地址">地址</Option>
                  <Option value="年龄">年龄</Option>
                  
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span style={{ float: 'left' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>

          </Col>      
        </Row>
      
      </Form>
    );
  }

  render() {
      
      const { salesStatistics:{managementStatisticS:{tableData:{list,item}}} } = this.props;


    const columns = [
      {
      title: '地区区域',
      dataIndex: 'x',
      key: 'x',
        
    }, {
      title: '年龄',
      dataIndex: 'y',
      key: 'y',
        
      }, {
      title: '销售数量比例',
      dataIndex: 'salsenumProportion',
      key: 'salsenumProportion',
        
      }, {
      title: '销售金额',
      dataIndex: 'salseMoney',
      key: 'salseMoney',
        
      }, {
      title: '销售金额比例',
      dataIndex: 'salseMoneyProportion',
      key: 'salseMoneyProportion',
      
      }
    ]
    return (
      <div>
    
        <Card>
          <div className={styles.tableListForm}>
            {this.renderAdvancedForm()}
          </div>
          
        </Card>
        <Card
          // loading={loading}
          bordered={false}
          // title="销售概况"  managementStatisticS
          style={{ marginTop: 24 }}
        >
          <Table
            rowKey={record => record.id}
            columns={columns}
            pagination={false}
            // dataSource={workbenchDataO.dashboardSales}
            dataSource={list}
          />

        </Card>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              // loading={loading}
              bordered={false}
             // title={item}
              style={{ marginTop: 24 }}
            >
              <Bar
                padding={[15,50,35,50]}
                height={300}
                title={item.headName}
                data={list}
                autoLabel={true}
              />

            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
