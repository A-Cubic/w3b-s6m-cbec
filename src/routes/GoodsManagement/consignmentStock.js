import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './consignmentStock.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const userId = getToken().userId;
@connect(({goodsManagement,publicDictionary, loading }) => ({
  goodsManagement,publicDictionary,
  loading: loading.effects['goodsManagement/getGoodsAboutData'],
}))

@Form.create()
export default class consignmentStock extends Component {
  state={
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type:'goodsManagement/getConsignmentStockData',
      payload:{}
    })
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
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
        type: 'goodsManagement/getConsignmentStockData',
        payload: {
          userId:userId,
          ...values,
        },
      });
    });


  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    this.init();
  }
  handleTableChange=(pagination, filters, sorter)=>{
    const sorterConditions = ['ascend','descend']
    // console.log('Various parameters',  sorter);
    // console.log(sorter.order);


    let sorters={}
    if (sorter.field) {
      sorters = {
        [sorter.field]: sorterConditions.findIndex(i => i==sorter.order)
      }
    }
    const params = {
      ...pagination,
      ...this.state.formValues,
      userId:userId,
      ...sorters,
    };
    // console.log(params)
    this.props.dispatch({
      type: 'goodsManagement/getConsignmentStockData',
      payload: params,
    });
  }
  renderForm(){
    const { goodsManagement:{consignmentStockData:{tableData:{list, pagination}}} } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="">
              {getFieldDecorator('goodsName')(
                <Input placeholder="可输入商品条码，商品名称，商品品牌进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    // console.log('1',this.props)
    const { goodsManagement:{consignmentStockData:{tableData:{list, pagination},childCheckA}} } = this.props;

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
      title: '商品（SKU）',
      dataIndex: 'barcode',
      key: 'barcode',
      render: (val,record) => (
        <div>
          <span>{val}</span>
          <img src={ record.slt} alt="" width={80} style={{marginLeft:8}}/>
        </div>
      )
    }, {
      title: '商品条码',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    },{
      title: '保质期',
      dataIndex: 'a',
      key: 'a',
      sorter:true,
    },{
      title: '商品入库时间',
      dataIndex: 's',
      key: 's',
      sorter:true,
    },{
        title: '当前库存',
        dataIndex: 'c',
        key: 'c',
        sorter:true,
      },{
        title: '供货价',
        dataIndex: 'price',
        key: 'price',
        render:val=>`¥${val}`,
        sorter:true,
      },{
        title: '库存同步时间',
        dataIndex: 'operate',
        key: 'operate',
      }
    ];
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
          </div>
        </Card>
        <Card className={styles.mT10}>
          <Table dataSource={list}
                 // scroll={{ x: 1500}}
                 rowKey={record => record.id}
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
