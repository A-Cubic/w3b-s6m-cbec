import React, { PureComponent, Fragment } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';
import styles from '../style.less';

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.substring(pathname.indexOf('step-form')).split('/');
    switch (pathList[1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'wait':
        return 2;
      case 'result':
        return 3;
      default:
        console.warn('找不到要跳转的路由')
        return 0;
    }
  }

  render() {
    const { match, routerData, location } = this.props;
    return (

        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="上传入库信息" />
              <Step title="补全入库信息" />
              <Step title="等待审核" />
              <Step title="审核结果" />
            </Steps>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/goods/step-form" to="/goods/step-form/info" />
              <Route render={NotFound} />
            </Switch>
          </Fragment>
        </Card>
    );
  }
}
