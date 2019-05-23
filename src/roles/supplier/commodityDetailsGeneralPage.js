import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker,Modal,Tabs ,Carousel,  } from 'antd';
import styles from './commodityDetailsGeneralPage.less';
import moment from 'moment';
import PageHeaderWrapper from '../../components/PageHeader';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";
import { spawn } from 'child_process';
import TagSelect from '../../components/TagSelect';
import DescriptionList from '../../components/DescriptionList';

const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const { Description } = DescriptionList;
@connect(({roleSupplierBus }) => ({
  roleSupplierBus
}))

@Form.create()
// 供应商 - 报价管理
export default class commodityDetailsGeneralPage extends Component {
  state={
    formValues:{}
  }
  init(){
    const {match} = this.props;
    
    this.props.dispatch({
      type:'roleSupplierBus/getSelectSupplyGoodsDetailsData',
      payload:{
        type:match.params.type,
        barcode:match.params.barcode
      }
    })
    
  }
  componentDidMount() {
    this.init();
  }
 
  //循环图片第一张

  beforeChange=(a,b)=>{
    this.props.dispatch({
      type: 'roleSupplierBus/changeShowImgR',
      payload: b,
    });
  }
  handleClickImg=(a)=>{
    this.props.dispatch({
      type: 'roleSupplierBus/clickShowImgR',
      payload: a,
    });
  }

  //点击上下架
  upAndSown= (checked) => {
    const { roleSupplierBus:{commodityDetailsGeneralPage,commodityDetailsGeneralPage:{imgone,tableData:{barcode,efficacy,flag,goodsDetailImgArr,goodsParameters,inprice,name,prices,num,slt,type,waybillfee}}} } = this.props;
    const {match} = this.props;
      this.props.dispatch({
      type: 'roleSupplierBus/getUpDownFlagDate',
      payload:{
        type:match.params.type,
        barcode:match.params.barcode,
        flag
      },
      callback: this.onChangeStatusCallback,
    });
  }
  onChangeStatusCallback = (params) => {
    const msg = params.msg;
    if(params.type==="1"){
      this.init();
      
    }else {
     notification.error({
        message: "提示",
        description: msg,
      });
    }

   
  }
  
  

  render() {
   const { roleSupplierBus:{commodityDetailsGeneralPage,commodityDetailsGeneralPage:{imgone,tableData:{barcode,efficacy,flag,goodsDetailImgArr,goodsParameters,inprice,name,prices,num,slt,type,waybillfee}}} } = this.props;
    //console.log(777777777,flag)
    
    const dataSource = [
      {
      key: '1',
      name:'商品名称(中文)',
      content: 'ISHIZAWA LABS 石泽研究所 毛孔抚子日本大米面膜 10片',
    }, {
      key: '2',
      name:'品牌',
      content: '胡彦祖',
    }, {
      key: '3',
      name:'进口国',
      content: '日本',
    }, {
      key: '4',
      name:'规格',
      content: '700g/桶',
    }, {
      key: '5',
      name:'生产商',
      content: '胡彦祖',
    }, {
      key: '6',
      name:'产品功效',
      content: '产品功效',
    }
    ];
    const columns = [
      {
        title: '商品参数',
        dataIndex: 'name',
        key: 'name',
        width:150
      },{
        title: '商品参数',
        dataIndex: 'content',
        key: 'content',
      }
    ]

  


    return (
      <div>
          <Card bordered={false}>
            <div className={styles.goodsDetails}>
              <div>
                <Row gutter={16} type="flex" align="middle">

                  <Col lg={7} md={7} sm={7} xs={24}>
                    <img style={{ width:'100%',padding:5 }} src={imgone} alt="" />
                    {/* <img style={{ width:'100%',padding:5 }} src={imgone} alt="" /> */}
                  </Col>
                  <Col lg={2} md={2} sm={2} xs={24}>
                    <Carousel
                      vertical
                      autoplay
                      slidesToShow={4}
                      initialSlide={0}
                      className={styles.carousel}
                      beforeChange={this.beforeChange}
                    >
                      {
                        // this.state.imgArr.map((item) =>
                        slt.map((item) =>
                          (
                            <div
                              key={item}
                            >
                              <img style={{ width:'100%',padding:5 }} onMouseOver={()=>this.handleClickImg(item)} onClick={()=>this.handleClickImg(item)} src={item} alt="" />
                            </div>
                          ))
                      }
                    </Carousel>
                  </Col>
                  <Col lg={13} md={13} sm={13} xs={23} offset={1}>
                    <h2>{name}</h2>
                    <h3>{efficacy}</h3>
                    <Divider dashed />
                    <DescriptionList size="small" col="1">
                     

                      {

                         type!='铺货'?
                          (<div style={{background:'#fff6e9',marginBottom:'40px', marginLeft:'16px',padding:'20px 0px 1px 15px'}}>
                            <div style={{display:'flex',marginBottom:'20px',lineHeight:'20px'}}>
                              <span style={{fontSize:'14px',}}>价钱：</span>
                              {
                                prices.map((item,index) =>
                                (
                                  <span
                                    key={index}
                                    style={{flex:'1',textAlign:'center',fontSize:'20px',color:'#f00'}}
                                  >
                                    {item}
                                  </span>
                                ))
                              }

                            </div>
                            <div style={{display:'flex',marginBottom:'20px',lineHeight:'20px'}}>
                              <span style={{fontSize:'14px',}}>数量：</span>
                              {
                                num.map((item,index) =>
                                (
                                  <span
                                    key={index}
                                    style={{flex:'1',textAlign:'center',fontSize:'20px',color:'#f00'}}
                                  >
                                    {item}
                                  </span>
                                ))
                              }

                            </div>
                          </div>):
                          <div style={{marginBottom:'40px',marginLeft:'16px'}}>
                             <span style={{fontSize:'14px',}}>价钱：</span>
                             <span style={{marginLeft:'30px',fontSize:'20px',color:'#f00'}}>{inprice}</span>
                          </div>


                        // numPrices.map((item,index) =>
                        // (
                        //   // <div
                        //   //   key={index}
                        //   // >
                        //   //   <img style={{ width:'100%',padding:5 }} src={item} alt="" />
                        //   // </div>
                        //   <div>
                        //     <Description style={{fontSize:'16px',marginBottom:'34px'}} term="价格">
                        //       <span style={{color:'#f5222d'}}>{item.price}</span>
                        //     </Description>    
                        //     <Description style={{fontSize:'16px',marginBottom:'34px'}} term="数量">
                        //       <span style={{color:'#f5222d'}}>{item.num}</span>
                        //     </Description>    
                        //   </div>
                          
                          
                        // ))
                      }


                      
                    </DescriptionList>

                    {/* <div style={{marginTop:'48px'}}><Icon type="heart" theme="twoTone" twoToneColor="#f5222d" /><span>收藏</span></div> */}

                    <div>
                      <Switch 
                        checkedChildren="上架"  
                        unCheckedChildren="下架" 
                        onChange={this.upAndSown}
                        // disabled={flag==1?true:false}
                        checked={flag==1?true:false} />
                    </div>
                  </Col>
                  {/* <Col lg={4} md={4} sm={4} xs={24}>  onClick={this.handleDownload} */   }
                  {/* <Button type="primary">加入购物车</Button> */}
                  {/* </Col> */}
                </Row>
                <Divider dashed />
                <Row gutter={16} type="flex" justify="space-around">
                  <Col lg={23} md={23} sm={23} xs={23}>
                    <Table
                      pagination={false}
                      // dataSource={dataSource}
                      dataSource={goodsParameters}
                      columns={columns}
                      bordered
                      size="middle"
                      showHeader={false}
                      title={() => '产品参数'}
                    />
                  </Col>
                </Row>
                <Divider dashed />
                <Row gutter={16} type="flex" justify="space-around">
                  <Col lg={23} md={23} sm={23} xs={23}>
                    <img style={{ width:'100%'}} src="http://llwell-b2b.oss-cn-beijing.aliyuncs.com/b2bmall/consumerNotification.jpg" alt="" />
                  </Col>
                </Row>
                <Divider dashed />
                <Row gutter={16} type="flex" justify="space-around">
                  <Col lg={23} md={23} sm={23} xs={23}>
                    {
                      goodsDetailImgArr.map((item,index) =>
                      (
                        <div
                          key={index}
                        >
                          <img style={{ width:'100%',padding:5 }} src={item} alt="" />
                        </div>
                        ))
                    }
                  </Col>
                </Row>
                <Divider dashed />
              </div>
            </div>
          </Card>,
          
       
      </div>
    );
  }
}

