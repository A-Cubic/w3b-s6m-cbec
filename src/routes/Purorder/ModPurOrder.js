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
    if(params.list.length){
      if(params.list[0].sum){
        sum=params.list[0].sum;
      }
    }
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
        sendtypename : bean.sendtypename,
        address : bean.address,
        deliverytime : bean.deliverytime,
        currency : bean.currency,
        remark : bean.remark
      }
    });
  }

  updatePriceCallback = (params) => {
    console.log(params);
    if (params.type=='1') {
      notification["success"]({
        message: params.msg,
      });
    }else{
       notification["error"]({
        message: 请重新修改,
      });
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
  handleBtnOnChange = (e) => {
    const { btnDisabled } = this.state;
    if(!btnDisabled){
      if(this.state.searchDisable){
        this.setState({
          searchDisable: false,
        });
      }else{
        this.props.dispatch({
          type: 'purchasePurchasers/updateFee',
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

      if (target) {
        const matchPrice = totalPrice*1-(target[dataIndex]*1-value*1);
        const matchSum = goodsSum*1-(target[dataIndex]*1-value*1);
        target[dataIndex] = value;
        this.props.dispatch({
          type: 'purchasePurchasers/updatePrice',
          payload: {
            id: key,
            realprice: value,
          },
          callback: this.updatePriceCallback,
        });

        this.setState({ dataSource ,totalPrice:matchPrice,goodsSum:matchSum });
      }
    };
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
    const { purchasePurchasers: { purchase } }  = this.props;
    this.props.dispatch({
      type: 'purchasePurchasers/submitPur',
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
      this.props.dispatch(routerRedux.push('/trade/order-p/list'));
    }
  }
  handleChangeBasicMsg =(e,changeVal) =>{
    const { basicMsg } = this.state;
    var key;
    var value;

    if (changeVal == undefined ) {
       key = e.target.getAttribute('data-id');
       value = e.target.value
    }else{
      value = changeVal;
      key = e;
    }
    this.setState({
      basicMsg : {
        ...basicMsg,
        [key] : value
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
    var data = [...listGoods];
    arr.forEach((val,i)=>{
      if (val !== undefined) {
        data.push(...val);
      }
    });

    if(arr.length > 0){
     console.log(data);
      /* this.props.dispatch({
          type: 'addPurOrder/addPurGoods',
          payload: data,
          callback:(params)=>{
              console.log(params);

          }
      });*/
    }
    /*this.setState({
                listGoods : data
              })*/
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
            pageSize:10
          }
      });
    }
    this.showModal();
  }
  saveBasic = () =>{
    const { purchasePurchasers: { purchase } }  = this.props;
    dispatch({
      type:'purchasePurchasers/submitPur',
      payload:{
        purchasesn : purchase.purchasesn,
        stage:'',
        status:'',
        sendtype:'',
        address:'',
        deliverytime:'',
        currency:'',
        remark:''
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
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ listGoods: newData });
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
      this.setState({ listGoods: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.listGoods];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
      delete target.editable;
      this.setState({ listGoods: newData });
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
          {/*<Button disabled={msgDisabled}>退回询价</Button>*/}
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
        <Description term="创建人"><Input value={basicMsg.userCode} data-id='userCode' onChange={this.handleChangeBasicMsg} disabled={basicMsg.msgDisabled}/></Description>
        <Description term="创建时间"><Input value={moment(basicMsg.createtime).format('YYYY-MM-DD HH:mm:ss')} data-id='createtime' onChange={this.handleChangeBasicMsg} disabled={basicMsg.msgDisabled}/></Description>
        <Description term="取货方式">
          {/*<Input value={basicMsg.sendtypename} data-id='sendtypename' onChange={this.handleChangeBasicMsg} disabled={basicMsg.msgDisabled}/>*/}
          <Select placeholder='请选择提货方式' 
                  style={{ width: '100%' }} 
                  value={basicMsg.sendtypename} 
                  disabled={basicMsg.msgDisabled}
                  onChange={this.handleChangeBasicMsg.bind(this,'sendtypename')}>
                  {sendTypeDate.map((val,index) => <Option value={val.id}>{val.typename}</Option>)}
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
        width: '30%',
      },{
        title: '产品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        width: '12%',
      },{
        title: '其他费用',
        dataIndex: 'otherprice',
        key: 'otherprice',
        width: '10%',
      },{
        title: '商品价格',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
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
        width: '8%',
         render: (text, record) => {
          const { editable } = record;
          return (
            <div className={ustyle.editableRowOperations}>
              {
                editable ?
                  <span>
                  <a onClick={() => this.save(record.id)}>保存</a>
                    <a onClick={() => this.cancel(record.id)}>取消</a>
                </span>
                  : <a onClick={() => this.edit(record.id)} >编辑</a>
              }
            </div>
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
        var data =  [...this.state.listGoods];
        var keys = [...selectedRowKeys];
        GoodsSelections.forEach((value,index)=>{
          data.forEach((val,i)=>{
            if (value.id == val.id) {
              data.splice(i,1);
            }
          });
          keys.forEach((item,j)=>{
            if (value.key == item) {
              keys.splice(j,1);
            }
          })
        });

        this.setState({
          listGoods : data,
          selectedRowKeys : keys
        })
      }

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
        title: '商品价格',
        dataIndex: 'price',
        key: 'price',
      },{
        title: '敲定价格',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => (
          <Fragment>
            <Switch checkedChildren="是"
                    unCheckedChildren="否"
                    defaultChecked={record.flag==="2"?false:true}
                    onChange={()=>this.handleUpdateSupplyFlag(record)}/>
          </Fragment>
        ),
      }];


    return (
      <PageHeaderLayout
        title={`采购单号：${purchase.purchasesn}`}
        logo={<img alt="" src="http://ecc-product.oss-cn-beijing.aliyuncs.com/back/purlogo.png" />}
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
                 rowKey={record => record.barcode}
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
          visible={visible}
          style={{top: 20}}
          width="60%"
          title="供应商反馈列表"
          footer={null}
          onCancel={this.handleModalCancel} >
          <Table dataSource={supplyList}
                 columns={supplyColumns}
                 pagination={false}
                 rowKey={record => record.goodsid}
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
