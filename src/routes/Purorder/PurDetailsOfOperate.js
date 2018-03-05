import React, { Component } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col, Steps, Card, Popover, Badge, Table, Tooltip, Divider } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from '../Profile/AdvancedProfile.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

const breadcrumbList = [{
  title: '采购单管理',
  href: '/trade/order-o/list',
}, {
  title: '采购单详情',
}];

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
      <div className={styles.heading}>询价中</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>总金额</div>
      <div className={styles.heading}>¥ 568.08</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="创建人">330120128@qq.com</Description>
    <Description term="创建时间">2018-03-06 12:32:57</Description>
    <Description term="取货方式">一般贸易</Description>
    <Description term="目的地">重庆保税区</Description>
    <Description term="纳期">2018年4月</Description>
    <Description term="币种">RMB</Description>
    <Description term="备注">请于两个工作日内确认</Description>
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

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>耗时：2小时25分钟</div>
  </div>
);

const customDot = (dot, { status }) => (status === 'process' ? (
  <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
    {dot}
  </Popover>
) : dot);

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
    title: '成本价',
    dataIndex: 'costprice',
    key: 'costprice',
  },{
    title: '其他费用',
    dataIndex: 'otherprice',
    key: 'otherprice',
  },{
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render: (text, record) => (
      <Fragment>
        <Link to={`/trade/order-o/info/${record.purchasesn}`}>处理</Link>
      </Fragment>
    ),
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
      pageSize: 10,
    },
    operationkey: 'tab1',
    stepDirection: 'horizontal',
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
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
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
    const { stepDirection } = this.state;
    const { purchaseOperate: { listGoods, paginationGoods }, submitting }  = this.props;

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
        title="采购单号：234231029431"
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        action={action}
        content={description}
        extraContent={extra}
        breadcrumbList={breadcrumbList}
      >
        <Card title="询价进度" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot={customDot} current={1}>
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
                 loading={submitting}/>
        </Card>
        <Card title="用户近半年来电记录" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />暂无数据
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
