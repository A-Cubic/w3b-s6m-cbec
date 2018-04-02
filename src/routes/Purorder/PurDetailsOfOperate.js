import React, { Component,Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider,Input,notification,message,Modal,Switch,Avatar } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from '../Profile/AdvancedProfile.less';
import ustyle from '../../utils/utils.less';
import moment from 'moment';
import { getToken } from '../../utils/Global';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const Search = Input.Search;
const { TextArea } = Input;
const iaClass = classNames(ustyle.speech , ustyle.left);
const ibClass = classNames(ustyle.speech , ustyle.right);
const usercode = getToken().userId;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);
const status = ['关闭', '询价', '待付款', '备货中', '已出港', '已入港', '完成', '','','暂存'];
const breadcrumbList = [{
  title: '采购单管理',
  href: '/trade/order-o/list',
}, {
  title: '采购单详情',
}];

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false,
    backValue: this.props.value,
  }
  handleChange = (e) => {
    const value = e.target.value;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value))) {
      this.setState({ value });
    }
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  close = () => {
    this.setState({ editable: false, value:this.state.backValue});
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className={ustyle.editableCell}>
        {
          editable ?
            <div className={ustyle.editableCIW}>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                style={{width:'85%'}}
              />
              <Icon
                type="check"
                className={ustyle.editableCIC}
                onClick={this.check}
              />
              <Icon type="close"
                className={ustyle.editableCIE}
                onClick={this.close}
              />
            </div>
            :
            <div className={ustyle.editableCTW}>
              {value || ' '}
              <Icon
                type="edit"
                className={ustyle.editableCI}
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

@connect(({ purchaseOperate, loading }) => ({
  purchaseOperate,
  submitting: loading.effects['purchaseOperate/goodslist'],
}))

export default class PurDetailsOfOperate extends Component {
  state = {
    pagination: {
      current: 1,
      total: 10,
      pageSize: 5,
    },
    stepDirection: 'horizontal',
    searchDisable:true,
    waybillfeeValue:'',
    goodsSum:'0.00',
    listGoods: [],
    totalPrice:'0.00',
    loading: false,
    visible: false,
    purVisible: false,
    content: '',
    purContent: '',
    sendMessage:'',
    sendPurMessage:'',
    selectedRow:{},
    chatList: [],
    purChatList: [],
    chatTitle:'聊天内容',
    btnDisabled: false,
    donebtnDisabled: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { pagination } = this.state;
    dispatch({
      type: 'purchaseOperate/goodslist',
      payload: {
        purchasesn: this.props.match.params.id,
        ...pagination,
      },
      callback:this.getGoodsCallback,
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }

  getGoodsCallback = (params) => {
    let sum = '0.00';

    if(params.list.length){
      if(params.list[0].sum){
        sum=params.list[0].sum;
      }
    }
    let fee = '';
    if(params.bean.waybillfee){
      fee = params.bean.waybillfee;
    }
    const price = fee*1+sum*1;
    let able = false;
    let able1 = false;
    // if(params.bean.status==='0' || params.bean.status==='4'){
    if(params.bean.status!=='2'){
      able = true;
    }
    if(params.bean.status!=='5'){
      able1 = true;
    }
    this.setState({
      waybillfeeValue: fee,
      listGoods:params.list,
      goodsSum:sum,
      totalPrice: price===0?'0.00':price,
      btnDisabled: able,
      donebtnDisabled: able1,
    });
  }

  updatePriceCallback = (params) => {
    // console.log(params);
    // this.setState({
    //   waybillfeeValue: params.bean.waybillfee,
    //   listGoods:params.list,
    //   goodsSum:params.list[0].sum?params.list[0].sum:'0.00',
    //   totalPrice: params.bean.waybillfee*1+params.list[0].sum*1,
    // });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
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
      type: 'purchaseOperate/goodslist',
      payload: {
        purchasesn: this.props.match.params.id,
        ...params,
      },
      callback:this.getGoodsCallback,
    });
  }
  handleBtnOnChange = (e) => {
    const { donebtnDisabled } = this.state;
    if(!donebtnDisabled){
      if(this.state.searchDisable){
        this.setState({
          searchDisable: false,
        });
      }else{
        this.props.dispatch({
          type: 'purchaseOperate/updateFee',
          payload: {
            purchasesn: this.props.match.params.id,
            waybillfeeValue: e,
          },
          callback: this.updateFeeCallback,
        });
        this.setState({
          searchDisable: true,
        });
      }
    }else{
      notification.error({
        message: "提示",
        description: '此状态不可修改运单价格',
      });
    }



  }
  handleWaybillfeeOnChange = (e) => {
    const { value } = e.target;
    const fee = this.state.waybillfeeValue;
    const total = this.state.totalPrice;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      const matchTotal = total*1-(fee*1-value*1);
      this.setState({
        waybillfeeValue: value,
        totalPrice: matchTotal,
      });
    }
  }

  updateFeeCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      message.error(msg);
    }else {
      message.success(msg);
    }
  }

  tableFooterSum = (params) => {
    return (
      <div style={{textAlign:'right',fontWeight:'600'}}>总计：{this.state.goodsSum}</div>
    );
  }

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.listGoods];
      const totalPrice = this.state.totalPrice;
      const goodsSum = this.state.goodsSum;

      const target = dataSource.find(item => item.id === key);
      var matchPrice=0;
      var matchSum =0;
      if (target) {
        if(dataIndex==="realprice"){
          matchPrice = totalPrice*1-(target[dataIndex]*1-value*1)*target["total"]*1;
          matchSum = goodsSum*1-(target[dataIndex]*1-value*1)*target["total"]*1;
          target[dataIndex] = value;
          this.props.dispatch({
            type: 'purchaseOperate/updatePrice',
            payload: {
              id: key,
              realprice: value,
            },
            callback: this.updatePriceCallback,
          });
        }else if(dataIndex==="total"){
          matchPrice = totalPrice*1-(target[dataIndex]*1-value*1)*target["realprice"]*1;
          matchSum = goodsSum*1-(target[dataIndex]*1-value*1)*target["realprice"]*1;
          target[dataIndex] = value;
          this.props.dispatch({
            type: 'purchaseOperate/updatePrice',
            payload: {
              id: key,
              total: value,
            },
            callback: this.updatePriceCallback,
          });
        }


        this.setState({ dataSource ,totalPrice:matchPrice,goodsSum:matchSum });
      }
    };
  }

  showModal = (record) => {
    this.setState({
      visible: true,
    });
    this.props.dispatch({
      type: 'purchaseOperate/supplyList',
      payload: {
        purchasesn: record.purchasesn,
        goodsid: record.goodsid,
      },
    });
  }

  handleModalCancel = () => {
    this.setState({
      visible: false,
      sendMessage: '',
      chatList:[],
      chatTitle:'聊天内容',
      selectedRow:{},
    });
  }

  handleUpdateSupplyFlag = (record) => {
    this.props.dispatch({
      type: 'purchaseOperate/updateSupplyFlag',
      payload: {
        id: record.id+'',
        flag: record.flag==='3'?'2':'3',
      },
      callback: this.UpdateSupplyFlagCallback,
    });
  }

  UpdateSupplyFlagCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      message.error(msg);
    }else {
      message.success(msg);
    }
  }

  handleSendMessage = (e) => {
    e.preventDefault();
    const { sendMessage,selectedRow } = this.state;
    if ( sendMessage.trim() === '') {
      message.warning("不能发送空白信息");
    } else if(selectedRow ==null || selectedRow.usercode==null || selectedRow.usercode=='') {
      message.warning("请选择聊天对象");
    } else {
      this.props.dispatch({
        type: 'purchaseOperate/sendChat',
        payload: {
          purchasesn: selectedRow.purchasesn,
          inquiry_id: selectedRow.id,
          content: sendMessage,
        },
        callback: this.sendChatCallback,
      });

    }
  }
  sendChatCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      message.error(msg);
    }else {
      const { selectedRow } = this.state;
      this.props.dispatch({
        type: 'purchaseOperate/listChat',
        payload: {
          purchasesn: selectedRow.purchasesn,
          inquiry_id: selectedRow.id,
        },
        callback: this.onRowClickCallback,
      });
      // message.success(msg);
      this.setState({
        sendMessage: '',
      });
    }
  }

  handleSendMessageOnChange = (e) => {
    const { value } = e.target;
    this.setState({
      sendMessage: value,
    });
  }

  onRowClick = (e) => {
    this.setState({
      chatTitle: e.usercode,
      selectedRow: e,
    });
    this.props.dispatch({
      type: 'purchaseOperate/listChat',
      payload: {
        purchasesn: e.purchasesn,
        inquiry_id: e.id,
      },
      callback: this.onRowClickCallback,
    });
  }

  onRowClickCallback = (params) => {
      this.setState({
        chatList: params.length?params:[],
      });
    setTimeout(() => {
      const div = document.getElementById("chat");
      div.scrollTop = div.scrollHeight;
    }, 0);
  }


  showPurModal = () => {
    this.setState({
      purVisible: true,
    });
    const { purchaseOperate: { purchase } }  = this.props;

    this.props.dispatch({
      type: 'purchaseOperate/listChat',
      payload: {
        purchasesn: purchase.purchasesn,
      },
      callback: this.listChatCallback,
    });

  }

  handlePurModalCancel = () => {
    this.setState({
      purVisible: false,
      sendPurMessage: '',
      purChatList:[],
    });
  }

  handleSendPurMessage = (e) => {
    e.preventDefault();
    const { sendPurMessage } = this.state;
    const { purchaseOperate: { purchase } }  = this.props;
    if ( sendPurMessage.trim() === '') {
      message.warning("不能发送空白信息");
    }  else {
      this.props.dispatch({
        type: 'purchaseOperate/sendChat',
        payload: {
          purchasesn: purchase.purchasesn,
          content: sendPurMessage,
        },
        callback: this.sendPurChatCallback,
      });
    }
  }
  sendPurChatCallback = (params) => {
    const { purchaseOperate: { purchase } }  = this.props;
    const msg = params.msg;
    if(params.type==="0"){
      message.error(msg);
    }else {
      const { selectedRow } = this.state;
      this.props.dispatch({
        type: 'purchaseOperate/listChat',
        payload: {
          purchasesn: purchase.purchasesn,
        },
        callback: this.listChatCallback,
      });
      // message.success(msg);
      this.setState({
        sendPurMessage: '',
      });
    }
  }
  listChatCallback = (params) => {
    this.setState({
      purChatList: params.length?params:[],
    });
    setTimeout(() => {
      const div = document.getElementById("purchat");
      div.scrollTop = div.scrollHeight;
    }, 0);
  }
  handleSendPurMessageOnChange = (e) => {
    const { value } = e.target;
    this.setState({
      sendPurMessage: value,
    });
  }

  submitPur = () => {
    const { purchaseOperate: { purchase } }  = this.props;
    this.props.dispatch({
      type: 'purchaseOperate/submitPur',
      payload: {
        purchasesn: purchase.purchasesn,
        status: '4',
      },
      callback: this.submitPurChatCallback,
    });
  }
  submitPurChatCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      message.error('确认采购单失败');
    }else {
      message.success('确认采购单成功');
      this.props.dispatch(routerRedux.push('/trade/order-o/list'));
    }
  }



  render() {
    const { stepDirection, searchDisable, waybillfeeValue, totalPrice, visible,purVisible, loading, content, sendMessage,chatList,chatTitle,purChatList,sendPurMessage,btnDisabled,donebtnDisabled } = this.state;
    const { purchaseOperate: { listGoods, paginationGoods, purchase, supplyList }, submitting }  = this.props;

    // const menu = (
    //   <Menu>
    //     <Menu.Item key="1">选项一</Menu.Item>
    //     <Menu.Item key="2">选项二</Menu.Item>
    //     <Menu.Item key="3">选项三</Menu.Item>
    //   </Menu>
    // );

    const action = (
      <div>
        <ButtonGroup>
          {/*<Button >操作</Button>*/}
          <Button onClick={this.showPurModal}>与采购商沟通</Button>
          {/*<Dropdown overlay={menu} placement="bottomRight">*/}
            {/*<Button><Icon type="ellipsis" /></Button>*/}
          {/*</Dropdown>*/}
        </ButtonGroup>
        <Button type="primary" onClick={this.submitPur} disabled={btnDisabled}>确认采购单</Button>
      </div>
    );

    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>{status[purchase.stage]}</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>总金额</div>
          <div className={styles.heading}>¥ {totalPrice}</div>
        </Col>
      </Row>
    );

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="创建人">{purchase.userCode}</Description>
        <Description term="创建时间">{moment(purchase.createtime).format('YYYY-MM-DD HH:mm:ss')}</Description>
        <Description term="取货方式">{purchase.sendtypename}</Description>
        <Description term="目的地">{purchase.address}</Description>
        <Description term="纳期">{purchase.deliverytime}</Description>
        <Description term="币种">{purchase.currency}</Description>
        <Description term="备注">{purchase.remark}</Description>
      </DescriptionList>
    );

    const desc1 = (
      <div className={styles.stepDescription}>
        <div>{moment(purchase.createtime).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
    );
    const desc2 = (
      <div className={styles.stepDescription}>
        <div>
          等待供应商反馈报价
        </div>
      </div>
    );
    const desc3 = (
      <div className={styles.stepDescription}>
        <div>
          所有商品报价确认完毕
        </div>
      </div>
    );
    const desc4 = (
      <div className={styles.stepDescription}>
        <div>
          等待采购商最后确认
        </div>
      </div>
    );
    const desc5 = (
      <div className={styles.stepDescription}>
        <div>
          询价完成，签订合同
        </div>
      </div>
    );

    const goodsColumns = [
      {
        title: '商品名称',
        dataIndex: 'goodsname',
        key: 'goodsname',
        width: '30%',
      },{
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        width: '12%',
      },{
        title: '商品数量',
        dataIndex: 'total',
        key: 'total',
        width: '10%',
        render: (text, record) => {
          if(!btnDisabled) {
            return(<EditableCell
              value={text}
              onChange={this.onCellChange(record.id, 'total')}
            />);
          }else{
            return(<div>{record.realprice}</div>);
          }
        },
      // },{
      //   title: '其他费用',
      //   dataIndex: 'otherprice',
      //   key: 'otherprice',
      //   width: '10%',
      // },{
      //   title: '商品价格',
      //   dataIndex: 'price',
      //   key: 'price',
      //   width: '10%',
      },{
        title: '期望单价',
        dataIndex: 'expectprice',
        key: 'expectprice',
        width: '10%',
      },{
        title: '实际单价',
        dataIndex: 'realprice',
        key: 'realprice',
        width: '10%',
        render: (text, record) => {
            if(!btnDisabled) {
              return(<EditableCell
                value={text}
                onChange={this.onCellChange(record.id, 'realprice')}
              />);
            }else{
              return(<div>{record.realprice}</div>);
            }
        },
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '8%',
        render: (text, record) => (
          <div>
            <Button type="primary" size="small" ghost onClick={()=>{this.showModal(record)}} disabled={btnDisabled}>
              与供应商沟通
            </Button>
          </div>
          // <Fragment>
          //   {/*<Link to={`/trade/order-o/info/${record.purchasesn}`}>编辑</Link>*/}
          //   {/*<Divider type="vertical" />*/}
          //   <Link to={`/trade/order-o/info/${record.purchasesn}`}>反馈</Link>
          // </Fragment>
        ),
      }];


    ////////////////////////////////////////////////////////////////  弹出部分  //////////////////////////////////////////////////////////////
    const supplyColumns = [
      {
        title: '报价账号',
        dataIndex: 'usercode',
        key: 'usercode',
      },{
        title: '公司名称',
        dataIndex: 'company',
        key: 'company',
      },{
        title: '商品数量',
        dataIndex: 'total',
        key: 'total',
      },{
        title: '商品单价',
        dataIndex: 'price',
        key: 'price',
      },{
        title: '敲定单价',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => (
          <Fragment>
            <Switch checkedChildren="是"
                    unCheckedChildren="否"
                    defaultChecked={record.flag==="3"?true:false}
                    onChange={()=>this.handleUpdateSupplyFlag(record)}/>
          </Fragment>
        ),
      }];


    return (
      <PageHeaderLayout
        title={`采购单号：${purchase.purchasesn}`}
        //logo={<img alt="" src="http://ecc-product.oss-cn-beijing.aliyuncs.com/back/purlogo.png" />}
        action={action}
        content={description}
        extraContent={extra}
        breadcrumbList={breadcrumbList}
      >
        <Card title="询价进度" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot current={purchase.status*1-1}>
            <Step title="创建采购单" description={desc1} />
            <Step title="处理中" description={desc2} />
            <Step title="询价结束" description={desc3} />
            <Step title="采购商确认" description={desc4} />
            <Step title="完成" description={desc5}/>
          </Steps>
        </Card>
        <Card title="商品列表" style={{ marginBottom: 24 }} bordered={false}>
          <Table dataSource={this.state.listGoods}
                 columns={goodsColumns}
                 pagination={paginationGoods}
                 rowKey={record => record.id}
                 onChange={this.handleStandardTableChange}
                 loading={submitting}
                 footer={this.tableFooterSum}/>
        </Card>
        <Card title="物流信息" style={{ marginBottom: 24 }} bordered={false}>
          <div style={{ textAlign:'center' }}>
            {
              donebtnDisabled?<div style={{fontSize:'17px'}}>运费：{waybillfeeValue}</div>
                :<Search addonBefore="运费："
                         placeholder="请填写运费"
                         enterButton={searchDisable?"修改":"确定"}
                         size="large"
                         style={{width:'30%'}}
                         disabled={searchDisable}
                         onSearch={this.handleBtnOnChange}
                         onChange={this.handleWaybillfeeOnChange}
                         value={waybillfeeValue}/>
            }
          </div>
        </Card>
        <Modal
          visible={visible}
          style={{top: 20}}
          width="60%"
          title="供应商反馈列表"
          footer={null}
          onCancel={this.handleModalCancel} >
          <Table dataSource={supplyList}
                 columns={supplyColumns}
                 pagination={false}
                 rowKey={record => record.id}
                 loading={submitting}
                 onRow = {(record) => {
                   return {
                     onClick: () => {this.onRowClick(record)},
                   };
                 }}
                 style={{maxHeight:'300px'}}/>
          <div style={{ marginBottom: 0,marginTop:20,height:'50px',border:'1px solid #F5F5F5' }}>
            <div className={ustyle.mydiv}>{chatTitle}</div>
          </div>
          <div id="chat" style={{ height:'300px',
            overflowY:'auto',
            backgroundColor:'#F5F5F5' }}>
            {
              chatList.map(function(item,i) {
                if(item.sender===usercode){
                  return (<div key={i} className={ustyle.rightd}>
                            <span className={ustyle.rightd_h}>
                              <img src={item.avatar}/>
                            </span>
                            <div className={ibClass}>
                              {item.content}
                            </div>
                          </div>);
                }else{
                  return (<div key={i} className={ustyle.leftd}>
                            <span className={ustyle.leftd_h}>
                              <img src={item.avatar}/>
                            </span>
                          <div className={iaClass}>
                            {item.content}
                          </div>
                        </div>);
                }
              })
            }
          </div>

          <div style={{position:'relative'}}>
            <TextArea
                      style={{ height:'100px',resize:'none'}}
                      onChange={this.handleSendMessageOnChange}
                      value={sendMessage}
                      onPressEnter={this.handleSendMessage}/>
            <div style={{position:'absolute',right:0,bottom:0,margin:'0 10px 10px 0'}} >
              <Button  type="primary"  onClick={this.handleSendMessage} >发送(S)</Button>
            </div>
          </div>
        </Modal>


        <Modal
          visible={purVisible}
          // style={{top: 20}}
          width="50%"
          title={purchase.userCode}
          footer={null}
          onCancel={this.handlePurModalCancel} >
          {/*<div style={{ marginBottom: 0,marginTop:20,height:'50px',border:'1px solid #F5F5F5' }}>*/}
            {/*<div className={ustyle.mydiv}>{purchase.userCode}</div>*/}
          {/*</div>*/}
          <div id="purchat" style={{ height:'300px',
            overflowY:'auto',
            backgroundColor:'#F5F5F5' }}>
            {
              purChatList.map(function(item,i) {
                if(item.sender===usercode){
                  return (<div key={i} className={ustyle.rightd}>
                            <span className={ustyle.rightd_h}>
                              <img src={item.avatar}/>
                            </span>
                    <div className={ibClass}>
                      {item.content}
                    </div>
                  </div>);
                }else{
                  return (<div key={i} className={ustyle.leftd}>
                            <span className={ustyle.leftd_h}>
                              <img src={item.avatar}/>
                            </span>
                    <div className={iaClass}>
                      {item.content}
                    </div>
                  </div>);
                }
              })
            }
          </div>

          <div style={{position:'relative'}}>
            <TextArea
              style={{ height:'100px',resize:'none'}}
              onChange={this.handleSendPurMessageOnChange}
              value={sendPurMessage}
              onPressEnter={this.handleSendPurMessage}/>
            <div style={{position:'absolute',right:0,bottom:0,margin:'0 10px 10px 0'}} >
              <Button  type="primary"  onClick={this.handleSendPurMessage} >发送(S)</Button>
            </div>
          </div>


        </Modal>
      </PageHeaderLayout>
    );
  }
}
