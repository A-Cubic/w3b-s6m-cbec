import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Input,Button,Table,Card,Form,Row,Col,Select,Upload,notification,Divider,Switch,Icon,DatePicker } from 'antd';
import styles from './consignmentStock.less';
import moment from 'moment';
import { getCurrentUrl } from '../../services/api'
import {getToken} from "../../utils/Global";

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const userId = getToken().userId;
@connect(({goodsManagement,publicDictionary, loading }) => ({
  goodsManagement,publicDictionary,
  loading: loading.effects['goodsManagement/getGoodsAboutData'],
}))

@Form.create()
export default class consignmentStock extends Component {
  state={

  }

  componentDidMount() {
  }

  render() {

    return (
      <div>

        <Card className={styles.mT10}>
          a
        </Card>
      </div>
    );
  }
}


