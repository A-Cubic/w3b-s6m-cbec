import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form,message, Input, Button, Select,Upload, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';
import {notification} from "antd/lib/index";
import {getToken} from "../../../utils/Global";
const userId = getToken().userId;
const { Option } = Select;

@Form.create()
class Step1 extends React.PureComponent {
  state={
    fileList:[],
    thumbUrl:'',
  }
  handleUploadChange=(info)=>{
    this.setState({
      fileList:info.fileList,
      thumbUrl:info.file.thumbUrl
    })
  }
  onUploadCallback = (params) => {
    const msg = params.msg;
    if(params.type==="0"){
      message.error(msg);
      // notification.error({
      //   message: "提示",
      //   description: msg,
      // });
    }else {
      message.success(msg);
      // notification.success({
      //   message: "提示",
      //   description: msg,
      // });
      this.props.dispatch(routerRedux.push('/goods/step-form/confirm/'+params.id));
    }
  }
  render() {
    const { form, dispatch,submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const url = 'http://api.llwell.net/llback/user/validate'
    const props = {
      action: url,
      listType: 'picture',
      // accept:'image/*',
      onChange: this.handleUploadChange,
      multiple: false,
      customRequest:this.upload,
    };
    const onValidateForm = () => {
      if(this.state.thumbUrl!==''){
        this.props.dispatch({
          type: 'goods/step1Upload',
          payload: {
            userId:userId,
            byte64:this.state.thumbUrl
          },
          callback: this.onUploadCallback,
        });
      }else{
        message.warning('请选择需要上传的.xlsx文件')
      }
    };
    return (
      <Fragment>
        <div style={{textAlign:'center',padding:'30px',maxWidth:'400px',margin:'auto'}}>
          <Upload {...props}>
            <Button type="primary" ghost>选择商品信息文件</Button>
          </Upload>
          <Button style={{marginTop:'30px'}} type="primary" loading={submitting} onClick={onValidateForm}>
            提交入库
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default connect(({ goods,loading }) => ({
  submitting: loading.effects['goods/step1Upload'],
  data: goods.step,
}))(Step1);
