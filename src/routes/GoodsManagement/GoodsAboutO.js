import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import GoodsAboutOEditModal from './GoodsAboutOEditModal';
import styles from './GoodsAboutO.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const userId = getToken().userId;
@connect(({goodsManagement,publicDictionary,  loading }) => ({
  goodsManagement,publicDictionary,
  loading: loading.effects['goodsManagement/getGoodsAboutData'],
}))

@Form.create()
export default class GoodsAboutO extends Component {
  state={
    visible: false,
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type: 'publicDictionary/getBrand',
      payload: {
        userId:userId,
      },
    });
    this.props.dispatch({
      type: 'publicDictionary/getWareHouse',
      payload: {
        userId:userId,
      },
    });
    this.props.dispatch({
      type: 'goodsManagement/getGoodsAboutData',
      payload: {
        userId:userId,
      },
    });
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {

      if (err) return;
      const values = {
        ...fieldsValue,
      }

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'goodsManagement/getGoodsAboutData',
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
  handleVisible = (flag) => {
    this.setState({
      visible:!!flag,
    });
  }
  handleEdit=(e, record, index)=>{
    // console.log(record)
    this.props.dispatch({
      type: 'goodsManagement/getGoodsDetailsO',
      payload: {
        userId:userId,
        goodsId:record.id,
      },
    });
    this.handleVisible(true);
  }
  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
      userId:userId,
    };
    this.props.dispatch({
      type: 'goodsManagement/getGoodsAboutData',
      payload: params,
    });
  }
  renderAdvancedForm(){
    const { publicDictionary:{brandArr,wareHouseArr} } = this.props;
    const { goodsManagement:{goodsAboutData:{tableData:{list, pagination},childCheckO}} } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  <Option value="上架">上架</Option>
                  <Option value="下架">下架</Option>
                  {/*<Option value="申请中">申请中</Option>*/}
                  {/*<Option value="已驳回">已驳回</Option>*/}
                  {/* {brandsData.map(val => <Option key={val.id} value={val.id} label={val.name}>{val.name}</Option>)} */}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="所属仓库">
              {getFieldDecorator('wid')(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  {/*<Option value="重庆仓库">重庆仓库</Option>*/}
                  {/*<Option value="香港仓库">香港仓库</Option>*/}
                  {/*<Option value="青岛仓库">青岛仓库</Option>*/}
                   {wareHouseArr.map(val => <Option key={val.wid} value={val.wid} label={val.wname}>{val.wname}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="商品名称">
              {getFieldDecorator('goodsName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="品牌">
              {getFieldDecorator('brand')(
                <Select
                  placeholder="请选择"
                  optionFilterProp="label"
                  // onChange={this.onSelectChange}
                >
                  {/*<Option value="品牌1">品牌1</Option>*/}
                   {brandArr.map(val => <Option key={val.brand} value={val.brand} label={val.brand}>{val.brand}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <FormItem label="商品编码">
              {getFieldDecorator('barcode')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>


        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 0 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </span>
        </div>
      </Form>
    );
  }

  render() {
    const { goodsManagement:{goodsAboutData:{tableData:{list, pagination},childCheckO}} } = this.props;

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
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: (val,record) => (
          <div>
            <span>{val}</span>
            <img src={ record.slt} alt="" width={80} style={{marginLeft:8}}/>
          </div>
        )
    }, {
      title: '商品（SKU）',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    }, {
        title: '库存',
        dataIndex: 'goodsnum',
        key: 'goodsnum',

      },{
        title: '默认供货价',
        dataIndex: 'selPrice',
        key: 'selPrice',
        render:val=>`¥${val}`
      },{
        title: '默认供应商',
        dataIndex: 'selSupplier',
        key: 'selSupplier',
      },{
        title: '默认供应商库存',
        dataIndex: 'selGoodsNum',
        key: 'selGoodsNum',
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record, index) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleEdit(e, record, index)}>详情</a><br/>
              {/*<a href="javascript:;" >{*/}
                {/*record.status == 1?'':(*/}
                  {/*record.flag == 0?*/}
                  {/*<span onClick={(e) => this.handleBtnCheckEdit(e, record, index)}>申请上架</span>:*/}
                  {/*<span onClick={(e) => this.handleBtnCheckOne(e, record, index)}>申请下架</span>*/}
                {/*)*/}
              {/*}</a><br/>*/}
              {/*<a href="javascript:;" >{*/}
                {/*['正常','申请中','已驳回'][record.status]*/}
              {/*}</a><br/>*/}
            </Fragment>
          )
        }
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
          <Table dataSource={list}
                 rowKey={record => record.id}
                 columns={columns}
                 pagination={paginationProps}
                 onChange={this.handleTableChange}
                 // loading={submitting}
          />
        </Card>
        <GoodsAboutOEditModal
          parent = {parent}
        />
      </div>
    );
  }
}
