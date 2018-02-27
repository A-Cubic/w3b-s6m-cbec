import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,DatePicker,Select,Steps   } from 'antd';
import styles from '../../utils/utils.less'
import { getToken } from '../../utils/Global';

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

@Form.create()
@connect(({ register, loading }) => ({
  register
}))
export default class Register extends Component {
	state = {
		currentStep : 0
	}
	addGoods = () =>{
		this.setState({currentStep:1})
	}
	renderStep = (currentStep)=>{
		if(currentStep == 0){
			return(
				<div>1</div>
				)
		}else if(currentStep == 1){
			return(
				<div>2</div>
				)
		}
	}
	render(){
		const { currentStep } = this.state;
		return(
			<Card>
				<Steps current={0} className={styles.mB10}>
				    <Step title="修改采购单" />
				    <Step title="创建采购单" />
			  	</Steps>
			  	<Row className={styles.mT10}>
			  		<Button className={styles.mR10} onClick={this.addGoods}>新增商品</Button>
			  		<Button className={styles.mR10}>保存</Button>
			  		<Button>放弃</Button>
			  	</Row>
				{this.renderStep(currentStep)}
			</Card>
			)
	}
}