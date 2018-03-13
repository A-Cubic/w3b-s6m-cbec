import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,DatePicker,Select,Steps,Icon,Modal,notification  } from 'antd';
import styles from '../../utils/utils.less'

const Option = Select.Option;
const FormItem = Form.Item;
const Step = Steps.Step;

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

var goodsSelections = [];
@Form.create()
@connect(({ addPurOrder, loading }) => ({
  addPurOrder,
  loading: loading.models.addPurOrder,
  submitting: loading.effects['addPurOrder/goodsList'],
}))
export default class AddGoodsModal extends Component {
	state = {
		pagination : {
			current : 1,
			pageSize :2,
			total:3
		},
		selectedRowKeys : []
	}

	handleOk = (e) => {
	  if(this.props.handleOk){
		this.props.handleOk(goodsSelections);
  	  }
  	  this.setState({
  	  	selectedRowKeys:[]
  	  })
	}
	handleCancel = (e) => {
	  if(this.props.handleCancel){
		this.props.handleCancel();
	  }
	  this.setState({
	  	selectedRowKeys:[]
	  })
	}
	handleSearchGoods = () =>{
		const { getFieldDecorator,getFieldsValue,validateFields,setFields } = this.props.form;
		const { dispatch, addPurOrder:{ goodsList:{ pagination } } } = this.props;
		var values = getFieldsValue();
		var search = values.goodsId !==undefined ? values.goodsId : '' + ' '+ values.goodsnames !==undefined ?  values.goodsnames : '' ;
		this.getGoodsList(search,1,pagination.pageSize)
	}
	resetSearch = () => {
		const { resetFields } = this.props.form;
		const { addPurOrder:{ goodsList:{ pagination } } } = this.props;
		resetFields();
		this.getGoodsList('',1,pagination.pageSize)
	}
	changGoodsPage = (page, filters, sorter) =>{
		console.log(page)
		const { getFieldsValue } = this.props.form;
		const values = getFieldsValue();
		this.getGoodsList('',page.current,page.pageSize)
	}	
	getGoodsList(search,current,pageSize){
		this.props.dispatch({
			type:'addPurOrder/goodsList',
			payload:{
				search : search,
				current:current,
				pageSize:pageSize
			}
		});
	}

	addGoods = () => {
  			const { purList } = this.state; 
  			var data = purList.purDataSource.slice(0);
  			console.log('add....................');
  			console.log(goodsSelections);
  			goodsSelections.forEach(function(val,i){
  				val.key = new Date().getTime()+i+'';
  				data.push(val);
  			});
  			console.log(data);
			this.setState({
				currentStep : 0,
				purList : {
					...purList,
					pagination : data.length,
					purDataSource : data
				}
			});
	  		}

	render(){ 
		const { getFieldDecorator,getFieldsValue,validateFields,setFields } = this.props.form;
		const { submitting } = this.props; 
		const { selectedRowKeys } = this.state;
		const goodsColumns = [
			{
			  title: '商品编号',
			  dataIndex: 'id',
			  key: 'id',
			},
			{
			  title: '图片',
			  dataIndex: 'slt',
			  key: 'slt',
			  render : (text, record) => <img src={`${text}`} style={{width:100,height:100}}/>
			},
			{
			  title: '商品名称',
			  dataIndex: 'goodsname',
			  key: 'goodsname',
			},{
			  title: '商品条码',
			  dataIndex: 'barcode',
			  key: 'barcode',
			},{
			  title: '商品单价',
			  dataIndex: 'price',
			  key: 'price',
			},{
			  title: '提货方式',
			  dataIndex: 'sendtype',
			  key: 'sendtype',
			  render : (text, record) => {
  			  	if (record.ifXG) {
  			  		return '香港自提'
  			  	}else if (record.ifHW) {
  			  		return '海外自提'
  			  	}else if (record.ifBS) {
  			  		return '保税备货'
  			  	}else if (record.ifMY) {
  			  		return '一般贸易'
  			  	}
			  }
			  	
			}];
		const rowSelection = {
			  selectedRowKeys,
	  		  onChange: (selectedRowKeys, selectedRows) => {
	  		  	const { current } = this.props.pagination
	  		    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	  		    this.setState({selectedRowKeys})
	  		    goodsSelections[current] = [...selectedRows];
	  		  },
	  		  getCheckboxProps: record => ({
	  		    disabled: getRes(record,'barcode'),
	  		    name: record.barcode
	  		  })
	  	};
	  	const getRes = (record,param) =>{
	  		let res = false;
	  		this.props.choosenGoods.forEach((Item,index)=>{
	  			if (Item[param] == record[param]) {
	  				res = true
	  			}
	  		});
	  		return res;
	  	}

	return(
		<Modal
		  width={"80%"}
          title="添加采购商品"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          >
			<Row>
				<Form onSubmit={this.handleSearchGoods}>
					<Row>
						<Col  xs={24} sm={12} md={6} lg={6} xl={6} >
							<FormItem
							{...formItemLayout}
							  label ='商品条码'
							>
							  {getFieldDecorator('goodsId')(
							    <Input placeholder="商品条码"/>
							  )}
							</FormItem>
						</Col>
						
						<Col xs={24} sm={12} md={6} lg={6} xl={6}>
							<FormItem
							{...formItemLayout}
							  label ='商品名称'
							>
							  {getFieldDecorator('goodsnames')(
							    <Input placeholder="商品名称"/>
							  )}
							</FormItem>
						</Col>
						<Col className={styles.fr}>
							<Button type="primary" htmlType="submit" className={styles.mR10}>搜索</Button>
							<Button onClick={this.resetSearch}>重置</Button>
						</Col>

					</Row>	
													
				</Form>
			</Row>
			<div>
				<Table 
					dataSource={this.props.list} 
					columns={goodsColumns} 
					rowSelection = {rowSelection}
					pagination={this.props.pagination}
					onChange={this.changGoodsPage}
					loading={submitting}
					/>
					
			</div>
		</Modal>
		)
			
	}
}