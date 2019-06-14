import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { message,Modal,Tabs,Input,Button,Table,Card,Form,Row,Col,Select,Upload,Pagination,Badge,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './distributorsMgt.less';
import moment from 'moment';
import {getToken} from "../../utils/Global";
const userId = getToken().userId;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(({distributionManagement,  loading }) => ({
  distributionManagement,
  // loading: loading.effects['distributionManagement/getSalesStatisticsListS'],
}))

@Form.create()
export default class DistributorsMgt extends Component {
  state={
    formValues:{},
  }
  init(){
    this.props.dispatch({
      type: 'distributionManagement/getDistributorTable',
      payload: {},
    });
  }
  componentDidMount() {
    this.init();
  }

  //列表
  onSearch=(e)=>{
    e.preventDefault();
    const {distributionManagement:{distributorsMgtData:{tableData}}}=this.props
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)
      if (err) return;
      const values = {
        ...fieldsValue,
      }
      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'distributionManagement/getDistributorTable',
        payload: {
          ...values,
          ...tableData.pagination
        },
      });
    });
  }
  handleFormReset =()=>{
    this.setState({
      formValues: '',
    });
    this.props.form.resetFields();
    this.init();
  }
  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      ...this.state.formValues,
      ...pagination,
    };
    
    this.props.dispatch({
      type: 'distributionManagement/getDistributorTable',
      payload: params,
    });
  }

  mgtDistributors=(flag)=>{
    this.props.dispatch({
      type: 'distributionManagement/editChildR',
      payload: {},
    })
    this.handleChangeVisible(true);

  }
  handleChangeVisible(visibleValue){
    this.props.dispatch({
      type: 'distributionManagement/changeVisibleR',
      payload: {
        visibleValue: visibleValue
      }
    });
  }
  handleChildrenCheck=(record)=>{
    const {distributionManagement:{distributorsMgtData:{visible,childCheckS}}} = this.props
    this.props.dispatch({
      type: 'distributionManagement/editChildR',
      payload: record,
    });
    this.handleChangeVisible(true)
  }


  handlePopup(r) {
    //console.log(789,r)
    this.props.dispatch({
      type: 'distributionManagement/handlePopup',
      payload: {
        agentCode:r.agentCode
      },
    });
  }





  renderAdvancedForm(){
    // const { salesStatistics:{salesStatisticsAll:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        {/* <Button onClick={this.mgtDistributors}>添加分销商</Button> */}
        <Divider dashed />
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="center">
          <Col md={10} sm={24}>
            <FormItem label="分销商：">
              {getFieldDecorator('search')(
                <Input placeholder="请输入分销商名称/公司名称/联系电话/微信昵称" />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <span style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </span>
          </Col>
        </Row>
        <Divider dashed />
      </Form>
    );
  }
  render() {
    // console.log(this.props)

    const { distributionManagement:{distributorsMgtData:{tableData}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...tableData.pagination,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      }, {
        title: '微信头像',
        dataIndex: 'barcode',
        key: 'barcode',
        render: (val,record) => (
          <div>
            <img style={{width:'35px'}} src={ record.img} />
          </div>
        )
      },{
        title: '分销商',
        dataIndex: 'userName',
        key: 'userName',
      }, 
      // {
      //   title: '公司名称',
      //   dataIndex: 'company',
      //   key: 'company',
      // }, {
      //   title: '联系电话',
      //   dataIndex: 'mobile',
      //   key: 'mobile',
      // }, 
      {
        title: '分销商账号',
        dataIndex: 'agentCode',
        key: 'agentCode',
      },
      {
        title: '微信昵称',
        dataIndex: 'wxName',
        key: 'wxName',
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        // render: (val,record) =>
        //   <div>
        //     <a href="javascript:;" onClick={()=>this.handleChildrenCheck(record)}>编辑</a><br/>
        //   </div>
        render: (val,record) =>
          <div>
            <a href="javascript:;" onClick={()=>this.handlePopup(record)}>详情</a><br/>
          </div>
      }
    ];
    return (
      <div>
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
        <Distributors />
        <Popup />
      </div>
    );
  }
}

@connect(({distributionManagement,  loading }) => ({
  distributionManagement,
  // loading: loading.effects['orderManagement/supplierOrderTable'],
}))
@Form.create()
class Distributors extends React.Component {
  


handleTableChange=(pagination, filtersArg, sorter)=>{

  //console.log(999)

  const params = {
    ...this.state.formValues,
    ...pagination,
  };

  this.props.dispatch({
    type: 'distributionManagement/getDistributorTable',
    //type: 'distributionManagement/handlePopup',
    payload: params,
  });
}

  handleCancel = (e) => {
    this.props.dispatch({
      type: 'distributionManagement/changeVisibleR',
      payload: {
        visibleValue: false
      }
    });
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {distributionManagement:{distributorsMgtData:{visible,childCheckS}}} = this.props

    //console.log('777',this.props)
    return (
      <div>
        <Modal
          title="分销商"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="1" onClick={this.handleCancel}>关闭</Button>,
            <Button key="2" type="primary" onClick={this.handleOk}>确定</Button>
          ]}
        >
          <div className={styles.tableListForm}>
            <Form onSubmit={this.handleOk} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={24} sm={24}>
                  <FormItem label="分销商">
                    {getFieldDecorator('userName',{
                      initialValue: childCheckS.userName,
                      rules:[{
                        required:true,message:'请输入名称',
                      }]
                    })(
                      <Input disabled={!!childCheckS.id} placeholder="请输入名称" />
                    )}
                  </FormItem>
                </Col>
                <Col md={24} sm={24}>
                  <FormItem label="公司名称">
                    {getFieldDecorator('company',{
                      initialValue: childCheckS.company,
                      rules:[{
                        required:true,message:'请输入公司名称',
                      }]
                    })(
                      <Input placeholder="请输入公司名称" />
                    )}
                  </FormItem>
                </Col>
                <Col md={24} sm={24}>
                  <FormItem label="联系电话">
                    {getFieldDecorator('mobile',{
                      initialValue: childCheckS.mobile,
                      rules:[{
                        required:true,message:'请输入联系电话',
                      }]
                    })(
                      <Input placeholder="请输入联系电话" />
                    )}
                  </FormItem>
                </Col>
                <Col md={24} sm={24}>
                  <FormItem label="微信昵称">
                    {getFieldDecorator('wxName',{
                      initialValue: childCheckS.wxName,
                      rules:[{
                        required:true,message:'请输入微信昵称',
                      }]
                    })(
                      <Input placeholder="请输入微信昵称" />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}



@connect(({distributionManagement,  loading }) => ({
  distributionManagement,
  // loading: loading.effects['orderManagement/supplierOrderTable'],
}))
@Form.create()
class Popup extends React.Component {
  handleOk=()=>{
    console.log(333)
    this.props.dispatch({
      type: 'distributionManagement/handlePopupCloseR',
      payload: {
      }
    });
  }
  handleCancel = (e) => {
    this.props.dispatch({
      type: 'distributionManagement/handlePopupCloseR',
      payload: {
      }
    });
   // this.props.form.resetFields();
  }

  handleTableChange=(pagination, filtersArg, sorter)=>{
    const {distributionManagement:{popupList:{tableData:{item}}}}=this.props;
    //console.log('item',item)
    const params = {
      //...this.state.formValues,
      ...pagination,
    };
    this.props.dispatch({
      type: 'distributionManagement/handlePopup',
      payload: {
        ...params,
        agentCode:item
      },
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {distributionManagement:{popupList:{popup,tableData,tableData:{list,pagination}}}}=this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...tableData.pagination,
    }
    const columns = [
      {
        title: '序号',
        dataIndex: 'keyId',
        key: 'keyId',
      },{
        title: '订单时间',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
      }, 
      {
        title: '订单金额',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        render:val => `¥${val}`
      }, 
      
      {
        title: '分销金额',
        dataIndex: 'agentPrice',
        key: 'agentPrice',
        render:val => `¥${val}`
      }, 
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        
      }, 
      
    ];


    //console.log('popup',list)
    return (
      <div>
        <Modal
          width={'65%'}
          title="分销商"
          visible={popup}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="1" onClick={this.handleCancel}>关闭</Button>,
            // <Button key="2" type="primary" onClick={this.handleOk}>确定</Button>
          ]}
        >
          <div className={styles.tableListForm}>
            
          <Table
            dataSource={tableData.list}
            rowKey={record => record.keyId}
            columns={columns}
            pagination={paginationProps}
            onChange={this.handleTableChange}
            // loading={submitting}
          />

          </div>
        </Modal>
      </div>
    );
  }
}
