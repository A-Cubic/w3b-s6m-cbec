import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button,Upload, Alert, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';
import {notification} from "antd/lib/index";
import {getToken} from "../../../utils/Global";
const userId = getToken().userId;
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

  componentDidMount() {
    const {match,dispatch}=this.props;
    const that = this
    this.props.dispatch({
      type:'goods/checkStepStatusIn',
      payload:{
        userId:userId,
        logId:match.params.id,
        status:'1'
      },
      callback:function () {
          console.log('a',that.props)
          dispatch({
            type:'goods/step3supplement',
            payload:{
              userId:userId,
              logId:match.params.id
            }
          })
      }
    })


  }
  render() {
    const { form, dispatch, submitting,step3supplementData } = this.props;
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
            {step3supplementData.log}
            {/*您共上传了{`${this.state.num1}`}个SKU，正在审核中 ...*/}
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
  submitting: loading.effects['goods/step2Upload'],
  step3supplementData: goods.step3supplementData,
}))(Step3);
