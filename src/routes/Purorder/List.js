import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,DatePicker,Select  } from 'antd';
import styles from '../../utils/utils.less'
import { getToken } from '../../utils/Global';

const Option = Select.Option;
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
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
},
{
  key: '2',
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
},
{
  key: '3',
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
},
{
  key: '4',
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
},
{
  key: '5',
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
},
{
  key: '6',
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
},{
  key: '7',
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
},
{
  key: '8',
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
},{
  key: '9',
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
},
{
  key: '10',
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
},{
  key: '11',
  purchasesn: '1',
  stage: 1,
  status: '1',
  goodsnames:1,
  sendtype:1,
  sendtypename:1,
  address:1,
  deliverytime:1,
  currency:1,
  createtime:1,
  remark:1
}];

const columns = [
	{
	  title: '采购单号',
	  dataIndex: 'purchasesn',
	  key: 'purchasesn',
	}, {
	  title: '采购单阶段',
	  dataIndex: 'stage',
	  key: 'stage',
	}, {
	  title: '询价状态',
	  dataIndex: 'status',
	  key: 'status',
	},{
	  title: '主要商品名称',
	  dataIndex: 'goodsnames',
	  key: 'goodsnames',
	},{
	  title: '取货方式',
	  dataIndex: 'sendtypename',
	  key: 'sendtypename',
	},{
	  title: '目的地',
	  dataIndex: 'address',
	  key: 'address',
	},{
	  title: '纳期',
	  dataIndex: 'deliverytime',
	  key: 'deliverytime',
	},{
	  title: '币种',
	  dataIndex: 'currency',
	  key: 'currency',
	},{
	  title: '建立时间',
	  dataIndex: 'createtime',
	  key: 'createtime',
	},{
	  title: '备注',
	  dataIndex: 'remark',
	  key: 'remark',
	},{
	  title: '操作',
	  dataIndex: 'operate',
	  key: 'operate',
	  render:()=>
	  	<div>
			<a href="" className={styles.mR10}>新增</a>	
			<a href="">编辑</a>  		
	  	</div>
  
}];
@Form.create()
@connect(({ register, loading }) => ({
  register
}))
export default class Register extends Component {
	state = {
		pagination : {
			showSizeChanger:true,
			current : 1,
			total:11,
			showTotal:(total, range)=>{
				console.log('0000000')
				console.log(total, range)
			},
			onChange:(page, pageSize)=>{
				console.log('111111')
				console.log(page,pageSize)
			},
			onShowSizeChange : (current, size)=>{
				console.log('222222222222')
				console.log(current, size)
			}
		},
		search:{
			userCode:getToken().userId || '',//采购商账号 管理员置空
			purchasesn:'',
			createtime:'',
			endtime : '',
			stage:''
		}
		
	}
	handleSubmit = () => {
		const { getFieldsValue } = this.props.form;
		const { search } = this.state;
		var data = getFieldsValue();
		var data = {
			...data,
			createtime : data.createtime ? data.createtime.format('YYYYMMDD') : '',
			endtime : data.endtime ? data.endtime.format('YYYYMMDD') : '',
		};
		this.setState({
			search : {
				...data,
				userCode : search.userCode
			}
		});
		/*this.props.dispatch({
          type: 'register/submit',
          payload: this.state.search
        });*/
	}
	resetSearch = () => {
		const { resetFields } = this.props.form;
		resetFields();
	}
	componentWillMount(){
		/*this.props.dispatch({
          type: 'register/submit',
          payload: this.state.search
        });*/
	}
	
	render(){
		{console.log(this.state)}
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
									  label ='采购单号'
									>
									  {getFieldDecorator('purchasesn')(
									  	<Input  placeholder="请输入采购单号" />)
									}
									</FormItem>
								</Col>
								<Col xs={24} sm={12} md={6} lg={6} xl={6}>
									<FormItem
									{...formItemLayout}
									  label ='采购单阶段'
									>
									  {getFieldDecorator('stage')(
									  	<Select placeholder='请选择采购单阶段'>
									  		<Option value={0}>关闭</Option>
									  		<Option value={1}>询价</Option>
									  		<Option value={2}>待付款</Option>
									  		<Option value={3}>备货中</Option>
									  		<Option value={4}>已出港</Option>
									  		<Option value={5}>已入港</Option>
									  		<Option value={6}>完成</Option>
									  		<Option value={9}>暂存</Option>
									  	</Select>
									  	)
									}
									</FormItem>
								</Col>
								<Col xs={24} sm={12} md={6} lg={6} xl={6}>
									<FormItem
									{...formItemLayout}
									  label ='开始时间'
									>
									  {getFieldDecorator('createtime')(
									  	<DatePicker format="YYYY-MM-DD" />
									  	)
									}
									</FormItem>
								</Col>
								<Col xs={24} sm={12} md={6} lg={6} xl={6}>
									<FormItem
									{...formItemLayout}
									  label ='结束时间'
									>
									  {getFieldDecorator('endtime')(
									  	<DatePicker format="YYYY-MM-DD" />
									  	)
									}
									</FormItem>
								</Col>
							</Row>	
							<Row>
								<Col span={20}></Col>
								<Col span={4}><Button type="primary" htmlType="submit">搜索</Button><Button onClick={this.resetSearch}>重置</Button></Col>
							</Row>									
						</Form>
					</Row>
					
				</Card>
				<Card className={styles.mT10}>
					<Table dataSource={dataSource} columns={columns} pagination={this.state.pagination}/>
				</Card>
			</div>
			)
		
	}
}