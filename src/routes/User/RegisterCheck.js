import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,Select,Pagination  } from 'antd';
import styles from '../../utils/utils.less'

const Option = Select.Option;
const FormItem = Form.Item;
const statusMap = ['1', '2'];
const status = ['供应商', '采购商'];

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
const dataSource = [{
  key: '1',
  usercode: '1',
  usertype: '1',
  company: '1',
  createtime:'1'
}];

const columns = [{
  title: '账号名称',
  dataIndex: 'usercode',
  key: 'usercode',
}, {
  title: '账号类型',
  dataIndex: 'usertype',
  key: 'usertype',
  filters: [
    {
      text: status[0],
      value: 1,
    },
    {
      text: status[1],
      value: 2,
    },
  ],
  render(val) {
    return <Badge status={statusMap[val]} text={status[val]} />;
  },
}, {
  title: '注册公司名',
  dataIndex: 'company',
  key: 'company',
},{
  title: '注册日期',
  dataIndex: 'createtime',
  key: 'createtime',
},{
  title: '操作',
  dataIndex: 'operate',
  key: 'operate',
  render:()=>
  	<div>
		<a href="" className={styles.mR10}>审核</a>
  	</div>

}];

@connect(({ registerCheck, loading }) => ({
  registerCheck,
  submitting: loading.effects['registerCheck/fetch'],
}))

@Form.create()

export default class RegisterCheck extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'registerCheck/fetch',
      payload: {
        count: 8,
      },
    });
  }

	handleSubmit(){
    const { form,submitting, dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields((err) => {
        if (!err) {
          dispatch({
            type: 'registerCheck/fetch',
            payload: {
              count: 8,
            },
          });
        }
      });
    }, 0);
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return(
			<div>
				<Card>
					<Row>
						<Form onSubmit={this.handleSubmit}>
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
									  {getFieldDecorator('usertype')(
									  	<Select placeholder='请选择账号类型'>
									  		<Option value={}>全部</Option>
									  		<Option value={1}>供应商</Option>
									  		<Option value={2}>采购商</Option>
									  	</Select>
									  	)
									}
									</FormItem>
								</Col>
							</Row>
						</Form>
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
              <Button>重置</Button>
            </Col>
					</Row>
				</Card>
				<Card className={styles.mT10}>
					<Table dataSource={dataSource} columns={columns} />
				</Card>
			</div>
			)

	}
}
