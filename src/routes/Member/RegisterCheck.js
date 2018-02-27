import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,Select,Pagination,Badge,Modal  } from 'antd';
import styles from '../../utils/utils.less'
import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['22 ', '供应商', '采购商'];

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
    // console.log(selectedRow);
  }

  showModal = () => {
    setTimeout(() => {
      const { selectedRow } = this.state;
      console.log(selectedRow);
      this.setState({
        visible: true,
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
    this.setState({ visible: false });
  }
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRows);


    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys});
  }

	render(){
		const { getFieldDecorator } = this.props.form;
		const { registerCheck: { list, pagination }, submitting }  = this.props;
    const { visible, loading, selectedRowKeys, selectedRow } = this.state;
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
          style={{ height: 1000 }}
          width="1000px"
          title="注册用户审核信息表"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>账号名称：{selectedRow.usercode}</p>
          <p>账号类型：{selectedRow.usertype}</p>
          <p>公司名称：{selectedRow.company}</p>
          <p>联系人：{selectedRow.contact}</p>
          <p>联系电话：{selectedRow.tel}</p>
          <p>邮箱：{selectedRow.email}</p>
          <p>账号名称：{selectedRow.usercode}</p>
          <p>账号类型：{selectedRow.usertype}</p>
          <p>公司名称：{selectedRow.company}</p>
          <p>联系人：{selectedRow.contact}</p>
          <p>联系电话：{selectedRow.tel}</p>
          <p>邮箱：{selectedRow.email}</p>
        </Modal>
			</div>
			)

	}
}
