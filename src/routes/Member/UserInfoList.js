import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Pagination,Badge,notification,Divider,Switch,Icon } from 'antd';
import styles from '../../utils/utils.less'
import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;
const flagMap = ['error','processing'];
const flag = ['冻结','使用中'];
const status = [' ', '供应商', '采购商', '分销商', '采购分销商', '客服'];

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

@connect(({ member, loading }) => ({
  member,
  submitting: loading.effects['member/list'],
}))

@Form.create()

export default class UserInfoList extends Component {
  state = {
    formValues: {},
    pagination: {
      current: 1,
      total: 10,
      pageSize: 10,
    },
  }

  componentDidMount() {
    const { formValues, pagination } = this.state;

    this.props.dispatch({
      type: 'member/list',
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
      type: 'member/list',
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
        type: 'member/list',
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
      type: 'member/list',
      payload: {
        ...pagination,
      },
    });
  }

  handleChangeStatus= (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'member/updateStatus',
      payload: {
        userid: record.id,
        flag: record.flag,
      },
      callback: this.onChangeStatusCallback,
    });
  }

  onChangeStatusCallback = (params) => {
    const { formValues,pagination } = this.state;
    const { dispatch } = this.props;

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
      type: 'member/list',
      payload: {
        ...formValues,
        ...pagination,
      },
    });
  }

	render(){
		const { getFieldDecorator } = this.props.form;
		const { member: { list, pagination }, submitting }  = this.props;

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
      title: '账号状态',
      dataIndex: 'flag',
      key: 'flag',
      render(val) {
        return <Badge status={flagMap[val]} text={flag[val]} />;
      },
    },{
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => (
        <Fragment>
          <Link to={`/member/info/${record.id}`}>查看</Link>
          <Divider type="vertical" />
          {/*<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />*/}

          <Switch checkedChildren="使用中"
                  unCheckedChildren="冻结"
                  defaultChecked={record.flag==="0"?false:true}
                  onChange={()=>this.handleChangeStatus(record)}/>
        </Fragment>
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
									  label ='账号名称'
									>
									  {getFieldDecorator('usercode')(
									  	<Input  placeholder="请输入用户账号名称" />)
									}
									</FormItem>
								</Col>
                <Col  xs={24} sm={12} md={6} lg={6} xl={6} >
                  <FormItem
                    {...formItemLayout}
                    label ='公司名称'
                  >
                    {getFieldDecorator('company')(
                      <Input  placeholder="请输入公司名称" />)
                    }
                  </FormItem>
                </Col>
								<Col xs={24} sm={12} md={6} lg={6} xl={6}>
									<FormItem
									{...formItemLayout}
									  label ='用户状态'
									>
									  {getFieldDecorator('verifycode',{initialValue: ""})(
									  	<Select placeholder='请选择账号状态'>
									  		<Option value={""}>全部</Option>
									  		<Option value={1}>客服账号</Option>
									  		<Option value={2}>未提交资料账号</Option>
                        <Option value={3}>待审核账号</Option>
                        <Option value={4}>已通过审核账号</Option>
                        <Option value={-1}>未通过审核账号</Option>
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
                 onChange={this.handleStandardTableChange}/>
				</Card>

			</div>
			)

	}
}
