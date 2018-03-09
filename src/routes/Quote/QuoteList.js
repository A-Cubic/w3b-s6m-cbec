 import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input, Button, Table,Card,Form,Row, Col,Divider,Switch  } from 'antd';
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



 @connect(({ quote, loading }) => ({
   quote,
   submitting: loading.effects['quote/list'],
 }))

@Form.create()

export default class QuoteList extends Component {
   state = {
     formValues: {
        usercode:'gongying',
     },
     pagination: {
       current: 1,
       total: 10,
       pageSize: 10,
     },
   }

   componentDidMount() {
     const { formValues, pagination } = this.state;

     this.props.dispatch({
       type: 'quote/list',
       payload: {
         ...formValues,
         ...pagination,
       },
     });
   }

   handleChangeStatus= (record) => {
     const { dispatch } = this.props;
     dispatch({
       type: 'quote/updateStatus',
       payload: {
         userid: record.id,
         flag: record.flag,
       },
       callback: this.onChangeStatusCallback,
     });
   }
   render(){
		const { getFieldDecorator } = this.props.form;
    const { quote: { list, pagination }, submitting }  = this.props;
    const columns = [{
     title: '商品条码',
     dataIndex: 'barcode',
     key: 'barcode',
    }, {
     title: '商品编号',
     dataIndex: 'goodsid',
     key: 'goodsid',
    }, {
     title: '商品名称',
     dataIndex: 'goodsName',
     key: 'goodsName',
    },{
     title: '商品报价',
     dataIndex: 'offer',
     key: 'offer',
    },{
     title: '供应商',
     dataIndex: 'company',
     key: 'company',
    },{
     title: '操作',
     dataIndex: 'operate',
     key: 'operate',
     render:(text, record)=>
       <div>
         <Link to={`/goods/quote/mod/${record.barcode}`}>编辑</Link>
         <Divider type="vertical" />
         {/*<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />*/}

         <Switch checkedChildren="使用中"
                 unCheckedChildren="冻结"
                 defaultChecked={record.flag==="0"?false:true}
                 onChange={()=>this.handleChangeStatus(record)}/>
       </div>

    }];

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
									  {getFieldDecorator('barcode')(
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
									  {getFieldDecorator('company')(
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
          <Table dataSource={list}
                 columns={columns}
                 pagination={pagination}
                 rowKey={record => record.id}
                 onChange={this.handleStandardTableChange}
                 loading={submitting}/>
				</Card>
			</div>
			)

	}
}
