 import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input, Button, notification,Table,Card,Form,Row, Col,Divider,Switch  } from 'antd';
import styles from '../../utils/utils.less'
import { getToken ,getAuthority} from '../../utils/Global';


const FormItem = Form.Item;

 const b2bstatus = ['已下架', '已上架'];
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

   handleSubmit = (e) => {
     e.preventDefault();
     const { form, submitting, dispatch } = this.props;
     const { pagination } = this.state;
     form.validateFields((err, fieldsValue) => {
       if (err) return;

       const values = {
         ...fieldsValue,
       };

       this.setState({
         formValues: values,
       });
       console.log(values);
       dispatch({
         type: 'quote/list',
         payload: {
           ...values,
           ...pagination,
         },
       });
     });

   }

   handleStandardTableChange = (pagination, filtersArg, sorter) => {
     const { dispatch } = this.props;
     const { formValues } = this.state;

     const filters = Object.keys(filtersArg).reduce((obj, key) => {
       const newObj = { ...obj };
       newObj[key] = getValue(filtersArg[key]);
       return newObj;
     }, {});

     const params = {
       current: pagination.current,
       pageSize: pagination.pageSize,
       ...formValues,
       // ...filters,
     };
     if (sorter.field) {
       params.sorter = `${sorter.field}_${sorter.order}`;
     }

     dispatch({
       type: 'quote/list',
       payload: params,
     });
   }

   handleChangeStatus= (record) => {
     const { dispatch } = this.props;
     dispatch({
       type: 'quote/updateStatus',
       payload: {
         id: record.id,
         flag: record.flag,
       },
       callback: this.onChangeStatusCallback,
     });
   }
   onChangeStatusCallback = (params) => {
     const { formValues,pagination } = this.state;
     const { dispatch } = this.props;

     const msg = params.msg;
     if(params.type==="0"){
       notification.error({
         message: "提示",
         description: "报价状态切换失败，请刷新页面后重试",
       });
     }else {
       notification.success({
         message: "提示",
         description: "报价状态切换成功",
       });
     }

     dispatch({
       type: 'quote/list',
       payload: {
         ...formValues,
         ...pagination,
       },
     });
   }
   render(){
		const { getFieldDecorator } = this.props.form;
    const { quote: { list, pagination }, submitting }  = this.props;
    const columns = [{
      title: '商品编号',
      dataIndex: 'goodsid',
      key: 'goodsid',
    },
    {
      title: '图片',
      dataIndex: 'slt',
      key: 'slt',
      render : (text, record) => <img src={`${text}`} style={{width:100,height:100}}/>
    },{
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
    },{
     title: '商品条码',
     dataIndex: 'barcode',
     key: 'barcode',
    }, {
        title: '状态',
        dataIndex: 'ifB2B',
        key: 'ifB2B',
        render(val) {
          return <span>{b2bstatus[val]}</span>
        },
      },  {
     title: '商品报价',
     dataIndex: 'offer',
     key: 'offer',
    },{
     title: '操作',
     dataIndex: 'operate',
     key: 'operate',
     render:(text, record)=>
       <div>
         <Link to={`/goods/quote/mod/${record.id}`}>编辑</Link>
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
          <Form onSubmit={this.handleSubmit}>
					<Row>
							<Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
									<FormItem
									{...formItemLayout}
									  label ='商品条码'
									>
									  {getFieldDecorator('barcode')(
									  	<Input  placeholder="请输入商品条码" />)
									}
									</FormItem>
								</Col>
								<Col xs={24} sm={24} md={8} lg={8} xl={8}>
									<FormItem
									{...formItemLayout}
									  label ='商品名称'
									>
									  {getFieldDecorator('goodsName')(
									  	<Input placeholder="请输入商品名称" />)
									}
									</FormItem>
								</Col>
                <Col span={2}></Col>
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <Button type="primary"
                          className={styles.submit}
                          htmlType="submit">搜索</Button>
                </Col>
							</Row>

					</Row>
					<Row>
						<Col span={20}></Col>

					</Row>
        </Form>
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
