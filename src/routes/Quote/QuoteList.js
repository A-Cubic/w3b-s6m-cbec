import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col  } from 'antd';
import styles from '../../utils/utils.less'


const FormItem = Form.Item;

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
  goodsTm: '1',
  goodsCode: 1,
  goodsName: '1',
  goodsQuote:1,
  gys:1
},{
  key: '2',
  goodsTm: '2',
  goodsCode: 2,
  goodsName: '2',
  goodsQuote:2,
  gys:2
}];

const columns = [{
  title: '商品条码',
  dataIndex: 'goodsTm',
  key: 'goodsTm',
}, {
  title: '商品编号',
  dataIndex: 'goodsCode',
  key: 'goodsCode',
}, {
  title: '商品名称',
  dataIndex: 'goodsName',
  key: 'goodsName',
},{
  title: '商品报价',
  dataIndex: 'goodsQuote',
  key: 'goodsQuote',
},{
  title: '供应商',
  dataIndex: 'gys',
  key: 'gys',
},{
  title: '操作',
  dataIndex: 'operate',
  key: 'operate',
  render:(text, record)=>
  	<div>
      <Link to='/goods/quote/add' className={styles.mR10}>新增</Link>
      <Link to={`/goods/quote/mod/${record.goodsTm}`}>编辑</Link>
  	</div>

}];
@Form.create()

export default class Register extends Component {
	render(){
		const { getFieldDecorator } = this.props.form;
		return(
			<div>
				<Card>
					<Row>
						<Form onSubmit={this.handleSubmit}>
							<Row>
								<Col  xs={24} sm={12} md={8} lg={8} xl={8} >
									<FormItem
									{...formItemLayout}
									  label ='商品条码'
									>
									  {getFieldDecorator('goodsTm')(
									  	<Input  placeholder="请输入商品条码" />)
									}
									</FormItem>
								</Col>
								<Col xs={24} sm={12} md={8} lg={8} xl={8}>
									<FormItem
									{...formItemLayout}
									  label ='商品名称'
									>
									  {getFieldDecorator('goodsName')(
									  	<Input placeholder="请输入商品名称" />)
									}
									</FormItem>
								</Col>
								<Col xs={24} sm={12} md={8} lg={8} xl={8}>
									<FormItem
									{...formItemLayout}
									  label ='供应商'
									>
									  {getFieldDecorator('gys')(
									  	<Input placeholder="请输入供应商" />)
									}
									</FormItem>
								</Col>
							</Row>
						</Form>
					</Row>
					<Row>
						<Col span={20}></Col>
						<Col span={4}><Button type="primary">搜索</Button><Button>重置</Button></Col>
					</Row>
				</Card>
				<Card className={styles.mT10}>
					<Table dataSource={dataSource} columns={columns} />
				</Card>
			</div>
			)

	}
}
