import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,DatePicker,Select,Steps,Icon,Modal,notification  } from 'antd';
import styles from '../../utils/utils.less'
import { getToken } from '../../utils/Global';
import  NewPurModal  from './NewPurModal'

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

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}
@connect(({ register, loading }) => ({
  register
}))
@Form.create()
export default class NewPurOrder extends Component {
	state = {
		visible: false,
		currentStep : 0,
		purList : {
			pagination : {
				current : 1,
				pageSize :1,
				total:3
			},
			purDataSource : []
		},
		goodsList : {
			pagination : {
				current : 1,
				pageSize :2,
				total:3
			}
		}
	}
	showModal = () => {
	    this.setState({
	      visible: true,
	    });
	  }
	  handleOk = (e) => {
	    this.setState({
	      visible: false,
	    });
	  }
	  handleCancel = (e) => {
	    this.setState({
	      visible: false,
	    });
	  }
	  
	goStepOne = () => {
		this.setState({currentStep:0})
	}
	goAddGoods = () =>{
		this.setState({currentStep:1})
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
	renderStep = (currentStep)=>{
	  	const { getFieldDecorator,getFieldsValue,validateFields,setFields } = this.props.form;
	  	const { purList,goodsList } = this.state;
	  	var goodsSelections = [];
		const purColumns = [
			{
			  title: '序号',
			  dataIndex: 'index',
			  key: 'index',
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
			  title: '期望价格',
			  dataIndex: 'wantedPrice',
			  key: 'wantedPrice',
			  render: (text, record) => (
			          <EditableCell
			            value={text}
			            onChange={onCellChange(record.key, 'wantedPrice')}
			          />
		        )
			},{
			  title: '商品数量',
			  dataIndex: 'goodsNum',
			  key: 'goodsNum',
			  render: (text, record) => (
			          <EditableCell
			            value={text}
			            onChange={onCellChange(record.key, 'goodsNum')}
			          />
		        )
			}];
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

				}
			]
		const onCellChange = (key, dataIndex) => {
		    return (value) => {
		      const dataSource = [...purList.purDataSource];
		      const target = dataSource.find(item => item.key === key);
		      if (target) {
		        target[dataIndex] = value;
		        this.setState({ 
	        		purList : {
	        			...purList,
	        			purDataSource : dataSource
	        		}
		         });
		      }
		    };
	  	}
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
  		const changPurPage = (page, filters, sorter) =>{
  			console.log(page);
  		}
  		const changGoodsPage = (page, filters, sorter) =>{
  			console.log(page);
  		}
  		const addGoods = () => {
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
  		const savePruOrder = () => {
  			const { purList:{ purDataSource } } = this.state;
  			if( purDataSource.length == 0){
				notification.info({
				    message: '提示',
				    description: '请添加采购单商品',
				  });
  			}else{
  				this.showModal();
  			}
  		}
  		const deletePruOrder = () => {
  			const { purList } = this.state;
  			this.setState({
  				purList : {
  					...purList,
  					purDataSource : []
  				}
  			})
  		}
		if(currentStep == 0){
			return(
				<div>
					<Row className={styles.mB20}>
				  		<Button className={styles.mR10} onClick={this.goAddGoods}>新增商品</Button>
				  		<Button className={styles.mR10} onClick={savePruOrder}>保存</Button>
				  		<Button onClick={deletePruOrder}>放弃</Button>
			  		</Row>
					<Table 
						dataSource={purList.purDataSource} 
						columns={purColumns} 
						pagination={purList.pagination}
						onChange={changPurPage}
						/>
				</div>
				)
		}else if(currentStep == 1){
			return(
				<div>
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
							pagination={goodsList.pagination}
							onChange={changGoodsPage}
							/>
							<div className={`${styles.mT10} ${styles.fr}`}>
								<Button className={styles.mR10} onClick={this.goStepOne}>返回</Button>
								<Button onClick={addGoods}>新增商品</Button>
							</div>
					</div>

				</div>
				)
		}
	}
	render(){
		const { currentStep,visible } = this.state;
		return(
			<div>
				
		 	</div>
			)
	}
}