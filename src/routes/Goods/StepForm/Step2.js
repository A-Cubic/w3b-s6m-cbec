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
class Step2 extends React.PureComponent {
  state={
    fileList:[],
    fileList2:[],
    num1:'150',
    num2:'120',
    num2:'30'
  }
  handleUploadChange=(info)=>{
    console.log('info',info)
    let fileList = info.fileList;
    this.setState({
      fileList1:info.fileList
    })

    this.props.dispatch({
      type: 'o2o/upload',
      payload: {
        fileList1:info.fileList
      },
      callback: this.onUploadCallback,
    });
    this.setState({
      fileList1:[]
    })
  }
  handleUploadChange2=(info)=>{
    console.log('info',info)
    let fileList2 = info.fileList;
    this.setState({
      fileList1:info.fileList
    })

    this.props.dispatch({
      type: 'o2o/upload',
      payload: {
        fileList2:info.fileList
      },
      callback: this.onUploadCallback,
    });
    this.setState({
      fileList2:[]
    })
  }
  onUploadCallback = (params) => {
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
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const url = 'http://192.168.0.109:51186/llback/O2O/UploadOrder'
    const props = {
      action: url,
      listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange,
      multiple: false,
      customRequest:this.upload,
    };

    const url2 = 'http://192.168.0.109:51186/llback/O2O/UploadOrder'
    const props2 = {
      action: url2,
      listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange2,
      multiple: false,
      customRequest:this.upload,
    };
    const onPrev = () => {
      dispatch(routerRedux.push('/goods/step-form'));
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          // dispatch({
          //   type: 'form/submitStepForm',
          //   payload: {
          //     ...data,
          //     ...values,
          //   },
          // });
          dispatch(routerRedux.push('/goods/step-form/wait'));
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <div style={{textAlign:'center',padding:'30px',maxWidth:'400px',margin:'auto'}}>
          <div style={{marginBottom:10}}>
            您成功上传了{`${this.state.num1}`}个SKU，<br/>
            已成功入库120SKU，<br/>
            还有30个新SKU需要上传图片。
          </div>
          <Button style={{ marginBottom:10 }} type="primary" ghost onClick={this.downloadStoreTemp}>下载需上传图片的SKU列表文件</Button><br/>
          <Button style={{ marginBottom: 10 }} type="primary" ghost onClick={this.downloadGoodsTemp}>下载商品信息模板</Button><br/>
          <Upload {...props}>
            <Button style={{marginBottom:10}} type="primary" ghost>上传商品信息模板</Button>
          </Upload>
          <Upload {...props2}>
            <Button type="primary" ghost>上传商品图片Zip文件</Button>
          </Upload>
          <div style={{marginTop:'30px'}}>
            <Button type="primary" onClick={onValidateForm} loading={submitting}>
              提交入库
            </Button>
            <Button onClick={onPrev} style={{ marginLeft: 8 }}>
              上一步
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
}))(Step2);
