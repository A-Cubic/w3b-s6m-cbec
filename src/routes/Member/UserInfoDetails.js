import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,Select,Pagination,Badge,Modal,List,Icon,Radio,Tabs,notification, Popconfirm, message } from 'antd';
import styles from '../../utils/utils.less'
import moment from 'moment';

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;
const statusMap = ['default', 'processing', 'success', 'error'];
const status = [' ', '供应商', '采购商'];

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	}
};



@connect(({ registerCheck, loading }) => ({
  registerCheck,
  submitting: loading.effects['registerCheck/fetch'],
}))

@Form.create()

export default class RegisterCheck extends Component {
  state = {
    formValues: {},
    pagination: {
      current: 1,
      total: 10,
      pageSize: 5,
    },
    visible: false,
    loading: false,
    selectedRow:{},
    selectedRowKeys: [],
    previewVisible: false,
    previewImage: {},
    radioValue: "1",
    tabKey: "1",
    failmark:"",
  }

  componentDidMount() {
    const { formValues, pagination } = this.state;

    this.props.dispatch({
      type: 'registerCheck/fetch',
      payload: {
        ...formValues,
        ...pagination,
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      // ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'registerCheck/fetch',
      payload: params,
    });
  }

	handleSubmit = (e) => {
    e.preventDefault();
    const { form, submitting, dispatch } = this.props;
    const { pagination } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'registerCheck/fetch',
        payload: {
          ...values,
          ...pagination,
        },
      });
    });

	}

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    const { pagination } = this.state;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'registerCheck/fetch',
      payload: {
        ...pagination,
      },
    });
  }

  onRowClick = (e) => {
    this.setState({ selectedRow: e }, () => this.sendParm(e));
  }

  sendParm = (e) => {
    const { selectedRow } = this.state;
  }

  showModal = () => {
    setTimeout(() => {
      const { selectedRow } = this.state;
      this.setState({
        visible: true,
      });
    }, 0);
  }

  showImg = (i) => {
    setTimeout(() => {
      // const { previewImage } = this.state;
      this.setState({
        previewVisible: true,
        previewImage: i,
      });
    }, 0);
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = () => {
    setTimeout(() => {
      this.setState({
        visible: false,
        previewVisible: false,
        previewImage: {},
        radioValue: "1",
        tabKey: "1",
        failmark: "",
      });
    }, 0);
  }

  handleCancelPreview = () => {
    this.setState({ previewVisible: false });
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys});
  }

  radioOnChange = (e) => {
    setTimeout(() => {
      this.setState({
        radioValue: e.target.value,
        tabKey: e.target.value,
      });
    }, 0);

  }
  submitCheckResult = (e) => {
    e.preventDefault();
    const { selectedRow, radioValue,failmark } = this.state;
    const { dispatch } = this.props;
    if(radioValue==="0"){
      if (failmark.trim() === "") {
        message.error("审核失败原因不能为空！");
        return;
      }
    }
    dispatch({
      type: 'registerCheck/check',
      payload: {
        userid: selectedRow.id,
        usercode: selectedRow.usercode,
        usertype: selectedRow.usertype,
        check: radioValue,
        failmark,
      },
      callback: this.onCheckCallback,
    });

  }

  onCheckCallback = (params) => {
    const { formValues,pagination } = this.state;
    const { dispatch } = this.props;

    this.handleCancel();

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

    dispatch({
      type: 'registerCheck/fetch',
      payload: {
        ...formValues,
        ...pagination,
      },
    });
  }

  handleTextAreaOnChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      failmark: e.target.value
    });
  }

	render(){
		const { getFieldDecorator } = this.props.form;
		const { registerCheck: { list, pagination }, submitting }  = this.props;
    const { visible, loading, selectedRowKeys, selectedRow,previewVisible,previewImage,radioValue,tabKey,failmark } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };
    const columns = [{
      title: '账号名称',
      dataIndex: 'usercode',
      key: 'usercode',
    }, {
      title: '账号类型',
      dataIndex: 'usertype',
      key: 'usertype',
      render(val) {
        return <span>{status[val]}</span>
      },
    }, {
      title: '注册公司',
      dataIndex: 'company',
      key: 'company',
    },{
      title: '注册日期',
      dataIndex: 'createtime',
      key: 'createtime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },{
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render:(text, record) =>(
        <div>
          <Button type="primary" onClick={this.showModal} >
            审核
          </Button>
        </div>
      ),
    }];

    const cardData = [
      {
        title: '账号名称',
        data: (selectedRow.usercode !==null && selectedRow.usercode !=="")?selectedRow.usercode:"无账号名称",
      },
      {
        title: '账号类型',
        data: selectedRow.usertype==="1"?"供应商":"采购商",
      },
      {
        title: '公司名称',
        data: (selectedRow.company !==null && selectedRow.company !=="")?selectedRow.company:"无公司名称",
      },
      {
        title: '联系人',
        data: (selectedRow.contact !==null && selectedRow.contact !=="")?selectedRow.contact:"无联系人信息",
      },
      {
        title: '联系电话',
        data: (selectedRow.tel !==null && selectedRow.tel !=="")?selectedRow.tel:"无联系电话信息",
      },
      {
        title: '邮箱',
        data: (selectedRow.email !==null && selectedRow.email !=="")?selectedRow.email:"无邮箱信息",
      },
      {
        title: '营业执照',
        data: (selectedRow.img1 !==null && selectedRow.img1 !=="")?<div style={{ position: 'relative' }}><img src={selectedRow.img1} style={{ width: '200px',height:'200px' }}></img><Button onClick={()=>this.showImg(selectedRow.img1)} type="primary" shape="circle" icon="eye" size="large" style={{ position: 'absolute' }}/></div>:"无营业执照照片",
      },
      {
        title: '组织机构代码证',
        data: (selectedRow.img2 !==null && selectedRow.img2 !=="")?<div style={{ position: 'relative' }}><img src={selectedRow.img2} style={{ width: '200px',height:'200px' }}></img><Button onClick={()=>this.showImg(selectedRow.img2)} type="primary" shape="circle" icon="eye" size="large" style={{ position: 'absolute' }}/></div>:"无组织机构代码证照片",
      },
      {
        title: '税务登记证',
        data: (selectedRow.img3 !==null && selectedRow.img3 !=="")?<div style={{ position: 'relative' }}><img src={selectedRow.img3} style={{ width: '200px',height:'200px' }}></img><Button onClick={()=>this.showImg(selectedRow.img3)} type="primary" shape="circle" icon="eye" size="large" style={{ position: 'absolute' }}/></div>:"无税务登记证照片",
      },
      {
        title: '三证合一',
        data: (selectedRow.three !==null && selectedRow.three !=="")?<div style={{ position: 'relative' }}><img src={selectedRow.three} style={{ width: '200px',height:'200px' }}></img><Button onClick={()=>this.showImg(selectedRow.img4)} type="primary" shape="circle" icon="eye" size="large" style={{ position: 'absolute' }}/></div>:"无三证合一照片",
      },
    ];
    const operations = <Popconfirm placement="leftBottom" title="确认提交审核结果吗？" onConfirm={this.submitCheckResult} okText="是" cancelText="否">
        <Button type="primary" size="default">提交</Button>
      </Popconfirm>

		return(
			<div>
				<Card>
          <Form onSubmit={this.handleSubmit}>
					<Row>
							<Row>
								<Col  xs={24} sm={12} md={6} lg={6} xl={6} >
									<FormItem
									{...formItemLayout}
									  label ='注册用户名'
									>
									  {getFieldDecorator('usercode')(
									  	<Input  placeholder="请输入注册用户名" />)
									}
									</FormItem>
								</Col>
								<Col xs={24} sm={12} md={6} lg={6} xl={6}>
									<FormItem
									{...formItemLayout}
									  label ='账号类型'
									>
									  {getFieldDecorator('usertype',{initialValue: ""})(
									  	<Select placeholder='请选择账号类型'>
									  		<Option value={""}>全部类型</Option>
									  		<Option value={1}>供应商</Option>
									  		<Option value={2}>采购商</Option>
									  	</Select>
									  	)
									}
									</FormItem>
								</Col>
							</Row>

					</Row>
					<Row>
						<Col span={20}></Col>
						<Col span={4}>
              <Button type="primary"
                      loading={submitting}
                      className={styles.submit}
                      htmlType="submit">
                搜索
              </Button>
              <Button onClick={this.handleFormReset} style={{ marginLeft: 12 }}>重置</Button>
            </Col>
					</Row>
          </Form>
				</Card>
				<Card className={styles.mT10}>
					<Table dataSource={list}
                 columns={columns}
                 pagination={pagination}
                 rowKey={record => record.id}
                  onRow = {(record) => {
                    return {
                      onClick: () => {this.onRowClick(record)},
                    };
                  }}
                 // rowSelection={rowSelection}
                 onChange={this.handleStandardTableChange}/>
				</Card>

        <Modal
          visible={visible}
          style={{top: 20 }}
          width="1000px"
          title="注册用户审核信息表"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // footer={[
          //   <Button key="back" onClick={this.handleCancel}>Return</Button>,
          //   <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
          //     Submit
          //   </Button>,
          // ]}
          footer={null}
        >
          <List
            grid={{ gutter: 16,xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
            dataSource={cardData}
            renderItem={item => (
              <List.Item>
                <Card title={item.title}>{item.data}</Card>
              </List.Item>
            )}
          />
          <Card title="审批结果">
            <RadioGroup onChange={this.radioOnChange} value={radioValue}>
              <Radio value={"1"}>通过</Radio>
              <Radio value={"0"}>未通过</Radio>
            </RadioGroup>

            <Tabs defaultActiveKey="1" activeKey={tabKey} tabBarExtraContent={operations}>
              <TabPane tab={<Icon type="check-circle" />} key="1">
                所有审核无误，请确认后点击确认审核结果。
              </TabPane>
              <TabPane tab={<Icon type="exclamation-circle" />} key="0">
                <label> <label style={{color:"red"}}> *</label> 审核失败原因</label><TextArea placeholder="请输入审核失败原因，以告知用户" rows={4} value={failmark} onChange={this.handleTextAreaOnChange}/>
              </TabPane>
            </Tabs>
          </Card>
        </Modal>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelPreview}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
			</div>
			)

	}
}
