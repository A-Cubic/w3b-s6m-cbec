import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;

@Form.create()
class Step1 extends React.PureComponent {
  state={
    fileList:[]
  }
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'goods/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/goods/step-form/confirm'));
        }
      });
    };
    return (
      <Fragment>

        <Button type="primary" onClick={onValidateForm}>
        下一步
        </Button>
      </Fragment>
    );
  }
}

export default connect(({ goods }) => ({
  data: goods.step,
}))(Step1);
