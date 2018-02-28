import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,DatePicker,Select,Steps,Icon,Modal } from 'antd';
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
@connect(({ register, loading }) => ({
  register
}))
@Form.create()
export default class NewPurModal extends Component {
	state = {
		loading : false
	}
	handleOk = (e) => {
	const { getFieldsValue } = this.props.form;
		console.log(getFieldsValue());
	  this.setState({
	  	loading : true
	  });

	  /*this.props.dispatch({
	  	type : '',
	  	payload : {

	  	},
	  	callback : ()=>{
  		  this.setState({
  		  	loading : false
  		  });
  		  if(this.props.handleOk){
  			this.props.handleOk();
  		  }
	  	}
	  })*/
	}
	handleCancel = (e) => {
	  if(this.props.handleCancel){
		this.props.handleCancel();
	  }
	}
	handleSubmit = () => {

	}
	render(){
		const { loading }  = this.state;
	  	const { getFieldDecorator,getFieldsValue,validateFields,setFields } = this.props.form;
		return(
			<Modal
				  width={"60%"}
		          title="采购单"
		          visible={this.props.visible}
		          footer={[
		                     <Button key="Return" onClick={this.handleCancel}>取消</Button>,
		                     <Button key="Submit" type="primary" loading={loading} onClick={this.handleOk}>
		                       确认
		                     </Button>,
		                   ]}>
		          

		          <Form onSubmit={this.handleSubmit}>
							<Row>
								<Col  xs={24} sm={12} md={8} lg={8} xl={8} >
									<FormItem
									{...formItemLayout}
									  label ='取货方式'
									>
									  {getFieldDecorator('sendtype')(
									    <Input placeholder="取货方式"/>
									  )}
									</FormItem>
								</Col>
								
								<Col xs={24} sm={12} md={8} lg={8} xl={8}>
									<FormItem
									{...formItemLayout}
									  label ='目的地'
									>
									  {getFieldDecorator('address')(
									    <Input placeholder="目的地"/>
									  )}
									</FormItem>
								</Col>
								<Col xs={24} sm={12} md={8} lg={8} xl={8}>
									<FormItem
									{...formItemLayout}
									  label ='纳期'
									>
									  {getFieldDecorator('deliverytime')(
									    <Input placeholder="纳期"/>
									  )}
									</FormItem>
								</Col>
								<Col xs={24} sm={12} md={8} lg={8} xl={8}>
									<FormItem
									{...formItemLayout}
									  label ='币种'
									>
									  {getFieldDecorator('currency')(
									    <Input placeholder="币种"/>
									  )}
									</FormItem>
								</Col>
								<Col xs={24} sm={12} md={8} lg={8} xl={8}>
									<FormItem
									{...formItemLayout}
									  label ='备注'
									>
									  {getFieldDecorator('remark')(
									    <Input placeholder="备注"/>
									  )}
									</FormItem>
								</Col>
							</Row>	
				  </Form>
		        </Modal>
		)
	}
}