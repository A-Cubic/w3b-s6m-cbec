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
export default class AddGoodsModal extends Component {
	state = {
		pagination : {
			current : 1,
			pageSize :2,
			total:3
		}
	}

	handleOk = (e) => {
	  if(this.props.handleOk){
		this.props.handleOk(goodsSelections);
  	  }
	}
	handleCancel = (e) => {
	  if(this.props.handleCancel){
		this.props.handleCancel();
	  }
	}
	handleSearchGoods = () =>{
		const { getFieldDecorator,getFieldsValue,validateFields,setFields } = this.props.form;
		var values = getFieldsValue();
		console.log(values);
		/*this.props.dispatch({
			type : '',
			payload : {
				...values,
			}
		})*/
	}
	resetSearch = () => {
		const { resetFields } = this.props.form;
		resetFields();
	}
	changGoodsPage = (page, filters, sorter) =>{
		console.log(page);
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
		const { pagination } = this.state;
		const goodsColumns = [
			{
			  title: '商品编号',
			  dataIndex: 'id',
			  key: 'id',
			},
			{
			  title: '商品名称',
			  dataIndex: 'goodsnames',
			  key: 'goodsnames',
			},{
			  title: '商品条码',
			  dataIndex: 'goodsTm',
			  key: 'goodsTm',
			},{
			  title: '商品单价',
			  dataIndex: 'price',
			  key: 'price',
			},{
			  title: '提货方式',
			  dataIndex: 'sendtype',
			  key: 'sendtype',
			},{
			  title: '图片',
			  dataIndex: 'slt',
			  key: 'slt',
			  render : (text, record) => <img src='asd'/>
			}];
		const goodsDataSource = [
			{
				key : '1',
				id : '1',
				goodsnames : '1',
				price : '1',
				sendtype :'1',
				slt : '1',
				goodsTm : '1'
			},
			{
				key : '2',
				id : '2',
				goodsnames : '1',
				price : '1',
				sendtype : '1',
				slt : '1',
				goodsTm :'1'

			},
			{
				key : '3',
				id : '3',
				goodsnames : '1',
				price : '1',
				sendtype : '1',
				slt : '1',
				goodsTm : '1'

			},
			{
				key : '4',
				id : '3',
				goodsnames : '1',
				price : '1',
				sendtype : '1',
				slt : '1',
				goodsTm : '1'

			}
		]
		
		const rowSelection = {
	  		  onChange: (selectedRowKeys, selectedRows) => {
	  		    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	  		    goodsSelections=selectedRows;
	  		    console.log(goodsSelections);
	  		  },
	  		  getCheckboxProps: record => ({
	  		    disabled: record.name === 'Disabled User', // Column configuration not to be checked
	  		    name: record.name
	  		  })
	  	};

	return(
		<Modal
		  width={"60%"}
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
							    <Input placeholder="商品条码"/>
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
					dataSource={goodsDataSource} 
					columns={goodsColumns} 
					rowSelection = {rowSelection}
					pagination={pagination}
					onChange={this.changGoodsPage}
					/>
					
			</div>
		</Modal>
		)
			
	}
}