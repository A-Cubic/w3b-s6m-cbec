import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import ModalGoodsAboutEdit from './ModalGoodsAboutEdit';
import styles from './GoodsAbout.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const userId = getToken().userId;
@connect(({goods,  loading }) => ({
  goods,
  loading: loading.effects['goods/goodslist'],
}))

@Form.create()
export default class GoodsAbout extends Component {
  state={
    fileList1:[],
    fileList2:[],
    fileList3:[],
    visible: false,
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type: 'goods/getBrand',
      payload: {
        userId:userId,
      },
    });
    this.props.dispatch({
      type: 'goods/getWareHouse',
      payload: {
        userId:userId,
      },
    });
    this.props.dispatch({
      type: 'goods/goodslist',
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
      console.log('values',fieldsValue)

      if (err) return;
      const values = {
        ...fieldsValue,
      }

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'goods/goodslist',
        payload: {
          userId:userId,
          ...values,
        },
      });
    });


  }
  handleFormReset =()=>{
    this.props.form.resetFields();
    // this.init();
  }
  handleVisible = (flag) => {
    this.setState({
      visible:!!flag,
    });
  }
  handleEdit=()=>{
    this.handleVisible(true);
  }
  handleTableChange=(pagination, filtersArg, sorter)=>{
    const params = {
      ...pagination,
      ...this.state.formValues,
      userId:userId,
    };
    // console.log('params',params)
    this.props.dispatch({
      type: 'goods/goodslist',
      payload: params,
    });
  }
  handleUploadChange1=(info)=>{
    console.log('info',info)
    let fileList = info.fileList;
    this.setState({
      fileList1:info.fileList
    })

    this.props.dispatch({
      type: 'o2o/upload',
      payload: {
        fileList1:info.fileList
      },
      callback: this.onUploadCallback,
    });
    this.setState({
      fileList1:[]
    })
  }
  handleUploadChange2=(info)=>{
    console.log('info',info)
    let fileList2 = info.fileList;
    this.setState({
      fileList2:info.fileList
    })

    this.props.dispatch({
      type: 'o2o/upload',
      payload: {
        fileList2:info.fileList
      },
      callback: this.onUploadCallback,
    });
    this.setState({
      fileList2:[]
    })
  }
  handleUploadChange3=(info)=>{
    console.log('info',info)
    let fileList3 = info.fileList;
    this.setState({
      fileList3:info.fileList
    })

    this.props.dispatch({
      type: 'o2o/upload',
      payload: {
        fileList3:info.fileList
      },
      callback: this.onUploadCallback,
    });
    this.setState({
      fileList3:[]
    })
  }
  upload=(file)=>{}
  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      notification.error({
        message: "提示",
        description: msg,
      });
    }else {
      notification.success({
        message: "提示",
        description: msg,
      });
    }
  }
  renderAdvancedForm(){
    const { goods:{list, pagination,brandData,wareHouseData} } = this.props;
    const { getFieldDecorator } = this.props.form;
    // const url = getCurrentUrl('/llback/user/validate');
    const url1 = 'http://192.168.0.109:51186/llback/O2O/UploadOrder'
    const url2 = 'http://192.168.0.109:51186/llback/O2O/UploadOrder'
    const url3 = 'http://192.168.0.109:51186/llback/O2O/UploadOrder'
    const props1 = {
      action: url1,
      listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange1,
      multiple: false,
      customRequest:this.upload,
    };
    const props2 = {
      action: url2,
      listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange2,
      multiple: false,
      customRequest:this.upload,
    };
    const props3 = {
      action: url3,
      listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange3,
      multiple: false,
      customRequest:this.upload,
    };
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
                  <Option value="申请中">申请中</Option>
                  <Option value="已驳回">已驳回</Option>
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
                   {wareHouseData.map(val => <Option key={val.wid} value={val.wid} label={val.wname}>{val.wname}</Option>)}
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
                   {brandData.map(val => <Option key={val.brand} value={val.brand} label={val.brand}>{val.brand}</Option>)}
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
          <span style={{ float: 'left', marginBottom: 0,  }} >
            <span>
            <Upload {...props1} fileList={this.state.fileList1} className={styles.upload}>
              <Button style={{ marginLeft: 8 }} type="primary" ghost>批量新增商品</Button>
            </Upload>
            </span>
            <Upload {...props2} fileList={this.state.fileList2} className={styles.upload}>
              <Button style={{ marginLeft: 8 }} type="primary" ghost>批量修改库存</Button>
            </Upload>
            <Button style={{ marginLeft: 8 }} type="primary" ghost onClick={this.downloadStoreTemp}>下载库存模板</Button>
            <Button style={{ marginLeft: 8 }} type="primary" ghost onClick={this.downloadGoodsTemp}>下载商品模板</Button>
            <Upload {...props3} fileList={this.state.fileList3} className={styles.upload}>
              <Button style={{ marginLeft: 8 }} type="primary" ghost>上传图片Zip包</Button>
            </Upload>
            <Button style={{ marginLeft: 8 }} type="primary" ghost onClick={this.downloadPicZip}>Zip包示例下载</Button>
          </span>
          <span style={{ float: 'right', marginBottom: 0 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>


            {/*<Upload {...props} fileList={this.state.fileList}>*/}
              {/*<Button style={{ marginLeft: 8 }}>*/}
                {/*<Icon type="upload" /> 导入运单*/}
              {/*</Button>*/}
            {/*</Upload>*/}

          </span>
        </div>
      </Form>
    );
  }
  downloadStoreTemp=()=>{
    this.props.dispatch({
      type: 'goods/downloadStoreTemp',
      payload: {
        userId:userId,
      },
    })
  }
  downloadGoodsTemp=()=>{
    this.props.dispatch({
      type: 'goods/downloadGoodsTemp',
      payload: {
        userId:userId,
      },
    })
  }
  downloadPicZip=()=>{
    this.props.dispatch({
      type: 'goods/downloadPicZip',
      payload: {
        userId:userId,
      },
    })
  }

  render() {
    // console.log('1',this.props)
    const { goods:{list, pagination,brandData} } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const columns = [
      {
      title: '商品图片',
      dataIndex: 'slt',
      key: 'slt',
      render: (val) => (
          <img src={ val} alt="" width={80} style={{float:'left',marginRight:8}}/>
      )
    }, {
      title: '名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    }, {
      title: '条码',
      dataIndex: 'barcode',
      key: 'barcode',
    }, {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    }, {
      title: '产地',
      dataIndex: 'source',
      key: 'source',
    },{
        title: '所在仓',
        dataIndex: 'wname',
        key: 'wname',
      },{
        title: '库存',
        dataIndex: 'goodsnum',
        key: 'goodsnum',

      },{
        title: '商品状态',
        dataIndex: 'status',
        key: 'status',
        render: (val) => {
          return(<div>
            {['正常','申请中','已驳回'][`${val}`]}
          </div>)
        }
      },{
        title: '周销',
        dataIndex: 'week',
        key: 'week',
      },{
        title: '月销',
        dataIndex: 'month',
        key: 'month',
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record, index) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleEdit(e, record, index)}>编辑</a><br/>
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
        <ModalGoodsAboutEdit
          parent = {parent}
        />
      </div>
    );
  }
}
