import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs,List  } from 'antd';
import styles from './bulkSupplyGeneralPage.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";
import { spawn } from 'child_process';
import PageHeaderWrapper from '../../components/PageHeader';
import TagSelect from '../../components/TagSelect';
import Ellipsis from '../../components/Ellipsis';
import StandardFormRow from '../../components/StandardFormRow';


const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
@connect(({roleSupplierBus }) => ({
  roleSupplierBus
}))

@Form.create()
// 供应商 - 商品管理 -批量供货 -一件代发 -铺货
export default class bulkSupplyGeneralPage extends Component {
  state={
    formValues:{}
  }
  init(){
    this.props.dispatch({
      type:'roleSupplierBus/getSelectSupplyGoodsListData',
      payload:{
        type:'批量供货',
      }
    })
    
  }
  componentDidMount() {
    this.init();
  }
  callback=(index) => {
    this.props.dispatch({
      type:'roleSupplierBus/getSelectSupplyGoodsListData',
      payload:{
        type:index,
      }
    })
  }
  //跳转链接传参
  handleStatus=(item) => {
    //console.log('item',item)
    const getdata = {purchasesn:item.purchasesn,status:item.offerstatus}
    this.props.dispatch(routerRedux.push('/quotationManagement/commodityGeneralPage/' +  JSON.stringify(getdata)  ));
  } 

 
  //翻页
  changePage(page){
    const { roleSupplierBus:{bulkSupplyGeneralPage,bulkSupplyGeneralPage:{classification,upperShelf,tableData:{type,flag,catelog1,selectSupplyGoodsItems,pagination}}} } = this.props;
    //console.log('条件',this.state.formValues.select)
    //a 指搜索内容
    const a = {
     select:this.state.formValues.select
    }
    this.props.dispatch({
      type:'roleSupplierBus/getSelectSupplyGoodsListData',
      payload: {
        type,
        current:page,
        pageSize:pagination.pageSize,
        catelog1:classification,
        flag:upperShelf,
        ...a
      },
    });
  }

  // 切换分类
  handleCategory = (item,index) => {
    const { roleSupplierBus:{bulkSupplyGeneralPage,bulkSupplyGeneralPage:{upperShelf,classification,tableData:{type,flag,catelog1,selectSupplyGoodsItems,pagination}}} } = this.props;
    this.props.dispatch({
      type:'roleSupplierBus/getSelectSupplyGoodsListData',
      payload: {
        catelog1:item,
        type,
        flag:upperShelf
      },
    });
  }

    // 切换上架
    handleCategoryUpperShelf = (item) =>{
      const { roleSupplierBus:{bulkSupplyGeneralPage:{classification,tableData:{type,flag,catelog1,selectSupplyGoodsItems,pagination}}} } = this.props;
      this.props.dispatch({
        type:'roleSupplierBus/getSelectSupplyGoodsListData',
        payload: {
          catelog1:classification,
          type,
          flag:item
        },
      });
     
    }

    //查询
    onSearch=(e)=>{
      const { roleSupplierBus:{bulkSupplyGeneralPage:{classification,upperShelf,tableData:{flag,type,catelog1,selectSupplyGoodsItems,pagination}}} } = this.props;
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (err) return;
        const rangeValue = fieldsValue['date'];
        const values = rangeValue==undefined ? {
          ...fieldsValue,
        }:{
          ...fieldsValue,
          'date': rangeValue==''?[]:[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
  
        this.setState({
          formValues: values,
        });
    
        this.props.dispatch({
          type:'roleSupplierBus/getSelectSupplyGoodsListData',
          payload: {
            ...values,
            catelog1:classification,
            type,
            flag:upperShelf
          },
        });
      });
    }
    //清空
    handleFormReset =()=>{
      this.props.form.resetFields();
      this.setState({
        formValues: {},
        sortedInfo: null,
      });
      //this.init();
      const { roleSupplierBus:{bulkSupplyGeneralPage,bulkSupplyGeneralPage:{classification,upperShelf,tableData:{type,flag,catelog1,selectSupplyGoodsItems,pagination}}} } = this.props;
      this.props.dispatch({
        type:'roleSupplierBus/getSelectSupplyGoodsListData',
        payload:{
          type:type,
        }
      })
    }

    renderForm(){
      const { roleSupplierBus:{bulkSupplyGeneralPage:{classification,tableData:{type,flag,catelog1,selectSupplyGoodsItems,pagination}}} } = this.props;
      const { getFieldDecorator } = this.props.form;
  
      return (
        <Form onSubmit={this.onSearch} layout="inline" style={{marginTop:'-38px'}}>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={10} sm={24}>
              <FormItem label="在结果中搜索：">
                {getFieldDecorator('select')(
                  <Input style={{ width: '100%' }}  placeholder="请输入商品编码、商品名称或品牌进行查询" />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>清空</Button>
            </Col>
          </Row>
          <Divider dashed />
          <Row>
            <div style={{ overflow: 'hidden',fontSize:16 }}>
              <div style={{ float: 'right' }}>
                <span>共查询出：{selectSupplyGoodsItems?pagination.total:0}个商品，</span>
              </div>
            </div>        
          </Row>
        </Form>
      );
    }


  render() {
   const { roleSupplierBus:{bulkSupplyGeneralPage,bulkSupplyGeneralPage:{classification,upperShelf,tableData:{type,flag,catelog1,selectSupplyGoodsItems,pagination}}} } = this.props;
  // console.log(7777777,bulkSupplyGeneralPage) 
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    // const {
    //   selectSupplyGoodsItems: { selectSupplyGoodsItems = [] },
    // } = this.props;
    //const { getFieldDecorator } = form;
    const { getFieldDecorator } = this.props.form;
    const cardList =  (
      <List
        style={{ textAlign: 'center' ,background:'#fff' ,padding:'20px' }}
        rowKey="id"
        //oading={loading}
        grid={{ gutter: 12, xl: 6, lg: 4, md: 3, sm: 2, xs: 1 }}
        dataSource={selectSupplyGoodsItems}
        pagination={{
          onChange: (page) => {
            this.changePage(page)
          },
          onShowSizeChange: (current, pageSize) => {
            const { roleSupplierBus:{bulkSupplyGeneralPage,bulkSupplyGeneralPage:{classification,upperShelf,tableData:{type,flag,catelog1,selectSupplyGoodsItems,pagination}}} } = this.props;
            //a 指搜索内容
            const a = {
              select:this.state.formValues.select
            }
            
            this.props.dispatch({
              type:'roleSupplierBus/getSelectSupplyGoodsListData',
              payload: {
                pageSize,        
                type,
                catelog1:classification,
                flag:upperShelf,
                ...a,
               
              },
            });
           },
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        renderItem={item => (
          <List.Item>
            <Link target="_blank" to={`/goodsDetails/${item.barcode}`}>
              <Card
                className={styles.card}
               
                hoverable
                cover={<img style={{padding: 20}} alt={item.goodsName} src={item.slt} />}
              >
                <Card.Meta
                   
                  description={
                    <div >
                      <Ellipsis style={{height:'50px'}} lines={2}>{item.name}</Ellipsis>
                      <Ellipsis  className={styles.ellipsis} lines={2}>￥{item.price}</Ellipsis>
                    </div>
                  }
                />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    ) 

    return (
      <div >
        <Card bordered={false}>
          <Tabs  type="line" style={{marginBottom:'10px'}} onChange={this.callback}>
            <TabPane tab="批量供货" key="批量供货">
            </TabPane>
            <TabPane tab="一件代发" key="一件代发">
            </TabPane>
            <TabPane tab="铺货" key="铺货">
            </TabPane>
          </Tabs>
         
        
        </Card>
    
        <div className={styles.coverCardList} style={{marginTop:'-50px'}} >
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="商品类别:" block style={{ paddingBottom: 11 }}>

                  <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect hideCheckAll expandable style={{background:'none'}}>
                      {
                        catelog1.map((item,index) =>
                        (
                          
                          item===classification?(
                            <TagSelect.Option
                              backgroudColor="#1890ff"
                              fontColor="#fff"
                              key={index}
                              value={item}
                            >
                              <span
                                style={{display:'inline-block'}}
                                onClick={() => this.handleCategory(item)}
                              >
                                {item}
                              </span>
                            </TagSelect.Option>
                            ):(
                            <TagSelect.Option
                              backgroudColor="#fff"
                              fontColor="#1890ff"
                              key={index}
                              value={item}
                            >
                              <span
                                style={{display:'inline-block'}}
                                onClick={() => this.handleCategory(item)}
                              >
                                {item}
                              </span>
                            </TagSelect.Option>
                          )

                        ))
                      }

                    </TagSelect>
                  )}
                </FormItem>


              </StandardFormRow>
              <StandardFormRow title="上架状态:" block style={{ }}>


                <FormItem>
                  {getFieldDecorator('Brand')(
                    <TagSelect hideCheckAll expandable>
                      {
                        flag.map((item,index) =>
                        (
                          item===upperShelf?(
                           <TagSelect.Option
                             backgroudColor="#1890ff"
                             fontColor="#fff"
                             key={index}
                             value={index}
                           >
                            <span
                              onClick={() => this.handleCategoryUpperShelf(item)}
                            >
                              {item}
                            </span>
                           </TagSelect.Option>
                           ):(
                           <TagSelect.Option
                             backgroudColor="#fff"
                             fontColor="#1890ff"
                             key={index}
                             value={index}
                           >
                            <span
                              onClick={() => this.handleCategoryUpperShelf(item)}
                            >
                              {item}
                            </span>
                           </TagSelect.Option>
                         )
                        ))
                      }

                    </TagSelect>
                  )}
                </FormItem>

              </StandardFormRow>
            </Form>
            
          </Card>
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                {this.renderForm()}
              </div>
            </div>          
            {/* {this.renderForm()}              */}
          </Card>
          <div className={styles.cardList} style={{marginTop:'12px'}}>
            {cardList}
          </div>
        </div>


      </div>
    );
  }
}

