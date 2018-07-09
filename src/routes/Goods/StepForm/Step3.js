import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button,Upload, Alert, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';
import {notification} from "antd/lib/index";

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step3 extends React.PureComponent {
  state={
    num1:'150',
  }
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;



    const onPrev = () => {
      dispatch(routerRedux.push('/goods/putaway'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <div style={{textAlign:'center',padding:'30px',maxWidth:'400px',margin:'auto'}}>
          <div style={{marginBottom:10}}>
            您共上传了{`${this.state.num1}`}个SKU，正在审核中 ...
          </div>

          <div style={{marginTop:'30px'}}>
            {/*<Button type="primary" onClick={onValidateForm} loading={submitting}>*/}
              {/*提交入库*/}
            {/*</Button>*/}
            <Button onClick={onPrev} style={{ marginLeft: 8 }}>
              返回
            </Button>
          </div>

        </div>
      </Form>
    );
  }
}

export default connect(({ goods, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: goods.step,
}))(Step3);
