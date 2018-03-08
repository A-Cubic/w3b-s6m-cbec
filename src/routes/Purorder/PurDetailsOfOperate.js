import React, { Component,Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider,Input,notification,message,Modal } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from '../Profile/AdvancedProfile.less';
import ustyle from '../../utils/utils.less';
import moment from 'moment';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const Search = Input.Search;

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
    operationkey: 'tab1',
    stepDirection: 'horizontal',
    searchDisable:true,
    waybillfeeValue:'',
    goodsSum:'0.00',
    listGoods: [],
    totalPrice:'0.00',
    loading: false,
    visible: false,
    content: '',
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

    this.setState({
      waybillfeeValue: fee,
      listGoods:params.list,
      goodsSum:sum,
      totalPrice: price===0?'0.00':price,
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

  onOperationTabChange = (key) => {
    this.setState({ operationkey: key });
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
    });
  }
  handleBtnOnChange = (e) => {
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
      // notification.error({
      //   message: "提示",
      //   description: msg,
      // });
    }else {
      message.success(msg);
      // notification.success({
      //   message: "提示",
      //   description: msg,
      // });
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
          type: 'purchaseOperate/updatePrice',
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
      type: 'purchaseOperate/supplyList',
      payload: {
        purchasesn: record.purchasesn,
        goodsid: record.goodsid,
      },
    });
  }

  handleModalOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleModalCancel = () => {
    this.setState({ visible: false });
  }
  handleUpdateSupplyFlag = (record) => {
    // console.log(record);
    this.props.dispatch({
      type: 'purchaseOperate/updateSupplyFlag',
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

  render() {
    const { stepDirection, searchDisable, waybillfeeValue, totalPrice, visible, loading, content } = this.state;
    const { purchaseOperate: { listGoods, paginationGoods, purchase, supplyList }, submitting }  = this.props;

    const menu = (
      <Menu>
        <Menu.Item key="1">选项一</Menu.Item>
        <Menu.Item key="2">选项二</Menu.Item>
        <Menu.Item key="3">选项三</Menu.Item>
      </Menu>
    );

    const action = (
      <div>
        <ButtonGroup>
          <Button>操作</Button>
          <Button>操作</Button>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button><Icon type="ellipsis" /></Button>
          </Dropdown>
        </ButtonGroup>
        <Button type="primary">主操作</Button>
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

    const operationTabList = [{
      key: 'tab1',
      tab: '操作日志一',
    }, {
      key: 'tab2',
      tab: '操作日志二',
    }, {
      key: 'tab3',
      tab: '操作日志三',
    }];

    const columns = [{
      title: '操作类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '操作人',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '执行结果',
      dataIndex: 'status',
      key: 'status',
      render: text => (
        text === 'agree' ? <Badge status="success" text="成功" /> : <Badge status="error" text="驳回" />
      ),
    }, {
      title: '操作时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    }, {
      title: '备注',
      dataIndex: 'memo',
      key: 'memo',
    }];

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
        title: '商品数量',
        dataIndex: 'total',
        key: 'total',
        width: '10%',
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
      },{
        title: '期望价格',
        dataIndex: 'expectprice',
        key: 'expectprice',
        width: '10%',
      },{
        title: '实际价格',
        dataIndex: 'realprice',
        key: 'realprice',
        width: '10%',
        render: (text, record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.id, 'realprice')}
          />
        ),
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '8%',
        render: (text, record) => (
          <div>
            <Button type="primary" size="small" ghost onClick={()=>{this.showModal(record)}} >
              反馈
            </Button>
          </div>
          // <Fragment>
          //   {/*<Link to={`/trade/order-o/info/${record.purchasesn}`}>编辑</Link>*/}
          //   {/*<Divider type="vertical" />*/}
          //   <Link to={`/trade/order-o/info/${record.purchasesn}`}>反馈</Link>
          // </Fragment>
        ),
      }];

    const contentList = {
      // tab1: <Table
      //   pagination={false}
      //   loading={loading}
      //   dataSource={advancedOperation1}
      //   columns={columns}
      // />,
      // tab2: <Table
      //   pagination={false}
      //   loading={loading}
      //   dataSource={advancedOperation2}
      //   columns={columns}
      // />,
      // tab3: <Table
      //   pagination={false}
      //   loading={loading}
      //   dataSource={advancedOperation3}
      //   columns={columns}
      // />,
    };

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
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => (
          <div>
            <Button type="primary" size="small" ghost onClick={()=>{this.handleUpdateSupplyFlag(record)}} >
              敲定
            </Button>
          </div>
        ),
      }];

    return (
      <PageHeaderLayout
        title={`采购单号：${purchase.purchasesn}`}
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
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
            <Search addonBefore="运费："
                    placeholder="请填写运费"
                    enterButton={searchDisable?"修改":"确定"}
                    size="large"
                    style={{width:'30%'}}
                    disabled={searchDisable}
                    onSearch={this.handleBtnOnChange}
                    onChange={this.handleWaybillfeeOnChange}
                    value={waybillfeeValue}/>
          </div>
        </Card>
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[this.state.operationkey]}
        </Card>
        <Modal
          visible={visible}
          style={{top: 20}}
          width="60%"
          title="供应商反馈列表"
          footer={[
            <Button key="back" onClick={this.handleModalCancel}>关闭</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleModalOk}>
              发送
            </Button>,
          ]}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel} >
          <Table dataSource={supplyList}
                 columns={supplyColumns}
                 pagination={false}
                 rowKey={record => record.id}
                 loading={submitting}/>
          {content}
        </Modal>
      </PageHeaderLayout>
    );
  }
}
