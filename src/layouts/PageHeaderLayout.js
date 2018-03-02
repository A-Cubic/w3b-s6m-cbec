import React from 'react';
import { Link } from 'dva/router';
import PageHeader from '../components/PageHeader';
import styles from './PageHeaderLayout.less';
import { Button,Icon  } from 'antd';
export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <PageHeader key="pageheader" {...restProps}
                breadcrumbList={[{title: '用户信息',href:'/member/info/list'},{title: '用户详情',}]}
                linkElement={Link} />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);
