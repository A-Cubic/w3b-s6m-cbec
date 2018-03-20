import React, { Component,Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider,Input,Select,notification,message,Modal,Switch,Avatar } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import  AddGoodsModal  from './AddGoodsModal';
import styles from '../Profile/AdvancedProfile.less';
import ustyle from '../../utils/utils.less';
import moment from 'moment';
import { getToken } from '../../utils/Global';

const Option = Select.Option;
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
  href: '/trade/order-p/list',
}, {
  title: '采购单详情',
}];
const successMsg={message: '采购单修改',description: '修改成功'}
const errorMsg={message: '采购单修改',description: '修改失败'}
const confirmSuccessMsg={message: '采购单确认',description: '确认成功'}
const confirmErrorMsg={message: '采购单失败',description: '确认失败'}
let GoodsSelections = [];
let cacheData=[];

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

@connect(({ purchasePurchasers,addPurOrder, loading }) => ({
  purchasePurchasers,
  addPurOrder,
  submitting: loading.effects['purchasePurchasers/goodslist'],
}))

export default class ModPurOrder extends Component {
  state = {
    pagination: {
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
    basicMsg : {
      msgDisabled : true,
      userCode : '',
      createtime : '',
      sendtype : '',
      sendtypename : '',
      address : '',
      deliverytime : '',
      currency : '',
      remark : ''
    },
    addGoodsVisible:false,
    selectedRowKeys : []
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { pagination } = this.state;
    dispatch({
      type: 'purchasePurchasers/goodslist',
      payload: {
        purchasesn: this.props.match.params.id
      },
      callback:this.getGoodsCallback,
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
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

  getGoodsCallback = (params) => {
    const { basicMsg,basicMsg:{ msgDisabled } } = this.state;
    let sum = '0.00';
    let bean = params.bean;
    let list = params.list;
    list.forEach((item) => {
      sum = sum*1 + item.expectprice*1;
    });

    let fee = '';
    if(bean.waybillfee){
      fee =bean.waybillfee;
    }
    const price = fee*1+sum*1;
    let able = false;
    let msgModDisabled = msgDisabled;
    if(bean.status==='5'){
      able = true;
    }
    if (bean.stage == '9' || bean.status == '4') {
      msgModDisabled = false;
    }
    this.cacheData = params.list.map(item => ({ ...item }));
    this.setState({
      waybillfeeValue: fee,
      listGoods:params.list,
      goodsSum:sum,
      totalPrice: price===0?'0.00':price,
      btnDisabled: able,
      basicMsg : {
        msgDisabled : msgModDisabled,
        userCode : bean.userCode,
        createtime : bean.createtime,
        sendtype : bean.sendtype,
        sendtypename : bean.sendtypename,
        address : bean.address,
        deliverytime : bean.deliverytime,
        currency : bean.currency,
        remark : bean.remark
      }
    });
  }

  updatePriceCallback = (params) => {
    if (params.type=='1') {
      message.success(params.msg);
      this.macthPrice();
      // notification["success"]({
      //   message: params.msg,
      // });
    }else{
      //  notification["error"]({
      //   message: 请重新修改,
      // });
      message.error(params.msg);
    }
    /*this.setState({
      waybillfeeValue: params.bean.waybillfee,
      listGoods:params.list,
      goodsSum:params.list[0].sum?params.list[0].sum:'0.00',
      totalPrice: params.bean.waybillfee*1+params.list[0].sum*1,
    });*/
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch,purchasePurchasers:{ paginationGoods } } = this.props;
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
    this.setState({
      pagination : {
        ...this.state.pagination,
        current : pagination.current
      }
    })
    /*const oriPage = Math.ceil(paginationGoods.total/paginationGoods.pageSize);

    if (pagination.current > oriPage) {

    }else{
        dispatch({
          type: 'purchasePurchasers/goodslist',
          payload: {
            purchasesn: this.props.match.params.id,
            ...params,
          },
       });
    }*/
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

  showModal = (record) => {
    this.setState({
      visible: true,
    });
    this.props.dispatch({
      type: 'purchasePurchasers/supplyList',
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
      type: 'purchasePurchasers/updateSupplyFlag',
      payload: {
        id: record.id+'',
        flag: record.flag==='1'?'2':'1',
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
        type: 'purchasePurchasers/sendChat',
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
        type: 'purchasePurchasers/listChat',
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
      type: 'purchasePurchasers/listChat',
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
    const { purchasePurchasers: { purchase } }  = this.props;

    this.props.dispatch({
      type: 'purchasePurchasers/listChat',
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
    const { purchasePurchasers: { purchase } }  = this.props;
    if ( sendPurMessage.trim() === '') {
      message.warning("不能发送空白信息");
    }  else {
      this.props.dispatch({
        type: 'purchasePurchasers/sendChat',
        payload: {
          purchasesn: purchase.purchasesn,
          content: sendPurMessage,
        },
        callback: this.sendPurChatCallback,
      });
    }
  }
  sendPurChatCallback = (params) => {
    const { purchasePurchasers: { purchase } }  = this.props;
    const msg = params.msg;
    if(params.type==="0"){
      message.error(msg);
    }else {
      const { selectedRow } = this.state;
      this.props.dispatch({
        type: 'purchasePurchasers/listChat',
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
    const { purchasePurchasers: { purchase },dispatch }  = this.props;
    if (purchase.stage == '9') {
        //拆单
        dispatch({
        type:'addPurOrder/splitPurGoods',
        payload:{
          purchasesn : purchase.purchasesn
        },
        callback:(response)=>{
          if (response.type=='1') {
              this.submitPurOrder();
          }else{
            notification['error']({
              message: '确认失败',
              description: response.msg
            });
          }
        }
      })
    }else{
      this.submitPurOrder();
    }
  }
  submitPurOrder = () => {
    const { purchasePurchasers: { purchase },dispatch }  = this.props;
    dispatch({
        type: 'purchasePurchasers/submitPur',
        payload: {
          purchasesn: purchase.purchasesn,
          status: '2',
        },
        callback:(params)=>{
          if(params.type==="0"){
            message.error('确认失败.');
          }else {
            message.success('确认成功');
            this.props.dispatch(routerRedux.push('/trade/order-p/list'));
          }

        },
      });
  }
  passPurOrder = () => {
    const { purchasePurchasers: { purchase },dispatch }  = this.props;
      dispatch({
        type: 'purchasePurchasers/submitPur',
        payload: {
          purchasesn: purchase.purchasesn,
          status: '5',
        }
      });
    dispatch({
        type: 'purchasePurchasers/updateStage',
        payload: {
          purchasesn: purchase.purchasesn,
          stage: '2',
        },
        callback:(params)=>{
          if(params.type==="0"){
            message.error('确认失败.');
          }else {
            message.success('确认成功');
            this.props.dispatch(routerRedux.push('/trade/order-p/list'));
          }
        },
      });
  }
  submitPurChatCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      message.error('确认采购单失败');
    }else {
      message.success('确认采购单成功');
      this.props.dispatch(routerRedux.push('/trade/order-p/list'));
    }
  }
  handleChangeBasicMsg =(e,changeVal,aa) =>{
    const { basicMsg } = this.state;
    var key;
    var value;
    if (changeVal == undefined ) {
       key = e.target.getAttribute('data-id');
       value = e.target.value
    }else{
      value = aa.props.children;
      key = e;
    }
    this.setState({
      basicMsg : {
        ...basicMsg,
        [key] : value,
        sendtype:aa == undefined ? basicMsg.sendtype :  aa.props.value
      }
    })

  }
  showModal = () => {
      this.setState({
        addGoodsVisible: true,
      });
    }
  handleOk = (arr) => {
    const { listGoods,pagination } = this.state;
    const { purchasePurchasers: { purchase } }  = this.props;
    // var data = [...listGoods];
    var data = [];
    arr.forEach((val,i)=>{
      if (val !== undefined) {
        data.push(...val);
      }
    });
    data = data.map((item)=>{
      return {
        goodsid:item.id == undefined ? '' : item.id,
        goodsname: item.goodsname == undefined ? '' : item.goodsname,
        price:item.price == undefined ? '' : item.price,
        deliverytype:0,
        expectprice:0,
        total:0,
        barcode:item.barcode == undefined ? '' : item.barcode
      }
    })
    if(arr.length > 0){
       this.props.dispatch({
          type: 'purchasePurchasers/addPurNewGoods',
          payload: {
            purchasesn : purchase.purchasesn,
            list : data
          },
          callback:(params)=>{
              if (params.length>0) {
                 this.setState({
                  listGoods : params
                });
                message.success('添加成功');
              }
          }
      });
    }
    this.setState({
      addGoodsVisible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      addGoodsVisible: false,
    });
  }
  goAddGoods = () => {
    const { dispatch,addPurOrder:{goodsList:{ list }} } = this.props;
    if (list.length==0) {
        dispatch({
          type:'addPurOrder/goodsList',
          payload:{
            pageNumber:1,
            pageSize:5
          },
          callback:(params)=>{
            this.macthPrice();
          }
      });
    }
    this.showModal();
  }


  saveBasic = () =>{
    const { purchasePurchasers: { purchase },dispatch }  = this.props;
    const { basicMsg }  = this.state;
    dispatch({
      type:'purchasePurchasers/submitPur',
      payload:{
        // ...purchase,
        purchasesn : purchase.purchasesn,
        sendtype:basicMsg.sendtype,
        sendtypename:basicMsg.sendtypename,
        address:basicMsg.address,
        deliverytime:basicMsg.deliverytime,
        currency:basicMsg.currency,
        remark:basicMsg.remark,
        // waybillfee:''
      },
      callback:(params)=>{
        if (params.type=='1') {
            notification["success"](successMsg);
        }else{
          notification["error"](errorMsg);
        }
      }
    });
  }

   ////////////////////////可编辑行start//////////////////////////
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.id, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.listGoods];
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      if ((!isNaN(value) && reg.test(value))) {
        target[column] = value;
        this.setState({ listGoods: newData });
      }
    }
  }
  edit(key) {
    const newData = [...this.state.listGoods];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ listGoods: newData });
    }
  }
  macthPrice(){
    const {listGoods,totalPrice,goodsSum,waybillfeeValue} = this.state;
    let total = 0;
    let sum = 0;
    listGoods.forEach((item) => {
      sum = sum*1 + item.expectprice*1;
    });
    total = sum + waybillfeeValue*1;
    this.setState({
      goodsSum:sum,
      totalPrice:total,
    });
  }
  save(key) {
    const newData = [...this.state.listGoods];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      this.props.dispatch({
        type: 'purchasePurchasers/updatePrice',
        payload: {
          id: key,
          expectprice: target.expectprice,
          total: target.total,
        },
        callback: this.updatePriceCallback,
      });
      delete target.editable;
      this.setState({ listGoods: newData});
      const newCachaData = [...this.cacheData];
      const targetCachaData = newCachaData.filter(item => key === item.id)[0];
      Object.assign(targetCachaData, target);
      // this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  cancel(key) {
    const newData = [...this.state.listGoods];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
      delete target.editable;
      this.setState({ listGoods: newData });
      setTimeout(() => {
        let total = 0;
        let sum = 0;
        newData.forEach((item) => {
          sum = sum*1 + item.expectprice*1;
        });
        total = sum + this.state.waybillfeeValue*1;
        this.setState({
          goodsSum:sum,
          totalPrice:total,
        });
      }, 0);
    }
  }
////////////////////////可编辑行end//////////////////////////

  render() {
    const { stepDirection, searchDisable, waybillfeeValue, totalPrice, visible,purVisible, loading, content, sendMessage,chatList,chatTitle,purChatList,sendPurMessage,btnDisabled,basicMsg,basicMsg:{msgDisabled},addGoodsVisible,selectedRowKeys  } = this.state;
    const { purchasePurchasers: { listGoods, paginationGoods, purchase, supplyList }, submitting,addPurOrder:{sendTypeDate,goodsList:{ list,pagination }} }  = this.props;
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
          <Button onClick={this.showPurModal}>聊天</Button>
          <Button disabled={msgDisabled} onClick={this.saveBasic}>保存修改</Button>
          <Button disabled={msgDisabled} onClick={this.submitPur}>确认采购单</Button>
        </ButtonGroup>
          <Button className={purchase.status == '4' ? '' : ustyle.none} type='primary' onClick={this.passPurOrder}>最终确认</Button>
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
        <Description term="创建人"><Input value={basicMsg.userCode} data-id='userCode' onChange={this.handleChangeBasicMsg} disabled={true}/></Description>
        <Description term="创建时间"><Input value={moment(basicMsg.createtime).format('YYYY-MM-DD HH:mm:ss')} data-id='createtime' onChange={this.handleChangeBasicMsg} disabled={true}/></Description>
        <Description term="取货方式">
          {/*<Input value={basicMsg.sendtypename} data-id='sendtypename' onChange={this.handleChangeBasicMsg} disabled={basicMsg.msgDisabled}/>*/}
          <Select placeholder='请选择提货方式'
                  style={{ width: '100%' }}
                  value={basicMsg.sendtypename}
                  disabled={basicMsg.msgDisabled}
                  onChange={this.handleChangeBasicMsg.bind(this,'sendtypename')}>
                  {sendTypeDate.map((val,index) => <Option key={index} value={val.id}>{val.typename}</Option>)}
            </Select>
        </Description>
        <Description term="目的地"><Input value={basicMsg.address} data-id='address' onChange={this.handleChangeBasicMsg} disabled={basicMsg.msgDisabled}/></Description>
        <Description term="纳期"><Input value={basicMsg.deliverytime} data-id='deliverytime' onChange={this.handleChangeBasicMsg} disabled={basicMsg.msgDisabled}/></Description>
        <Description term="币种">
                {/*<Input value={basicMsg.currency}  onChange={this.handleChangeBasicMsg} disabled={basicMsg.msgDisabled}/>*/}
                 <Select placeholder='请选择币种'
                         value={basicMsg.currency}
                         style={{ width: '100%' }}
                         onChange={this.handleChangeBasicMsg.bind(this,'currency')}
                         disabled={basicMsg.msgDisabled}>

                  <Option value='CNY人民币'>人民币(CNY)</Option>
                  <Option value='HKD港币'>港币(HKD)</Option>
                  <Option value='KRW韩元'>韩元(KRW)</Option>
                  <Option value='USD美元'>美元(USD)</Option>
                  <Option value='EUR欧元'>欧元(EUR)</Option>
                  <Option value='JPY日元'>日元(JPY)</Option>
                </Select>
        </Description>
        <Description term="备注"><Input value={basicMsg.remark} data-id='remark' onChange={this.handleChangeBasicMsg} disabled={basicMsg.msgDisabled}/></Description>
      </DescriptionList>
    );

    const desc1 = (
      <div className={styles.stepDescription}>
        <div>2018-03-06 12:32:57</div>
      </div>
    );
    const desc2 = (
      <div className={styles.stepDescription}>
        <div>
          等待供应商回馈报价
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
        width: '40%',
      },{
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        width: '17%',
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
      },
      {
        title: '商品数量',
        dataIndex: 'total',
        key: 'total',
        width: '10%',
        render: (text, record) => this.renderColumns(text, record, 'total'),
      }, {
        title: '期望价格',
        dataIndex: 'expectprice',
        key: 'expectprice',
        width: '10%',
        render: (text, record) => this.renderColumns(text, record, 'expectprice'),
      },{
        title: '实际价格',
        dataIndex: 'realprice',
        key: 'realprice',
        width: '10%',
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '13%',
         render: (text, record) => {
          const { editable } = record;
           const { btnDisabled } = this.state;
          return (
            !btnDisabled?
            <div className={ustyle.editableRowOperations}>
              {
                editable ?
                  <span>
                  <a onClick={() => this.save(record.id)}>保存</a>
                    <a onClick={() => this.cancel(record.id)}>取消</a>
                </span>
                  : <a onClick={() => this.edit(record.id)} >编辑</a>
              }
            </div>:<div>X</div>
          );
        },
      }];
    const rowSelection = {
        selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.setState({selectedRowKeys})
            GoodsSelections = [...selectedRows];
          }
      };
      const deleteGoods = () => {
        const { dispatch } = this.props;
        var data =  [...this.state.listGoods];
        var keys = [...selectedRowKeys];

        GoodsSelections.forEach((value,index)=>{
          data.forEach((val,i)=>{
            if (value.id == val.id) {
              data.splice(i,1);
            }
          });
          keys.forEach((item,j)=>{
            if (value.goodsid == item) {
              keys.splice(j,1);
            }
          })
        });

      var idArr = GoodsSelections.map((item)=>{
        return {
          id : item.id
        }
      })
      dispatch({
        type:'purchasePurchasers/delPurGoods',
        payload:idArr,
        callback:(params) => {
          if (params.type=='1') {
             message.success('删除成功');
             this.setState({
              listGoods : data,
              selectedRowKeys : keys
            });
            setTimeout(() => {
              this.macthPrice();
            }, 0);

          }else{
             message.error('删除失败')
          }

        }
      })

      }




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
          <Button type='primary' className={ustyle.mR10} disabled={basicMsg.msgDisabled} onClick={this.goAddGoods}>添加商品</Button>
          <Button disabled={basicMsg.msgDisabled} onClick={deleteGoods}>删除</Button>
          <Table dataSource={this.state.listGoods}
                 columns={goodsColumns}
                 pagination={this.state.pagination}
                 rowKey={record => record.goodsid}
                 rowSelection={rowSelection}
                 loading={submitting}
                 footer={this.tableFooterSum}
                 className={ustyle.mT10}
                 />
        </Card>
        <Card title="物流信息" style={{ marginBottom: 24 }} bordered={false}>
          <div style={{ textAlign:'center' }}>
            <div style={{fontSize:'17px'}}>运费：{waybillfeeValue ? waybillfeeValue : '待添加'}</div>
          </div>
        </Card>


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
        <AddGoodsModal
               visible={addGoodsVisible}
               handleOk={this.handleOk}
               handleCancel={this.handleCancel}
               list={list}
               pagination={pagination}
               choosenGoods={this.state.listGoods}
         />
      </PageHeaderLayout>
    );
  }
}
