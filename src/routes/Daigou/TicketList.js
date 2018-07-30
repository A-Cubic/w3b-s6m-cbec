 import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link, withRouter } from 'dva/router';
import { Input, Button, notification,Table,Card,Form,Row, Col,Divider,Switch  } from 'antd';
import styles from '../../utils/utils.less'
import { getToken ,getAuthority} from '../../utils/Global';


const FormItem = Form.Item;

const ticketstatus = ['新录入','处理中','处理完成','付款完成','','','','','录入错误','退回'];
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



 @connect(({ daigou, loading }) => ({
   daigou,
   submitting: loading.effects['daigou/list'],
 }))

@Form.create()

export default class TicketList extends Component {
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
       type: 'daigou/list',
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
       // console.log(values);
       dispatch({
         type: 'daigou/list',
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
       type: 'daigou/list',
       payload: params,
     });
   }

   handleChangeStatus= (record) => {
     const { dispatch } = this.props;
     dispatch({
       type: 'daigou/updateStatus',
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
       type: 'daigou/list',
       payload: {
         ...formValues,
         ...pagination,
       },
     });
   }
   render(){
		const { getFieldDecorator } = this.props.form;
    const { daigou: { list, pagination }, submitting }  = this.props;
    const columns = [{
      title: '微信编号',
      dataIndex: 'openId',
      key: 'openId',
    },
    {
      title: '小票图片',
      dataIndex: 'img',
      key: 'img',
      render : (text, record) => <img src={`${text}`} style={{width:100,height:100}}/>
    },{
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },{
        title: '小票号码',
        dataIndex: 'ticketCode',
        key: 'ticketCode',
    },{
        title: '购买商店',
        dataIndex: 'shopName',
        key: 'shopName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(val) {
        return <span>{ticketstatus[val]}</span>
      },
    },{
     title: '操作',
     dataIndex: 'operate',
     key: 'operate',
     render:(text, record)=>
       <div>
         <Link to={`/daigou/ticketmod/${record.ticketCode}`}>编辑</Link>
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
									  label ='查询内容'
									>
									  {getFieldDecorator('search')(
									  	<Input  placeholder="请输入微信编号或小票号或店铺名称" />)
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
