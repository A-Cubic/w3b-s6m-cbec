import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,DatePicker,Select,Steps,Icon,Modal,notification  } from 'antd';
import styles from '../../utils/utils.less'
import { getToken } from '../../utils/Global';
import  AddGoodsModal  from './AddGoodsModal'

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
@connect(({ addPurOrder, loading }) => ({
  addPurOrder,
  loading: loading.models.addPurOrder,
}))
@Form.create()
export default class NewPurOrder extends Component {
	state = {
		visible: false,
		// currentStep : 0,
		purList : {
			pagination : {
				pageSize :10
			},
			purDataSource : []
		}
	}
	showModal = () => {
	    this.setState({
	      visible: true,
	    });
	  }
	  handleOk = (arr) => {
	  	const { purList, purList:{ purDataSource } } = this.state;
	  	var data = [...purDataSource,...arr];
	  	// console.log(data)
  		if(arr.length > 0){
  			this.setState({
  				purList : {
  					...purList,
  					purDataSource : data
  				}
  			})
  		}
	    this.setState({
	      visible: false,
	    });
	  }
	  handleCancel = (e) => {
	    this.setState({
	      visible: false,
	    });
	  }
	  

	goAddGoods = () =>{
		const { dispatch } = this.props;
		dispatch({
			type:'addPurOrder/goodsList',
			payload:{
				pageNumber:1,
				pageSize:10
			}
		});
		this.showModal();
	}
	componentWillMount(){
		const { addPurOrder:{ sendTypeDate },dispatch } = this.props;
		if ( sendTypeDate.length == 0 ) {
			dispatch({
				type:'addPurOrder/getSendType',
				payload:{}
			});
		}
	}
	render(){ 
		  	const { getFieldDecorator,getFieldsValue,validateFields,setFields } = this.props.form;
		  	const { purList,visible } = this.state;
		  	const { addPurOrder:{goodsList:{ list,pagination },sendTypeDate},dispatch } = this.props;
			const purColumns = [
				{
				  title: '序号',
				  dataIndex: 'id',
				  key: 'id',
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
	  		
	  		const changPurPage = (page, filters, sorter) =>{
	  			// console.log(page);
	  		}
	  		const savePruOrder = () => {
	  			const { purList:{ purDataSource } } = this.state;
	  			const { getFieldsValue,validateFields,setFields } = this.props.form;
	  			// console.log(getFieldsValue());
	  		}
	  		const deletePruOrder = () => {
	  			const { purList } = this.state;
	  			setFields({
	  				sendtype : {value:''},
	  				address : {value:''},
	  				deliverytime : {value:''},
	  				currency : {value:''},
	  				remark : {value:''},
	  			})
	  			this.setState({
	  				purList : {
	  					...purList,
	  					purDataSource : []
	  				}
	  			})
	  		}
		return(
			<div>
				<Card>
					<div>
		          <Form onSubmit={this.handleSubmit} className={styles.mB20}>
					<Row>
						<Col  xs={24} sm={12} md={8} lg={8} xl={8} >
							<FormItem
							{...formItemLayout}
							  label ='提货方式'
							>
							  {getFieldDecorator('sendtype')(
							    <Select placeholder='请选择提货方式' style={{ width: '100%' }}>
							      {sendTypeDate.map((val,index) => <Option value={val.id}>{val.typename}</Option>)}
							    </Select>
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
					
					<Table 
						dataSource={purList.purDataSource} 
						columns={purColumns} 
						pagination={purList.pagination}
						onChange={changPurPage}
						className={styles.mB10}
						/>
					<Row className={styles.fr}>
				  		<Button type="primary" className={styles.mR10} onClick={this.goAddGoods}>新增商品</Button>
				  		<Button className={styles.mR10} onClick={savePruOrder}>暂存</Button>
				  		<Button className={styles.mR10}>提交</Button>
				  		<Button onClick={deletePruOrder}>放弃</Button>
			  		</Row>
				</div>
					
				</Card>
				 <AddGoodsModal
			 				 visible={visible}
							 handleOk={this.handleOk}
							 handleCancel={this.handleCancel}
							 list={list}
							 pagination={pagination}
				 />
		 	</div>
			)
	}
}