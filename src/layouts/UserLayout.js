import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import { Modal, Icon,Radio} from 'antd';

import DocumentTitle from 'react-document-title';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.png';
import { getRoutes } from '../utils/utils';


const copyright = <div>Copyright <Icon type="copyright" /> 2018 岂止科技（大连）有限公司 </div>;

class UserLayout extends React.PureComponent {
  state={
    CooperationVisible:false,
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '流连优选';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name}`;
    }
    return title;
  }
  showModalCooperation =(flag)=>{
    this.setState({
      CooperationVisible:!!flag,
    })
  }
  render() {
    const parent ={
      CooperationVisible:this.state.CooperationVisible,
      showModalCooperation:this.showModalCooperation,
    }
    const links = [
//   {
//   key: 'help',
//   title: '帮助',
//   href: '',
// },
      {
        key: 'privacy',
        title: '关于我们',
        href: 'http://b2b.llwell.net',
        blankTarget:true,
      }, {
        key: 'terms',
        href: 'javascript:;',
        title: '商务合作',
        onClick:this.showModalCooperation,
      }];


    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                </Link>
              </div>
              <div className={styles.desc}>不一样的跨境供货、采购、分销体验</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                )
              )}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter links={links} copyright={copyright} />
          <Cooperation
            parent={parent}
          />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;


class Cooperation extends React.Component {

  handleOk = (e) => {
    this.props.parent.showModalCooperation(false)
  }

  handleCancel = (e) => {
    this.props.parent.showModalCooperation(false)
  }

  render() {
    return (
      <div>
        <Modal
          title="商务合作"
          width={950}
          bodyStyle={{padding:0}}

          visible={this.props.parent.CooperationVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div className={styles.bg}></div>

        </Modal>
      </div>
    );
  }
}
