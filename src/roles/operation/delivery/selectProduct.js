import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Checkbox,Badge } from 'antd';
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
    // 发货管理 - 平台库存
@Form.create()
export default class selectProduct extends Component {
  state={
    formValues:{},
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    
  }

  //****/
  init(){
    this.props.dispatch({
      type:'roleOperationDistribution/getChooseShipmentData',
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
        type: 'roleOperationDistribution/getChooseShipmentData',
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
    console.log(11111)
    const params = {
      ...pagination,
      ...this.state.formValues,
    };
    this.props.dispatch({
      type: 'roleOperationDistribution/getChooseShipmentData',
      payload: params,
    });
  }

  handleVisible = (flag,who) => {
    this.setState({
      visibleChildCheck:!!flag,
    });
  }


  //点击勾 选中
  selectRow = record => {
   
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    this.setState({ selectedRowKeys });
  };
  onSelectedRowKeysChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
    console.log('xxx!record',selectedRowKeys)
  };

  //勾选
  Checklist = (e, record, index)=>{
    console.log(e, record, index)
    console.log('record.keyId',record.keyId),
    console.log('eeee',`checked = ${e.target.checked}`)
  }



  renderForm(){
    const { roleOperationDistribution:{chooseShipment:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    
    //console.log('xxx',this.props)
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={2} sm={24}>
            
          </Col>
          <Col md={5} sm={24}>
          
            <FormItem label="仓库：">
              {getFieldDecorator('sendType',{
                })(
                  <Select
                    placeholder="请选择"
                    optionFilterProp="label"
                    // onChange={this.onSelectChange}
                  >
                    <Option value="">全部</Option>
                    <Option value="1">21库</Option>
                    <Option value="2">32库</Option>
                  </Select>
                )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="商品：">
              {getFieldDecorator('select')(
                <Input style={{ width: '100%' }} placeholder="可输入供货商名称进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="">
              {getFieldDecorator('select')(
                <Input style={{ width: '100%' }} placeholder="可输入商品条码，商品名称，商品品牌进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
          <Col md={2} sm={24}>
          </Col>
        </Row>
        <Divider dashed />
        <div className={styles.recordNum} style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div className={styles.recordNum_w}  style={{ float: 'float' }}>
            <div className={styles.recordNum_num}>1</div>   
            <Button type="primary" icon="form">发货单</Button>
          </div>      
          <div style={{ float: 'right' }}>
            <span>共查询出符合条件的数据：{tableData?tableData.pagination.total:0}条，</span>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    const { roleOperationDistribution:{chooseShipment:{tableData:{list, pagination}}} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange
    };

    const columns = [
      {
        title: '选择',
        dataIndex: 'qq',
        key: 'qq',
        render: (text, record, index) => {
          return (
            <Fragment>
              {/* <a href="javascript:;" onClick={(e) => this.handleDelCheck(e, record, index)}>删除</a><br/> */}
              <Checkbox  onChange={(e) => this.Checklist(e, record, index)}></Checkbox>
            </Fragment>
          )
        }
      },
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
       
    },{
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode',

    },{
      title: '规格',
      dataIndex: 'receivable',
      key: 'receivable',
     
    },{
        title: '原产地',
        dataIndex: 'payType',
        key: 'payType',
      },{
        title: '生产商',
        dataIndex: 'paymoney',
        key: 'paymoney',
       
      },{
        title: '库存数量',
        dataIndex: 'discountName',
        key: 'discountName',
      },{
        title: '零售价',
        dataIndex: 'a',
        key: 'a',
      },{
        title: '平台采购价',
        dataIndex: 'discountMoney',
        key: 'discountMoney',
      },{
        title: '库存同步时间',
        dataIndex: 'b',
        key: 'b',
        
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
                // rowSelection={rowSelection} 
                // rowSelection={rowSelection}
                // onRow={record => ({
                //   onClick: () => {
                //     this.selectRow(record);
                //   }
                // })}
          />
        </Card>
      </div>
    );
  }

}


