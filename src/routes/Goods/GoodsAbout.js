import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker } from 'antd';
// import ModalUnteratedOrder from './ModalUnteratedOrder';
import styles from './GoodsAbout.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({o2o,  loading }) => ({
  o2o,
  loading: loading.effects['o2o/list'],
}))

@Form.create()
export default class untreatedOrder extends Component {
  state={
    fileList:[],
    visible: false,
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type: 'o2o/list',
      payload: {
        status:'新订单',
      },
    });
  }
  componentDidMount() {
    this.init();
  }
  onSearch=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('values',fieldsValue)

      if (err) return;
      const rangeValue = fieldsValue['date'];
      const values = rangeValue==undefined ? {
        ...fieldsValue,
      }:{
        ...fieldsValue,
        'date': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };

      this.setState({
        formValues: values,
      });
      this.props.dispatch({
        type: 'o2o/list',
        payload: {
          status:'新订单',
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
  handleChildrenCheck =(record)=>{
    this.props.dispatch({
      type: 'o2o/orderCheck',
      payload: {
        orderId:record.merchantOrderId,
      },
    });
    setTimeout(()=>{
      this.handleVisible(true);
    },0)
  }
  handleUploadChange=(info)=>{
    console.log('info',info)
    let fileList = info.fileList;
    this.setState({
      fileList:info.fileList
    })

    this.props.dispatch({
      type: 'o2o/upload',
      payload: {
        fileList:info.fileList
      },
      callback: this.onUploadCallback,
    });
      this.setState({
        fileList:[]
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
    const { getFieldDecorator } = this.props.form;
    // const url = getCurrentUrl('/llback/user/validate');
    const url = 'http://192.168.0.109:51186/llback/O2O/UploadOrder'
    const props = {
      action: url,
      listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange,
      multiple: false,
      customRequest:this.upload,
    };
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status',{
                initialValue :''
              })(
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
              {getFieldDecorator('wcode')(
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
            <FormItem label="商品名称">
              {getFieldDecorator('orderId')(
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
                  <Option value="品牌1">品牌1</Option>
                  {/* {brandsData.map(val => <Option key={val.id} value={val.id} label={val.name}>{val.name}</Option>)} */}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <FormItem label="商品编码">
              {getFieldDecorator('orderId')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>


        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'left', marginBottom: 0 }}>
            <Button style={{ marginLeft: 8 }} type="primary" ghost>批量新增商品</Button>
            <Button style={{ marginLeft: 8 }} type="primary" ghost>批量修改库存</Button>
            <Button style={{ marginLeft: 8 }} type="primary" ghost>下载库存模板</Button>
            <Button style={{ marginLeft: 8 }} type="primary" ghost>下载商品模板</Button>
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
  render() {
    // console.log('1',this.props)
    const { o2o:{list, pagination} } = this.props;
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
      title: '商品图片',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '名称',
      dataIndex: 'merchantOrderId',
      key: 'merchantOrderId',
    }, {
      title: '条码',
      dataIndex: 'waybillno',
      key: 'waybillno',
    }, {
      title: '品牌',
      dataIndex: 'tradeTime',
      key: 'tradeTime',
    }, {
      title: '产地',
      dataIndex: 'consigneeName',
      key: 'consigneeName',
    },{
        title: '所在仓',
        dataIndex: 'a',
        key: 'a',
      },{
        title: '库存',
        dataIndex: 'b',
        key: 'b',
      },{
        title: '发货方式',
        dataIndex: 'c',
        key: 'c',
      },{
        title: '商品状态',
        dataIndex: 'd',
        key: 'd',
      },{
        title: '周销',
        dataIndex: 'e',
        key: 'e',
      },{
        title: '月销',
        dataIndex: 'e',
        key: 'e',
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record, index) => {
          return (
            <Fragment>
              <a href="javascript:;" onClick={(e) => this.handleBtnCheckCopy(e, record, index)}>编辑</a><br/>
              <a href="javascript:;" >{
                record.status == 0?
                  <span onClick={(e) => this.handleBtnCheckEdit(e, record, index)}>申请上架</span>:
                  <span onClick={(e) => this.handleBtnCheckOne(e, record, index)}>申请下架</span>
              }</a><br/>
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
                 pagination={pagination}
                 // rowKey={record => record.id}
                 // loading={submitting}
          />
        </Card>
      </div>
    );
  }
}
