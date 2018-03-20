import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,DatePicker,Select,Steps,Icon,Modal,notification,Spin   } from 'antd';
import styles from '../../utils/utils.less'
import ustyle from '../Profile/AdvancedProfile.less';
import { getToken } from '../../utils/Global';
import  AddGoodsModal  from './AddGoodsModal';

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
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);
// class EditableCell extends Component {
//   state = {
//     value: this.props.value,
//     editable: false,
//     backValue: this.props.value,
//   }
//   handleChange = (e) => {
//     const value = e.target.value;
//     const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
//     if ((!isNaN(value) && reg.test(value))) {
//       this.setState({ value });
//     }
//   }
//   check = () => {
//     this.setState({ editable: false });
//     if (this.props.onChange) {
//       this.props.onChange(this.state.value);
//     }
//   }
//   close = () => {
//     this.setState({ editable: false, value:this.state.backValue});
//   }
//   edit = () => {
//     this.setState({ editable: true });
//   }
//   render() {
//     const { value, editable } = this.state;
//     return (
//       <div className={ustyle.editableCell}>
//         {
//           editable ?
//             <div className={ustyle.editableCIW}>
//               <Input
//                 value={value}
//                 onChange={this.handleChange}
//                 onPressEnter={this.check}
//                 style={{width:'85%'}}
//               />
//               <Icon
//                 type="check"
//                 className={ustyle.editableCIC}
//                 onClick={this.check}
//               />
//               <Icon type="close"
//                 className={ustyle.editableCIE}
//                 onClick={this.close}
//               />
//             </div>
//             :
//             <div className={ustyle.editableCTW}>
//               {value || ' '}
//               <Icon
//                 type="edit"
//                 className={ustyle.editableCI}
//                 onClick={this.edit}
//               />
//             </div>
//         }
//       </div>
//     );
//   }
// }
function onChangeDate(date, dateString) {
  console.log(date, dateString);
}
@connect(({ addPurOrder, loading }) => ({
  addPurOrder,
  loading: loading.models.addPurOrder,
}))
@Form.create()
export default class NewPurOrder extends Component {
	state = {
		visible: false,
		selectedRowKeys : [],
		purList : {
			pagination : {
				pageSize :10
			},
			purDataSource : []
		},
		loading : false,
    btnDisabled: false,
	}
	showModal = () => {
	    this.setState({
	      visible: true,
        btnDisabled: false,
	    });
	  }
	  handleOk = (arr) => {
	  	const { purList, purList:{ purDataSource } } = this.state;
	  	var data = [...purDataSource];
	  	arr.forEach((val,i)=>{
	      if (val !== undefined) {
	        data.push(...val);

	      }
	    });
	  	//添加空sendtype
  		// data.forEach((item,index)=>{

  		// });
  		data = data.map((item,index)=>{
  			item['sendtype'] = this.getSendType(item);
  			return {
  				...item,
  				goodsid : item.id
  			}
  		})

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
				pageSize:5
			}
		});
		this.showModal();
	}
	getSendType = (item) =>{
		if (item.ifXG) {
	  		return  '1'
	  	}else if (item.ifHW) {
	  		return  '2'
	  	}else if (item.ifBS) {
	  		return  '3'
	  	}else if (item.ifMY) {
	  		return  '4'
	  	}
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
  edit(key) {
    const newData = [...this.state.purList.purDataSource];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({purDataSource : newData});
    }
  }
  save(key) {
    const newData = [...this.state.purList.purDataSource];
    const target = newData.filter(item => key === item.id)[0];
    // if (target) {
    //   this.props.dispatch({
    //     type: 'purchasePurchasers/updatePrice',
    //     payload: {
    //       id: key,
    //       expectprice: target.expectprice,
    //       total: target.total,
    //     },
    //     callback: this.updatePriceCallback,
    //   });
    delete target.editable;
    this.setState({purDataSource : newData});
    this.cacheData = newData.map(item => ({ ...item }));
    //
    // }
  }
  del(key) {
    const { purList, purList:{ purDataSource } } = this.state;
    const newData = [...this.state.purList.purDataSource];
    newData.map(function(item, i, array){
      if(item.id===key){
        newData.splice(i,1);
      }
    });
    if(newData.length > 0){
      this.setState({
        purList : {
          ...purList,
          purDataSource : newData
        }
      })
    }
    // this.setState({purDataSource : newData});
    //
    // }
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange2(value, record.id, column)}
      />
    );
  }
  handleChange2(value, key, column) {
    const newData = [...this.state.purList.purDataSource];
    console.log(newData);
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({purDataSource : newData});
    }
  }
	render(){
		  	const { getFieldDecorator,getFieldsValue,validateFields,setFields,resetFields } = this.props.form;
		  	const { purList,visible,selectedRowKeys,loading,btnDisabled  } = this.state;
		  	const { addPurOrder:{goodsList:{ list,pagination },sendTypeDate},dispatch } = this.props;

			const purColumns = [
				{
				  title: '商品序号',
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
				},
        // {
			// 	  title: '提货方式',
			// 	  dataIndex: 'sendtype',
			// 	  key: 'sendtype',
	  	// 		  render : (text, record,index) => {
	  	// 		  		var value='';
	    	// 		  	if (record.ifXG) {
	    	// 		  		value = '香港自提'
	    	// 		  	}else if (record.ifHW) {
	    	// 		  		value = '海外自提'
	    	// 		  	}else if (record.ifBS) {
	    	// 		  		value = '保税备货'
	    	// 		  	}else if (record.ifMY) {
	    	// 		  		value = '一般贸易'
	    	// 		  	}
	    	// 		  	return(
	    	// 		  		<Select placeholder='请选择提货方式' style={{ width: '100%' }} defaultValue={value} onChange={handleChangeSendtype.bind(this,index)}>
			// 			      {sendTypeDate.map((val,index) => <Option key={index} value={val.id}>{val.typename}</Option>)}
			// 			    </Select>
	    	// 		  	)
	  	// 		  }
			// 	},
        {
				  title: '商品数量',
				  dataIndex: 'total',
				  key: 'total',
          render: (text, record) => this.renderColumns(text, record, 'total'),
				  // render: (text, record) => (
				  //         <EditableCell
				  //           value={text}
				  //           onChange={onCellChange(record.key, 'total')}
				  //         />
			       //  )
				},{
          title: '期望价格',
          dataIndex: 'expectprice',
          key: 'expectprice',
          render: (text, record) => this.renderColumns(text, record, 'expectprice'),
          // render: (text, record) => (
          //         <EditableCell
          //           value={text}
          //           onChange={onCellChange(record.key, 'expectprice')}
          //         />
          //  )
        },{
          title: '操作1',
          dataIndex: 'operate',
          key: 'operate',
          width: '8%',
          render: (text, record) => {
            const { editable } = record;
            return (
              <div className={ustyle.editableRowOperations}>
                {
                  editable ?
                    <span>
                  <a onClick={() => this.save(record.id)}>保存</a>
                    {/*<a onClick={() => this.cancel(record.id)}>取消</a>*/}
                      {/*<Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>*/}
                      {/*<a>取消</a>*/}
                      {/*</Popconfirm>*/}
                </span>
                    : <a onClick={() => this.edit(record.id)} disabled={btnDisabled}>编辑</a>
                }
              </div>
            );
          },
        },{
          title: '操作2',
          dataIndex: 'operate',
          key: 'operate',
          render:(text, record)=>
            <div>
              <a onClick={() => this.del(record.id)}>删除</a>
            </div>

        }];
			const rowSelection = {
				  selectedRowKeys,
		  		  onChange: (selectedRowKeys, selectedRows) => {
		  		    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		  		    this.setState({selectedRowKeys})
		  		    // goodsSelections=selectedRows;
		  		  }
		  	};
			const onCellChange = (key, dataIndex) => {
			    return (value) => {
			      const dataSource = [...purList.purDataSource];

			      const target = dataSource.find(item => item.key === key);
			      // console.log('target:',target);
			      console.log(dataSource);
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
	  		const handleChangeSendtype = (index,value) => {
	  			const { purList:{ purDataSource } }  = this.state;
	  			var data = [...purDataSource];
				console.log(index);
				console.log(value);
				data[index]['sendtype'] = value;
				this.setState({
					purList : {
						...purList,
						purDataSource : data
					}
				});

	  		}
	  		const changPurPage = (page, filters, sorter) =>{
	  			// console.log(page);
	  		}
	  		const savePruOrder = (btn,loading) => {
	  			const { purList:{ purDataSource } } = this.state;
	  			const { dispatch }  = this.props;
	  			const { getFieldsValue,validateFields,setFields,resetFields } = this.props.form;
	  			var data = {
	  				...getFieldsValue(),
	  				userCode : getToken().userId,
	  				stage : '9',
	  				status : '1'
	  			};
          var goodsdata = [...purDataSource];
          var goodserr1=true;
          var goodserr2=true;
          goodsdata.map(function(item, i, array){
            if(item.expectprice===undefined||item.total===undefined||item.expectprice.trim()===""||item.total.trim()===""){

              goodserr1 = false;
            }
            if(isNaN(item.expectprice)||isNaN(item.total)){
              goodserr2=false;
            }
          });
          if(!goodserr1){
            notification['error']({
              message: '采购单通知',
              description: '有商品没添加期望价格和商品数量！'
            });
            return false;
          }
          if(!goodserr2){
            notification['error']({
              message: '采购单通知',
              description: '有商品期望价格和商品数量录入不正确，请录入数字！'
            });
            return false;
          }
	  			validateFields((err,fieldsValue)=>{
	  				if(!err){
	  					this.setState({loading:true})

  						if (btn == 'submit'&& purList.purDataSource.length == 0) {
  							notification['error']({
					          message: '采购单通知',
					          description: '请添加采购单商品'
					        });
					        this.setState({loading:false});
					        return false
  						}

	  					dispatch({
	  						type:'addPurOrder/savePurOrder',
	  						payload:data,
	  						callback:(purchasesn)=>{
	  							console.log(purchasesn);
	  							//未添加goodsList
	  							if(purchasesn && purList.purDataSource.length == 0){
									notification['success']({
							          message: '采购单通知',
							          description: '创建成功'
							        });
							        this.setState({loading:false})
	  							}
	  							else if(purchasesn && purList.purDataSource.length > 0){
	  								var data2 = {
  										list : purList.purDataSource.map((item,index)=>{
  											return {
  												goodsid:item.id,
  												goodsname:item.goodsname,
  												price:item.price,
  												barcode:item.barcode,
  												expectprice:item.expectprice,
                          deliverytype:data.sendtype,
                          // deliverytype:item.sendtype,
  												total:item.total
  											}
  										}),
  										purchasesn : purchasesn
  									}
		  							//添加采购单商品列表
		  							dispatch({
		  								type:'addPurOrder/addPurGoods',
	  									payload:data2,
	  									callback:(response)=>{
	  										if (response.type=='1') {
  										  	  if (btn !== undefined && btn=='save') {
  										  	  	notification['success']({
  										  	  	  message: '采购单通知',
  										  	  	  description: '创建成功',
  										  	  	});
  										  	  	this.setState({loading:false});
                              this.props.dispatch(routerRedux.push('/trade/order-p/list'));
  										  	  }else if (btn !== undefined && btn=='submit'){
  										  	  	//拆单
  										  	  	dispatch({
									  	  			type:'addPurOrder/splitPurGoods',
									  	  			payload:{
									  	  				purchasesn : purchasesn
									  	  			},
									  	  			callback:(response)=>{
									  	  				if (response.type=='1') {
									  	  					notification['success']({
			  										  	  	  message: '采购单通知',
			  										  	  	  description: '创建成功',
			  										  	  	});
									  	  				}else{
									  	  					notification['warning']({
									  	  					  message: '采购单通知',
									  	  					  description: `创建成功，${response.msg}`,
									  	  					});
									  	  				}
									  	  				this.setState({loading:false});
                                this.props.dispatch(routerRedux.push('/trade/order-p/list'));
									  	  			}
									  	  		})
  										  	  }
	  										}
	  										else{
	  										  notification['warning']({
	  										    message: '采购单通知',
	  										    description: `创建成功，商品未添加  ${response.msg}`,
	  										  });
	  										  this.setState({loading:false});
                          this.props.dispatch(routerRedux.push('/trade/order-p/list'));
	  										}
	  									}
		  							});
	  							}
	  						}
	  					})
	  				}
	  			})
	  		}
	  		const deletePruOrder = () => {
	  			const { purList } = this.state;
	  			resetFields();
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
				<Spin className={loading ? '' : styles.none} style={{position:'absolute',left:'50%',top:100,transform:'translateX(-50%)',zIndex:100}}/>
				<div>
		          <Form onSubmit={this.handleSubmit} className={styles.mB20}>
					<Row>
						<Col  xs={24} sm={12} md={8} lg={8} xl={8} >
							<FormItem
							{...formItemLayout}
							  label ='提货方式'
							>
							  {getFieldDecorator('sendtype',{rules: [{ required: true, message: '请选择提货方式' }]})(
							    <Select placeholder='请选择提货方式' style={{ width: '100%' }}>
							      {sendTypeDate.map((val,index) => <Option key={index} value={val.id}>{val.typename}</Option>)}
							    </Select>
							  )}
							</FormItem>
						</Col>

						<Col xs={24} sm={12} md={8} lg={8} xl={8}>
							<FormItem
							{...formItemLayout}
							  label ='目的地'
							>
							  {getFieldDecorator('address',{rules: [{ required: true, message: '请输入目的地' }]})(
							    <Input placeholder="目的地"/>
							  )}
							</FormItem>
						</Col>
						<Col xs={24} sm={12} md={8} lg={8} xl={8}>
							<FormItem
							{...formItemLayout}
							  label ='纳期'
							>
							  {getFieldDecorator('deliverytime',{rules: [{ required: true, message: '请输入纳期' }]})(
                  /*<Input placeholder="纳期"/>*/
                  <DatePicker onChange={onChangeDate} />
							  )}
							</FormItem>
						</Col>
						<Col xs={24} sm={12} md={8} lg={8} xl={8}>
							<FormItem
							{...formItemLayout}
							  label ='币种'
							>
							  {getFieldDecorator('currency',{rules: [{ required: true, message: '请选择币种' }]})(
							     <Select placeholder='请选择币种' style={{ width: '100%' }}>
							      <Option value='CNY人民币'>人民币(CNY)</Option>
							      <Option value='HKD港币'>港币(HKD)</Option>
							      <Option value='KRW韩元'>韩元(KRW)</Option>
							      <Option value='USD美元'>美元(USD)</Option>
							      <Option value='EUR欧元'>欧元(EUR)</Option>
							      <Option value='JPY日元'>日元(JPY)</Option>
							    </Select>
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
						rowSelection = {rowSelection}
						onChange={changPurPage}
						className={styles.mB10}
						/>
					<Row className={styles.fr}>
				  		<Button type="primary" className={styles.mR10} onClick={this.goAddGoods}>新增商品</Button>
				  		<Button className={styles.mR10} onClick={savePruOrder.bind(this,'save')}>暂存</Button>
				  		<Button className={styles.mR10} onClick={savePruOrder.bind(this,'submit')}>提交</Button>
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
							 choosenGoods={purList.purDataSource}
				 />
		 	</div>
			)
	}
}
