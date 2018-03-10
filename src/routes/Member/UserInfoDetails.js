import React, { Component } from 'react';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col, Card, Popover, Badge, Table, Tooltip, Divider,List,Modal } from 'antd';
import styles from '../../utils/utils.less'
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import styley from '../Profile/AdvancedProfile.less';

const { Description } = DescriptionList;
const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);
const breadcrumbList=[{title: '用户信息',href:'/member/info/list'},{title: '用户详情',}];
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

@connect(({ member, loading }) => ({
  member,
  submitting: loading.effects['member/details'],
}))

export default class UserInfoDetails extends Component {
  state = {
    currentUser: {},
    operationkey: 'tab1',
    stepDirection: 'horizontal',
    previewVisible: false,
    previewImage: {},
  }


  componentDidMount() {
    this.props.dispatch({
      type: 'member/details',
      payload: {
        userid: this.props.match.params.id,
      },
      callback: this.onGetUserCallback,
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

  onGetUserCallback = (params) => {
    const { formValues,pagination } = this.state;
    const { dispatch } = this.props;
    this.setState({
      currentUser: params,
    });
  }

  showImg = (i) => {
    setTimeout(() => {
      this.setState({
        previewVisible: true,
        previewImage: i,
      });
    }, 0);
  }

  handleCancelPreview = () => {
    this.setState({ previewVisible: false });
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
    const { stepDirection, currentUser,previewVisible,previewImage } = this.state;
    const { profile, loading } = this.props;

    const userType = [' ', '供应商', '采购商','采购商 ','采购商 ', '客服'];
    const userStatus = [' ', '系统账号', '未提交资料','待审核 ','已通过审核'];
    const flagMap = ['error','processing'];
    const flag = ['冻结','使用中'];



    // const { advancedOperation1, advancedOperation2, advancedOperation3 } = profile;
    const contentList = {
      // tab1: <Table
      //   pagination={false}
      //   loading={loading}
      //   dataSource={}
      //   columns={columns}
      // />,
      // tab2: <Table
      //   pagination={false}
      //   loading={loading}
      //   dataSource={}
      //   columns={columns}
      // />,
      // tab3: <Table
      //   pagination={false}
      //   loading={loading}
      //   dataSource={}
      //   columns={columns}
      // />,
    };
    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styley.textSecondary}>用户状态</div>
          <div className={styley.heading}>{currentUser.verifycode==="-1"?"未通过审核":userStatus[currentUser.verifycode*1]}</div>
        </Col>
      </Row>
    );

    const cardData = [
      {
        title: '营业执照',
        // data: (currentUser.img1 !==null && currentUser.img1 !=="")?<div style={{ position: 'relative' }}><img src={currentUser.img1} style={{ width: '250px',height:'250px' }}></img><Button onClick={()=>this.showImg(currentUser.img1)} type="primary" shape="circle" icon="eye" size="default" style={{ position: 'absolute',right:'2px' }}/></div>:"无营业执照照片",
        data: (currentUser.img1 !==null && currentUser.img1 !=="")?<img src={currentUser.img1} style={{ width: '250px',height:'320px' }} onClick={()=>this.showImg(currentUser.img1)}></img>:"无营业执照照片",
      },
      {
        title: '组织机构代码证',
        // data: (currentUser.img2 !==null && currentUser.img2 !=="")?<div style={{ position: 'relative' }}><img src={currentUser.img2} style={{ width: '250px',height:'250px' }}></img><Button onClick={()=>this.showImg(currentUser.img2)} type="primary" shape="circle" icon="eye" size="default" style={{ position: 'absolute',right:'2px' }}/></div>:"无组织机构代码证照片",
        data: (currentUser.img2 !==null && currentUser.img2 !=="")?<img src={currentUser.img2} style={{ width: '250px',height:'320px' }} onClick={()=>this.showImg(currentUser.img2)}></img>:"无组织机构代码证照片",
      },
      {
        title: '税务登记证',
        // data: (currentUser.img3 !==null && currentUser.img3 !=="")?<div style={{ position: 'relative' }}><img src={currentUser.img3} style={{ width: '250px',height:'250px' }}></img><Button onClick={()=>this.showImg(currentUser.img3)} type="primary" shape="circle" icon="eye" size="default" style={{ position: 'absolute',right:'2px' }}/></div>:"无税务登记证照片",
        data: (currentUser.img3 !==null && currentUser.img3 !=="")?<img src={currentUser.img3} style={{ width: '250px',height:'320px' }} onClick={()=>this.showImg(currentUser.img3)}></img>:"无税务登记证照片",
      },
      {
        title: '三证合一',
        // data: (currentUser.three !==null && currentUser.three !=="")?<div style={{ position: 'relative' }}><img src={currentUser.three} style={{ width: '250px',height:'250px' }}></img><Button onClick={()=>this.showImg(currentUser.three)} type="primary" shape="circle" icon="eye" size="default" style={{ position: 'absolute',right:'2px' }}/></div>:"无三证合一照片",
        data: (currentUser.three !==null && currentUser.three !=="")?<img src={currentUser.three} style={{ width: '250px',height:'320px' }} onClick={()=>this.showImg(currentUser.three)}></img>:"无三证合一照片",
      },
    ];

    const description = (
      <DescriptionList className={styles.headerList} size="large" col="4">
        <Description term="账号状态"><Badge status={flagMap[currentUser.flag]} text={flag[currentUser.flag]} /></Description>
        <Description term="最后登录">{currentUser.lasttime}</Description>
      </DescriptionList>
    );
    return (
      <PageHeaderLayout
        title={currentUser.usercode}
        logo={<img alt="" src={currentUser.avatar} />}
        content={description}
        extraContent={extra}
        breadcrumbList={breadcrumbList}
      >

        <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="用户类型">{userType[currentUser.usertype*1]}</Description>
            <Description term="公司名称">{currentUser.company}</Description>
            <Description term="邮箱">{currentUser.email}</Description>
            <Description term="联系人">{currentUser.contact}</Description>
            <Description term="电话">{currentUser.tel}</Description>
          </DescriptionList>

          <Card type="inner" title="上传材料">
            <List
              grid={{ gutter: 16,xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4 }}
              dataSource={cardData}
              renderItem={item => (
                <List.Item>
                  <Card title={item.title}>{item.data}</Card>
                </List.Item>
              )}
            />
          </Card>
        </Card>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelPreview}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
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
