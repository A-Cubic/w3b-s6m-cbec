import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select,Upload, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';
import {notification} from "antd/lib/index";

const { Option } = Select;

@Form.create()
class Step1 extends React.PureComponent {
  state={
    fileList:[],
    thumbUrl:'',
  }
  handleUploadChange=(info)=>{
    console.log('info',info)
    let fileList = info.fileList;
    this.setState({
      fileList:info.fileList,
      thumbUrl:info.file.thumbUrl
    })
    // this.props.dispatch({
    //   type: 'o2o/upload',
    //   payload: {
    //     fileList1:info.fileList
    //   },
    //   callback: this.onUploadCallback,
    // });
    this.setState({
      fileList:[]
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
    const { form, dispatch, data } = this.props;
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
    const onValidateForm = () => {
      this.props.dispatch({
        type: 'goods/step1Upload',
        payload: {
          thumbUrl:this.state.thumbUrl
        },
        callback: this.onUploadCallback,
      });
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
        <div style={{textAlign:'center',padding:'30px',maxWidth:'400px',margin:'auto'}}>
          <Upload {...props}>
            <Button type="primary" ghost>选择商品信息文件</Button>
          </Upload>
          <Button style={{marginTop:'30px'}} type="primary" onClick={onValidateForm}>
            提交入库
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ goods }) => ({
  data: goods.step,
}))(Step1);
