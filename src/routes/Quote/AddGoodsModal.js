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
@connect(({ quote, loading }) => ({
  quote,
  loading: loading.models.quote,
}))
export default class AddGoodsModal extends Component {
	state = {
		pagination : {
			current : 1,
			pageSize :10
		},
		selectedRowKeys : []
	}

  // componentDidMount() {
  //   const { getFieldsValue } = this.props.form;
  //   const {  pagination } = this.state;
  //
  //   var values = getFieldsValue();
  //   var search = values.goodsId !==undefined ? values.goodsId : '' + ' '+ values.goodsnames !==undefined ?  values.goodsnames : '' ;
  //   this.getGoodsList(search,1,10)
  // }
	handleOk = (e) => {
    const {  dispatch } = this.props;
    console.log(goodsSelections);
    var data = {
      list : goodsSelections.map((item,index)=>{
        return {
          barcode:item.barcode,
          goodsid:item.id,
          goodsName:item.goodsname,
          slt:item.slt
        }
      })};
    console.log(data);
    dispatch({
      type: 'quote/insertOffer',
      payload: data,
      callback:this.onInsertOfferCallback,
    });
	}
  onInsertOfferCallback = (params) => {
    if(params.type==1){
      this.props.dispatch(routerRedux.push('/goods/quote/list'));
    }else{

    }
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
		const { dispatch, quote:{ goodsList:{ pagination } } } = this.props;
		var values = getFieldsValue();
		var search = values.goodsId !==undefined ? values.goodsId : '' + ' '+ values.goodsnames !==undefined ?  values.goodsnames : '' ;
		this.getGoodsList(search,1,10)
	}
	// resetSearch = () => {
	// 	const { resetFields } = this.props.form;
	// 	const { quote:{ goodsList:{ pagination } } } = this.props;
	// 	resetFields();
	// 	this.getGoodsList('',1,10)
	// }
	changGoodsPage = (page, filters, sorter) =>{
		console.log(page)
		const { getFieldsValue } = this.props.form;
		const values = getFieldsValue();
		this.getGoodsList('',page.current,page.pageSize)
	}
	getGoodsList(search,current,pageSize){
		this.props.dispatch({
			type:'quote/goodsList',
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
    const { quote: {goodsList : {list, pagination} }, submitting }  = this.props;
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
		// const goodsDataSource = [
		// 	{
		// 		key : '1',
		// 		id : '1',
		// 		goodsnames : '1',
		// 		price : '1',
		// 		sendtype :'1',
		// 		slt : '1',
		// 		goodsTm : '1'
		// 	},
		// 	{
		// 		key : '2',
		// 		id : '2',
		// 		goodsnames : '1',
		// 		price : '1',
		// 		sendtype : '1',
		// 		slt : '1',
		// 		goodsTm :'1'
        //
		// 	},
		// 	{
		// 		key : '3',
		// 		id : '3',
		// 		goodsnames : '1',
		// 		price : '1',
		// 		sendtype : '1',
		// 		slt : '1',
		// 		goodsTm : '1'
        //
		// 	},
		// 	{
		// 		key : '4',
		// 		id : '3',
		// 		goodsnames : '1',
		// 		price : '1',
		// 		sendtype : '1',
		// 		slt : '1',
		// 		goodsTm : '1'
        //
		// 	}
		// ]

		const rowSelection = {
			  selectedRowKeys,
	  		  onChange: (selectedRowKeys, selectedRows) => {
	  		    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	  		    this.setState({selectedRowKeys})
	  		    goodsSelections=selectedRows;
	  		  },
	  		  getCheckboxProps: record => ({
	  		    disabled: record.id === 'Disabled User',
	  		    name: record.id
	  		  })
	  	};

	return(
		<div
		  // width={"80%"}
          // title="添加采购商品"
          // visible={this.props.visible}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
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
							<Button onClick={this.handleOk}>报价</Button>
						</Col>

					</Row>

				</Form>
			</Row>
			<div>
				<Table
					dataSource={this.props.quote.goodsList.list}
					columns={goodsColumns}
					rowSelection = {rowSelection}
					pagination={this.props.quote.goodsList.pagination}
					onChange={this.changGoodsPage}
					/>

			</div>
		</div>
		)

	}
}
