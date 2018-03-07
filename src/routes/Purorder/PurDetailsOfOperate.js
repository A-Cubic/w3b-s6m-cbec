import React, { Component,Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider,Input,notification } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from '../Profile/AdvancedProfile.less';
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
    this.setState({
      waybillfeeValue: params.waybillfee,
    });
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
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      this.setState({
        waybillfeeValue: value,
      });
    }
  }

  updateFeeCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      notification.error({
        message: "提示",
        description: msg,
      });
    }else {
      notification.success({
        message: "提示",
        description: msg,
      });
    }
  }


  tableFooterSum = (params) => {
    return (
      <div style={{textAlign:'right',fontWeight:'600'}}>总计：{params.length?params[0].sum:'0.00'}</div>
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

  render() {
    const { stepDirection, searchDisable, waybillfeeValue, goodsSum } = this.state;
    const { purchaseOperate: { listGoods, paginationGoods, purchase }, submitting }  = this.props;

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
          <div className={styles.heading}>¥ </div>
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
      },{
        title: '产品条码',
        dataIndex: 'barcode',
        key: 'barcode',
      },{
        title: '商品数量',
        dataIndex: 'total',
        key: 'total',
      },{
        title: '其他费用',
        dataIndex: 'otherprice',
        key: 'otherprice',
      },{
        title: '商品价格',
        dataIndex: 'price',
        key: 'price',
      },{
        title: '期望价格',
        dataIndex: 'expectprice',
        key: 'expectprice',
      },{
        title: '实际价格',
        dataIndex: 'realprice',
        key: 'realprice',
      },{
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => (
          <Fragment>
            <Link to={`/trade/order-o/info/${record.purchasesn}`}>编辑</Link>
            <Divider type="vertical" />
            <Link to={`/trade/order-o/info/${record.purchasesn}`}>询价</Link>
          </Fragment>
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
          <Table dataSource={listGoods}
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
      </PageHeaderLayout>
    );
  }
}
