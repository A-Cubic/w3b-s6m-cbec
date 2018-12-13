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
@connect(({goodsManagement,publicDictionary, loading }) => ({
  goodsManagement,publicDictionary,
  loading: loading.effects['goodsManagement/getGoodsAboutData'],
}))

@Form.create()
export default class consignmentStock extends Component {
  state={
    sortedInfo:null,
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
        sortedInfo: null,
      });
      this.props.dispatch({
        type: 'goodsManagement/getConsignmentStockData',
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
    const sorterConditions = ['ascend','descend']

    let sorters={}
    if (sorter.field) {
      sorters = {
        [sorter.field]: sorterConditions.findIndex(i => i==sorter.order)
      }
    }

    this.setState({
      sortedInfo: sorter,
    });
    const params = {
      ...pagination,
      ...this.state.formValues,
      ...sorters,
    };
    // console.log(params)
    this.props.dispatch({
      type: 'goodsManagement/getConsignmentStockData',
      payload: params,
    });
  }
  renderForm(){
    const { goodsManagement:{consignmentStockData:{tableData}} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="">
              {getFieldDecorator('information')(
                <Input placeholder="可输入商品条码，商品名称，商品品牌进行查询" />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </Col>
        </Row>
        <Divider dashed />
        <div style={{ overflow: 'hidden',marginBottom:10,fontSize:16 }}>
          <div style={{ float: 'right' }}>
            <span>共查询出符合条件的数据：{tableData?tableData.pagination.total:0} </span>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    // console.log('1',this.props)
    let { sortedInfo } = this.state;
    const { goodsManagement:{consignmentStockData:{tableData:{list, pagination}}} } = this.props;

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
      dataIndex: 'goodsName',
      key: 'goodsName',
      render: (val,record) => (
        <div>
          <img src={ record.slt} alt="" width={80} style={{marginRight:8,}}/>
          <span style={{display:'inline-block',width:200}}>{val}</span>
        </div>
      )
    }, {
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode',
    },
    //   {
    //   title: '品牌',
    //   dataIndex: 'brand',
    //   key: 'brand',
    // },
    //   {
    //   title: '保质期（天）',
    //   dataIndex: 'shelfLife',
    //   key: 'shelfLife',
    //   sorter:true,
    //     sortOrder:sortedInfo?sortedInfo.columnKey === 'shelfLife' && sortedInfo.order:false,
    //     render:val=>`${val}（天）`
    //   },
    //   {
    //   title: '商品入库时间',
    //   dataIndex: 'createTime',
    //   key: 'createTime',
    //   sorter:true,
    //   sortOrder:sortedInfo?sortedInfo.columnKey === 'createTime' && sortedInfo.order:false
    // },
      {
        title: '当前库存',
        dataIndex: 'pNum',
        key: 'pNum',
        sorter:true,
        sortOrder:sortedInfo?sortedInfo.columnKey === 'pNum' && sortedInfo.order:false
      },{
        title: '供货价',
        dataIndex: 'pprice',
        key: 'pprice',
        render:val=>`¥${val}`,
        sorter:true,
        sortOrder:sortedInfo?sortedInfo.columnKey === 'pprice' && sortedInfo.order:false
      },{
        title: '预计补货时间',
        dataIndex: 'sendTime',
        key: 'sendTime',
      },{
        title: '预计补货数量',
        dataIndex: 'goodsNum',
        key: 'goodsNum',
      },{
        title: '库存同步时间',
        dataIndex: 'confirmTime',
        key: 'confirmTime',
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
